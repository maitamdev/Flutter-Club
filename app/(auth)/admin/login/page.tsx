'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Shield, Mail, Lock, Loader2, Users, AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'
import { signInWithEmail, checkUserExists, getUserData } from '@/lib/firebase/auth'
import { loginSchema, LoginFormData } from '@/lib/validations'

export default function AdminLoginPage() {
  const [loading, setLoading] = useState(false)
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
          description: 'Tài khoản của bạn không phải Admin/Trainer.',
          variant: 'destructive',
        })
      }
    } else {
      toast({
        title: 'Tài khoản không tồn tại',
        description: 'Vui lòng liên hệ Admin để được cấp tài khoản.',
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

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/90 via-purple-800/80 to-pink-900/90 z-10" />
        <img 
          src="/dhv.jpg" 
          alt="DHV Campus" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 flex flex-col justify-center px-12 xl:px-20">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm mb-6">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl xl:text-5xl font-bold text-white mb-4">
            Quản trị viên
          </h1>
          <p className="text-xl text-purple-200 mb-8">
            Trang đăng nhập dành cho Admin & Trainer của CLB Flutter
          </p>
          <div className="space-y-3 text-purple-100">
            <p className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-purple-400" />
              Quản lý thành viên CLB
            </p>
            <p className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-purple-400" />
              Tạo buổi học và điểm danh
            </p>
            <p className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-purple-400" />
              Giao bài tập và chấm điểm
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 bg-[#0a0a1a]">
        <div className="w-full max-w-md">
          {/* Mobile Header */}
          <div className="lg:hidden text-center mb-8">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 mb-4">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">Đăng nhập Quản trị</h1>
          </div>

          <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-xl">
            <CardHeader className="text-center space-y-2">
              <div className="hidden lg:flex mx-auto h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg shadow-purple-500/25">
                <Shield className="h-7 w-7 text-white" />
              </div>
              <CardTitle className="text-xl text-white">Đăng nhập Admin</CardTitle>
              <CardDescription className="text-gray-400">
                Sử dụng tài khoản được hệ thống cấp
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Warning */}
              <div className="flex items-start gap-3 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                <p className="text-sm text-amber-200">
                  Trang này chỉ dành cho Admin/Trainer. Tài khoản được cấp bởi hệ thống.
                </p>
              </div>

              {/* Email/Password Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-300">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="admin@ftclub.com"
                      className="pl-11 h-12 bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
                      {...register('email')}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-sm text-red-400">{errors.email.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-gray-300">Mật khẩu</Label>
                    <Link href="/forgot-password" className="text-sm text-purple-400 hover:text-purple-300">
                      Quên mật khẩu?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      className="pl-11 h-12 bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
                      {...register('password')}
                    />
                  </div>
                  {errors.password && (
                    <p className="text-sm text-red-400">{errors.password.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white font-semibold"
                  disabled={loading}
                >
                  {loading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    'Đăng nhập'
                  )}
                </Button>
              </form>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-700" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-gray-900 px-2 text-gray-500">hoặc</span>
                </div>
              </div>

              <Link href="/login">
                <Button variant="outline" className="w-full h-12 border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white">
                  <Users className="mr-2 h-5 w-5" />
                  Đăng nhập với tư cách Thành viên
                </Button>
              </Link>
            </CardContent>
          </Card>

          <p className="text-center text-gray-600 text-sm mt-6">
            © 2024 WebOOM DHV TEC
          </p>
        </div>
      </div>
    </div>
  )
}
