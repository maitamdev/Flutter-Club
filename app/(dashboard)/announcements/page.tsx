'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Bell, Plus, Trash2, Loader2, Megaphone, Clock, Sparkles, CheckCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useToast } from '@/components/ui/use-toast'
import { useAuth } from '@/lib/hooks/useAuth'
import {
  subscribeToAnnouncements,
  createAnnouncement,
  deleteAnnouncement,
} from '@/lib/firebase/firestore'
import { notifyNewAnnouncement } from '@/lib/utils/notifications'
import { Announcement } from '@/types'
import { formatDateTime, getRelativeTime } from '@/lib/utils'
import { EmptyState } from '@/components/layout/empty-state'
import { announcementSchema, AnnouncementFormData } from '@/lib/validations'

// Helper functions for read announcements
const getReadAnnouncementIds = (userId: string): string[] => {
  if (typeof window === 'undefined') return []
  const stored = localStorage.getItem(`readAnnouncements_${userId}`)
  return stored ? JSON.parse(stored) : []
}

const markAnnouncementAsRead = (userId: string, announcementId: string) => {
  const readIds = getReadAnnouncementIds(userId)
  if (!readIds.includes(announcementId)) {
    readIds.push(announcementId)
    localStorage.setItem(`readAnnouncements_${userId}`, JSON.stringify(readIds))
  }
}

const markAllAnnouncementsAsRead = (userId: string, announcementIds: string[]) => {
  localStorage.setItem(`readAnnouncements_${userId}`, JSON.stringify(announcementIds))
}

