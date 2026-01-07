'use client'

import { useEffect, useState } from 'react'
import { UserPlus, Check, X, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useToast } from '@/components/ui/use-toast'
import { useAuth } from '@/lib/hooks/useAuth'
import {
  subscribeToAccessRequests,
  updateAccessRequest,
} from '@/lib/firebase/firestore'
import { notifyAccessRequestResult } from '@/lib/utils/notifications'
import { createUserDocument } from '@/lib/firebase/auth'
import { AccessRequest, AccessRequestStatus } from '@/types'
import { formatDateTime } from '@/lib/utils'
import { EmptyState } from '@/components/layout/empty-state'
import { TableLoading } from '@/components/layout/loading'

export default function AccessRequestsPage() {
  const { user, isAdmin } = useAuth()
  const { toast } = useToast()
  const [requests, setRequests] = useState<AccessRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'pending' | 'approved' | 'rejected'>('pending')
  const [processing, setProcessing] = useState<string | null>(null)

  // Realtime listener
  useEffect(() => {
    setLoading(true)
    const unsubscribe = subscribeToAccessRequests(filter, (data) => {
      setRequests(data)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [filter])

  const handleApprove = async (request: AccessRequest) => {
    if (!user) return

    setProcessing(request.id)
    try {
      // Create user document
      await createUserDocument(request.uid, {
        name: request.name,
        studentId: request.studentId,
        email: request.email,
        role: 'member',
        status: 'active',
      })

      // Update request status
      await updateAccessRequest(request.id, {
        status: 'approved',
        reviewedBy: user.uid,
      })

      // Gửi thông báo cho user
      await notifyAccessRequestResult(request.uid, true)

      toast({
        title: 'Đã duyệt yêu cầu',
        description: `${request.name} đã được thêm vào CLB`,
      })
    } catch (error: any) {
      toast({
        title: 'Duyệt thất bại',
        description: error.message,
        variant: 'destructive',
      })
    } finally {
      setProcessing(null)
    }
  }

  const handleReject = async (request: AccessRequest) => {
    if (!user) return

    setProcessing(request.id)
    try {
      await updateAccessRequest(request.id, {
        status: 'rejected',
        reviewedBy: user.uid,
      })

      // Gửi thông báo cho user
      await notifyAccessRequestResult(request.uid, false)

      toast({
        title: 'Đã từ chối yêu cầu',
      })
    } catch (error: any) {
      toast({
        title: 'Từ chối thất bại',
        description: error.message,
        variant: 'destructive',
      })
    } finally {
      setProcessing(null)
    }
  }

  const getStatusBadge = (status: AccessRequestStatus) => {
    switch (status) {
      case 'approved':
        return <Badge variant="success">Đã duyệt</Badge>
      case 'rejected':
        return <Badge variant="destructive">Đã từ chối</Badge>
      default:
        return <Badge variant="secondary">Chờ duyệt</Badge>
    }
  }

  if (!isAdmin) {
    return (
      <EmptyState
        icon={Shield}
        title="Không có quyền truy cập"
        description="Bạn cần quyền Admin để xem trang này"
      />
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Yêu cầu tham gia</h1>
          <p className="text-muted-foreground">
            Duyệt các yêu cầu tham gia CLB (realtime)
          </p>
        </div>
        {filter === 'pending' && requests.length > 0 && (
          <Badge variant="secondary" className="text-lg px-3 py-1">
            {requests.length} yêu cầu mới
          </Badge>
        )}
      </div>

      {/* Filter */}
      <Tabs value={filter} onValueChange={(v) => setFilter(v as typeof filter)}>
        <TabsList>
          <TabsTrigger value="pending">Chờ duyệt</TabsTrigger>
          <TabsTrigger value="approved">Đã duyệt</TabsTrigger>
          <TabsTrigger value="rejected">Đã từ chối</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Requests Table */}
      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-6">
              <TableLoading rows={5} />
            </div>
          ) : requests.length === 0 ? (
            <div className="p-6">
              <EmptyState
                icon={UserPlus}
                title={
                  filter === 'pending'
                    ? 'Không có yêu cầu nào đang chờ'
                    : `Không có yêu cầu nào đã ${
                        filter === 'approved' ? 'duyệt' : 'từ chối'
                      }`
                }
                description="Các yêu cầu tham gia CLB sẽ hiển thị ở đây"
              />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Họ tên</TableHead>
                  <TableHead>MSSV</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Thời gian</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  {filter === 'pending' && <TableHead></TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {requests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell className="font-medium">{request.name}</TableCell>
                    <TableCell>{request.studentId}</TableCell>
                    <TableCell>{request.email}</TableCell>
                    <TableCell>
                      {formatDateTime(new Date(request.createdAt))}
                    </TableCell>
                    <TableCell>{getStatusBadge(request.status)}</TableCell>
                    {filter === 'pending' && (
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleApprove(request)}
                            disabled={processing === request.id}
                            className="bg-green-500 hover:bg-green-600"
                          >
                            <Check className="mr-1 h-4 w-4" />
                            Duyệt
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleReject(request)}
                            disabled={processing === request.id}
                          >
                            <X className="mr-1 h-4 w-4" />
                            Từ chối
                          </Button>
                        </div>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
