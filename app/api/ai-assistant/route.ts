import { NextRequest, NextResponse } from 'next/server'
import {
    chatWithAI,
    ChatMessage
} from '@/lib/services/ai-service'
import { checkRateLimit } from '@/lib/utils/rate-limit'

// Xử lý POST request để lấy phản hồi từ AI
export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { messages, userId, userRole } = body as {
            messages: ChatMessage[]
            userId: string
            userRole?: string
        }

        // Validate userId
        if (!userId) {
            return NextResponse.json(
                { error: 'User ID is required' },
                { status: 400 }
            )
        }

        // Validate messages
        if (!messages || !Array.isArray(messages) || messages.length === 0) {
            return NextResponse.json(
                { error: 'Messages array is required' },
                { status: 400 }
            )
        }

        // Check rate limit
        const role = userRole || 'student'
        const rateLimit = await checkRateLimit(userId, role)

        if (!rateLimit.allowed) {
            return NextResponse.json(
                {
                    error: 'Bạn đã vượt quá giới hạn tin nhắn. Vui lòng thử lại sau.',
                    resetAt: rateLimit.resetAt.toISOString(),
                    success: false
                },
                { status: 429 }
            )
        }

        // Gọi AI để xử lý message
        const aiResponse = await chatWithAI(messages, new Date(), userRole)

        return NextResponse.json({
            success: true,
            action: aiResponse,
            remaining: rateLimit.remaining
        })
    } catch (error: any) {
        console.error('AI Assistant API Error:', error)
        return NextResponse.json(
            {
                error: error.message || 'Internal server error',
                success: false
            },
            { status: 500 }
        )
    }
}
