import Groq from 'groq-sdk'
import { GoogleGenerativeAI } from '@google/generative-ai'

// Types
export interface ChatMessage {
    role: 'user' | 'assistant' | 'system'
    content: string
}

export interface AIAction {
    type: 'announcement' | 'session' | 'approve_request' | 'stats' | 'review_code' | 'none'
    data?: AnnouncementData | SessionData | ApproveRequestData | CodeReviewData | null
    message: string
    requiresConfirmation: boolean
}

export interface AnnouncementData {
    title: string
    content: string
}

export interface SessionData {
    title: string
    description: string
    location: string
    startsAt: string // ISO date string
    endsAt: string // ISO date string
}

export interface ApproveRequestData {
    requestId?: string
    action: 'approve' | 'reject'
    reason?: string
}

export interface CodeReviewData {
    code: string
    language: string
}

// System prompt cho AI
const SYSTEM_PROMPT = `Bạn là trợ lý AI thông minh của CLB Flutter - WebOOM DHV TEC. Bạn có thể giúp admin/trainer thực hiện các tác vụ sau:

## Khả năng của bạn:

### 1. Đăng thông báo (announcement)
Khi admin muốn đăng thông báo, hãy trích xuất:
- title: Tiêu đề ngắn gọn (tối đa 100 ký tự)
- content: Nội dung chi tiết

Ví dụ: "đăng thông báo nghỉ Tết từ 25/1 đến 5/2" → Tạo thông báo về lịch nghỉ Tết

### 2. Tạo buổi học (session)
Khi admin muốn tạo lịch học, hãy trích xuất:
- title: Tên buổi học
- description: Mô tả nội dung
- location: Địa điểm (mặc định "Phòng thực hành")
- startsAt: Thời gian bắt đầu (ISO format)
- endsAt: Thời gian kết thúc (ISO format)

Lưu ý về thời gian:
- Hôm nay là: {{CURRENT_DATE}}
- Nếu user nói "thứ 7 tuần này", hãy tính ngày cụ thể
- Nếu user nói "lúc 14h", mặc định kéo dài 2 tiếng
- Format datetime: YYYY-MM-DDTHH:mm:ss

### 3. Duyệt yêu cầu tham gia
Khi admin muốn duyệt hoặc từ chối yêu cầu tham gia

### 4. Xem thống kê
Khi admin hỏi về số liệu thống kê CLB

### 5. Review Code Flutter (review_code)
Khi người dùng (thành viên) gửi một đoạn code và yêu cầu review hoặc tìm lỗi.
Hãy trích xuất:
- code: Đoạn code cần review
- language: Ngôn ngữ (thường là "dart" hoặc "flutter")

Ví dụ: "Hãy xem giúp mình đoạn code này có bug không: [code]" → Action review_code

### 6. Trò chuyện thông thường
Trả lời các câu hỏi về CLB, hỗ trợ kỹ thuật Flutter, v.v.

## Quy tắc:
- Luôn trả lời bằng tiếng Việt
- Thân thiện, chuyên nghiệp, KHÔNG sử dụng icon emoji trong câu trả lời
- Khi tạo nội dung, hãy viết đầy đủ và chuyên nghiệp
- Luôn xác nhận trước khi thực hiện hành động quan trọng
- Nếu thiếu thông tin, hãy hỏi lại

## Response format:
Trả về JSON với format:
{
  "action": "announcement" | "session" | "approve_request" | "stats" | "none",
  "data": { ... } | null,
  "message": "Nội dung trả lời cho user",
  "requiresConfirmation": true | false
}
`

// Initialize Groq client
const getGroqClient = () => {
    const apiKey = process.env.GROQ_API_KEY
    if (!apiKey) {
        throw new Error('GROQ_API_KEY không được cấu hình. Vui lòng thêm vào .env.local')
    }
    return new Groq({ apiKey })
}

// Parse response từ AI
const parseAIResponse = (content: string): AIAction => {
    try {
        // Tìm JSON trong response
        const jsonMatch = content.match(/\{[\s\S]*\}/)
        if (jsonMatch) {
            const parsed = JSON.parse(jsonMatch[0])
            return {
                type: parsed.action || 'none',
                data: parsed.data || null,
                message: parsed.message || content,
                requiresConfirmation: parsed.requiresConfirmation ?? true
            }
        }
    } catch {
        // Nếu không parse được JSON, trả về message thường
    }

    return {
        type: 'none',
        data: null,
        message: content,
        requiresConfirmation: false
    }
}

