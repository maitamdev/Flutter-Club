'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { GraduationCap, Users, Shield, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/lib/hooks/useAuth'

export default function HomePage() {
  const { user, firebaseUser, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Nếu đã đăng nhập và có profile -> vào dashboard
    if (!loading && firebaseUser && user && user.status === 'active') {
      router.replace('/dashboard')
    }
  }, [loading, firebaseUser, user, router])

  // Đang loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-400/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-4xl relative">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 shadow-lg shadow-blue-500/30 mb-6">
            <GraduationCap className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent mb-3">
            FT-Club Hub
          </h1>
          <p className="text-lg text-muted-foreground">
            Hệ thống quản lý Câu lạc bộ Flutter
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            Khoa Kỹ Thuật Công Nghệ
          </p>
        </div>

        {/* Login Options */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Member Login */}
          <Card className="relative overflow-hidden backdrop-blur-sm bg-white/80 dark:bg-gray-900/80 border-white/20 hover:shadow-xl transition-all hover:scale-[1.02]">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-500" />
            <CardHeader className="text-center pb-2">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 shadow-lg mb-4">
                <Users className="h-7 w-7 text-white" />
              </div>
              <CardTitle className="text-xl">Thành viên CLB</CardTitle>
              <CardDescription>
                Đăng nhập hoặc đăng ký tham gia câu lạc bộ
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="text-sm text-muted-foreground space-y-2">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                  Xem lịch học và điểm danh
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                  Nộp bài tập và làm quiz
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                  Nhận thông báo từ CLB
                </li>
              </ul>
              <Link href="/login" className="block">
                <Button className="w-full h-11 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600">
                  Đăng nhập / Đăng ký
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Admin Login */}
          <Card className="relative overflow-hidden backdrop-blur-sm bg-white/80 dark:bg-gray-900/80 border-white/20 hover:shadow-xl transition-all hover:scale-[1.02]">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500" />
            <CardHeader className="text-center pb-2">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg mb-4">
                <Shield className="h-7 w-7 text-white" />
              </div>
              <CardTitle className="text-xl">Quản trị viên</CardTitle>
              <CardDescription>
                Dành cho Admin và Trainer của CLB
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="text-sm text-muted-foreground space-y-2">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-purple-500" />
                  Quản lý thành viên và duyệt yêu cầu
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-purple-500" />
                  Tạo buổi học và điểm danh
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-purple-500" />
                  Giao bài tập và chấm điểm
                </li>
              </ul>
              <Link href="/admin/login" className="block">
                <Button className="w-full h-11 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                  Đăng nhập Admin
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-muted-foreground mt-8">
          © 2024 FT-Club Hub. Được phát triển bởi CLB Flutter.
        </p>
      </div>
    </div>
  )
}
