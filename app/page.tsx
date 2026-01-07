'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { GraduationCap, Users, Shield, ArrowRight, Code2, Smartphone, QrCode, Bell, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/hooks/useAuth'

export default function HomePage() {
  const { user, firebaseUser, loading } = useAuth()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState<'member' | 'admin'>('member')

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!loading && firebaseUser && user && user.status === 'active') {
      router.replace('/dashboard')
    }
  }, [loading, firebaseUser, user, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a1a]">
        <div className="h-16 w-16 rounded-full border-4 border-cyan-500/30 border-t-cyan-500 animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a1a] text-white flex">
      {/* Left Side - Image & Hero */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-3/5 relative">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="/dhv.jpg" 
            alt="DHV Campus" 
            className="w-full h-full object-cover"
          />
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a1a] via-[#0a0a1a]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a1a] via-transparent to-[#0a0a1a]/50" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center px-12 xl:px-20">
          {/* Logo */}
          <div className={`mb-8 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="relative inline-block">
              <div className="absolute inset-0 blur-2xl bg-gradient-to-r from-cyan-500 to-blue-500 opacity-60" />
              <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-500 shadow-2xl">
                <GraduationCap className="h-10 w-10 text-white" />
              </div>
            </div>
          </div>

          {/* Title */}
          <div className={`transition-all duration-1000 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-5xl xl:text-6xl font-black mb-4 leading-tight">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                WebOOM DHV TEC
              </span>
            </h1>
            <p className="text-xl xl:text-2xl text-gray-300 mb-2">
              Hệ thống quản lý CLB Flutter
            </p>
            <p className="text-gray-500 flex items-center gap-2">
              <Code2 className="h-4 w-4" />
              Khoa Kỹ Thuật Công Nghệ - ĐH Hùng Vương TPHCM
            </p>
          </div>

          {/* Features */}
          <div className={`mt-12 space-y-4 transition-all duration-1000 delay-400 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {[
              { icon: QrCode, text: 'Điểm danh QR thông minh', color: 'text-cyan-400' },
              { icon: FileText, text: 'Quản lý bài tập & Quiz', color: 'text-blue-400' },
              { icon: Bell, text: 'Thông báo realtime', color: 'text-purple-400' },
              { icon: Smartphone, text: 'Tối ưu cho mobile', color: 'text-pink-400' },
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-4 group">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 backdrop-blur-sm group-hover:bg-white/10 transition-colors">
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <span className="text-gray-300 group-hover:text-white transition-colors">{feature.text}</span>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className={`mt-12 flex gap-8 transition-all duration-1000 delay-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {[
              { value: '50+', label: 'Thành viên' },
              { value: '20+', label: 'Buổi học' },
              { value: '100%', label: 'Miễn phí' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  {stat.value}
                </p>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side - Login Section */}
      <div className="w-full lg:w-1/2 xl:w-2/5 flex items-center justify-center p-6 lg:p-12 relative">
        {/* Mobile Background */}
        <div className="absolute inset-0 lg:hidden">
          <img 
            src="/dhv.jpg" 
            alt="DHV Campus" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-[#0a0a1a]/90" />
        </div>

        <div className={`w-full max-w-md relative z-10 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-purple-500 mb-4">
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              WebOOM DHV TEC
            </h1>
            <p className="text-gray-500 text-sm mt-1">ĐH Hùng Vương TPHCM</p>
          </div>

          {/* Tab Switcher */}
          <div className="flex bg-gray-800/50 rounded-2xl p-1.5 mb-8 backdrop-blur-sm">
            <button
              onClick={() => setActiveTab('member')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium transition-all ${
                activeTab === 'member'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/25'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Users className="h-5 w-5" />
              Thành viên
            </button>
            <button
              onClick={() => setActiveTab('admin')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium transition-all ${
                activeTab === 'admin'
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Shield className="h-5 w-5" />
              Quản trị
            </button>
          </div>

          {/* Login Card */}
          <div className="bg-gray-900/50 backdrop-blur-xl rounded-3xl p-8 border border-gray-800">
            {activeTab === 'member' ? (
              <>
                <div className="text-center mb-6">
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 mb-4 shadow-lg shadow-cyan-500/25">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">Chào mừng bạn!</h2>
                  <p className="text-gray-400">Đăng nhập để tham gia CLB Flutter</p>
                </div>

                <div className="space-y-4 mb-6">
                  {['Xem lịch học và điểm danh', 'Nộp bài tập online', 'Làm quiz kiểm tra'].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-gray-300">
                      <div className="h-2 w-2 rounded-full bg-cyan-400" />
                      {item}
                    </div>
                  ))}
                </div>

                <Link href="/login" className="block">
                  <Button className="w-full h-14 text-lg bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 rounded-xl font-semibold group">
                    Đăng nhập / Đăng ký
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <div className="text-center mb-6">
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 mb-4 shadow-lg shadow-purple-500/25">
                    <Shield className="h-8 w-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">Quản trị viên</h2>
                  <p className="text-gray-400">Dành cho Admin & Trainer</p>
                </div>

                <div className="space-y-4 mb-6">
                  {['Quản lý thành viên CLB', 'Tạo buổi học & điểm danh', 'Chấm điểm bài tập'].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-gray-300">
                      <div className="h-2 w-2 rounded-full bg-purple-400" />
                      {item}
                    </div>
                  ))}
                </div>

                <Link href="/admin/login" className="block">
                  <Button className="w-full h-14 text-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 rounded-xl font-semibold group">
                    Đăng nhập Admin
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Footer */}
          <p className="text-center text-gray-600 text-sm mt-8">
            © 2024 WebOOM DHV TEC • ĐH Hùng Vương TPHCM
          </p>
        </div>
      </div>
    </div>
  )
}
