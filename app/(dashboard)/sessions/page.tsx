'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Plus, Calendar, Search, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
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

    if (now < start) return { label: 'Sắp diễn ra', variant: 'secondary' as const }
    if (now >= start && now <= end) return { label: 'Đang diễn ra', variant: 'success' as const }
    return { label: 'Đã kết thúc', variant: 'outline' as const }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Buổi học</h1>
          <p className="text-muted-foreground">
            Quản lý các buổi học của CLB
          </p>
        </div>
        {isTrainer && (
          <Link href="/sessions/new">
            <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600">
              <Plus className="mr-2 h-4 w-4" />
              Tạo buổi học
            </Button>
          </Link>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm buổi học..."
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Tabs value={filter} onValueChange={(v) => setFilter(v as typeof filter)}>
          <TabsList>
            <TabsTrigger value="all">Tất cả</TabsTrigger>
            <TabsTrigger value="upcoming">Sắp tới</TabsTrigger>
            <TabsTrigger value="past">Đã qua</TabsTrigger>
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
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Tạo buổi học đầu tiên
                </Button>
              </Link>
            ) : undefined
          }
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredSessions.map((session) => {
            const status = getSessionStatus(session)
            return (
              <Link key={session.id} href={`/sessions/${session.id}`}>
                <Card className="h-full hover:shadow-md transition-all hover:border-blue-500/50 cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white">
                        <Calendar className="h-6 w-6" />
                      </div>
                      <Badge variant={status.variant}>{status.label}</Badge>
                    </div>
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                      {session.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                      {session.description}
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        {formatDateTime(new Date(session.startsAt))}
                      </span>
                      <span className="text-blue-500 font-medium">
                        {getRelativeTime(new Date(session.startsAt))}
                      </span>
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
