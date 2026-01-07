'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  ArrowLeft,
  FileText,
  Clock,
  CheckCircle,
  Upload,
  Github,
  ExternalLink,
  Loader2,
  Download,
  Star,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
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
import {
  getAssignment,
  getUserSubmission,
  submitAssignment,
  getSubmissions,
  gradeSubmission,
  subscribeToSubmissions,
} from '@/lib/firebase/firestore'
import { uploadSubmissionFile } from '@/lib/firebase/storage'
import { Assignment, Submission } from '@/types'
import { formatDateTime, isOverdue } from '@/lib/utils'
import { PageLoading } from '@/components/layout/loading'
import { submissionSchema, SubmissionFormData, gradeSchema, GradeFormData } from '@/lib/validations'

export default function AssignmentDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const { user, isTrainer } = useAuth()
  const assignmentId = params.id as string

  const [assignment, setAssignment] = useState<Assignment | null>(null)
  const [userSubmission, setUserSubmission] = useState<Submission | null>(null)
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [gradeDialogOpen, setGradeDialogOpen] = useState(false)
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null)
  const [grading, setGrading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SubmissionFormData>({
    resolver: zodResolver(submissionSchema),
  })

  const {
    register: registerGrade,
    handleSubmit: handleGradeSubmit,
    reset: resetGrade,
    formState: { errors: gradeErrors },
  } = useForm<GradeFormData>({
    resolver: zodResolver(gradeSchema),
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const assignmentData = await getAssignment(assignmentId)
        if (!assignmentData) {
          router.push('/assignments')
          return
        }
        setAssignment(assignmentData)

        if (user) {
          if (isTrainer) {
            const subs = await getSubmissions(assignmentId)
            setSubmissions(subs)
          } else {
            const sub = await getUserSubmission(assignmentId, user.uid)
            setUserSubmission(sub)
          }
        }
      } catch (error) {
        console.error('Error fetching assignment:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [assignmentId, user, isTrainer, router])

  // Subscribe to realtime submissions for trainers
  useEffect(() => {
    if (!isTrainer) return

    const unsubscribe = subscribeToSubmissions(assignmentId, setSubmissions)
    return () => unsubscribe()
  }, [assignmentId, isTrainer])

  const onSubmit = async (data: SubmissionFormData) => {
    if (!user) return

    setSubmitting(true)
    try {
      let fileUrl: string | undefined

      if (file) {
        fileUrl = await uploadSubmissionFile(file, assignmentId, user.uid)
      }

      await submitAssignment(assignmentId, user.uid, {
        userName: user.name,
        studentId: user.studentId,
        githubLink: data.githubLink || undefined,
        demoLink: data.demoLink || undefined,
        fileUrl,
      })

      toast({
        title: 'Nộp bài thành công',
        description: 'Bài tập của bạn đã được ghi nhận',
      })

      // Refresh submission
      const sub = await getUserSubmission(assignmentId, user.uid)
      setUserSubmission(sub)
    } catch (error: any) {
      toast({
        title: 'Nộp bài thất bại',
        description: error.message || 'Vui lòng thử lại sau',
        variant: 'destructive',
      })
    } finally {
      setSubmitting(false)
    }
  }

  const handleGrade = async (data: GradeFormData) => {
    if (!selectedSubmission || !user) return

    setGrading(true)
    try {
      await gradeSubmission(
        assignmentId,
        selectedSubmission.uid,
        data.score,
        data.feedback || '',
        user.uid
      )

      toast({
        title: 'Chấm điểm thành công',
      })

      setGradeDialogOpen(false)
      resetGrade()
    } catch (error: any) {
      toast({
        title: 'Chấm điểm thất bại',
        description: error.message,
        variant: 'destructive',
      })
    } finally {
      setGrading(false)
    }
  }

  const openGradeDialog = (submission: Submission) => {
    setSelectedSubmission(submission)
    resetGrade({
      score: submission.score || 0,
      feedback: submission.feedback || '',
    })
    setGradeDialogOpen(true)
  }

  if (loading) {
    return <PageLoading />
  }

  if (!assignment) {
    return null
  }

  const overdue = isOverdue(new Date(assignment.dueAt))
  const totalPoints = assignment.rubric.reduce((sum, r) => sum + r.maxPoints, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <Link href="/assignments">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold">{assignment.title}</h1>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant={overdue ? 'destructive' : 'secondary'}>
                {overdue ? 'Đã đóng' : 'Đang mở'}
              </Badge>
              <span className="text-sm text-muted-foreground">
                Deadline: {formatDateTime(new Date(assignment.dueAt))}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Assignment Info */}
          <Card>
            <CardHeader>
              <CardTitle>Mô tả & Yêu cầu</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap">{assignment.description}</p>
            </CardContent>
          </Card>

          {/* Rubric */}
          <Card>
            <CardHeader>
              <CardTitle>Tiêu chí chấm điểm</CardTitle>
              <CardDescription>Tổng điểm: {totalPoints}</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tiêu chí</TableHead>
                    <TableHead className="w-24 text-right">Điểm</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {assignment.rubric.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.criteria}</TableCell>
                      <TableCell className="text-right font-medium">
                        {item.maxPoints}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Submissions List (Trainer only) */}
          {isTrainer && (
            <Card>
              <CardHeader>
                <CardTitle>Danh sách bài nộp</CardTitle>
                <CardDescription>
                  {submissions.length} bài đã nộp
                </CardDescription>
              </CardHeader>
              <CardContent>
                {submissions.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">
                    Chưa có bài nộp nào
                  </p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Họ tên</TableHead>
                        <TableHead>MSSV</TableHead>
                        <TableHead>Thời gian</TableHead>
                        <TableHead>Links</TableHead>
                        <TableHead className="text-right">Điểm</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {submissions.map((sub) => (
                        <TableRow key={sub.uid}>
                          <TableCell className="font-medium">
                            {sub.userName}
                          </TableCell>
                          <TableCell>{sub.studentId}</TableCell>
                          <TableCell>
                            {formatDateTime(new Date(sub.submittedAt))}
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              {sub.githubLink && (
                                <a
                                  href={sub.githubLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <Button variant="ghost" size="icon">
                                    <Github className="h-4 w-4" />
                                  </Button>
                                </a>
                              )}
                              {sub.demoLink && (
                                <a
                                  href={sub.demoLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <Button variant="ghost" size="icon">
                                    <ExternalLink className="h-4 w-4" />
                                  </Button>
                                </a>
                              )}
                              {sub.fileUrl && (
                                <a
                                  href={sub.fileUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <Button variant="ghost" size="icon">
                                    <Download className="h-4 w-4" />
                                  </Button>
                                </a>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            {sub.score !== undefined ? (
                              <Badge variant="success">
                                {sub.score}/{totalPoints}
                              </Badge>
                            ) : (
                              <Badge variant="secondary">Chưa chấm</Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => openGradeDialog(sub)}
                            >
                              <Star className="mr-2 h-4 w-4" />
                              Chấm điểm
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar - Submission Form (Member only) */}
        {!isTrainer && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {userSubmission ? (
                    <>
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      Đã nộp bài
                    </>
                  ) : (
                    <>
                      <FileText className="h-5 w-5" />
                      Nộp bài
                    </>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {userSubmission ? (
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Thời gian nộp</p>
                      <p className="font-medium">
                        {formatDateTime(new Date(userSubmission.submittedAt))}
                      </p>
                    </div>

                    {userSubmission.githubLink && (
                      <div>
                        <p className="text-sm text-muted-foreground">GitHub</p>
                        <a
                          href={userSubmission.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline flex items-center gap-1"
                        >
                          <Github className="h-4 w-4" />
                          Xem repo
                        </a>
                      </div>
                    )}

                    {userSubmission.demoLink && (
                      <div>
                        <p className="text-sm text-muted-foreground">Demo</p>
                        <a
                          href={userSubmission.demoLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline flex items-center gap-1"
                        >
                          <ExternalLink className="h-4 w-4" />
                          Xem demo
                        </a>
                      </div>
                    )}

                    <Separator />

                    {userSubmission.score !== undefined ? (
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Điểm số</p>
                        <p className="text-3xl font-bold text-green-500">
                          {userSubmission.score}/{totalPoints}
                        </p>
                        {userSubmission.feedback && (
                          <div className="mt-4 text-left">
                            <p className="text-sm text-muted-foreground">Nhận xét</p>
                            <p className="text-sm mt-1">{userSubmission.feedback}</p>
                          </div>
                        )}
                      </div>
                    ) : (
                      <p className="text-center text-muted-foreground">
                        Đang chờ chấm điểm
                      </p>
                    )}
                  </div>
                ) : overdue ? (
                  <div className="text-center py-4">
                    <Clock className="h-12 w-12 mx-auto text-red-500 mb-2" />
                    <p className="text-muted-foreground">
                      Đã quá hạn nộp bài
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="githubLink">Link GitHub</Label>
                      <div className="relative">
                        <Github className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="githubLink"
                          placeholder="https://github.com/..."
                          className="pl-10"
                          {...register('githubLink')}
                        />
                      </div>
                      {errors.githubLink && (
                        <p className="text-sm text-destructive">
                          {errors.githubLink.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="demoLink">Link Demo</Label>
                      <div className="relative">
                        <ExternalLink className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="demoLink"
                          placeholder="https://..."
                          className="pl-10"
                          {...register('demoLink')}
                        />
                      </div>
                      {errors.demoLink && (
                        <p className="text-sm text-destructive">
                          {errors.demoLink.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="file">File đính kèm (tuỳ chọn)</Label>
                      <Input
                        id="file"
                        type="file"
                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-500 to-cyan-500"
                      disabled={submitting}
                    >
                      {submitting ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <>
                          <Upload className="mr-2 h-4 w-4" />
                          Nộp bài
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Grade Dialog */}
      <Dialog open={gradeDialogOpen} onOpenChange={setGradeDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Chấm điểm</DialogTitle>
            <DialogDescription>
              Chấm điểm cho {selectedSubmission?.userName}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleGradeSubmit(handleGrade)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="score">Điểm (tối đa {totalPoints})</Label>
              <Input
                id="score"
                type="number"
                min={0}
                max={totalPoints}
                {...registerGrade('score', { valueAsNumber: true })}
              />
              {gradeErrors.score && (
                <p className="text-sm text-destructive">
                  {gradeErrors.score.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="feedback">Nhận xét</Label>
              <Textarea
                id="feedback"
                placeholder="Nhận xét về bài làm..."
                rows={4}
                {...registerGrade('feedback')}
              />
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setGradeDialogOpen(false)}
              >
                Hủy
              </Button>
              <Button type="submit" disabled={grading}>
                {grading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  'Lưu điểm'
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
