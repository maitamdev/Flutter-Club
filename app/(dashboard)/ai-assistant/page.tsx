'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Bot, Sparkles, Shield, Zap, MessageSquare, Bell, Calendar, Users } from 'lucide-react'
import { useAuth } from '@/lib/hooks/useAuth'
import { AdminAIChat } from '@/components/admin/admin-ai-chat'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function AIAssistantPage() {
    const { user, isTrainer, loading } = useAuth()
    const router = useRouter()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        if (!loading && !user) {
            router.push('/(auth)/login')
        }
    }, [loading, user, router])

    if (loading || !user) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <div className="text-center space-y-4">
                    <div className="h-16 w-16 mx-auto rounded-2xl bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center animate-pulse">
                        <Bot className="h-8 w-8 text-white" />
                    </div>
                    <p className="text-muted-foreground">Đang tải...</p>
                </div>
            </div>
        )
    }

    const isAdminOrTrainer = user.role === 'admin' || user.role === 'trainer'

    return (
        <div className="space-y-6 pb-8">
            {/* Header */}
            <div className={`transition-all duration-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <div className="flex items-center gap-3 mb-2">
                    <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-violet-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/25">
                        <Sparkles className="h-6 w-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold flex items-center gap-2">
                            AI Assistant
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-xs font-medium">
                                <Zap className="h-3 w-3" />
                                Beta
                            </span>
                        </h1>
                        <p className="text-muted-foreground">
                            Trợ lý AI thông minh giúp bạn quản lý CLB hiệu quả hơn
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Chat Area */}
                <div className={`lg:col-span-2 transition-all duration-500 delay-100 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    <AdminAIChat />
                </div>

                {/* Sidebar */}
                <div className={`space-y-4 transition-all duration-500 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    {/* Capabilities Card */}
                    <Card className="border-0 shadow-lg bg-gradient-to-br from-violet-50 to-pink-50 dark:from-violet-950/30 dark:to-pink-950/30">
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2">
                                <Shield className="h-5 w-5 text-purple-500" />
                                Khả năng của AI
                            </CardTitle>
                            <CardDescription>
                                AI có thể giúp bạn thực hiện các tác vụ sau
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {isAdminOrTrainer && (
                                <>
                                    <div className="flex items-start gap-3 p-3 rounded-xl bg-white/50 dark:bg-gray-900/50">
                                        <div className="h-8 w-8 rounded-lg bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center shrink-0">
                                            <Bell className="h-4 w-4 text-pink-500" />
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-sm">Đăng thông báo</h4>
                                            <p className="text-xs text-muted-foreground">Tự động tạo nội dung thông báo chuyên nghiệp</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3 p-3 rounded-xl bg-white/50 dark:bg-gray-900/50">
                                        <div className="h-8 w-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
                                            <Calendar className="h-4 w-4 text-blue-500" />
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-sm">Tạo lịch học</h4>
                                            <p className="text-xs text-muted-foreground">Lên lịch buổi học với thời gian, địa điểm</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3 p-3 rounded-xl bg-white/50 dark:bg-gray-900/50">
                                        <div className="h-8 w-8 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center shrink-0">
                                            <Users className="h-4 w-4 text-green-500" />
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-sm">Quản lý thành viên</h4>
                                            <p className="text-xs text-muted-foreground">Xem thống kê, duyệt yêu cầu tham gia</p>
                                        </div>
                                    </div>
                                </>
                            )}

                            <div className="flex items-start gap-3 p-3 rounded-xl bg-white/50 dark:bg-gray-900/50">
                                <div className="h-8 w-8 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center shrink-0">
                                    <Sparkles className="h-4 w-4 text-purple-500" />
                                </div>
                                <div>
                                    <h4 className="font-medium text-sm">Review Code Flutter</h4>
                                    <p className="text-xs text-muted-foreground">Phân tích lỗi, bug và gợi ý tối ưu code Dart/Flutter</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 p-3 rounded-xl bg-white/50 dark:bg-gray-900/50">
                                <div className="h-8 w-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
                                    <MessageSquare className="h-4 w-4 text-blue-500" />
                                </div>
                                <div>
                                    <h4 className="font-medium text-sm">Trả lời câu hỏi</h4>
                                    <p className="text-xs text-muted-foreground">Giải đáp thắc mắc về kỹ thuật và hoạt động CLB</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Tips Card */}
                    <Card className="border-0 shadow-lg">
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2">
                                <Zap className="h-5 w-5 text-yellow-500" />
                                Mẹo sử dụng
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 text-sm">
                            <div className="flex items-start gap-3 p-2">
                                <Zap className="h-4 w-4 text-purple-500 mt-1 shrink-0" />
                                <span>Nói rõ ràng và cụ thể để AI hiểu đúng ý bạn</span>
                            </div>
                            <div className="flex items-start gap-3 p-2">
                                <Calendar className="h-4 w-4 text-blue-500 mt-1 shrink-0" />
                                <span>Với lịch học, hãy nói rõ ngày giờ: &ldquo;thứ 7 lúc 14h&rdquo;</span>
                            </div>
                            <div className="flex items-start gap-3 p-2">
                                <Shield className="h-4 w-4 text-green-500 mt-1 shrink-0" />
                                <span>AI sẽ xác nhận trước khi thực hiện mọi hành động</span>
                            </div>
                            <div className="flex items-start gap-3 p-2">
                                <MessageSquare className="h-4 w-4 text-pink-500 mt-1 shrink-0" />
                                <span>Có thể yêu cầu chỉnh sửa nếu chưa ưng ý</span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* User Info */}
                    <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                                    <Bot className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="font-medium">Xin chào, {user?.name}!</p>
                                    <p className="text-sm text-white/80">
                                        {user?.role === 'admin' ? 'Quản trị viên' :
                                            user?.role === 'trainer' ? 'Giảng viên' : 'Thành viên CLB'}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
