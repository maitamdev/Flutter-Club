'use client'

import { useEffect, useState } from 'react'
import { Users, Search, Shield, UserX, UserCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'
import { useAuth } from '@/lib/hooks/useAuth'
import { getUsers, updateUser } from '@/lib/firebase/firestore'
import { User, UserRole, UserStatus } from '@/types'
import { formatDate } from '@/lib/utils'
import { EmptyState } from '@/components/layout/empty-state'
import { TableLoading } from '@/components/layout/loading'

export default function MembersPage() {
  const { isAdmin } = useAuth()
  const { toast } = useToast()
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState<string>('all')

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers()
        setUsers(data)
      } catch (error) {
        console.error('Error fetching users:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.studentId.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
    const matchesRole = roleFilter === 'all' || user.role === roleFilter
    return matchesSearch && matchesRole
  })

  const handleRoleChange = async (uid: string, newRole: UserRole) => {
    try {
      await updateUser(uid, { role: newRole })
      setUsers((prev) =>
        prev.map((u) => (u.uid === uid ? { ...u, role: newRole } : u))
      )
      toast({
        title: 'Cập nhật vai trò thành công',
      })
    } catch (error: any) {
      toast({
        title: 'Cập nhật thất bại',
        description: error.message,
        variant: 'destructive',
      })
    }
  }

  const handleStatusChange = async (uid: string, newStatus: UserStatus) => {
    try {
      await updateUser(uid, { status: newStatus })
      setUsers((prev) =>
        prev.map((u) => (u.uid === uid ? { ...u, status: newStatus } : u))
      )
      toast({
        title:
          newStatus === 'blocked'
            ? 'Đã khóa tài khoản'
            : 'Đã kích hoạt tài khoản',
      })
    } catch (error: any) {
      toast({
        title: 'Cập nhật thất bại',
        description: error.message,
        variant: 'destructive',
      })
    }
  }

  const getRoleBadge = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return <Badge className="bg-red-500">Admin</Badge>
      case 'trainer':
        return <Badge className="bg-blue-500">Trainer</Badge>
      default:
        return <Badge variant="secondary">Member</Badge>
    }
  }

  const getStatusBadge = (status: UserStatus) => {
    switch (status) {
      case 'active':
        return <Badge variant="success">Active</Badge>
      case 'blocked':
        return <Badge variant="destructive">Blocked</Badge>
      default:
        return <Badge variant="secondary">Pending</Badge>
    }
  }

  const stats = {
    total: users.length,
    active: users.filter((u) => u.status === 'active').length,
    trainers: users.filter((u) => u.role === 'trainer').length,
    admins: users.filter((u) => u.role === 'admin').length,
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
      <div>
        <h1 className="text-2xl font-bold">Quản lý thành viên</h1>
        <p className="text-muted-foreground">
          Quản lý tài khoản và phân quyền thành viên
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.total}</p>
                <p className="text-sm text-muted-foreground">Tổng thành viên</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <UserCheck className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.active}</p>
                <p className="text-sm text-muted-foreground">Đang hoạt động</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <Shield className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.trainers}</p>
                <p className="text-sm text-muted-foreground">Trainers</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                <Shield className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.admins}</p>
                <p className="text-sm text-muted-foreground">Admins</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm theo tên, MSSV, email..."
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Lọc theo vai trò" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả vai trò</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="trainer">Trainer</SelectItem>
            <SelectItem value="member">Member</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Users Table */}
      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-6">
              <TableLoading rows={5} />
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="p-6">
              <EmptyState
                icon={Users}
                title="Không tìm thấy thành viên"
                description="Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm"
              />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Họ tên</TableHead>
                  <TableHead>MSSV</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Vai trò</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead>Ngày tham gia</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.uid}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.studentId}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{getRoleBadge(user.role)}</TableCell>
                    <TableCell>{getStatusBadge(user.status)}</TableCell>
                    <TableCell>
                      {formatDate(new Date(user.createdAt))}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            Thao tác
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Đổi vai trò</DropdownMenuLabel>
                          <DropdownMenuItem
                            onClick={() => handleRoleChange(user.uid, 'member')}
                          >
                            Member
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleRoleChange(user.uid, 'trainer')}
                          >
                            Trainer
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleRoleChange(user.uid, 'admin')}
                          >
                            Admin
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuLabel>Trạng thái</DropdownMenuLabel>
                          {user.status === 'blocked' ? (
                            <DropdownMenuItem
                              onClick={() =>
                                handleStatusChange(user.uid, 'active')
                              }
                            >
                              <UserCheck className="mr-2 h-4 w-4" />
                              Kích hoạt
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem
                              onClick={() =>
                                handleStatusChange(user.uid, 'blocked')
                              }
                              className="text-destructive"
                            >
                              <UserX className="mr-2 h-4 w-4" />
                              Khóa tài khoản
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
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
