'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft, Plus, Trash2, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useToast } from '@/components/ui/use-toast'
import { useAuth } from '@/lib/hooks/useAuth'
import { createQuiz, getSessions } from '@/lib/firebase/firestore'
import { Session } from '@/types'
import { quizSchema, QuizFormData } from '@/lib/validations'

export default function NewQuizPage() {
  const [loading, setLoading] = useState(false)
  const [sessions, setSessions] = useState<Session[]>([])
  const router = useRouter()
  const { toast } = useToast()
  const { user } = useAuth()

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<QuizFormData>({
    resolver: zodResolver(quizSchema),
    defaultValues: {
      duration: 10,
      questions: [
        {
          question: '',
          options: ['', '', '', ''],
          correctIndex: 0,
        },
      ],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'questions',
  })

  useEffect(() => {
    const fetchSessions = async () => {
      const data = await getSessions()
      setSessions(data)
    }
    fetchSessions()
  }, [])

  const onSubmit = async (data: QuizFormData) => {
    if (!user) return

    setLoading(true)
    try {
      const now = new Date()
      const endsAt = new Date(now.getTime() + data.duration * 60 * 1000)

      await createQuiz({
        title: data.title,
        sessionId: data.sessionId,
        duration: data.duration,
        questions: data.questions.map((q, i) => ({
          id: `q${i}`,
          question: q.question,
          options: q.options,
          correctIndex: q.correctIndex,
        })),
        isActive: true,
        startsAt: now,
        endsAt,
        createdBy: user.uid,
      })

      toast({
        title: 'Tạo quiz thành công',
        description: 'Quiz đã được tạo và mở ngay',
      })

      router.push('/quizzes')
    } catch (error: any) {
      toast({
        title: 'Tạo quiz thất bại',
        description: error.message || 'Vui lòng thử lại sau',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/quizzes">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold">Tạo quiz mới</h1>
          <p className="text-muted-foreground">
            Tạo bài quiz kiểm tra kiến thức
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Thông tin quiz</CardTitle>
            <CardDescription>
              Các thông tin cơ bản về quiz
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Tiêu đề quiz</Label>
              <Input
                id="title"
                placeholder="VD: Quiz buổi 1 - Flutter cơ bản"
                {...register('title')}
              />
              {errors.title && (
                <p className="text-sm text-destructive">{errors.title.message}</p>
              )}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Buổi học liên quan</Label>
                <Select onValueChange={(v) => setValue('sessionId', v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn buổi học" />
                  </SelectTrigger>
                  <SelectContent>
                    {sessions.map((session) => (
                      <SelectItem key={session.id} value={session.id}>
                        {session.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.sessionId && (
                  <p className="text-sm text-destructive">
                    {errors.sessionId.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration">Thời gian làm bài (phút)</Label>
                <Input
                  id="duration"
                  type="number"
                  min={1}
                  max={60}
                  {...register('duration', { valueAsNumber: true })}
                />
                {errors.duration && (
                  <p className="text-sm text-destructive">
                    {errors.duration.message}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Questions */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Câu hỏi ({fields.length})</h2>
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                append({
                  question: '',
                  options: ['', '', '', ''],
                  correctIndex: 0,
                })
              }
            >
              <Plus className="mr-2 h-4 w-4" />
              Thêm câu hỏi
            </Button>
          </div>

          {fields.map((field, qIndex) => (
            <Card key={field.id}>
              <CardHeader className="flex flex-row items-start justify-between pb-2">
                <CardTitle className="text-base">Câu {qIndex + 1}</CardTitle>
                {fields.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => remove(qIndex)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                )}
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Nội dung câu hỏi</Label>
                  <Input
                    placeholder="Nhập câu hỏi..."
                    {...register(`questions.${qIndex}.question`)}
                  />
                </div>

                <div className="space-y-3">
                  <Label>Đáp án (chọn đáp án đúng)</Label>
                  <RadioGroup
                    value={watch(`questions.${qIndex}.correctIndex`)?.toString()}
                    onValueChange={(v) =>
                      setValue(`questions.${qIndex}.correctIndex`, parseInt(v))
                    }
                  >
                    {[0, 1, 2, 3].map((optIndex) => (
                      <div key={optIndex} className="flex items-center gap-3">
                        <RadioGroupItem
                          value={optIndex.toString()}
                          id={`q${qIndex}-opt${optIndex}`}
                        />
                        <Input
                          placeholder={`Đáp án ${String.fromCharCode(65 + optIndex)}`}
                          className="flex-1"
                          {...register(`questions.${qIndex}.options.${optIndex}`)}
                        />
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

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
              'Tạo và mở quiz'
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
