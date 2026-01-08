import { NextRequest, NextResponse } from 'next/server'
import {
    chatWithAI,
    ChatMessage
} from '@/lib/services/ai-service'

// Xử lý POST request để lấy phản hồi từ AI
export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { messages, userId } = body as {
            messages: ChatMessage[]
            userId: string
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

        // Gọi AI để xử lý message
        const aiResponse = await chatWithAI(messages)

        return NextResponse.json({
            success: true,
            action: aiResponse
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
