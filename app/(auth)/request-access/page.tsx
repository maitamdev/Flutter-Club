'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { GraduationCap, User, Hash, Mail, Loader2, Clock, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'
import { useAuth } from '@/lib/hooks/useAuth'
import { createAccessRequest, checkPendingRequest } from '@/lib/firebase/firestore'
import { accessRequestSchema, AccessRequestFormData } from '@/lib/validations'

export default function RequestAccessPage() {
  const [loading, setLoading] = useState(false)
  const [hasPendingRequest, setHasPendingRequest] = useState(false)
  const [checking, setChecking] = useState(true)
  const router = useRouter()
  const { toast } = useToast()
  const { firebaseUser, user } = useAuth()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<AccessRequestFormData>({
    resolver: zodResolver(accessRequestSchema),
  })

  useEffect(() => {
    if (user) {
      // User already has profile, redirect to dashboard
      router.push('/dashboard')
      return
    }

    if (firebaseUser) {
      // Pre-fill email
      setValue('email', firebaseUser.email || '')
      
      // Check for pending request
      checkPendingRequest(firebaseUser.uid).then((pending) => {
        setHasPendingRequest(pending)
        setChecking(false)
      })
    } else {
      setChecking(false)
    }
  }, [firebaseUser, user, router, setValue])

  const onSubmit = async (data: AccessRequestFormData) => {
    if (!firebaseUser) {
      router.push('/login')
      return
    }

    setLoading(true)
    try {
      await createAccessRequest({
        uid: firebaseUser.uid,
        name: data.name,
        studentId: data.studentId,
        email: data.email,
      })
      setHasPendingRequest(true)
      toast({
        title: 'Yêu cầu đã được gửi',
        description: 'Vui lòng chờ Admin duyệt yêu cầu của bạn',
      })
    } catch (error: any) {
      toast({
        title: 'Gửi yêu cầu thất bại',
        description: error.message || 'Vui lòng thử lại sau',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-400/20 rounded-full blur-3xl" />
      </div>

      <Card className="w-full max-w-md relative backdrop-blur-sm bg-white/80 dark:bg-gray-900/80 border-white/20">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 shadow-lg shadow-blue-500/30">
            <GraduationCap className="h-8 w-8 text-white" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold">
              {hasPendingRequest ? 'Đang chờ duyệt' : 'Yêu cầu tham gia'}
            </CardTitle>
            <CardDescription className="mt-2">
              {hasPendingRequest
                ? 'Yêu cầu của bạn đang được xem xét'
                : 'Điền thông tin để yêu cầu tham gia CLB Flutter'}
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          {hasPendingRequest ? (
            <div className="text-center space-y-6">
              <div className="flex justify-center">
                <div className="relative">
                  <div className="h-20 w-20 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
                    <Clock className="h-10 w-10 text-yellow-600" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-yellow-500 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">!</span>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-muted-foreground">
                  Admin sẽ xem xét và phê duyệt yêu cầu của bạn trong thời gian sớm nhất.
                </p>
                <p className="text-sm text-muted-foreground">
                  Bạn sẽ nhận được thông báo khi yêu cầu được duyệt.
                </p>
              </div>
              <Button
                variant="outline"
                onClick={() => router.push('/login')}
                className="w-full"
              >
                Quay lại đăng nhập
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Họ và tên</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    placeholder="Nguyễn Văn A"
                    className="pl-10"
                    {...register('name')}
                  />
                </div>
                {errors.name && (
                  <p className="text-sm text-destructive">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="studentId">Mã số sinh viên</Label>
                <div className="relative">
                  <Hash className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="studentId"
                    placeholder="20110001"
                    className="pl-10"
                    {...register('studentId')}
                  />
                </div>
                {errors.studentId && (
                  <p className="text-sm text-destructive">{errors.studentId.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="email@example.com"
                    className="pl-10"
                    {...register('email')}
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email.message}</p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full h-11 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  'Gửi yêu cầu'
                )}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