export default function AnnouncementsPage() {
  const { user, isTrainer } = useAuth()
  const { toast } = useToast()
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [readIds, setReadIds] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Load read announcements from localStorage
  useEffect(() => {
    if (user) {
      setReadIds(getReadAnnouncementIds(user.uid))
    }
  }, [user])

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AnnouncementFormData>({
    resolver: zodResolver(announcementSchema),
  })

  useEffect(() => {
    const unsubscribe = subscribeToAnnouncements((data) => {
      setAnnouncements(data)
      setLoading(false)
    }, 50)

    return () => unsubscribe()
  }, [])

  const onSubmit = async (data: AnnouncementFormData) => {
    if (!user) return

    setCreating(true)
    try {
      await createAnnouncement({
        title: data.title,
        content: data.content,
        createdBy: user.uid,
      })

      // Gửi thông báo cho tất cả members
      await notifyNewAnnouncement(data.title, user.uid)

      toast({
        title: 'Đăng thông báo thành công',
      })

      reset()
      setDialogOpen(false)
    } catch (error: any) {
      toast({
        title: 'Đăng thông báo thất bại',
        description: error.message,
        variant: 'destructive',
      })
    } finally {
      setCreating(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteAnnouncement(id)
      toast({
        title: 'Đã xóa thông báo',
      })
    } catch (error: any) {
      toast({
        title: 'Xóa thất bại',
        description: error.message,
        variant: 'destructive',
      })
    }
  }

  const handleMarkAsRead = (announcementId: string) => {
    if (!user) return
    markAnnouncementAsRead(user.uid, announcementId)
    setReadIds(getReadAnnouncementIds(user.uid))
    // Dispatch event to update sidebar
    window.dispatchEvent(new CustomEvent('announcementRead'))
  }

  const handleMarkAllAsRead = () => {
    if (!user) return
    const allIds = announcements.map(a => a.id)
    markAllAnnouncementsAsRead(user.uid, allIds)
    setReadIds(allIds)
    // Dispatch event to update sidebar
    window.dispatchEvent(new CustomEvent('announcementRead'))
    toast({
      title: 'Đã đánh dấu tất cả là đã đọc',
    })
  }

  const unreadCount = announcements.filter(a => !readIds.includes(a.id)).length

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 transition-all duration-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center shadow-lg">
              <Bell className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold">Thông báo</h1>
            {unreadCount > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-pink-500 text-white text-xs font-bold">
                {unreadCount} mới
              </span>
            )}
          </div>
          <p className="text-muted-foreground ml-12">
            Các thông báo từ CLB
          </p>
        </div>
        <div className="flex gap-2">
          {unreadCount > 0 && (
            <Button 
              variant="outline" 
              onClick={handleMarkAllAsRead}
              className="rounded-xl h-11"
            >
              <CheckCheck className="mr-2 h-4 w-4" />
              Đánh dấu tất cả đã đọc
            </Button>
          )}
          {isTrainer && (
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 shadow-lg shadow-pink-500/25 rounded-xl h-11">
                  <Plus className="mr-2 h-4 w-4" />
                  Đăng thông báo
                </Button>
              </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center">
                    <Megaphone className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <DialogTitle>Đăng thông báo mới</DialogTitle>
                    <DialogDescription>
                      Thông báo sẽ được hiển thị cho tất cả thành viên
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Tiêu đề</Label>
                  <Input
                    id="title"
                    placeholder="Tiêu đề thông báo"
                    className="h-11 rounded-xl"
                    {...register('title')}
                  />
                  {errors.title && (
                    <p className="text-sm text-destructive">
                      {errors.title.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="content">Nội dung</Label>
                  <Textarea
                    id="content"
                    placeholder="Nội dung thông báo..."
                    rows={5}
                    className="rounded-xl resize-none"
                    {...register('content')}
                  />
                  {errors.content && (
                    <p className="text-sm text-destructive">
                      {errors.content.message}
                    </p>
                  )}
                </div>
                <DialogFooter className="gap-2 sm:gap-0">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setDialogOpen(false)}
                    className="rounded-xl"
                  >
                    Hủy
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={creating}
                    className="bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 rounded-xl"
                  >
                    {creating ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Đăng thông báo
                      </>
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
          )}
        </div>
      </div>

      {/* Announcements List */}
      {loading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="animate-pulse border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="h-6 bg-muted rounded-lg w-1/3 mb-4" />
                <div className="h-4 bg-muted rounded-lg w-full mb-2" />
                <div className="h-4 bg-muted rounded-lg w-2/3" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : announcements.length === 0 ? (
        <EmptyState
          icon={Bell}
          title="Chưa có thông báo nào"
          description="Các thông báo từ CLB sẽ được hiển thị ở đây"
          action={
            isTrainer ? (
              <Button onClick={() => setDialogOpen(true)} className="rounded-xl">
                <Plus className="mr-2 h-4 w-4" />
                Đăng thông báo đầu tiên
              </Button>
            ) : undefined
          }
        />
      ) : (
        <div className="space-y-4">
          {announcements.map((announcement, index) => {
            const isUnread = !readIds.includes(announcement.id)
            return (
            <Card 
              key={announcement.id} 
              className={`group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} ${isUnread ? 'ring-2 ring-pink-500/50' : ''}`}
              style={{ transitionDelay: `${(index + 1) * 50}ms` }}
            >
              <div className={`h-1.5 bg-gradient-to-r ${isUnread ? 'from-pink-500 to-rose-600' : 'from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700'}`} />
              <CardHeader className="flex flex-row items-start justify-between pb-2">
                <div className="flex items-start gap-4">
                  <div className={`h-12 w-12 rounded-xl flex items-center justify-center shadow-lg shrink-0 ${isUnread ? 'bg-gradient-to-br from-pink-500 to-rose-600' : 'bg-gradient-to-br from-gray-400 to-gray-500'}`}>
                    <Megaphone className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-lg group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">
                        {announcement.title}
                      </CardTitle>
                      {isUnread && (
                        <span className="px-1.5 py-0.5 rounded-full bg-pink-500 text-white text-[10px] font-bold">
                          MỚI
                        </span>
                      )}
                    </div>
                    <CardDescription className="flex items-center gap-2 mt-1">
                      <Clock className="h-3.5 w-3.5" />
                      {formatDateTime(new Date(announcement.createdAt))} •{' '}
                      {getRelativeTime(new Date(announcement.createdAt))}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {isUnread && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleMarkAsRead(announcement.id)}
                      className="h-9 rounded-lg text-pink-500 hover:text-pink-600 hover:bg-pink-50 dark:hover:bg-pink-900/20"
                    >
                      <CheckCheck className="h-4 w-4 mr-1" />
                      Đã đọc
                    </Button>
                  )}
                  {isTrainer && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(announcement.id)}
                      className="h-9 w-9 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="pt-0 pl-20">
                <p className="whitespace-pre-wrap text-muted-foreground leading-relaxed">
                  {announcement.content}
                </p>
              </CardContent>
            </Card>
          )})}
        </div>
      )}
    </div>
  )
}
