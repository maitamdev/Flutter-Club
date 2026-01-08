import { NextRequest, NextResponse } from 'next/server'
import {
    chatWithAI,
    ChatMessage,
    AIAction,
    AnnouncementData,
    SessionData
} from '@/lib/services/ai-service'
import { createAnnouncement, createSession } from '@/lib/firebase/firestore'
import { notifyNewAnnouncement, notifyNewSession } from '@/lib/utils/notifications'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { messages, userId, userName, executeAction } = body as {
            messages: ChatMessage[]
            userId: string
            userName?: string
            executeAction?: {
                type: AIAction['type']
                data: AIAction['data']
            }
        }

        // Validate input
        if (!messages || !Array.isArray(messages) || messages.length === 0) {
            return NextResponse.json(
                { error: 'Messages array is required' },
                { status: 400 }
            )
        }

        if (!userId) {
            return NextResponse.json(
                { error: 'User ID is required' },
                { status: 400 }
            )
        }

        // Nếu có executeAction, thực hiện hành động
        if (executeAction) {
            const result = await executeAIAction(executeAction.type, executeAction.data, userId, userName)
            return NextResponse.json(result)
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

// Thực hiện hành động từ AI
async function executeAIAction(
    type: AIAction['type'],
    data: AIAction['data'],
    userId: string,
    userName?: string
): Promise<{ success: boolean; message: string }> {
    try {
        switch (type) {
            case 'announcement': {
                const announcementData = data as AnnouncementData
                if (!announcementData?.title || !announcementData?.content) {
                    return { success: false, message: 'Thiếu thông tin thông báo' }
                }

                await createAnnouncement({
                    title: announcementData.title,
                    content: announcementData.content,
                    createdBy: userId
                })

                // Gửi notification cho members
                await notifyNewAnnouncement(announcementData.title, userId)

                return {
                    success: true,
                    message: `✅ Đã đăng thông báo "${announcementData.title}" thành công!`
                }
            }

            case 'session': {
                const sessionData = data as SessionData
                if (!sessionData?.title || !sessionData?.startsAt || !sessionData?.endsAt) {
                    return { success: false, message: 'Thiếu thông tin buổi học' }
                }

                const sessionDoc = await createSession({
                    title: sessionData.title,
                    description: sessionData.description || '',
                    location: sessionData.location || 'Phòng thực hành',
                    startsAt: new Date(sessionData.startsAt),
                    endsAt: new Date(sessionData.endsAt),
                    trainerId: userId,
                    trainerName: userName || 'Admin',
                    materials: []
                })

                // Gửi notification cho members
                await notifyNewSession(sessionData.title, sessionDoc.id, userId)

                return {
                    success: true,
                    message: `✅ Đã tạo buổi học "${sessionData.title}" thành công!`
                }
            }

            case 'stats': {
                // Trả về redirect hoặc message để xem stats
                return {
                    success: true,
                    message: '📊 Hãy truy cập Dashboard để xem thống kê chi tiết của CLB.'
                }
            }

            default:
                return { success: false, message: 'Hành động không được hỗ trợ' }
        }
    } catch (error: any) {
        console.error('Execute AI Action Error:', error)
        return {
            success: false,
            message: `❌ Lỗi: ${error.message || 'Không thể thực hiện hành động'}`
        }
    }
}
