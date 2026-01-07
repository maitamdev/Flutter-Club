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
      color: 'from-blue-500 to-blue-600',
      href: '/sessions',
    },
    {
      title: 'Bài tập đang mở',
      value: stats.pendingAssignments,
      icon: FileText,
      color: 'from-green-500 to-green-600',
      href: '/assignments',
    },
    ...(isAdmin
      ? [
          {
            title: 'Thành viên',
            value: stats.totalMembers,
            icon: Users,
            color: 'from-purple-500 to-purple-600',
            href: '/members',
          },
        ]
      : []),
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">
          Xin chào, {user?.name?.split(' ').pop()} 👋
        </h1>
        <p className="text-muted-foreground">
          Chào mừng bạn đến với FT-Club Hub. Đây là tổng quan hoạt động của bạn.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {statCards.map((stat) => (
          <Link key={stat.title} href={stat.href}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-3xl font-bold mt-1">{stat.value}</p>
                  </div>
                  <div
                    className={`h-12 w-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}
                  >
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Attendance Chart - Only for Admin/Trainer */}
          {isTrainer && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Thống kê điểm danh
                </CardTitle>
                <CardDescription>
                  Tỷ lệ điểm danh 7 buổi học gần nhất
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AttendanceChart />
              </CardContent>
            </Card>
          )}

          {/* Upcoming Sessions */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Buổi học sắp tới</CardTitle>
                <CardDescription>Lịch học trong thời gian tới</CardDescription>
              </div>
              <Link href="/sessions">
                <Button variant="ghost" size="sm">
                  Xem tất cả
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              {sessions.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  Chưa có buổi học nào được lên lịch
                </p>
              ) : (
                <div className="space-y-4">
                  {sessions.map((session) => (
                    <Link
                      key={session.id}
                      href={`/sessions/${session.id}`}
                      className="block"
                    >
                      <div className="flex items-center gap-4 p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                        <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                          {new Date(session.startsAt).getDate()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{session.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {formatDateTime(new Date(session.startsAt))}
                          </p>
                        </div>
                        <Badge variant="secondary">
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
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Bài tập</CardTitle>
                <CardDescription>Các bài tập cần hoàn thành</CardDescription>
              </div>
              <Link href="/assignments">
                <Button variant="ghost" size="sm">
                  Xem tất cả
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              {assignments.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  Chưa có bài tập nào
                </p>
              ) : (
                <div className="space-y-4">
                  {assignments.map((assignment) => {
                    const overdue = isOverdue(new Date(assignment.dueAt))
                    return (
                      <Link
                        key={assignment.id}
                        href={`/assignments/${assignment.id}`}
                        className="block"
                      >
                        <div className="flex items-center gap-4 p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                          <div
                            className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                              overdue
                                ? 'bg-red-100 text-red-600 dark:bg-red-900/30'
                                : 'bg-green-100 text-green-600 dark:bg-green-900/30'
                            }`}
                          >
                            {overdue ? (
                              <Clock className="h-5 w-5" />
                            ) : (
                              <FileText className="h-5 w-5" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate">{assignment.title}</p>
                            <p className="text-sm text-muted-foreground">
                              Deadline: {formatDateTime(new Date(assignment.dueAt))}
                            </p>
                          </div>
                          <Badge variant={overdue ? 'destructive' : 'secondary'}>
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

        {/* Sidebar - Announcements */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Thông báo mới
              </CardTitle>
            </CardHeader>
            <CardContent>
              {announcements.length === 0 ? (
                <p className="text-center text-muted-foreground py-4">
                  Chưa có thông báo nào
                </p>
              ) : (
                <div className="space-y-4">
                  {announcements.map((announcement) => (
                    <div
                      key={announcement.id}
                      className="border-l-2 border-blue-500 pl-4 py-2"
                    >
                      <p className="font-medium text-sm">{announcement.title}</p>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                        {announcement.content}
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        {getRelativeTime(new Date(announcement.createdAt))}
                      </p>
                    </div>
                  ))}
                </div>
              )}
              <Link href="/announcements" className="block mt-4">
                <Button variant="outline" className="w-full" size="sm">
                  Xem tất cả thông báo
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Quick Actions for Trainer/Admin */}
          {isTrainer && (
            <Card>
              <CardHeader>
                <CardTitle>Thao tác nhanh</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link href="/sessions/new" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <Calendar className="mr-2 h-4 w-4" />
                    Tạo buổi học mới
                  </Button>
                </Link>
                <Link href="/assignments/new" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="mr-2 h-4 w-4" />
                    Tạo bài tập mới
                  </Button>
                </Link>
                <Link href="/announcements" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <Bell className="mr-2 h-4 w-4" />
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
