'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Clock, CheckCircle, HelpCircle, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { useToast } from '@/components/ui/use-toast'
import { useAuth } from '@/lib/hooks/useAuth'
import { getQuiz, getUserQuizAttempt, submitQuizAttempt } from '@/lib/firebase/firestore'
import { Quiz, QuizAttempt } from '@/types'
import { formatDateTime } from '@/lib/utils'
import { PageLoading } from '@/components/layout/loading'

export default function QuizDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const { user } = useAuth()
  const quizId = params.id as string

  const [quiz, setQuiz] = useState<Quiz | null>(null)
  const [attempt, setAttempt] = useState<QuizAttempt | null>(null)
  const [loading, setLoading] = useState(true)
  const [started, setStarted] = useState(false)
  const [answers, setAnswers] = useState<number[]>([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [timeLeft, setTimeLeft] = useState(0)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const quizData = await getQuiz(quizId)
        if (!quizData) {
          router.push('/quizzes')
          return
        }
        setQuiz(quizData)
        setAnswers(new Array(quizData.questions.length).fill(-1))

        if (user) {
          const userAttempt = await getUserQuizAttempt(quizId, user.uid)
          setAttempt(userAttempt)
        }
      } catch (error) {
        console.error('Error fetching quiz:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [quizId, user, router])

  // Timer
  useEffect(() => {
    if (!started || !quiz) return

    setTimeLeft(quiz.duration * 60)

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleSubmit()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [started, quiz])

  const handleStart = () => {
    setStarted(true)
  }

  const handleAnswer = (questionIndex: number, optionIndex: number) => {
    setAnswers((prev) => {
      const newAnswers = [...prev]
      newAnswers[questionIndex] = optionIndex
      return newAnswers
    })
  }

  const handleSubmit = async () => {
    if (!quiz || !user) return

    setSubmitting(true)
    try {
      // Calculate score
      let correct = 0
      quiz.questions.forEach((q, i) => {
        if (answers[i] === q.correctIndex) {
          correct++
        }
      })
      const score = Math.round((correct / quiz.questions.length) * 100)

      await submitQuizAttempt(quizId, user.uid, answers, score)

      toast({
        title: 'Nộp bài thành công',
        description: `Điểm của bạn: ${score}/100`,
      })

      // Refresh attempt
      const userAttempt = await getUserQuizAttempt(quizId, user.uid)
      setAttempt(userAttempt)
      setStarted(false)
    } catch (error: any) {
      toast({
        title: 'Nộp bài thất bại',
        description: error.message,
        variant: 'destructive',
      })
    } finally {
      setSubmitting(false)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  if (loading) {
    return <PageLoading />
  }

  if (!quiz) {
    return null
  }

  const now = new Date()
  const isOpen = quiz.isActive && now >= new Date(quiz.startsAt) && now <= new Date(quiz.endsAt)
  const answeredCount = answers.filter((a) => a !== -1).length

  // Show results if already attempted
  if (attempt) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/quizzes">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold">{quiz.title}</h1>
            <p className="text-muted-foreground">Kết quả quiz</p>
          </div>
        </div>

        <Card>
          <CardContent className="p-8 text-center">
            <div className="h-20 w-20 mx-auto rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Đã hoàn thành</h2>
            <p className="text-4xl font-bold text-blue-600 mb-4">
              {attempt.score}/100
            </p>
            <p className="text-muted-foreground">
              Nộp lúc: {formatDateTime(new Date(attempt.submittedAt))}
            </p>
          </CardContent>
        </Card>

        {/* Show answers review */}
        <Card>
          <CardHeader>
            <CardTitle>Xem lại đáp án</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {quiz.questions.map((q, i) => {
              const userAnswer = attempt.answers[i]
              const isCorrect = userAnswer === q.correctIndex

              return (
                <div key={i} className="space-y-3">
                  <p className="font-medium">
                    {i + 1}. {q.question}
                  </p>
                  <div className="space-y-2 pl-4">
                    {q.options.map((option, j) => (
                      <div
                        key={j}
                        className={`p-2 rounded ${
                          j === q.correctIndex
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                            : j === userAnswer && !isCorrect
                            ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                            : ''
                        }`}
                      >
                        {option}
                        {j === q.correctIndex && ' ✓'}
                        {j === userAnswer && !isCorrect && ' ✗'}
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>
      </div>
    )
  }

  // Quiz in progress
  if (started) {
    const question = quiz.questions[currentQuestion]

    return (
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Timer & Progress */}
        <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-xl p-4 rounded-lg border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">
              Câu {currentQuestion + 1}/{quiz.questions.length}
            </span>
            <div className="flex items-center gap-2 text-lg font-mono">
              <Clock className="h-5 w-5" />
              <span className={timeLeft < 60 ? 'text-red-500' : ''}>
                {formatTime(timeLeft)}
              </span>
            </div>
          </div>
          <Progress value={(answeredCount / quiz.questions.length) * 100} />
        </div>

        {/* Question */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              {currentQuestion + 1}. {question.question}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={answers[currentQuestion]?.toString()}
              onValueChange={(v) => handleAnswer(currentQuestion, parseInt(v))}
            >
              {question.options.map((option, i) => (
                <div
                  key={i}
                  className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-muted cursor-pointer"
                >
                  <RadioGroupItem value={i.toString()} id={`option-${i}`} />
                  <Label htmlFor={`option-${i}`} className="flex-1 cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex gap-4">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => setCurrentQuestion((prev) => Math.max(0, prev - 1))}
            disabled={currentQuestion === 0}
          >
            Câu trước
          </Button>
          {currentQuestion < quiz.questions.length - 1 ? (
            <Button
              className="flex-1"
              onClick={() =>
                setCurrentQuestion((prev) =>
                  Math.min(quiz.questions.length - 1, prev + 1)
                )
              }
            >
              Câu tiếp
            </Button>
          ) : (
            <Button
              className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500"
              onClick={handleSubmit}
              disabled={submitting}
            >
              {submitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                'Nộp bài'
              )}
            </Button>
          )}
        </div>

        {/* Question Navigator */}
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground mb-3">Chuyển câu hỏi</p>
            <div className="flex flex-wrap gap-2">
              {quiz.questions.map((_, i) => (
                <Button
                  key={i}
                  variant={answers[i] !== -1 ? 'default' : 'outline'}
                  size="sm"
                  className={`w-10 h-10 ${
                    currentQuestion === i ? 'ring-2 ring-blue-500' : ''
                  }`}
                  onClick={() => setCurrentQuestion(i)}
                >
                  {i + 1}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Quiz intro
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/quizzes">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold">{quiz.title}</h1>
          <Badge variant={isOpen ? 'success' : 'secondary'}>
            {isOpen ? 'Đang mở' : 'Chưa mở'}
          </Badge>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5" />
            Thông tin quiz
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-sm text-muted-foreground">Số câu hỏi</p>
              <p className="font-medium">{quiz.questions.length} câu</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Thời gian làm bài</p>
              <p className="font-medium">{quiz.duration} phút</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Bắt đầu</p>
              <p className="font-medium">
                {formatDateTime(new Date(quiz.startsAt))}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Kết thúc</p>
              <p className="font-medium">
                {formatDateTime(new Date(quiz.endsAt))}
              </p>
            </div>
          </div>

          <div className="pt-4">
            {isOpen ? (
              <Button
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500"
                onClick={handleStart}
              >
                Bắt đầu làm bài
              </Button>
            ) : (
              <Button className="w-full" disabled>
                Quiz chưa mở
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
