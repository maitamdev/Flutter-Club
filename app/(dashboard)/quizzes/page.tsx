'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Plus, HelpCircle, Clock, CheckCircle, Trophy, ArrowRight, Sparkles } from 'lucide-react'
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
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getQuizzes()
        setQuizzes(data)

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

    if (!quiz.isActive) return { label: 'Chưa mở', color: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400' }
    if (now < start) return { label: 'Sắp mở', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' }
    if (now >= start && now <= end) return { label: 'Đang mở', color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' }
    return { label: 'Đã đóng', color: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400' }
  }

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 transition-all duration-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-lg">
              <HelpCircle className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold">Quiz</h1>
          </div>
          <p className="text-muted-foreground ml-12">
            Các bài quiz kiểm tra kiến thức
          </p>
        </div>
        {isTrainer && (
          <Link href="/quizzes/new">
            <Button className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 shadow-lg shadow-orange-500/25 rounded-xl h-11">
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
                <Button className="rounded-xl">
                  <Plus className="mr-2 h-4 w-4" />
                  Tạo quiz đầu tiên
                </Button>
              </Link>
            ) : undefined
          }
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {quizzes.map((quiz, index) => {
            const status = getQuizStatus(quiz)
            const attempted = attemptedIds.has(quiz.id)
            const isOpen = status.label === 'Đang mở'

            return (
              <Link key={quiz.id} href={`/quizzes/${quiz.id}`}>
                <Card 
                  className={`group h-full cursor-pointer border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                  style={{ transitionDelay: `${(index + 1) * 50}ms` }}
                >
                  <CardContent className="p-0">
                    {/* Header gradient */}
                    <div className={`h-2 ${
                      attempted 
                        ? 'bg-gradient-to-r from-emerald-500 to-green-500' 
                        : 'bg-gradient-to-r from-orange-500 to-amber-500'
                    }`} />
                    
                    <div className="p-5">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`h-12 w-12 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform ${
                          attempted
                            ? 'bg-gradient-to-br from-emerald-500 to-green-500'
                            : 'bg-gradient-to-br from-orange-500 to-amber-500'
                        }`}>
                          {attempted ? (
                            <Trophy className="h-6 w-6 text-white" />
                          ) : (
                            <HelpCircle className="h-6 w-6 text-white" />
                          )}
                        </div>
                        <div className="flex flex-col items-end gap-1.5">
                          <Badge className={`${status.color} border-0 font-medium`}>
                            {isOpen && <Sparkles className="h-3 w-3 mr-1" />}
                            {status.label}
                          </Badge>
                          {attempted && (
                            <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-0">
                              ✓ Đã làm
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <h3 className="font-semibold text-lg mb-3 line-clamp-2 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                        {quiz.title}
                      </h3>
                      
                      <div className="flex items-center gap-3 mb-4">
                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-purple-100 dark:bg-purple-900/30">
                          <HelpCircle className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                          <span className="text-sm font-medium text-purple-700 dark:text-purple-400">{quiz.questions.length} câu</span>
                        </div>
                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                          <Clock className="h-4 w-4 text-navy-700 dark:text-navy-400" />
                          <span className="text-sm font-medium text-blue-700 dark:text-blue-400">{quiz.duration} phút</span>
                        </div>
                      </div>
                      
                      <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                        <p className="text-xs text-muted-foreground mb-2">
                          {formatDateTime(new Date(quiz.startsAt))} - {formatDateTime(new Date(quiz.endsAt))}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-orange-600 dark:text-orange-400">
                            {isOpen ? 'Làm ngay' : attempted ? 'Xem kết quả' : 'Xem chi tiết'}
                          </span>
                          <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-orange-500 group-hover:translate-x-1 transition-all" />
                        </div>
                      </div>
                    </div>
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
