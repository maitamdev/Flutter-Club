'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft, Plus, Trash2, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'
import { useAuth } from '@/lib/hooks/useAuth'
import { createAssignment } from '@/lib/firebase/firestore'
import { assignmentSchema, AssignmentFormData } from '@/lib/validations'

export default function NewAssignmentPage() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const { user } = useAuth()

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<AssignmentFormData>({
    resolver: zodResolver(assignmentSchema),
    defaultValues: {
      rubric: [{ criteria: '', maxPoints: 10 }],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'rubric',
  })

  const onSubmit = async (data: AssignmentFormData) => {
    if (!user) return

    setLoading(true)
    try {
      await createAssignment({
        title: data.title,
        description: data.description,
        dueAt: data.dueAt,
        rubric: data.rubric,
        createdBy: user.uid,
      })

      toast({
        title: 'Tạo bài tập thành công',
        description: 'Bài tập mới đã được tạo',
      })

      router.push('/assignments')
    } catch (error: any) {
      toast({
        title: 'Tạo bài tập thất bại',
        description: error.message || 'Vui lòng thử lại sau',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const totalPoints = fields.reduce((sum, _, index) => {
    const value = Number(
      (document.querySelector(`input[name="rubric.${index}.maxPoints"]`) as HTMLInputElement)
        ?.value || 0
    )
    return sum + value
  }, 0)

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/assignments">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold">Tạo bài tập mới</h1>
          <p className="text-muted-foreground">
            Điền thông tin để tạo bài tập mới
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Thông tin bài tập</CardTitle>
            <CardDescription>
              Các thông tin cơ bản về bài tập
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Tiêu đề bài tập</Label>
              <Input
                id="title"
                placeholder="VD: Bài tập 1 - Xây dựng UI cơ bản"
                {...register('title')}
              />
              {errors.title && (
                <p className="text-sm text-destructive">{errors.title.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Mô tả & Yêu cầu</Label>
              <Textarea
                id="description"
                placeholder="Mô tả chi tiết yêu cầu bài tập..."
                rows={6}
                {...register('description')}
              />
              {errors.description && (
                <p className="text-sm text-destructive">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="dueAt">Deadline</Label>
              <Input
                id="dueAt"
                type="datetime-local"
                {...register('dueAt', {
                  setValueAs: (v) => (v ? new Date(v) : undefined),
                })}
              />
              {errors.dueAt && (
                <p className="text-sm text-destructive">
                  {errors.dueAt.message}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Rubric */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Tiêu chí chấm điểm</CardTitle>
                <CardDescription>
                  Định nghĩa các tiêu chí và điểm số
                </CardDescription>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => append({ criteria: '', maxPoints: 10 })}
              >
                <Plus className="mr-2 h-4 w-4" />
                Thêm tiêu chí
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {fields.map((field, index) => (
              <div key={field.id} className="flex gap-4 items-start">
                <div className="flex-1 space-y-2">
                  <Label>Tiêu chí {index + 1}</Label>
                  <Input
                    placeholder="VD: Hoàn thành đúng yêu cầu"
                    {...register(`rubric.${index}.criteria`)}
                  />
                </div>
                <div className="w-24 space-y-2">
                  <Label>Điểm</Label>
                  <Input
                    type="number"
                    min={1}
                    {...register(`rubric.${index}.maxPoints`, {
                      valueAsNumber: true,
                    })}
                  />
                </div>
                {fields.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="mt-8"
                    onClick={() => remove(index)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                )}
              </div>
            ))}
            {errors.rubric && (
              <p className="text-sm text-destructive">{errors.rubric.message}</p>
            )}
          </CardContent>
        </Card>

        <div className="flex gap-4">
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
              'Tạo bài tập'
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
