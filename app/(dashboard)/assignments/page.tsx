'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Plus, FileText, Search, Clock, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useAuth } from '@/lib/hooks/useAuth'
import { getAssignments, getUserSubmission } from '@/lib/firebase/firestore'
import { Assignment } from '@/types'
import { formatDateTime, getRelativeTime, isOverdue } from '@/lib/utils'
import { EmptyState } from '@/components/layout/empty-state'
import { TableLoading } from '@/components/layout/loading'

export default function AssignmentsPage() {
  const { user, isTrainer } = useAuth()
  const [assignments, setAssignments] = useState<Assignment[]>([])
  const [submittedIds, setSubmittedIds] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<'all' | 'open' | 'closed' | 'submitted'>('all')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAssignments()
        setAssignments(data)

        // Check which assignments user has submitted
        if (user && !isTrainer) {
          const submitted = new Set<string>()
          for (const assignment of data) {
            const submission = await getUserSubmission(assignment.id, user.uid)
            if (submission) {
              submitted.add(assignment.id)
            }
          }
          setSubmittedIds(submitted)
        }
      } catch (error) {
        console.error('Error fetching assignments:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [user, isTrainer])

  const filteredAssignments = assignments.filter((assignment) => {
    const matchesSearch = assignment.title
      .toLowerCase()
      .includes(search.toLowerCase())
    const overdue = isOverdue(new Date(assignment.dueAt))
    const submitted = submittedIds.has(assignment.id)

    if (filter === 'open') return matchesSearch && !overdue
    if (filter === 'closed') return matchesSearch && overdue
    if (filter === 'submitted') return matchesSearch && submitted
    return matchesSearch
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Bài tập</h1>
          <p className="text-muted-foreground">
            Quản lý và nộp bài tập
          </p>
        </div>
        {isTrainer && (
          <Link href="/assignments/new">
            <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600">
              <Plus className="mr-2 h-4 w-4" />
              Tạo bài tập
            </Button>
          </Link>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm bài tập..."
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Tabs value={filter} onValueChange={(v) => setFilter(v as typeof filter)}>
          <TabsList>
            <TabsTrigger value="all">Tất cả</TabsTrigger>
            <TabsTrigger value="open">Đang mở</TabsTrigger>
            <TabsTrigger value="closed">Đã đóng</TabsTrigger>
            {!isTrainer && <TabsTrigger value="submitted">Đã nộp</TabsTrigger>}
          </TabsList>
        </Tabs>
      </div>

      {/* Assignments List */}
      {loading ? (
        <TableLoading rows={5} />
      ) : filteredAssignments.length === 0 ? (
        <EmptyState
          icon={FileText}
          title="Chưa có bài tập nào"
          description={
            search
              ? 'Không tìm thấy bài tập phù hợp với từ khóa tìm kiếm'
              : 'Các bài tập sẽ được hiển thị ở đây'
          }
          action={
            isTrainer && !search ? (
              <Link href="/assignments/new">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Tạo bài tập đầu tiên
                </Button>
              </Link>
            ) : undefined
          }
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredAssignments.map((assignment) => {
            const overdue = isOverdue(new Date(assignment.dueAt))
            const submitted = submittedIds.has(assignment.id)
            const totalPoints = assignment.rubric.reduce(
              (sum, r) => sum + r.maxPoints,
              0
            )

            return (
              <Link key={assignment.id} href={`/assignments/${assignment.id}`}>
                <Card className="h-full hover:shadow-md transition-all hover:border-blue-500/50 cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className={`h-12 w-12 rounded-xl flex items-center justify-center ${
                          submitted
                            ? 'bg-green-100 dark:bg-green-900/30'
                            : overdue
                            ? 'bg-red-100 dark:bg-red-900/30'
                            : 'bg-blue-100 dark:bg-blue-900/30'
                        }`}
                      >
                        {submitted ? (
                          <CheckCircle className="h-6 w-6 text-green-600" />
                        ) : overdue ? (
                          <Clock className="h-6 w-6 text-red-600" />
                        ) : (
                          <FileText className="h-6 w-6 text-blue-600" />
                        )}
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <Badge variant={overdue ? 'destructive' : 'secondary'}>
                          {overdue ? 'Đã đóng' : 'Đang mở'}
                        </Badge>
                        {submitted && (
                          <Badge variant="success">Đã nộp</Badge>
                        )}
                      </div>
                    </div>
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                      {assignment.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                      {assignment.description}
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        {totalPoints} điểm
                      </span>
                      <span
                        className={
                          overdue ? 'text-red-500' : 'text-blue-500 font-medium'
                        }
                      >
                        {overdue
                          ? 'Quá hạn'
                          : getRelativeTime(new Date(assignment.dueAt))}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Deadline: {formatDateTime(new Date(assignment.dueAt))}
                    </p>
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
