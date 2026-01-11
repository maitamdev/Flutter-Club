'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft, Plus, Trash2, Loader2, Link as LinkIcon } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'
import { useAuth } from '@/lib/hooks/useAuth'
import { getSession, updateSession } from '@/lib/firebase/firestore'
import { sessionSchema, SessionFormData } from '@/lib/validations'
import { Session } from '@/types'

export default function EditSessionPage() {
  const [loading, setLoading] = useState(false)
  const [loadingSession, setLoadingSession] = useState(true)
  const router = useRouter()
  const params = useParams()
  const sessionId = params.id as string
  const { toast } = useToast()
  const { user, isTrainer } = useAuth()

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<SessionFormData>({
    resolver: zodResolver(sessionSchema),
    defaultValues: {
      materials: [],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'materials',
  })

  // Load session data
  useEffect(() => {
    const loadSession = async () => {
      if (!sessionId) return

      try {
        const session = await getSession(sessionId)
        if (!session) {
          toast({
            title: 'Buổi học không tồn tại',
            variant: 'destructive',
          })
          router.push('/sessions')
          return
        }

        // Check if user is trainer of this session
        if (!isTrainer || (session.trainerId !== user?.uid && user?.role !== 'admin')) {
          toast({
            title: 'Không có quyền chỉnh sửa',
            variant: 'destructive',
          })
          router.push('/sessions')
          return
        }

        reset({
          title: session.title,
          description: session.description,
          startsAt: new Date(session.startsAt),
          endsAt: new Date(session.endsAt),
          materials: session.materials || [],
        })
      } catch (error) {
        console.error('Error loading session:', error)
        toast({
          title: 'Lỗi tải dữ liệu',
          variant: 'destructive',
        })
        router.push('/sessions')
      } finally {
        setLoadingSession(false)
      }
    }

    loadSession()
  }, [sessionId, user, isTrainer, reset, router, toast])

  const onSubmit = async (data: SessionFormData) => {
    if (!user) return

    setLoading(true)
    try {
      await updateSession(sessionId, {
        title: data.title,
        description: data.description,
        startsAt: data.startsAt,
        endsAt: data.endsAt,
        materials: data.materials || [],
      })

      toast({
        title: 'Cập nhật buổi học thành công',
        description: 'Buổi học đã được cập nhật',
      })

      router.push(`/sessions/${sessionId}`)
    } catch (error: any) {
      toast({
        title: 'Cập nhật buổi học thất bại',
        description: error.message || 'Vui lòng thử lại sau',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  if (loadingSession) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href={`/sessions/${sessionId}`}>
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold">Chỉnh sửa buổi học</h1>
          <p className="text-muted-foreground">
            Cập nhật thông tin buổi học
          </p>
        </div>
      </div>

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle>Thông tin buổi học</CardTitle>
          <CardDescription>
            Các thông tin cơ bản về buổi học
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Tiêu đề buổi học</Label>
              <Input
                id="title"
                placeholder="VD: Buổi 1 - Giới thiệu Flutter"
                {...register('title')}
              />
              {errors.title && (
                <p className="text-sm text-destructive">{errors.title.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Mô tả</Label>
              <Textarea
                id="description"
                placeholder="Mô tả nội dung buổi học..."
                rows={4}
                {...register('description')}
              />
              {errors.description && (
                <p className="text-sm text-destructive">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="startsAt">Thời gian bắt đầu</Label>
                <Input
                  id="startsAt"
                  type="datetime-local"
                  {...register('startsAt', {
                    setValueAs: (v) => (v ? new Date(v) : undefined),
                  })}
                />
                {errors.startsAt && (
                  <p className="text-sm text-destructive">
                    {errors.startsAt.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="endsAt">Thời gian kết thúc</Label>
                <Input
                  id="endsAt"
                  type="datetime-local"
                  {...register('endsAt', {
                    setValueAs: (v) => (v ? new Date(v) : undefined),
                  })}
                />
                {errors.endsAt && (
                  <p className="text-sm text-destructive">
                    {errors.endsAt.message}
                  </p>
                )}
              </div>
            </div>

            {/* Materials */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Tài liệu</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => append({ title: '', url: '' })}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Thêm tài liệu
                </Button>
              </div>

              {fields.map((field, index) => (
                <div key={field.id} className="flex gap-2">
                  <div className="flex-1 space-y-2">
                    <Input
                      placeholder="Tên tài liệu"
                      {...register(`materials.${index}.title`)}
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="relative">
                      <LinkIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="URL"
                        className="pl-10"
                        {...register(`materials.${index}.url`)}
                      />
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => remove(index)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              ))}
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => router.back()}
              >
                Hủy
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500"
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  'Lưu chỉnh sửa'
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
