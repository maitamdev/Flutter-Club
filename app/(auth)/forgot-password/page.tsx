'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Mail, ArrowLeft, Loader2, CheckCircle, GraduationCap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'
import { sendPasswordResetEmail } from '@/lib/firebase/auth'

const forgotPasswordSchema = z.object({
  email: z.string().email('Email không hợp lệ'),
})

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  })

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setLoading(true)
    try {
      await sendPasswordResetEmail(data.email)
      setSent(true)
      toast({
        title: 'Email đã được gửi',
        description: 'Vui lòng kiểm tra hộp thư của bạn',
      })
    } catch (error: any) {
      toast({
        title: 'Gửi email thất bại',
        description: error.message || 'Vui lòng kiểm tra lại email',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#0a0a1a]">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 mb-4">
            <GraduationCap className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">WebOOM DHV TEC</h1>
        </div>

        <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-xl">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-xl text-white">Quên mật khẩu</CardTitle>
            <CardDescription className="text-gray-400">
              Nhập email để nhận link đặt lại mật khẩu
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {sent ? (
              <div className="text-center space-y-4 py-4">
                <div className="h-16 w-16 mx-auto rounded-full bg-green-500/20 flex items-center justify-center">
                  <CheckCircle className="h-8 w-8 text-green-500" />
                </div>
                <div>
                  <p className="font-medium text-white">Email đã được gửi!</p>
                  <p className="text-sm text-gray-400 mt-1">
                    Vui lòng kiểm tra hộp thư (bao gồm cả spam) và làm theo hướng dẫn để đặt lại mật khẩu.
                  </p>
                </div>
                <Link href="/login">
                  <Button className="w-full h-12 bg-gradient-to-r from-cyan-500 to-blue-500">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Quay lại đăng nhập
                  </Button>
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-300">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="email@example.com"
                      className="pl-11 h-12 bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
                      {...register('email')}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-sm text-red-400">{errors.email.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-semibold"
                  disabled={loading}
                >
                  {loading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    'Gửi email đặt lại mật khẩu'
                  )}
                </Button>

                <Link href="/login">
                  <Button variant="ghost" className="w-full h-12 text-gray-400 hover:text-white">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Quay lại đăng nhập
                  </Button>
                </Link>
              </form>
            )}
          </CardContent>
        </Card>

        <p className="text-center text-gray-600 text-sm mt-6">
          © 2024 WebOOM DHV TEC • ĐH Hùng Vương TPHCM
        </p>
      </div>
    </div>
  )
}
