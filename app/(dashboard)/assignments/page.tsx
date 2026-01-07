'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Plus, FileText, Search, Clock, CheckCircle, Award, ArrowRight } from 'lucide-react'
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
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAssignments()
        setAssignments(data)

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
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 transition-all duration-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg">
              <FileText className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold">Bài tập</h1>
          </div>
          <p className="text-muted-foreground ml-12">
            Quản lý và nộp bài tập
          </p>
        </div>
        {isTrainer && (
          <Link href="/assignments/new">
            <Button className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-lg shadow-emerald-500/25 rounded-xl h-11">
              <Plus className="mr-2 h-4 w-4" />
              Tạo bài tập
            </Button>
          </Link>
        )}
      </div>

      {/* Filters */}
      <div className={`flex flex-col sm:flex-row gap-4 transition-all duration-500 delay-100 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm bài tập..."
            className="pl-11 h-11 rounded-xl border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Tabs value={filter} onValueChange={(v) => setFilter(v as typeof filter)}>
          <TabsList className="h-11 p-1 bg-gray-100 dark:bg-gray-800 rounded-xl">
            <TabsTrigger value="all" className="rounded-lg px-3">Tất cả</TabsTrigger>
            <TabsTrigger value="open" className="rounded-lg px-3">Đang mở</TabsTrigger>
            <TabsTrigger value="closed" className="rounded-lg px-3">Đã đóng</TabsTrigger>
            {!isTrainer && <TabsTrigger value="submitted" className="rounded-lg px-3">Đã nộp</TabsTrigger>}
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
                <Button className="rounded-xl">
                  <Plus className="mr-2 h-4 w-4" />
                  Tạo bài tập đầu tiên
                </Button>
              </Link>
            ) : undefined
          }
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredAssignments.map((assignment, index) => {
            const overdue = isOverdue(new Date(assignment.dueAt))
            const submitted = submittedIds.has(assignment.id)
            const totalPoints = assignment.rubric.reduce(
              (sum, r) => sum + r.maxPoints,
              0
            )

            return (
              <Link key={assignment.id} href={`/assignments/${assignment.id}`}>
                <Card 
                  className={`group h-full cursor-pointer border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                  style={{ transitionDelay: `${(index + 2) * 50}ms` }}
                >
                  <CardContent className="p-0">
                    {/* Header gradient */}
                    <div className={`h-2 ${
                      submitted 
                        ? 'bg-gradient-to-r from-emerald-500 to-green-500' 
                        : overdue 
                        ? 'bg-gradient-to-r from-red-500 to-pink-500'
                        : 'bg-gradient-to-r from-emerald-500 to-teal-600'
                    }`} />
                    
                    <div className="p-5">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`h-12 w-12 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform ${
                          submitted
                            ? 'bg-gradient-to-br from-emerald-500 to-green-500'
                            : overdue
                            ? 'bg-gradient-to-br from-red-500 to-pink-500'
                            : 'bg-gradient-to-br from-emerald-500 to-teal-600'
                        }`}>
                          {submitted ? (
                            <CheckCircle className="h-6 w-6 text-white" />
                          ) : overdue ? (
                            <Clock className="h-6 w-6 text-white" />
                          ) : (
                            <FileText className="h-6 w-6 text-white" />
                          )}
                        </div>
                        <div className="flex flex-col items-end gap-1.5">
                          <Badge className={`border-0 font-medium ${
                            overdue 
                              ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' 
                              : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                          }`}>
                            {overdue ? 'Đã đóng' : 'Đang mở'}
                          </Badge>
                          {submitted && (
                            <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-0">
                              ✓ Đã nộp
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                        {assignment.title}
                      </h3>
                      
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                        {assignment.description || 'Không có mô tả'}
                      </p>
                      
                      <div className="flex items-center gap-3 mb-4">
                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-100 dark:bg-amber-900/30">
                          <Award className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                          <span className="text-sm font-medium text-amber-700 dark:text-amber-400">{totalPoints} điểm</span>
                        </div>
                      </div>
                      
                      <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">
                            Deadline: {formatDateTime(new Date(assignment.dueAt))}
                          </span>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <span className={`text-sm font-medium ${
                            overdue ? 'text-red-500' : 'text-emerald-600 dark:text-emerald-400'
                          }`}>
                            {overdue ? 'Quá hạn' : getRelativeTime(new Date(assignment.dueAt))}
                          </span>
                          <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
                        </div>
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
