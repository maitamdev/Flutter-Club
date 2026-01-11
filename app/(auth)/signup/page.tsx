'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { GraduationCap, Mail, Lock, Loader2, User, BookOpen, ArrowRight, Sparkles, Zap, Code2, Smartphone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'
import { signUpWithEmail, createUserDocument } from '@/lib/firebase/auth'
import { signupSchema, SignupFormData } from '@/lib/validations'

export default function SignupPage() {
  const [loading, setLoading] = useState(false)
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
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  })

  const onSubmit = async (data: SignupFormData) => {
    setLoading(true)
    try {
      const result = await signUpWithEmail(data.email, data.password)
      await createUserDocument(result.user.uid, {
        name: data.name,
        studentId: data.studentId,
        email: data.email,
        role: 'member',
        status: 'pending',
      })

      toast({
        title: 'Đăng ký thành công!',
        description: 'Tài khoản của bạn đang chờ phê duyệt. Vui lòng liên hệ admin.',
      })

      router.push('/request-access')
    } catch (error: any) {
      let errorMessage = 'Đăng ký thất bại'

      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'Email này đã được đăng ký'
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Email không hợp lệ'
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Mật khẩu quá yếu'
      }

      toast({
        title: 'Đăng ký thất bại',
        description: errorMessage || error.message,
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
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

      {/* Right Side - Signup Form */}
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
                <BookOpen className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-white">Tạo Tài Khoản</h1>
          </div>

          <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-xl shadow-2xl shadow-black/20 card-shine">
            <CardHeader className="text-center space-y-3 pb-2">
              <div className="hidden lg:block relative mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl blur-lg opacity-50" />
                <div className="relative h-14 w-14 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center shadow-lg">
                  <BookOpen className="h-7 w-7 text-white" />
                </div>
              </div>
              <CardTitle className="text-xl text-white">Tạo Tài Khoản Thành Viên</CardTitle>
              <CardDescription className="text-gray-400">
                WebOOM DHV TEC - Câu lạc bộ Flutter
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6 pt-4">
              {/* Signup Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Name Field */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-300 text-sm">Họ và Tên</Label>
                  <div className="relative group">
                    <User className="absolute left-3 top-3.5 h-5 w-5 text-gray-500 group-focus-within:text-cyan-400 transition-colors" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="Nguyễn Văn A"
                      className="pl-11 h-12 bg-gray-800/30 border-gray-700/50 text-white placeholder:text-gray-500 rounded-xl focus:border-cyan-500/50 focus:ring-cyan-500/20 transition-all"
                      {...register('name')}
                    />
                  </div>
                  {errors.name && (
                    <p className="text-sm text-red-400">{errors.name.message}</p>
                  )}
                </div>

                {/* Student ID Field */}
                <div className="space-y-2">
                  <Label htmlFor="studentId" className="text-gray-300 text-sm">Mã Số Sinh Viên</Label>
                  <div className="relative group">
                    <BookOpen className="absolute left-3 top-3.5 h-5 w-5 text-gray-500 group-focus-within:text-cyan-400 transition-colors" />
                    <Input
                      id="studentId"
                      type="text"
                      placeholder="2021001234"
                      className="pl-11 h-12 bg-gray-800/30 border-gray-700/50 text-white placeholder:text-gray-500 rounded-xl focus:border-cyan-500/50 focus:ring-cyan-500/20 transition-all"
                      {...register('studentId')}
                    />
                  </div>
                  {errors.studentId && (
                    <p className="text-sm text-red-400">{errors.studentId.message}</p>
                  )}
                </div>

                {/* Email Field */}
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

                {/* Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-300 text-sm">Mật Khẩu</Label>
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

                {/* Confirm Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-gray-300 text-sm">Xác Nhận Mật Khẩu</Label>
                  <div className="relative group">
                    <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-500 group-focus-within:text-cyan-400 transition-colors" />
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      className="pl-11 h-12 bg-gray-800/30 border-gray-700/50 text-white placeholder:text-gray-500 rounded-xl focus:border-cyan-500/50 focus:ring-cyan-500/20 transition-all"
                      {...register('confirmPassword')}
                    />
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-sm text-red-400">{errors.confirmPassword.message}</p>
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
                      Tạo Tài Khoản
                    </>
                  )}
                </Button>
              </form>

              <div className="space-y-4">
                <p className="text-center text-sm text-gray-400">
                  Đã có tài khoản?{' '}
                  <Link href="/login" className="text-cyan-400 font-medium hover:text-cyan-300 transition-colors">
                    Đăng nhập
                  </Link>
                </p>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-gray-700/50" />
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="bg-gray-900/80 px-3 text-gray-500">hoặc</span>
                  </div>
                </div>

                <Link href="/login">
                  <Button variant="outline" className="w-full h-12 border-gray-700/50 bg-gray-800/20 text-gray-300 hover:bg-gray-800 hover:text-white hover:border-cyan-500/50 rounded-xl transition-all duration-300">
                    <ArrowRight className="mr-2 h-5 w-5 text-cyan-400" />
                    Quay lại Đăng Nhập
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
