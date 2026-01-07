'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Bell, Plus, Trash2, Loader2 } from 'lucide-react'
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
import { Announcement } from '@/types'
import { formatDateTime, getRelativeTime } from '@/lib/utils'
import { EmptyState } from '@/components/layout/empty-state'
import { announcementSchema, AnnouncementFormData } from '@/lib/validations'

export default function AnnouncementsPage() {
  const { user, isTrainer } = useAuth()
  const { toast } = useToast()
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)

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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Thông báo</h1>
          <p className="text-muted-foreground">
            Các thông báo từ CLB
          </p>
        </div>
        {isTrainer && (
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600">
                <Plus className="mr-2 h-4 w-4" />
                Đăng thông báo
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Đăng thông báo mới</DialogTitle>
                <DialogDescription>
                  Thông báo sẽ được hiển thị cho tất cả thành viên
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Tiêu đề</Label>
                  <Input
                    id="title"
                    placeholder="Tiêu đề thông báo"
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
                    {...register('content')}
                  />
                  {errors.content && (
                    <p className="text-sm text-destructive">
                      {errors.content.message}
                    </p>
                  )}
                </div>
                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setDialogOpen(false)}
                  >
                    Hủy
                  </Button>
                  <Button type="submit" disabled={creating}>
                    {creating ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      'Đăng thông báo'
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Announcements List */}
      {loading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-6 bg-muted rounded w-1/3 mb-4" />
                <div className="h-4 bg-muted rounded w-full mb-2" />
                <div className="h-4 bg-muted rounded w-2/3" />
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
              <Button onClick={() => setDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Đăng thông báo đầu tiên
              </Button>
            ) : undefined
          }
        />
      ) : (
        <div className="space-y-4">
          {announcements.map((announcement) => (
            <Card key={announcement.id} className="overflow-hidden">
              <div className="h-1 bg-gradient-to-r from-blue-500 to-cyan-500" />
              <CardHeader className="flex flex-row items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{announcement.title}</CardTitle>
                  <CardDescription>
                    {formatDateTime(new Date(announcement.createdAt))} •{' '}
                    {getRelativeTime(new Date(announcement.createdAt))}
                  </CardDescription>
                </div>
                {isTrainer && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(announcement.id)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                )}
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-wrap text-muted-foreground">
                  {announcement.content}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
