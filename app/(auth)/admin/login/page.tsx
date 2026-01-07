'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Shield, Mail, Lock, Loader2, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'
import { signInWithEmail, signInWithGoogle, checkUserExists, getUserData } from '@/lib/firebase/auth'
import { loginSchema, LoginFormData } from '@/lib/validations'

export default function AdminLoginPage() {
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const handleRedirect = async (uid: string) => {
    const exists = await checkUserExists(uid)
    if (exists) {
      const userData = await getUserData(uid)
      if (userData && (userData.role === 'admin' || userData.role === 'trainer')) {
        router.push('/dashboard')
      } else {
        toast({
          title: 'Không có quyền truy cập',
          description: 'Tài khoản của bạn không phải Admin/Trainer. Vui lòng đăng nhập tại trang thành viên.',
          variant: 'destructive',
        })
      }
    } else {
      toast({
        title: 'Tài khoản chưa được kích hoạt',
        description: 'Vui lòng liên hệ Admin để được cấp quyền.',
        variant: 'destructive',
      })
    }
  }

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true)
    try {
      const result = await signInWithEmail(data.email, data.password)
      await handleRedirect(result.user.uid)
    } catch (error: any) {
      toast({
        title: 'Đăng nhập thất bại',
        description: error.message || 'Vui lòng kiểm tra lại thông tin đăng nhập',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true)
    try {
      const result = await signInWithGoogle()
      await handleRedirect(result.user.uid)
    } catch (error: any) {
      toast({
        title: 'Đăng nhập thất bại',
        description: error.message || 'Không thể đăng nhập bằng Google',
        variant: 'destructive',
      })
    } finally {
      setGoogleLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-400/20 rounded-full blur-3xl" />
      </div>

      <Card className="w-full max-w-md relative backdrop-blur-sm bg-white/80 dark:bg-gray-900/80 border-white/20">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg shadow-purple-500/30">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
              Đăng nhập Quản trị
            </CardTitle>
            <CardDescription className="mt-2">
              Dành cho Admin & Trainer - FT-Club Hub
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Google Sign In */}
          <Button
            variant="outline"
            className="w-full h-11 gap-2"
            onClick={handleGoogleSignIn}
            disabled={googleLoading}
          >
            {googleLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
            )}
            Đăng nhập với Google
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Hoặc đăng nhập với email
              </span>
            </div>
          </div>

          {/* Email/Password Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Admin</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@example.com"
                  className="pl-10"
                  {...register('email')}
                />
              </div>
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Mật khẩu</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-10"
                  {...register('password')}
                />
              </div>
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password.message}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full h-11 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                'Đăng nhập Admin'
              )}
            </Button>
          </form>

          <div className="space-y-3">
            <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
              <p className="text-xs text-amber-800 dark:text-amber-200">
                ⚠️ Trang này chỉ dành cho Admin và Trainer. Nếu bạn là thành viên, vui lòng đăng nhập tại trang thành viên.
              </p>
            </div>
            
            <Link href="/login">
              <Button variant="outline" className="w-full gap-2">
                <Users className="h-4 w-4" />
                Đăng nhập với tư cách Thành viên
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
