'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import {
    Send,
    Bot,
    User,
    Sparkles,
    Loader2,
    CheckCircle2,
    XCircle,
    Megaphone,
    Calendar,
    BarChart3,
    RefreshCw,
    Zap,
    MessageSquare,
    Shield,
    Users
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { useToast } from '@/components/ui/use-toast'
import { useAuth } from '@/lib/hooks/useAuth'
import { cn } from '@/lib/utils'
import { AI_SUGGESTIONS } from '@/lib/services/ai-service'
import { createAnnouncement, createSession } from '@/lib/firebase/firestore'
import { notifyNewAnnouncement, notifyNewSession } from '@/lib/utils/notifications'
import ReactMarkdown from 'react-markdown'

// Types
interface Message {
    id: string
    role: 'user' | 'assistant'
    content: string
    timestamp: Date
    action?: {
        type: string
        data: Record<string, unknown> | null
        requiresConfirmation: boolean
    }
    status?: 'pending' | 'confirmed' | 'rejected' | 'executed'
}

interface PendingAction {
    messageId: string
    type: string
    data: Record<string, unknown> | null
}

// Generate unique ID
const generateId = () => Math.random().toString(36).substring(2, 15)

// Format action data for display
const formatActionPreview = (type: string, data: Record<string, unknown> | null) => {
    if (!data) return null

    switch (type) {
        case 'announcement': {
            const d = data as { title: string; content: string }
            return (
                <div className="space-y-3">
                    <div className="flex items-center gap-2 text-pink-500">
                        <Megaphone className="h-5 w-5" />
                        <span className="font-semibold">Thông báo mới</span>
                    </div>
                    <div className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-4 space-y-2">
                        <h4 className="font-bold text-lg">{d.title}</h4>
                        <p className="text-muted-foreground whitespace-pre-wrap">{d.content}</p>
                    </div>
                </div>
            )
        }

        case 'session': {
            const d = data as { title: string; description: string; location: string; startsAt: string; endsAt: string }
            const startDate = new Date(d.startsAt)
            const endDate = new Date(d.endsAt)
            return (
                <div className="space-y-3">
                    <div className="flex items-center gap-2 text-blue-500">
                        <Calendar className="h-5 w-5" />
                        <span className="font-semibold">Buổi học mới</span>
                    </div>
                    <div className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-4 space-y-2">
                        <h4 className="font-bold text-lg">{d.title}</h4>
                        <p className="text-muted-foreground">{d.description}</p>
                        <div className="flex flex-wrap gap-2 text-sm">
                            <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-navy-700 dark:text-navy-400 rounded-lg">
                                📍 {d.location}
                            </span>
                            <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg">
                                🕐 {startDate.toLocaleString('vi-VN')} - {endDate.toLocaleTimeString('vi-VN')}
                            </span>
                        </div>
                    </div>
                </div>
            )
        }

        default:
            return null
    }
}

