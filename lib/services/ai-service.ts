import Groq from 'groq-sdk'

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
    currentDate: Date = new Date(),
    userRole: string = 'member'
): Promise<AIAction> {
    const userMessage = messages[messages.length - 1].content.toLowerCase()

    // Nếu có chứa từ khóa về code review hoặc có block code, sử dụng logic review chuyên sâu
    const hasCodeBlock = userMessage.includes('```')
    const isCodeReview = hasCodeBlock || (/review|code|bug|lỗi|tối ưu|dart|flutter|giải thích/i.test(userMessage) && userMessage.length > 10)

    try {
        // 1. Thử dùng Groq làm engine chính (nhanh nhất)
        const groq = getGroqClient()

        if (isCodeReview) {
            return await handleGroqCodeReview(messages)
        }

        const systemPrompt = prepareSystemPrompt(currentDate, userRole)
        const fullMessages = [
            { role: 'system' as const, content: systemPrompt },
            ...messages.map(m => ({ role: m.role, content: m.content }))
        ]

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
        console.warn('Groq Error, switching to OpenRouter fallback:', error.message)

        // 2. Nếu Groq lỗi/hết hạn mức -> Thử dùng OpenRouter
        const openRouterKey = process.env.OPENROUTER_API_KEY || process.env.NEXT_PUBLIC_OPENROUTER_API_KEY
        if (openRouterKey) {
            return await handleOpenRouterChat(messages, currentDate, userRole, isCodeReview)
        }

        // Nếu cả 2 đều thất bại
        return {
            type: 'none',
            data: null,
            message: 'Hệ thống AI hiện đang bận do quá tải. Vui lòng thử lại sau vài phút.',
            requiresConfirmation: false
        }
    }
}

// Helper để chuẩn bị system prompt
function prepareSystemPrompt(currentDate: Date, userRole: string): string {
    let roleInstructions = ""
    if (userRole === 'member') {
        roleInstructions = "\n\nCRITICAL: User hiện tại là MEMBER. Bạn KHÔNG ĐƯỢC PHÉP tạo thông báo hoặc buổi học. Nếu user yêu cầu, hãy từ chối lịch sự và hướng dẫn họ liên hệ Admin. Bạn chỉ được hỗ trợ Review Code và các câu hỏi kỹ thuật."
    }

    return SYSTEM_PROMPT.replace(
        '{{CURRENT_DATE}}',
        currentDate.toLocaleDateString('vi-VN', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    ) + roleInstructions
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

// Hết các function handling Gemini (Đã gỡ bỏ)

// Xử lý bằng OpenRouter (Siêu dự phòng)
async function handleOpenRouterChat(
    messages: ChatMessage[],
    currentDate: Date,
    userRole: string,
    isCodeReview: boolean
): Promise<AIAction> {
    try {
        const apiKey = process.env.OPENROUTER_API_KEY || process.env.NEXT_PUBLIC_OPENROUTER_API_KEY
        if (!apiKey) throw new Error('Missing OpenRouter API Key')

        const lastMessage = messages[messages.length - 1].content
        let systemPrompt = prepareSystemPrompt(currentDate, userRole)

        if (isCodeReview) {
            systemPrompt = `Bạn là một chuyên gia Flutter cao cấp. Hãy review đoạn code sau đây một cách chi tiết:
1. Phát hiện bug hoặc lỗi logic.
2. Gợi ý cách tối ưu performance.
3. Kiểm tra Clean Architecture và SOLID.
4. Trình bày bằng tiếng Việt, chuyên nghiệp, markdown đẹp.

Bạn PHẢI trả về JSON:
{
  "action": "review_code",
  "data": { "code": "...", "language": "dart" },
  "message": "Nội dung review chi tiết",
  "requiresConfirmation": false
}`
        }

        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "HTTP-Referer": "https://flutter-club.vercel.app", // Optional
                "X-Title": "Flutter Club Assistant",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "model": "google/gemini-2.0-flash-exp:free", // Sử dụng model free cực mạnh và ổn định
                "messages": [
                    { "role": "system", "content": systemPrompt },
                    ...messages.map(m => ({ "role": m.role, "content": m.content }))
                ],
                "response_format": { "type": "json_object" }
            })
        });

        const data = await response.json();
        const content = data.choices[0]?.message?.content || '';
        return parseAIResponse(content);

    } catch (error) {
        console.error('OpenRouter Error:', error);
        return {
            type: 'none',
            data: null,
            message: 'Hệ thống AI dự phòng cũng đang bận. Vui lòng thử lại sau.',
            requiresConfirmation: false
        }
    }
}

// Xử lý Review Code bằng Groq (Phương án thay thế Gemini)
async function handleGroqCodeReview(messages: ChatMessage[]): Promise<AIAction> {
    try {
        const groq = getGroqClient()
        const lastMessage = messages[messages.length - 1].content

        const prompt = `Bạn là một chuyên gia Flutter cao cấp. Hãy review đoạn code sau đây một cách cực kỳ chi tiết:
1. Phát hiện bug hoặc lỗi logic.
2. Gợi ý cách tối ưu performance (ví dụ: const constructors, repainboundary...).
3. Kiểm tra tính tuân thủ Clean Architecture và SOLID.
4. Trình bày bằng tiếng Việt, chuyên nghiệp, format markdown đẹp mắt.

Đoạn code:
${lastMessage}

Bạn PHẢI trả về kết quả dưới định dạng JSON duy nhất:
{
  "action": "review_code",
  "data": { "code": "phần code chính được trích xuất", "language": "dart" },
  "message": "Nội dung review chi tiết của bạn ở đây. Dùng markdown mạnh mẽ để làm nổi bật các vấn đề.",
  "requiresConfirmation": false
}`

        const completion = await groq.chat.completions.create({
            model: 'llama-3.3-70b-versatile',
            messages: [
                { role: 'system', content: 'Bạn là chuyên gia Flutter Review Code. Chỉ trả về JSON.' },
                { role: 'user', content: prompt }
            ],
            temperature: 0.3, // Thấp để chính xác hơn
            response_format: { type: 'json_object' }
        })

        const responseContent = completion.choices[0]?.message?.content || ''
        return parseAIResponse(responseContent)
    } catch (error) {
        console.error('Groq Review Error:', error)
        return {
            type: 'none',
            data: null,
            message: 'Hiện tại hệ thống Review đang bận. Vui lòng thử lại sau.',
            requiresConfirmation: false
        }
    }
}

// Suggestions cho UI
export const AI_SUGGESTIONS = [
    { type: 'review', text: 'Review giúp mình đoạn code này', roles: ['admin', 'trainer', 'member'] },
    { type: 'help', text: 'Lộ trình học Flutter cho người mới', roles: ['admin', 'trainer', 'member'] },
    { type: 'announcement', text: 'Đăng thông báo về lịch nghỉ Tết', roles: ['admin', 'trainer'] },
    { type: 'session', text: 'Tạo buổi học Flutter cơ bản', roles: ['admin', 'trainer'] },
    { type: 'stats', text: 'Xem thống kê CLB', roles: ['admin', 'trainer'] },
    { type: 'approve', text: 'Duyệt các yêu cầu tham gia', roles: ['admin', 'trainer'] },
]
