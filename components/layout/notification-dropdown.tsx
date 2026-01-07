'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { formatDistanceToNow } from 'date-fns'
import { vi } from 'date-fns/locale'
import {
  Bell,
  Calendar,
  FileText,
  MessageSquare,
  CheckCircle,
  XCircle,
  BookOpen,
  Megaphone,
  Check,
  Trash2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useAuth } from '@/lib/hooks/useAuth'
import {
  subscribeToNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification,
} from '@/lib/firebase/firestore'
import { Notification, NotificationType } from '@/types'
import { cn } from '@/lib/utils'

const notificationIcons: Record<NotificationType, React.ReactNode> = {
  session_created: <Calendar className="h-4 w-4 text-blue-500" />,
  session_reminder: <Calendar className="h-4 w-4 text-orange-500" />,
  assignment_created: <FileText className="h-4 w-4 text-purple-500" />,
  assignment_due: <FileText className="h-4 w-4 text-red-500" />,
  submission_graded: <CheckCircle className="h-4 w-4 text-green-500" />,
  quiz_available: <BookOpen className="h-4 w-4 text-cyan-500" />,
  announcement: <Megaphone className="h-4 w-4 text-amber-500" />,
  access_approved: <CheckCircle className="h-4 w-4 text-green-500" />,
  access_rejected: <XCircle className="h-4 w-4 text-red-500" />,
}

export function NotificationDropdown() {
  const { user } = useAuth()
  const router = useRouter()
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!user?.uid) return

    const unsubscribe = subscribeToNotifications(user.uid, (data) => {
      setNotifications(data)
    })

    return () => unsubscribe()
  }, [user?.uid])

  const unreadCount = notifications.filter((n) => !n.isRead).length

  const handleClick = async (notification: Notification) => {
    if (!user?.uid) return

    if (!notification.isRead) {
      await markNotificationAsRead(user.uid, notification.id)
    }

    if (notification.link) {
      setOpen(false)
      router.push(notification.link)
    }
  }

  const handleMarkAllRead = async () => {
    if (!user?.uid) return
    await markAllNotificationsAsRead(user.uid)
  }

  const handleDelete = async (e: React.MouseEvent, notificationId: string) => {
    e.stopPropagation()
    if (!user?.uid) return
    await deleteNotification(user.uid, notificationId)
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative h-10 w-10 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <Bell className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          {unreadCount > 0 && (
            <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
              <span className="relative flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-[10px] font-bold text-white">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-semibold">Thông báo</h3>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 text-xs text-blue-600 hover:text-blue-700"
              onClick={handleMarkAllRead}
            >
              <Check className="h-3 w-3 mr-1" />
              Đánh dấu đã đọc
            </Button>
          )}
        </div>
        <ScrollArea className="h-[400px]">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
              <Bell className="h-12 w-12 mb-3 opacity-20" />
              <p className="text-sm">Chưa có thông báo</p>
            </div>
          ) : (
            <div className="divide-y">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  onClick={() => handleClick(notification)}
                  className={cn(
                    'flex gap-3 p-4 cursor-pointer transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50',
                    !notification.isRead && 'bg-blue-50/50 dark:bg-blue-900/10'
                  )}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                    {notificationIcons[notification.type]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p
                        className={cn(
                          'text-sm line-clamp-1',
                          !notification.isRead && 'font-semibold'
                        )}
                      >
                        {notification.title}
                      </p>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 shrink-0 opacity-0 group-hover:opacity-100 hover:bg-red-100 hover:text-red-600"
                        onClick={(e) => handleDelete(e, notification.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">
                      {notification.message}
                    </p>
                    <p className="text-[10px] text-muted-foreground mt-1">
                      {formatDistanceToNow(notification.createdAt, {
                        addSuffix: true,
                        locale: vi,
                      })}
                    </p>
                  </div>
                  {!notification.isRead && (
                    <div className="h-2 w-2 rounded-full bg-blue-500 shrink-0 mt-2" />
                  )}
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