export function AdminAIChat() {
    const { user } = useAuth()
    const { toast } = useToast()
    const [messages, setMessages] = useState<Message[]>([])
    const [input, setInput] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [pendingAction, setPendingAction] = useState<PendingAction | null>(null)
    const [isExecuting, setIsExecuting] = useState(false)
    const scrollRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    // Auto scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [messages])

    // Focus input on mount
    useEffect(() => {
        inputRef.current?.focus()
    }, [])

    // Send message to AI
    const sendMessage = useCallback(async (content: string) => {
        if (!content.trim() || !user) return

        const userMessage: Message = {
            id: generateId(),
            role: 'user',
            content: content.trim(),
            timestamp: new Date()
        }

        setMessages(prev => [...prev, userMessage])
        setInput('')
        setIsLoading(true)

        try {
            const response = await fetch('/api/ai-assistant', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: [...messages, userMessage].map(m => ({
                        role: m.role,
                        content: m.content
                    })),
                    userId: user.uid,
                    userName: user.name,
                    userRole: user.role
                })
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Có lỗi xảy ra')
            }

            const assistantMessage: Message = {
                id: generateId(),
                role: 'assistant',
                content: data.action.message,
                timestamp: new Date(),
                action: data.action.type !== 'none' ? {
                    type: data.action.type,
                    data: data.action.data,
                    requiresConfirmation: data.action.requiresConfirmation
                } : undefined,
                status: data.action.requiresConfirmation ? 'pending' : undefined
            }

            setMessages(prev => [...prev, assistantMessage])

            // Nếu cần xác nhận, hiện dialog
            if (data.action.type !== 'none' && data.action.requiresConfirmation && data.action.data) {
                setPendingAction({
                    messageId: assistantMessage.id,
                    type: data.action.type,
                    data: data.action.data
                })
            }
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Không thể kết nối với AI'
            toast({
                title: 'Lỗi',
                description: errorMessage,
                variant: 'destructive'
            })
        } finally {
            setIsLoading(false)
        }
    }, [messages, user, toast])

    // Execute pending action
    const executeAction = async () => {
        if (!pendingAction || !user) return

        setIsExecuting(true)

        try {
            let success = false
            let successMessage = ''

            // Chạy trực tiếp ở Client để dùng Auth của user
            const isAdminOrTrainer = user.role === 'admin' || user.role === 'trainer'

            switch (pendingAction.type) {
                case 'announcement': {
                    if (!isAdminOrTrainer) {
                        throw new Error('Bạn không có quyền đăng thông báo')
                    }
                    const data = pendingAction.data as { title: string; content: string }
                    await createAnnouncement({
                        title: data.title,
                        content: data.content,
                        createdBy: user.uid
                    })
                    await notifyNewAnnouncement(data.title, user.uid)
                    success = true
                    successMessage = `Đã đăng thông báo "${data.title}" thành công!`
                    break
                }

                case 'session': {
                    if (!isAdminOrTrainer) {
                        throw new Error('Bạn không có quyền tạo buổi học')
                    }
                    const data = pendingAction.data as { title: string; description: string; location: string; startsAt: string; endsAt: string }
                    const sessionDoc = await createSession({
                        title: data.title,
                        description: data.description || '',
                        location: data.location || 'Phòng thực hành',
                        startsAt: new Date(data.startsAt),
                        endsAt: new Date(data.endsAt),
                        trainerId: user.uid,
                        trainerName: user.name || 'Admin',
                        materials: []
                    })
                    await notifyNewSession(data.title, sessionDoc.id, user.uid)
                    success = true
                    successMessage = `Đã tạo buổi học "${data.title}" thành công!`
                    break
                }

                case 'stats': {
                    success = true
                    successMessage = 'Hãy truy cập Dashboard để xem thống kê chi tiết của CLB.'
                    break
                }

                default:
                    throw new Error('Hành động không được hỗ trợ')
            }

            // Update message status
            setMessages(prev => prev.map(m =>
                m.id === pendingAction.messageId
                    ? { ...m, status: success ? 'executed' : 'rejected' as const }
                    : m
            ))

            // Add result message
            const resultMessage: Message = {
                id: generateId(),
                role: 'assistant',
                content: successMessage,
                timestamp: new Date()
            }
            setMessages(prev => [...prev, resultMessage])

            if (success) {
                toast({
                    title: 'Thành công',
                    description: successMessage
                })
            }
        } catch (error: any) {
            console.error('Execute Action Error:', error)
            toast({
                title: 'Lỗi',
                description: error.message || 'Không thể thực hiện hành động',
                variant: 'destructive'
            })
        } finally {
            setIsExecuting(false)
            setPendingAction(null)
        }
    }

    // Reject pending action
    const rejectAction = () => {
        if (!pendingAction) return

        setMessages(prev => prev.map(m =>
            m.id === pendingAction.messageId
                ? { ...m, status: 'rejected' as const }
                : m
        ))

        const rejectMessage: Message = {
            id: generateId(),
            role: 'assistant',
            content: 'Đã hủy. Bạn có thể yêu cầu lại hoặc chỉnh sửa nội dung.',
            timestamp: new Date()
        }
        setMessages(prev => [...prev, rejectMessage])

        setPendingAction(null)
    }

    // Handle form submit
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        sendMessage(input)
    }

    // Handle suggestion click
    const handleSuggestion = (text: string) => {
        sendMessage(text)
    }

    return (
        <div className="flex flex-col h-[calc(100vh-8rem)] max-h-[800px]">
            {/* Chat Messages */}
            <Card className="flex-1 border-0 shadow-xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 overflow-hidden">
                <CardHeader className="border-b bg-gradient-to-r from-violet-500/10 via-purple-500/10 to-pink-500/10">
                    <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-violet-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/25">
                            <Bot className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <CardTitle className="text-xl flex items-center gap-2">
                                AI Assistant
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs font-medium">
                                    <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                                    Online
                                </span>
                            </CardTitle>
                            <p className="text-sm text-muted-foreground">Trợ lý thông minh giúp bạn quản lý CLB</p>
                        </div>
                    </div>
                </CardHeader>

                <ScrollArea className="flex-1 h-[400px]" ref={scrollRef}>
                    <div className="p-4 space-y-4">
                        {/* Welcome message */}
                        {messages.length === 0 && (
                            <div className="text-center py-8 space-y-6">
                                <div className="inline-flex items-center justify-center h-20 w-20 rounded-3xl bg-gradient-to-br from-violet-500 via-purple-500 to-pink-500 shadow-xl shadow-purple-500/25">
                                    <Sparkles className="h-10 w-10 text-white animate-pulse" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2">Xin chào! Tôi là AI Assistant</h3>
                                    <p className="text-muted-foreground max-w-md mx-auto">
                                        {user?.role === 'member'
                                            ? 'Tôi có thể giúp bạn review code Flutter, tìm lỗi và giải đáp thắc mắc kỹ thuật.'
                                            : 'Tôi có thể giúp bạn đăng thông báo, tạo lịch học, và nhiều tác vụ khác.'}
                                        <br />
                                        Hãy thử một trong các gợi ý bên dưới!
                                    </p>
                                </div>

                                {/* Suggestions */}
                                <div className="flex flex-wrap justify-center gap-2 max-w-lg mx-auto">
                                    {AI_SUGGESTIONS.filter(s => s.roles.includes(user?.role || 'member')).map((suggestion, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleSuggestion(suggestion.text)}
                                            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-purple-400 dark:hover:border-purple-500 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-200 text-sm"
                                        >
                                            {suggestion.type === 'review' && <Sparkles className="h-4 w-4 text-purple-500" />}
                                            {suggestion.type === 'announcement' && <Megaphone className="h-4 w-4 text-pink-500" />}
                                            {suggestion.type === 'session' && <Calendar className="h-4 w-4 text-blue-500" />}
                                            {suggestion.type === 'stats' && <BarChart3 className="h-4 w-4 text-green-500" />}
                                            {suggestion.type === 'approve' && <Shield className="h-4 w-4 text-purple-500" />}
                                            {suggestion.type === 'help' && <Sparkles className="h-4 w-4 text-yellow-500" />}
                                            <span>{suggestion.text}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Messages */}
                        {messages.map((message, index) => (
                            <div
                                key={message.id}
                                className={cn(
                                    'flex gap-3 animate-in slide-in-from-bottom-2 duration-300',
                                    message.role === 'user' ? 'flex-row-reverse' : ''
                                )}
                                style={{ animationDelay: `${index * 50}ms` }}
                            >
                                {/* Avatar */}
                                <div className={cn(
                                    'h-10 w-10 rounded-xl flex items-center justify-center shrink-0 shadow-lg',
                                    message.role === 'user'
                                        ? 'bg-gradient-to-br from-navy-600 to-navy-700'
                                        : 'bg-gradient-to-br from-violet-500 to-pink-500'
                                )}>
                                    {message.role === 'user' ? (
                                        <User className="h-5 w-5 text-white" />
                                    ) : (
                                        <Bot className="h-5 w-5 text-white" />
                                    )}
                                </div>

                                {/* Message Content */}
                                <div className={cn(
                                    'max-w-[70%] space-y-2',
                                    message.role === 'user' ? 'items-end' : 'items-start'
                                )}>
                                    <div className={cn(
                                        'rounded-2xl px-4 py-3 shadow-md',
                                        message.role === 'user'
                                            ? 'bg-gradient-to-r from-navy-600 to-navy-700 text-white rounded-tr-sm'
                                            : 'bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-tl-sm'
                                    )}>
                                        {message.role === 'assistant' ? (
                                            <div className="prose prose-sm dark:prose-invert max-w-none">
                                                <ReactMarkdown>{message.content}</ReactMarkdown>
                                            </div>
                                        ) : (
                                            <p className="whitespace-pre-wrap">{message.content}</p>
                                        )}
                                    </div>

                                    {/* Action status badge */}
                                    {message.status && (
                                        <div className={cn(
                                            'inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium',
                                            message.status === 'pending' && 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600',
                                            message.status === 'executed' && 'bg-green-100 dark:bg-green-900/30 text-green-600',
                                            message.status === 'rejected' && 'bg-red-100 dark:bg-red-900/30 text-red-600'
                                        )}>
                                            {message.status === 'pending' && (
                                                <>
                                                    <RefreshCw className="h-3 w-3 animate-spin" />
                                                    Đang chờ xác nhận
                                                </>
                                            )}
                                            {message.status === 'executed' && (
                                                <>
                                                    <CheckCircle2 className="h-3 w-3" />
                                                    Đã thực hiện
                                                </>
                                            )}
                                            {message.status === 'rejected' && (
                                                <>
                                                    <XCircle className="h-3 w-3" />
                                                    Đã hủy
                                                </>
                                            )}
                                        </div>
                                    )}

                                    {/* Timestamp */}
                                    <p className={cn(
                                        'text-xs text-muted-foreground',
                                        message.role === 'user' ? 'text-right' : 'text-left'
                                    )}>
                                        {message.timestamp.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                                    </p>
                                </div>
                            </div>
                        ))}

                        {/* Loading indicator */}
                        {isLoading && (
                            <div className="flex gap-3 animate-in slide-in-from-bottom-2">
                                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center shadow-lg">
                                    <Bot className="h-5 w-5 text-white" />
                                </div>
                                <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl rounded-tl-sm px-4 py-3 shadow-md">
                                    <div className="flex items-center gap-2">
                                        <div className="flex gap-1">
                                            <span className="h-2 w-2 rounded-full bg-purple-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                                            <span className="h-2 w-2 rounded-full bg-purple-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                                            <span className="h-2 w-2 rounded-full bg-purple-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                                        </div>
                                        <span className="text-sm text-muted-foreground">Đang suy nghĩ...</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </ScrollArea>

                {/* Input Area */}
                <div className="p-4 border-t bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
                    <form onSubmit={handleSubmit} className="flex gap-2">
                        <div className="relative flex-1">
                            <MessageSquare className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input
                                ref={inputRef}
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder={user?.role === 'member'
                                    ? "Hỏi về Flutter hoặc dán code cần review..."
                                    : "Nhập tin nhắn... (VD: đăng thông báo nghỉ Tết)"
                                }
                                className="pl-10 h-12 rounded-xl border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-purple-500"
                                disabled={isLoading}
                            />
                        </div>
                        <Button
                            type="submit"
                            disabled={!input.trim() || isLoading}
                            className="h-12 px-6 rounded-xl bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 hover:from-violet-600 hover:via-purple-600 hover:to-pink-600 shadow-lg shadow-purple-500/25"
                        >
                            {isLoading ? (
                                <Loader2 className="h-5 w-5 animate-spin" />
                            ) : (
                                <>
                                    <Send className="h-5 w-5 mr-2" />
                                    Gửi
                                </>
                            )}
                        </Button>
                    </form>

                    {/* Quick actions */}
                    <div className="flex flex-wrap items-center gap-2 mt-3 text-xs text-muted-foreground">
                        <Zap className="h-4 w-4" />
                        <span>Gợi ý:</span>
                        {user?.role === 'member' ? (
                            <>
                                <button
                                    type="button"
                                    onClick={() => handleSuggestion('Review code Flutter này giúp mình')}
                                    className="px-2 py-1 rounded bg-muted hover:bg-muted/80"
                                >
                                    <Sparkles className="h-3 w-3 inline mr-1" />
                                    Review Code
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleSuggestion('Lộ trình học Flutter nâng cao')}
                                    className="px-2 py-1 rounded bg-muted hover:bg-muted/80"
                                >
                                    <Sparkles className="h-3 w-3 inline mr-1" />
                                    Lộ trình học
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    type="button"
                                    onClick={() => handleSuggestion('Xem thống kê CLB')}
                                    className="px-2 py-1 rounded bg-muted hover:bg-muted/80"
                                >
                                    <BarChart3 className="h-3 w-3 inline mr-1" />
                                    Thống kê
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleSuggestion('Đăng thông báo mới')}
                                    className="px-2 py-1 rounded bg-muted hover:bg-muted/80"
                                >
                                    <Megaphone className="h-3 w-3 inline mr-1" />
                                    Thông báo
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleSuggestion('Tạo lịch học tuần này')}
                                    className="px-2 py-1 rounded bg-muted hover:bg-muted/80"
                                >
                                    <Calendar className="h-3 w-3 inline mr-1" />
                                    Lịch học
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </Card>

            {/* Confirmation Dialog */}
            <Dialog open={!!pendingAction} onOpenChange={(open) => !open && rejectAction()}>
                <DialogContent className="sm:max-w-lg">
                    <DialogHeader>
                        <div className="flex items-center gap-3">
                            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center shadow-lg">
                                <Sparkles className="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <DialogTitle>Xác nhận hành động</DialogTitle>
                                <DialogDescription>
                                    Kiểm tra nội dung trước khi thực hiện
                                </DialogDescription>
                            </div>
                        </div>
                    </DialogHeader>

                    <div className="py-4">
                        {pendingAction && formatActionPreview(pendingAction.type, pendingAction.data)}
                    </div>

                    <DialogFooter className="gap-2 sm:gap-0">
                        <Button
                            variant="outline"
                            onClick={rejectAction}
                            disabled={isExecuting}
                            className="rounded-xl"
                        >
                            <XCircle className="h-4 w-4 mr-2" />
                            Hủy bỏ
                        </Button>
                        <Button
                            onClick={executeAction}
                            disabled={isExecuting}
                            className="rounded-xl bg-gradient-to-r from-violet-500 to-pink-500 hover:from-violet-600 hover:to-pink-600"
                        >
                            {isExecuting ? (
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            ) : (
                                <CheckCircle2 className="h-4 w-4 mr-2" />
                            )}
                            Xác nhận
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
