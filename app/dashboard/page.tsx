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

export default function DashboardPage() {
  const { user, isAdmin, isTrainer } = useAuth()
  const [sessions, setSessions] = useState<Session[]>([])
  const [assignments, setAssignments] = useState<Assignment[]>([])
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [stats, setStats] = useState({
    totalMembers: 0,
    upcomingSessions: 0,
    pendingAssignments: 0,
  })
  const [mounted, setMounted] = useState(false)

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
          gradient: 'from-blue-500 to-cyan-600',
          bgGradient: 'from-blue-500/10 to-cyan-500/10',
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

  return (
    <div className="space-y-6 pb-8">
      {/* Welcome Section */}
      <div className={`relative overflow-hidden rounded-[2rem] transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-blue-600 to-violet-700" />

        {/* Animated background shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-400/5 rounded-full blur-3xl" />
        </div>

        {/* Pattern overlay */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />

        <div className="relative z-10 p-8 lg:p-12 text-white">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 min-h-[320px]">
            <div className="flex-1 text-center lg:text-left z-20">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-xl border border-white/20 text-sm font-medium mb-8 animate-fade-in">
                <Sparkles className="h-4 w-4 text-yellow-300" />
                <span className="text-blue-50 font-medium">{getGreeting()}</span>
              </div>
              <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 tracking-tight animate-slide-in leading-[1.1]">
                Xin chào, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-cyan-100">{user?.name?.split(' ').pop()}!</span>
              </h1>
              <p className="text-blue-100/90 text-lg lg:text-xl max-w-xl leading-relaxed mb-10 delay-100 animate-slide-in font-medium">
                Chào mừng bạn đến với WebOOM DHV TEC. Cùng tạo nên những sản phẩm tuyệt vời hôm nay nhé!
              </p>

              <div className="flex flex-wrap justify-center lg:justify-start gap-5 delay-200 animate-slide-in">
                <Link href="/sessions">
                  <Button className="bg-white text-indigo-700 hover:bg-white/95 border-0 rounded-2xl h-14 px-10 text-lg font-bold shadow-2xl shadow-indigo-500/30 transition-all hover:scale-105 active:scale-95">
                    <Calendar className="mr-3 h-6 w-6" />
                    Xem lịch học
                  </Button>
                </Link>
                {isTrainer && (
                  <Link href="/sessions/new">
                    <Button variant="ghost" className="bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-xl rounded-2xl h-14 px-10 text-lg font-bold transition-all hover:scale-105 active:scale-95">
                      <Zap className="mr-3 h-6 w-6 text-yellow-300 fill-yellow-300" />
                      Tạo buổi học
                    </Button>
                  </Link>
                )}
              </div>
            </div>

            <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-1/2 overflow-hidden pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-indigo-600/50 z-10" />
              <img
                src="/images/welcome-bot-wide.png"
                alt="Welcome Assistant"
                className="absolute right-[-10%] top-[-10%] bottom-[-10%] h-[120%] w-auto object-cover opacity-90 animate-float drop-shadow-2xl"
              />
              <div className="absolute inset-0 shadow-[inset_-100px_0_150px_-50px_rgba(30,58,138,0.5)]" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {statCards.map((stat, index) => (
          <Link key={stat.title} href={stat.href}>
            <Card className={`group hover-card cursor-pointer overflow-hidden border-0 shadow-lg transition-all duration-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: `${(index + 1) * 100}ms` }}>
              <CardContent className="p-6">
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgGradient} opacity-50`} />
                <div className="relative flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground font-medium">{stat.title}</p>
                    <p className="text-4xl font-bold mt-2 gradient-text">{stat.value}</p>
                  </div>
                  <div className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className="h-7 w-7 text-white" />
                  </div>
                </div>
                <div className="relative mt-4 flex items-center text-sm text-muted-foreground">
                  <ArrowRight className="h-4 w-4 mr-1 group-hover:translate-x-1 transition-transform" />
                  Xem chi tiết
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Attendance Chart */}
          {isTrainer && (
            <Card className={`border-0 shadow-lg overflow-hidden transition-all duration-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '400ms' }}>
              <CardHeader className="border-b bg-gradient-to-r from-gray-50 to-gray-100/50 dark:from-gray-800/50 dark:to-gray-900/50">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
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
                  <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20">
                    Xem tất cả
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              {sessions.length === 0 ? (
                <div className="text-center py-12">
                  <div className="h-16 w-16 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center mx-auto mb-4">
                    <Calendar className="h-8 w-8 text-gray-400" />
                  </div>
                  <p className="text-muted-foreground">Chưa có buổi học nào được lên lịch</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {sessions.map((session, index) => (
                    <Link key={session.id} href={`/sessions/${session.id}`} className="block">
                      <div className="group flex items-center gap-4 p-4 rounded-xl border border-gray-100 dark:border-gray-800 hover:border-blue-200 dark:hover:border-blue-800 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-cyan-50/50 dark:hover:from-blue-900/10 dark:hover:to-cyan-900/10 transition-all duration-200">
                        <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex flex-col items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform">
                          <span className="text-lg font-bold leading-none">{new Date(session.startsAt).getDate()}</span>
                          <span className="text-[10px] uppercase opacity-80">Th{new Date(session.startsAt).getMonth() + 1}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{session.title}</p>
                          <p className="text-sm text-muted-foreground mt-0.5">
                            {formatDateTime(new Date(session.startsAt))}
                          </p>
                        </div>
                        <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-0">
                          {getRelativeTime(new Date(session.startsAt))}
                        </Badge>
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
                <Link href="/assignments">
                  <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20">
                    Xem tất cả
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              {assignments.length === 0 ? (
                <div className="text-center py-12">
                  <div className="h-16 w-16 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center mx-auto mb-4">
                    <FileText className="h-8 w-8 text-gray-400" />
                  </div>
                  <p className="text-muted-foreground">Chưa có bài tập nào</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {assignments.map((assignment) => {
                    const overdue = isOverdue(new Date(assignment.dueAt))
                    return (
                      <Link key={assignment.id} href={`/assignments/${assignment.id}`} className="block">
                        <div className="group flex items-center gap-4 p-4 rounded-xl border border-gray-100 dark:border-gray-800 hover:border-emerald-200 dark:hover:border-emerald-800 hover:bg-gradient-to-r hover:from-emerald-50/50 hover:to-teal-50/50 dark:hover:from-emerald-900/10 dark:hover:to-teal-900/10 transition-all duration-200">
                          <div className={`h-12 w-12 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform ${overdue
                            ? 'bg-gradient-to-br from-red-500 to-pink-500'
                            : 'bg-gradient-to-br from-emerald-500 to-teal-500'
                            }`}>
                            {overdue ? (
                              <Clock className="h-5 w-5 text-white" />
                            ) : (
                              <FileText className="h-5 w-5 text-white" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold truncate group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">{assignment.title}</p>
                            <p className="text-sm text-muted-foreground mt-0.5">
                              Deadline: {formatDateTime(new Date(assignment.dueAt))}
                            </p>
                          </div>
                          <Badge className={overdue
                            ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-0'
                            : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-0'
                          }>
                            {overdue ? 'Quá hạn' : getRelativeTime(new Date(assignment.dueAt))}
                          </Badge>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Announcements */}
          <Card className={`border-0 shadow-lg overflow-hidden transition-all duration-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '700ms' }}>
            <CardHeader className="border-b bg-gradient-to-r from-gray-50 to-gray-100/50 dark:from-gray-800/50 dark:to-gray-900/50">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center shadow-lg">
                  <Bell className="h-5 w-5 text-white" />
                </div>
                <CardTitle>Thông báo mới</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              {announcements.length === 0 ? (
                <div className="text-center py-8">
                  <Bell className="h-10 w-10 text-gray-300 dark:text-gray-600 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Chưa có thông báo nào</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {announcements.map((announcement, index) => (
                    <div
                      key={announcement.id}
                      className="relative pl-4 py-2 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:rounded-full before:bg-gradient-to-b before:from-pink-500 before:to-rose-500"
                    >
                      <p className="font-medium text-sm">{announcement.title}</p>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                        {announcement.content}
                      </p>
                      <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {getRelativeTime(new Date(announcement.createdAt))}
                      </p>
                    </div>
                  ))}
                </div>
              )}
              <Link href="/announcements" className="block mt-4">
                <Button variant="outline" className="w-full rounded-xl" size="sm">
                  Xem tất cả thông báo
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          {isTrainer && (
            <Card className={`border-0 shadow-lg overflow-hidden transition-all duration-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '800ms' }}>
              <CardHeader className="border-b bg-gradient-to-r from-gray-50 to-gray-100/50 dark:from-gray-800/50 dark:to-gray-900/50">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg">
                    <Zap className="h-5 w-5 text-white" />
                  </div>
                  <CardTitle>Thao tác nhanh</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-4 space-y-2">
                <Link href="/sessions/new" className="block">
                  <Button variant="outline" className="w-full justify-start rounded-xl h-12 hover:bg-violet-50 hover:border-violet-200 hover:text-violet-700 dark:hover:bg-violet-900/20 dark:hover:border-violet-800 dark:hover:text-violet-400 transition-colors">
                    <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center mr-3">
                      <Calendar className="h-4 w-4 text-white" />
                    </div>
                    Tạo buổi học mới
                  </Button>
                </Link>
                <Link href="/assignments/new" className="block">
                  <Button variant="outline" className="w-full justify-start rounded-xl h-12 hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-700 dark:hover:bg-emerald-900/20 dark:hover:border-emerald-800 dark:hover:text-emerald-400 transition-colors">
                    <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mr-3">
                      <FileText className="h-4 w-4 text-white" />
                    </div>
                    Tạo bài tập mới
                  </Button>
                </Link>
                <Link href="/quizzes/new" className="block">
                  <Button variant="outline" className="w-full justify-start rounded-xl h-12 hover:bg-orange-50 hover:border-orange-200 hover:text-orange-700 dark:hover:bg-orange-900/20 dark:hover:border-orange-800 dark:hover:text-orange-400 transition-colors">
                    <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center mr-3">
                      <Target className="h-4 w-4 text-white" />
                    </div>
                    Tạo quiz mới
                  </Button>
                </Link>
                <Link href="/announcements" className="block">
                  <Button variant="outline" className="w-full justify-start rounded-xl h-12 hover:bg-pink-50 hover:border-pink-200 hover:text-pink-700 dark:hover:bg-pink-900/20 dark:hover:border-pink-800 dark:hover:text-pink-400 transition-colors">
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
      </div>
    </div>
  )
}