// Main function để chat với AI
export async function chatWithAI(
    messages: ChatMessage[],
    currentDate: Date = new Date()
): Promise<AIAction> {
    const userMessage = messages[messages.length - 1].content.toLowerCase()

    // Nếu có chứa từ khóa về code review, sử dụng Gemini
    const isCodeReview = /review|code|bug|lỗi|tối ưu|dart|flutter/i.test(userMessage) && userMessage.length > 50

    if (isCodeReview && process.env.GEMINI_API_KEY) {
        return handleGeminiReview(messages)
    }

    const groq = getGroqClient()
    // ... existing Groq logic ...

    // Chuẩn bị system prompt với ngày hiện tại
    const systemPrompt = SYSTEM_PROMPT.replace(
        '{{CURRENT_DATE}}',
        currentDate.toLocaleDateString('vi-VN', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    )

    const fullMessages = [
        { role: 'system' as const, content: systemPrompt },
        ...messages.map(m => ({ role: m.role, content: m.content }))
    ]

    try {
        const completion = await groq.chat.completions.create({
            model: 'llama-3.3-70b-versatile',
            messages: fullMessages,
            temperature: 0.7,
            max_tokens: 2048,
            response_format: { type: 'json_object' }
        })

        const responseContent = completion.choices[0]?.message?.content || ''
        return parseAIResponse(responseContent)
    } catch (error: any) {
        console.error('Groq API Error:', error)

        // Xử lý các lỗi cụ thể
        if (error.message?.includes('API key')) {
            return {
                type: 'none',
                data: null,
                message: 'Lỗi cấu hình: API key không hợp lệ. Vui lòng kiểm tra GROQ_API_KEY trong .env.local',
                requiresConfirmation: false
            }
        }

        return {
            type: 'none',
            data: null,
            message: 'Đã xảy ra lỗi khi kết nối với AI. Vui lòng thử lại sau.',
            requiresConfirmation: false
        }
    }
}

// Helper function để format datetime cho user
export function formatActionData(action: AIAction): string {
    if (!action.data) return action.message

    switch (action.type) {
        case 'announcement': {
            const data = action.data as AnnouncementData
            return `**Thông báo sẽ được đăng:**
      
**Tiêu đề:** ${data.title}

**Nội dung:**
${data.content}`
        }

        case 'session': {
            const data = action.data as SessionData
            const startDate = new Date(data.startsAt)
            const endDate = new Date(data.endsAt)
            return `**Buổi học sẽ được tạo:**
      
**Tên:** ${data.title}
**Mô tả:** ${data.description}
**Địa điểm:** ${data.location}
**Thời gian:** ${startDate.toLocaleString('vi-VN')} - ${endDate.toLocaleTimeString('vi-VN')}`
        }

        case 'review_code': {
            return `### 🔍 Kết quả Review Code\n\n${action.message}`
        }

        default:
            return action.message
    }
}

// Xử lý Review Code bằng Gemini
async function handleGeminiReview(messages: ChatMessage[]): Promise<AIAction> {
    try {
        const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY
        if (!apiKey) {
            return {
                type: 'none',
                data: null,
                message: 'Chưa cấu hình GEMINI_API_KEY. Vui lòng thêm vào .env.local',
                requiresConfirmation: false
            }
        }

        const genAI = new GoogleGenerativeAI(apiKey)
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

        const lastMessage = messages[messages.length - 1].content

        const prompt = `Bạn là một chuyên gia Flutter cao cấp. Hãy review đoạn code sau đây một cách chi tiết:
1. Phát hiện bug hoặc lỗi logic.
2. Gợi ý cách tối ưu performance.
3. Kiểm tra tính tuân thủ Clean Architecture và SOLID.
4. Trình bày bằng tiếng Việt, chuyên nghiệp, không dùng emoji.

Đoạn code:
${lastMessage}

Trả về kết quả dưới định dạng JSON:
{
  "action": "review_code",
  "data": { "code": "...", "language": "dart" },
  "message": "Nội dung review chi tiết ở đây (dùng markdown)",
  "requiresConfirmation": false
}`

        const result = await model.generateContent(prompt)
        const response = await result.response
        const text = response.text()

        return parseAIResponse(text)
    } catch (error) {
        console.error('Gemini Error:', error)
        return {
            type: 'none',
            data: null,
            message: 'Gemini hiện đang bận hoặc có lỗi cấu hình API Key. Vui lòng thử lại sau.',
            requiresConfirmation: false
        }
    }
}

// Suggestions cho UI
export const AI_SUGGESTIONS = [
    { type: 'announcement', text: 'Đăng thông báo về lịch nghỉ Tết' },
    { type: 'session', text: 'Tạo buổi học Flutter cơ bản' },
    { type: 'stats', text: 'Xem thống kê CLB' },
    { type: 'approve', text: 'Duyệt các yêu cầu tham gia' },
    { type: 'help', text: 'Gợi ý nội dung cho buổi học' },
]
