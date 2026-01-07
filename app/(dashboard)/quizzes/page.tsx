'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Plus, HelpCircle, Clock, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useAuth } from '@/lib/hooks/useAuth'
import { getQuizzes, getUserQuizAttempt } from '@/lib/firebase/firestore'
import { Quiz } from '@/types'
import { formatDateTime, getRelativeTime } from '@/lib/utils'
import { EmptyState } from '@/components/layout/empty-state'
import { TableLoading } from '@/components/layout/loading'

export default function QuizzesPage() {
  const { user, isTrainer } = useAuth()
  const [quizzes, setQuizzes] = useState<Quiz[]>([])
  const [attemptedIds, setAttemptedIds] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getQuizzes()
        setQuizzes(data)

        // Check which quizzes user has attempted
        if (user && !isTrainer) {
          const attempted = new Set<string>()
          for (const quiz of data) {
            const attempt = await getUserQuizAttempt(quiz.id, user.uid)
            if (attempt) {
              attempted.add(quiz.id)
            }
          }
          setAttemptedIds(attempted)
        }
      } catch (error) {
        console.error('Error fetching quizzes:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [user, isTrainer])

  const getQuizStatus = (quiz: Quiz) => {
    const now = new Date()
    const start = new Date(quiz.startsAt)
    const end = new Date(quiz.endsAt)

    if (!quiz.isActive) return { label: 'Chưa mở', variant: 'secondary' as const }
    if (now < start) return { label: 'Sắp mở', variant: 'secondary' as const }
    if (now >= start && now <= end) return { label: 'Đang mở', variant: 'success' as const }
    return { label: 'Đã đóng', variant: 'outline' as const }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Quiz</h1>
          <p className="text-muted-foreground">
            Các bài quiz kiểm tra kiến thức
          </p>
        </div>
        {isTrainer && (
          <Link href="/quizzes/new">
            <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600">
              <Plus className="mr-2 h-4 w-4" />
              Tạo quiz
            </Button>
          </Link>
        )}
      </div>

      {/* Quizzes List */}
      {loading ? (
        <TableLoading rows={5} />
      ) : quizzes.length === 0 ? (
        <EmptyState
          icon={HelpCircle}
          title="Chưa có quiz nào"
          description="Các bài quiz sẽ được hiển thị ở đây"
          action={
            isTrainer ? (
              <Link href="/quizzes/new">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Tạo quiz đầu tiên
                </Button>
              </Link>
            ) : undefined
          }
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {quizzes.map((quiz) => {
            const status = getQuizStatus(quiz)
            const attempted = attemptedIds.has(quiz.id)

            return (
              <Link key={quiz.id} href={`/quizzes/${quiz.id}`}>
                <Card className="h-full hover:shadow-md transition-all hover:border-blue-500/50 cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className={`h-12 w-12 rounded-xl flex items-center justify-center ${
                          attempted
                            ? 'bg-green-100 dark:bg-green-900/30'
                            : 'bg-purple-100 dark:bg-purple-900/30'
                        }`}
                      >
                        {attempted ? (
                          <CheckCircle className="h-6 w-6 text-green-600" />
                        ) : (
                          <HelpCircle className="h-6 w-6 text-purple-600" />
                        )}
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <Badge variant={status.variant}>{status.label}</Badge>
                        {attempted && <Badge variant="success">Đã làm</Badge>}
                      </div>
                    </div>
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                      {quiz.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <span>{quiz.questions.length} câu hỏi</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {quiz.duration} phút
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {formatDateTime(new Date(quiz.startsAt))} -{' '}
                      {formatDateTime(new Date(quiz.endsAt))}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
