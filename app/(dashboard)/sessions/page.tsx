'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Plus, Calendar, Search, MapPin, Users, Clock, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useAuth } from '@/lib/hooks/useAuth'
import { getSessions } from '@/lib/firebase/firestore'
import { Session } from '@/types'
import { formatDateTime, getRelativeTime } from '@/lib/utils'
import { EmptyState } from '@/components/layout/empty-state'
import { TableLoading } from '@/components/layout/loading'

export default function SessionsPage() {
  const { isTrainer } = useAuth()
  const [sessions, setSessions] = useState<Session[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past'>('all')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const data = await getSessions()
        setSessions(data)
      } catch (error) {
        console.error('Error fetching sessions:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchSessions()
  }, [])

  const filteredSessions = sessions.filter((session) => {
    const matchesSearch = session.title
      .toLowerCase()
      .includes(search.toLowerCase())
    const now = new Date()
    const sessionDate = new Date(session.startsAt)

    if (filter === 'upcoming') return matchesSearch && sessionDate > now
    if (filter === 'past') return matchesSearch && sessionDate <= now
    return matchesSearch
  })

  const getSessionStatus = (session: Session) => {
    const now = new Date()
    const start = new Date(session.startsAt)
    const end = new Date(session.endsAt)

    if (now < start) return { label: 'Sắp diễn ra', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' }
    if (now >= start && now <= end) return { label: 'Đang diễn ra', color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' }
    return { label: 'Đã kết thúc', color: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400' }
  }

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 transition-all duration-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg">
              <Calendar className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold">Buổi học</h1>
          </div>
          <p className="text-muted-foreground ml-12">
            Quản lý các buổi học của CLB
          </p>
        </div>
        {isTrainer && (
          <Link href="/sessions/new">
            <Button className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 shadow-lg shadow-violet-500/25 rounded-xl h-11">
              <Plus className="mr-2 h-4 w-4" />
              Tạo buổi học
            </Button>
          </Link>
        )}
      </div>

      {/* Filters */}
      <div className={`flex flex-col sm:flex-row gap-4 transition-all duration-500 delay-100 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm buổi học..."
            className="pl-11 h-11 rounded-xl border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Tabs value={filter} onValueChange={(v) => setFilter(v as typeof filter)}>
          <TabsList className="h-11 p-1 bg-gray-100 dark:bg-gray-800 rounded-xl">
            <TabsTrigger value="all" className="rounded-lg px-4">Tất cả</TabsTrigger>
            <TabsTrigger value="upcoming" className="rounded-lg px-4">Sắp tới</TabsTrigger>
            <TabsTrigger value="past" className="rounded-lg px-4">Đã qua</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Sessions List */}
      {loading ? (
        <TableLoading rows={5} />
      ) : filteredSessions.length === 0 ? (
        <EmptyState
          icon={Calendar}
          title="Chưa có buổi học nào"
          description={
            search
              ? 'Không tìm thấy buổi học phù hợp với từ khóa tìm kiếm'
              : 'Các buổi học sẽ được hiển thị ở đây'
          }
          action={
            isTrainer && !search ? (
              <Link href="/sessions/new">
                <Button className="rounded-xl">
                  <Plus className="mr-2 h-4 w-4" />
                  Tạo buổi học đầu tiên
                </Button>
              </Link>
            ) : undefined
          }
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredSessions.map((session, index) => {
            const status = getSessionStatus(session)
            const isLive = status.label === 'Đang diễn ra'
            return (
              <Link key={session.id} href={`/sessions/${session.id}`}>
                <Card 
                  className={`group h-full cursor-pointer border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                  style={{ transitionDelay: `${(index + 2) * 50}ms` }}
                >
                  <CardContent className="p-0">
                    {/* Header gradient */}
                    <div className="h-2 bg-gradient-to-r from-violet-500 to-purple-600" />
                    
                    <div className="p-5">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex flex-col items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform">
                            <span className="text-lg font-bold leading-none">{new Date(session.startsAt).getDate()}</span>
                            <span className="text-[10px] uppercase opacity-80">Th{new Date(session.startsAt).getMonth() + 1}</span>
                          </div>
                          <div>
                            <Badge className={`${status.color} border-0 font-medium`}>
                              {isLive && <span className="mr-1.5 h-2 w-2 rounded-full bg-current animate-pulse" />}
                              {status.label}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      
                      <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                        {session.title}
                      </h3>
                      
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                        {session.description || 'Không có mô tả'}
                      </p>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <Clock className="h-4 w-4" />
                          {formatDateTime(new Date(session.startsAt)).split(',')[1]?.trim() || formatDateTime(new Date(session.startsAt))}
                        </span>
                        {session.location && (
                          <span className="flex items-center gap-1.5">
                            <MapPin className="h-4 w-4" />
                            {session.location}
                          </span>
                        )}
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          {formatDateTime(new Date(session.startsAt)).split(',')[0]}
                        </span>
                        <span className="text-sm font-medium text-violet-600 dark:text-violet-400">
                          {getRelativeTime(new Date(session.startsAt))}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
