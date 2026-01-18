'use client'

import { useEffect, useState } from 'react'
import { Users, Search, Shield, UserX, UserCheck, Crown, GraduationCap, User, Trash2 } from 'lucide-react'
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useToast } from '@/components/ui/use-toast'
import { useAuth } from '@/lib/hooks/useAuth'
import { getUsers, updateUser, deleteUser } from '@/lib/firebase/firestore'
import { User as UserType, UserRole, UserStatus } from '@/types'
import { formatDate } from '@/lib/utils'
import { EmptyState } from '@/components/layout/empty-state'
import { TableLoading } from '@/components/layout/loading'

export default function MembersPage() {
  const { isAdmin } = useAuth()
  const { toast } = useToast()
  const [users, setUsers] = useState<UserType[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState<string>('all')
  const [mounted, setMounted] = useState(false)
  const [memberToDelete, setMemberToDelete] = useState<UserType | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

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

  const handleDeleteMember = async (uid: string) => {
    try {
      await deleteUser(uid)
      setUsers((prev) => prev.filter((u) => u.uid !== uid))
      setMemberToDelete(null)
      toast({
        title: 'Xóa thành viên thành công',
      })
    } catch (error: any) {
      toast({
        title: 'Xóa thất bại',
        description: error.message,
        variant: 'destructive',
      })
    }
  }

  const getRoleBadge = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return (
          <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
            <Crown className="h-3 w-3 mr-1" />
            Admin
          </Badge>
        )
      case 'trainer':
        return (
          <Badge className="bg-gradient-to-r from-navy-600 to-navy-700 text-white border-0">
            <GraduationCap className="h-3 w-3 mr-1" />
            Trainer
          </Badge>
        )
      default:
        return (
          <Badge className="bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 border-0">
            <User className="h-3 w-3 mr-1" />
            Member
          </Badge>
        )
    }
  }

  const getStatusBadge = (status: UserStatus) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-0">Active</Badge>
      case 'blocked':
        return <Badge className="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-0">Blocked</Badge>
      default:
        return <Badge className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-0">Pending</Badge>
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
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
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className={`transition-all duration-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div className="flex items-center gap-2 mb-1">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center shadow-lg">
            <Users className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-2xl font-bold">Quản lý thành viên</h1>
        </div>
        <p className="text-muted-foreground ml-12">
          Quản lý tài khoản và phân quyền thành viên
        </p>
      </div>

      {/* Stats */}
      <div className={`grid gap-4 grid-cols-2 lg:grid-cols-4 transition-all duration-500 delay-100 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <Card className="border-0 shadow-lg overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-navy-600 to-navy-700" />
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-navy-600 to-navy-700 flex items-center justify-center shadow-lg">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-3xl font-bold">{stats.total}</p>
                <p className="text-sm text-muted-foreground">Tổng thành viên</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-emerald-500 to-green-500" />
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center shadow-lg">
                <UserCheck className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-3xl font-bold">{stats.active}</p>
                <p className="text-sm text-muted-foreground">Đang hoạt động</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-blue-500 to-indigo-500" />
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center shadow-lg">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-3xl font-bold">{stats.trainers}</p>
                <p className="text-sm text-muted-foreground">Trainers</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-purple-500 to-pink-500" />
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                <Crown className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-3xl font-bold">{stats.admins}</p>
                <p className="text-sm text-muted-foreground">Admins</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className={`flex flex-col sm:flex-row gap-4 transition-all duration-500 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm theo tên, MSSV, email..."
            className="pl-11 h-11 rounded-xl border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-full sm:w-[180px] h-11 rounded-xl">
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
      <Card className={`border-0 shadow-lg overflow-hidden transition-all duration-500 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
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
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <TableHead className="font-semibold">Thành viên</TableHead>
                    <TableHead className="font-semibold hidden sm:table-cell">MSSV</TableHead>
                    <TableHead className="font-semibold hidden md:table-cell">Email</TableHead>
                    <TableHead className="font-semibold">Vai trò</TableHead>
                    <TableHead className="font-semibold hidden sm:table-cell">Trạng thái</TableHead>
                    <TableHead className="font-semibold hidden lg:table-cell">Ngày tham gia</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.uid} className="group">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10 ring-2 ring-gray-100 dark:ring-gray-800">
                            <AvatarImage src={user.photoURL} />
                            <AvatarFallback className={`text-white text-sm font-bold ${
                              user.role === 'admin' ? 'bg-gradient-to-br from-purple-500 to-pink-500' :
                              user.role === 'trainer' ? 'bg-gradient-to-br from-navy-600 to-navy-700' :
                              'bg-gradient-to-br from-gray-400 to-gray-500'
                            }`}>
                              {getInitials(user.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-xs text-muted-foreground sm:hidden">{user.studentId}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">{user.studentId}</TableCell>
                      <TableCell className="hidden md:table-cell text-muted-foreground">{user.email}</TableCell>
                      <TableCell>{getRoleBadge(user.role)}</TableCell>
                      <TableCell className="hidden sm:table-cell">{getStatusBadge(user.status)}</TableCell>
                      <TableCell className="hidden lg:table-cell text-muted-foreground">
                        {formatDate(new Date(user.createdAt))}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                              Thao tác
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuLabel>Đổi vai trò</DropdownMenuLabel>
                            <DropdownMenuItem
                              onClick={() => handleRoleChange(user.uid, 'member')}
                              className="cursor-pointer"
                            >
                              <User className="mr-2 h-4 w-4" />
                              Member
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleRoleChange(user.uid, 'trainer')}
                              className="cursor-pointer"
                            >
                              <GraduationCap className="mr-2 h-4 w-4" />
                              Trainer
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleRoleChange(user.uid, 'admin')}
                              className="cursor-pointer"
                            >
                              <Crown className="mr-2 h-4 w-4" />
                              Admin
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuLabel>Trạng thái</DropdownMenuLabel>
                            {user.status === 'blocked' ? (
                              <DropdownMenuItem
                                onClick={() =>
                                  handleStatusChange(user.uid, 'active')
                                }
                                className="cursor-pointer text-emerald-600"
                              >
                                <UserCheck className="mr-2 h-4 w-4" />
                                Kích hoạt
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem
                                onClick={() =>
                                  handleStatusChange(user.uid, 'blocked')
                                }
                                className="cursor-pointer text-red-600"
                              >
                                <UserX className="mr-2 h-4 w-4" />
                                Khóa tài khoản
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => setMemberToDelete(user)}
                              className="cursor-pointer text-red-600"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Xóa thành viên
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!memberToDelete} onOpenChange={(open) => !open && setMemberToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xóa thành viên?</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn xóa thành viên <span className="font-semibold">{memberToDelete?.name}</span>? Hành động này không thể hoàn tác.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex gap-2">
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => memberToDelete && handleDeleteMember(memberToDelete.uid)}
              className="bg-red-600 hover:bg-red-700"
            >
              Xóa
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
