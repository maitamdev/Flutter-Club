'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  Calendar,
  Users,
  FileText,
  Clock,
  TrendingUp,
  Bell,
  ArrowRight,
  Sparkles,
  Zap,
  Target,
  Award,
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useAuth } from '@/lib/hooks/useAuth'
import { getSessions, getAssignments, getAnnouncements, getUsers } from '@/lib/firebase/firestore'
import { Session, Assignment, Announcement } from '@/types'
import { formatDateTime, getRelativeTime, isOverdue } from '@/lib/utils'
import { AttendanceChart } from '@/components/charts/attendance-chart'
import { MemberProfileCard } from '@/components/ui/member-profile-card'
import { AvatarUploadDialog } from '@/components/ui/avatar-upload-dialog'

export default function DashboardPage() {
  const { user, isAdmin, isTrainer, refreshUser } = useAuth()
  const [sessions, setSessions] = useState<Session[]>([])
  const [assignments, setAssignments] = useState<Assignment[]>([])
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [stats, setStats] = useState({
    totalMembers: 0,
    upcomingSessions: 0,
    pendingAssignments: 0,
  })
  const [mounted, setMounted] = useState(false)
  const [avatarDialogOpen, setAvatarDialogOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [sessionsData, assignmentsData, announcementsData] = await Promise.all([
          getSessions(),
          getAssignments(),
          getAnnouncements(5),
        ])

        setSessions(sessionsData.slice(0, 3))
        setAssignments(assignmentsData.slice(0, 3))
        setAnnouncements(announcementsData)

        const upcomingSessions = sessionsData.filter(
          (s) => new Date(s.startsAt) > new Date()
        ).length

        const pendingAssignments = assignmentsData.filter(
          (a) => !isOverdue(new Date(a.dueAt))
        ).length

        if (isAdmin) {
          const users = await getUsers()
          setStats({
            totalMembers: users.filter((u) => u.status === 'active').length,
            upcomingSessions,
            pendingAssignments,
          })
        } else {
          setStats({
            totalMembers: 0,
            upcomingSessions,
            pendingAssignments,
          })
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
      }
    }

    fetchData()
  }, [isAdmin])

  const statCards = [
    {
      title: 'Buổi học sắp tới',
      value: stats.upcomingSessions,
      icon: Calendar,
      gradient: 'from-violet-500 to-purple-600',
      bgGradient: 'from-violet-500/10 to-purple-500/10',
      href: '/sessions',
    },
    {
      title: 'Bài tập đang mở',
      value: stats.pendingAssignments,
      icon: FileText,
      gradient: 'from-emerald-500 to-teal-600',
      bgGradient: 'from-emerald-500/10 to-teal-500/10',
      href: '/assignments',
    },
    ...(isAdmin
      ? [
        {
          title: 'Thành viên',
          value: stats.totalMembers,
          icon: Users,
          gradient: 'from-navy-600 to-navy-700',
          bgGradient: 'from-navy-600/10 to-navy-700/10',
          href: '/members',
        },
      ]
      : []),
  ]

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Chào buổi sáng'
    if (hour < 18) return 'Chào buổi chiều'
    return 'Chào buổi tối'
  }

  const handleAvatarUploadSuccess = async (url: string) => {
    // Refresh user data to show new avatar
    if (user) {
      await refreshUser()
    }
  }

  return (
    <div className="space-y-6 pb-8">
      {/* Welcome Section */}
      <div className={`relative overflow-hidden rounded-[2.5rem] min-h-[400px] flex items-center shadow-2xl transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-right lg:bg-center no-repeat transition-transform duration-10000 hover:scale-105"
          style={{ backgroundImage: 'url("/images/dashboard-banner.png")' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-900/80 to-transparent z-10" />

        {/* Decorative Light Leaks */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-20">
          <div className="absolute top-0 right-0 w-[500px] h-full bg-blue-500/10 blur-[120px] rounded-full translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-purple-500/10 blur-[100px] rounded-full -translate-x-1/2" />
        </div>

        <div className="relative z-30 p-8 lg:p-16 w-full text-white">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-sm font-medium mb-8 animate-fade-in">
              <Sparkles className="h-4 w-4 text-cyan-400" />
              <span className="text-gray-300 uppercase tracking-widest text-xs">{getGreeting()}</span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold mb-6 tracking-tight animate-slide-in leading-[1.05]">
              Hello, <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-cyan-300">{user?.name?.trim().split(/\s+/).pop() || "Member"}!</span>
            </h1>

            <p className="text-gray-300 text-lg lg:text-xl max-w-xl leading-relaxed mb-10 delay-100 animate-slide-in font-medium opacity-90">
              Welcome back to <span className="text-white font-bold">FT CLUB HUB</span>.
              Ready to create something amazing today?
            </p>

            <div className="flex flex-wrap gap-5 delay-200 animate-slide-in">
              <Link href="/sessions">
                <Button className="bg-white text-gray-950 hover:bg-gray-100 border-0 rounded-2xl h-14 px-10 text-lg font-bold shadow-xl transition-all hover:scale-105 active:scale-95">
                  <Calendar className="mr-3 h-6 w-6 text-indigo-600" />
                  Lịch học
                </Button>
              </Link>
              {isTrainer && (
                <Link href="/sessions/new">
                  <Button variant="outline" className="bg-transparent hover:bg-white/5 text-white border-white/20 backdrop-blur-md rounded-2xl h-14 px-10 text-lg font-bold transition-all hover:scale-105 active:scale-95">
                    <Zap className="mr-3 h-6 w-6 text-yellow-400 fill-yellow-400" />
                    Tạo mới
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left Column: Member Card & Stats */}
        <div className="lg:col-span-4 space-y-6">
          {/* Member Profile Card */}
          <div className={`${mounted ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'} transition-all duration-700 delay-300`}>
            <div className="flex items-center gap-2 mb-4 px-2">
              <Award className="h-5 w-5 text-yellow-500" />
              <h2 className="text-xl font-bold tracking-tight">Thẻ Thành Viên</h2>
            </div>
            <MemberProfileCard
              name={user?.name || "Thành viên"}
              role={isAdmin ? "Administrator" : isTrainer ? "Trainer" : "Core Member"}
              level={isAdmin ? 99 : 15}
              avatarUrl={user?.photoURL}
              onAvatarClick={() => setAvatarDialogOpen(true)}
            />
          </div>

          {/* Quick Stats */}
          <div className="space-y-4">
            {statCards.map((stat, index) => (
              <Link key={stat.title} href={stat.href}>
                <Card className={`group hover-card cursor-pointer overflow-hidden border-0 shadow-lg transition-all duration-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: `${(index + 1) * 100 + 500}ms` }}>
                  <CardContent className="p-5">
                    <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgGradient} opacity-50`} />
                    <div className="relative flex items-center justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{stat.title}</p>
                        <p className="text-3xl font-black mt-1 gradient-text">{stat.value}</p>
                      </div>
                      <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <stat.icon className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* Quick Actions */}
          {isTrainer && (
            <Card className={`border-0 shadow-lg overflow-hidden transition-all duration-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '800ms' }}>
              <CardHeader className="border-b bg-gradient-to-r from-gray-50 to-gray-100/50 dark:from-gray-800/50 dark:to-gray-900/50 p-5">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg">
                    <Zap className="h-4 w-4 text-white" />
                  </div>
                  <CardTitle className="text-lg">Thao tác nhanh</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-4 space-y-2">
                <Link href="/sessions/new" className="block">
                  <Button variant="outline" className="w-full justify-start rounded-xl h-12 hover:bg-violet-50 hover:border-violet-200 transition-colors">
                    <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center mr-3">
                      <Calendar className="h-4 w-4 text-white" />
                    </div>
                    Buổi học mới
                  </Button>
                </Link>
                <Link href="/announcements" className="block">
                  <Button variant="outline" className="w-full justify-start rounded-xl h-12 hover:bg-pink-50 hover:border-pink-200 transition-colors">
                    <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center mr-3">
                      <Bell className="h-4 w-4 text-white" />
                    </div>
                    Đăng thông báo
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Column: Main Content */}
        <div className="lg:col-span-8 space-y-6">
          {/* Attendance Chart */}
          {isTrainer && (
            <Card className={`border-0 shadow-lg overflow-hidden transition-all duration-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '400ms' }}>
              <CardHeader className="border-b bg-gradient-to-r from-gray-50 to-gray-100/50 dark:from-gray-800/50 dark:to-gray-900/50">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-navy-600 to-navy-700 flex items-center justify-center shadow-lg">
                    <TrendingUp className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <CardTitle>Thống kê điểm danh</CardTitle>
                    <CardDescription>Tỷ lệ điểm danh 7 buổi học gần nhất</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <AttendanceChart />
              </CardContent>
            </Card>
          )}

          {/* Upcoming Sessions */}
          <Card className={`border-0 shadow-lg overflow-hidden transition-all duration-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '500ms' }}>
            <CardHeader className="border-b bg-gradient-to-r from-gray-50 to-gray-100/50 dark:from-gray-800/50 dark:to-gray-900/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center shadow-lg">
                    <Calendar className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <CardTitle>Buổi học sắp tới</CardTitle>
                    <CardDescription>Lịch học trong thời gian tới</CardDescription>
                  </div>
                </div>
                <Link href="/sessions">
                  <Button variant="ghost" size="sm" className="text-blue-600">
                    Tất cả <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              {sessions.length === 0 ? (
                <div className="text-center py-12 opacity-50">Chưa có buổi học nào</div>
              ) : (
                <div className="space-y-3">
                  {sessions.map((session) => (
                    <Link key={session.id} href={`/sessions/${session.id}`} className="block">
                      <div className="group flex items-center gap-4 p-4 rounded-xl border border-gray-100 dark:border-gray-800 hover:border-blue-200 transition-all">
                        <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex flex-col items-center justify-center text-white shadow-lg">
                          <span className="text-lg font-bold leading-none">{new Date(session.startsAt).getDate()}</span>
                          <span className="text-[10px] uppercase opacity-80">Th{new Date(session.startsAt).getMonth() + 1}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold truncate">{session.title}</p>
                          <p className="text-sm text-muted-foreground">{getRelativeTime(new Date(session.startsAt))}</p>
                        </div>
                        <ArrowRight className="h-4 w-4 text-gray-300 group-hover:text-blue-500 transition-all" />
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Assignments */}
          <Card className={`border-0 shadow-lg overflow-hidden transition-all duration-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '600ms' }}>
            <CardHeader className="border-b bg-gradient-to-r from-gray-50 to-gray-100/50 dark:from-gray-800/50 dark:to-gray-900/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg">
                    <FileText className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <CardTitle>Bài tập</CardTitle>
                    <CardDescription>Các bài tập cần hoàn thành</CardDescription>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              {assignments.length === 0 ? (
                <div className="text-center py-12 opacity-50">Chưa có bài tập nào</div>
              ) : (
                <div className="space-y-3">
                  {assignments.map((assignment) => (
                    <Link key={assignment.id} href={`/assignments/${assignment.id}`} className="block">
                      <div className="group flex items-center gap-4 p-4 rounded-xl border border-gray-100 dark:border-gray-800 hover:border-emerald-200 transition-all">
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white shadow-lg">
                          <FileText className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold truncate">{assignment.title}</p>
                          <p className="text-sm text-muted-foreground">Deadline: {getRelativeTime(new Date(assignment.dueAt))}</p>
                        </div>
                        <Badge variant="outline" className="border-emerald-500/30 text-emerald-600 bg-emerald-50/50">Mới</Badge>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Avatar Upload Dialog */}
      {user && (
        <AvatarUploadDialog
          open={avatarDialogOpen}
          onOpenChange={setAvatarDialogOpen}
          onUploadSuccess={handleAvatarUploadSuccess}
          currentAvatarUrl={user.photoURL}
          userId={user.uid}
        />
      )}
    </div>
  )
}
