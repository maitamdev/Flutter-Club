'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { GraduationCap, Mail, Lock, Loader2, Users, Shield, Sparkles, Zap, Code2, Smartphone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'
import { signInWithEmail, signInWithGoogle, checkUserExists, getUserData } from '@/lib/firebase/auth'
import { loginSchema, LoginFormData } from '@/lib/validations'

export default function LoginPage() {
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    setMounted(true)
  }, [])

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
      if (userData && userData.role === 'member') {
        router.push('/dashboard')
      } else if (userData && (userData.role === 'admin' || userData.role === 'trainer')) {
        toast({
          title: 'Vui lòng đăng nhập tại trang Admin',
          description: 'Tài khoản của bạn là Admin/Trainer',
        })
        router.push('/admin/login')
      } else {
        router.push('/dashboard')
      }
    } else {
      router.push('/request-access')
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

  const features = [
    { icon: Zap, text: 'Điểm danh QR thông minh', delay: '0ms' },
    { icon: Code2, text: 'Nộp bài tập online', delay: '100ms' },
    { icon: Smartphone, text: 'Làm quiz kiểm tra', delay: '200ms' },
  ]

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Hero Section */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        {/* Aurora Background */}
        <div className="absolute inset-0 aurora-bg" />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/50 via-blue-900/60 to-purple-900/70 z-10" />

        {/* Background Image */}
        <img
          src="/dhv.jpg"
          alt="DHV Campus"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />

        {/* Floating Particles */}
        <div className="particles z-20">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 20}s`,
                animationDuration: `${15 + Math.random() * 10}s`,
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className={`relative z-30 flex flex-col justify-center px-12 xl:px-20 transition-all duration-1000 ${mounted ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
          {/* Logo */}
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl blur-xl opacity-50 animate-pulse" />
            <div className="relative inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-2xl shadow-cyan-500/30">
              <GraduationCap className="h-10 w-10 text-white" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-5xl xl:text-6xl font-bold text-white mb-4 leading-tight">
            <span className="text-gradient-animated">WebOOM</span>
            <br />
            <span className="text-cyan-200">DHV TEC</span>
          </h1>

          <p className="text-xl text-cyan-100/90 mb-10 max-w-md leading-relaxed">
            Chào mừng bạn đến với CLB Flutter - Khoa Kỹ Thuật Công Nghệ, ĐH Hùng Vương TPHCM
          </p>

          {/* Features */}
          <div className="space-y-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`flex items-center gap-4 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 transition-all duration-500 hover:bg-white/10 hover:border-cyan-400/30 ${mounted ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
                style={{ transitionDelay: `${(index + 2) * 150}ms` }}
              >
                <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-lg">
                  <feature.icon className="h-5 w-5 text-white" />
                </div>
                <span className="text-cyan-100 font-medium">{feature.text}</span>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className={`flex gap-8 mt-12 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '600ms' }}>
            <div className="text-center">
              <p className="text-3xl font-bold text-white">100+</p>
              <p className="text-sm text-cyan-200/70">Thành viên</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-white">50+</p>
              <p className="text-sm text-cyan-200/70">Buổi học</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-white">20+</p>
              <p className="text-sm text-cyan-200/70">Dự án</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 bg-gradient-to-br from-[#0a0a1a] via-[#0f0f2a] to-[#0a0a1a] relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
        </div>

        <div className={`w-full max-w-md relative z-10 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Mobile Header */}
          <div className="lg:hidden text-center mb-8">
            <div className="relative inline-block mb-4">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl blur-lg opacity-50" />
              <div className="relative h-16 w-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                <Users className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-white">Đăng nhập Thành viên</h1>
          </div>

          <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-xl shadow-2xl shadow-black/20 card-shine">
            <CardHeader className="text-center space-y-3 pb-2">
              <div className="hidden lg:block relative mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl blur-lg opacity-50" />
                <div className="relative h-14 w-14 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center shadow-lg">
                  <Users className="h-7 w-7 text-white" />
                </div>
              </div>
              <CardTitle className="text-xl text-white">Đăng nhập Thành viên</CardTitle>
              <CardDescription className="text-gray-400">
                WebOOM DHV TEC - Câu lạc bộ Flutter
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6 pt-4">
              {/* Google Sign In */}
              <Button
                variant="outline"
                className="w-full h-12 gap-3 border-gray-700/50 bg-gray-800/30 text-gray-300 hover:bg-gray-800 hover:text-white hover:border-gray-600 transition-all duration-300 rounded-xl"
                onClick={handleGoogleSignIn}
                disabled={googleLoading}
              >
                {googleLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <svg className="h-5 w-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                )}
                Đăng nhập với Google
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-700/50" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-gray-900/80 px-3 text-gray-500">
                    Hoặc đăng nhập với email
                  </span>
                </div>
              </div>

              {/* Email/Password Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-300 text-sm">Email</Label>
                  <div className="relative group">
                    <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-500 group-focus-within:text-cyan-400 transition-colors" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="email@example.com"
                      className="pl-11 h-12 bg-gray-800/30 border-gray-700/50 text-white placeholder:text-gray-500 rounded-xl focus:border-cyan-500/50 focus:ring-cyan-500/20 transition-all"
                      {...register('email')}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-sm text-red-400">{errors.email.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-gray-300 text-sm">Mật khẩu</Label>
                    <Link href="/forgot-password" className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors">
                      Quên mật khẩu?
                    </Link>
                  </div>
                  <div className="relative group">
                    <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-500 group-focus-within:text-cyan-400 transition-colors" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      className="pl-11 h-12 bg-gray-800/30 border-gray-700/50 text-white placeholder:text-gray-500 rounded-xl focus:border-cyan-500/50 focus:ring-cyan-500/20 transition-all"
                      {...register('password')}
                    />
                  </div>
                  {errors.password && (
                    <p className="text-sm text-red-400">{errors.password.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-semibold rounded-xl shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300"
                  disabled={loading}
                >
                  {loading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Đăng nhập
                    </>
                  )}
                </Button>
              </form>

              <div className="space-y-4">
                <p className="text-center text-sm text-gray-400">
                  Chưa có tài khoản?{' '}
                  <span className="text-cyan-400 font-medium">
                    Đăng nhập để yêu cầu tham gia CLB
                  </span>
                </p>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-gray-700/50" />
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="bg-gray-900/80 px-3 text-gray-500">hoặc</span>
                  </div>
                </div>

                <Link href="/admin/login">
                  <Button variant="outline" className="w-full h-12 border-gray-700/50 bg-gray-800/20 text-gray-300 hover:bg-gray-800 hover:text-white hover:border-purple-500/50 rounded-xl transition-all duration-300">
                    <Shield className="mr-2 h-5 w-5 text-purple-400" />
                    Đăng nhập với tư cách Quản trị viên
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <p className="text-center text-gray-600 text-sm mt-6">
            © 2024 WebOOM DHV TEC • ĐH Hùng Vương TPHCM
          </p>
        </div>
      </div>
    </div>
  )
}
