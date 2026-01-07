'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { User, Mail, Hash, Calendar, Shield, Edit3, Save, X, Loader2, Camera, Phone, MapPin } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { useToast } from '@/components/ui/use-toast'
import { useAuth } from '@/lib/hooks/useAuth'
import { updateUser } from '@/lib/firebase/firestore'
import { formatDate } from '@/lib/utils'

const profileSchema = z.object({
  name: z.string().min(2, 'Họ tên phải có ít nhất 2 ký tự'),
  studentId: z.string().min(5, 'MSSV phải có ít nhất 5 ký tự'),
  phone: z.string().optional(),
  address: z.string().optional(),
})

type ProfileFormData = z.infer<typeof profileSchema>

export default function ProfilePage() {
  const { user, refreshUser } = useAuth()
  const { toast } = useToast()
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || '',
      studentId: user?.studentId || '',
      phone: user?.phone || '',
      address: user?.address || '',
    },
  })

  useEffect(() => {
    if (user) {
      reset({
        name: user.name || '',
        studentId: user.studentId || '',
        phone: user.phone || '',
        address: user.address || '',
      })
    }
  }, [user, reset])

  if (!user) return null

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const getRoleName = (role: string) => {
    switch (role) {
      case 'admin':
        return 'Quản trị viên'
      case 'trainer':
        return 'Giảng viên'
      default:
        return 'Thành viên'
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-gradient-to-r from-purple-500 to-pink-500'
      case 'trainer':
        return 'bg-gradient-to-r from-blue-500 to-cyan-500'
      default:
        return 'bg-gradient-to-r from-emerald-500 to-teal-500'
    }
  }

  const onSubmit = async (data: ProfileFormData) => {
    setSaving(true)
    try {
      await updateUser(user.uid, {
        name: data.name,
        studentId: data.studentId,
        phone: data.phone || '',
        address: data.address || '',
      })
      
      if (refreshUser) {
        await refreshUser()
      }
      
      toast({
        title: 'Cập nhật thành công',
        description: 'Thông tin cá nhân đã được cập nhật',
      })
      setEditing(false)
    } catch (error: any) {
      toast({
        title: 'Cập nhật thất bại',
        description: error.message || 'Vui lòng thử lại sau',
        variant: 'destructive',
      })
    } finally {
      setSaving(false)
    }
  }

  const handleCancel = () => {
    reset({
      name: user.name || '',
      studentId: user.studentId || '',
      phone: user.phone || '',
      address: user.address || '',
    })
    setEditing(false)
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-8">
      {/* Header */}
      <div className={`transition-all duration-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div className="flex items-center gap-2 mb-1">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center shadow-lg">
            <User className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-2xl font-bold">Hồ sơ cá nhân</h1>
        </div>
        <p className="text-muted-foreground ml-12">
          Quản lý thông tin tài khoản của bạn
        </p>
      </div>

      {/* Profile Card */}
      <Card className={`border-0 shadow-lg overflow-hidden transition-all duration-500 delay-100 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        {/* Banner */}
        <div className={`h-32 ${getRoleColor(user.role)}`}>
          <div className="h-full w-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yIDItNCAyLTRzLTItMi00LTJjMCAwLTItMi0yLTRzMi00IDItNCAyIDIgNCAyYzAgMCAyIDIgMiA0cy0yIDQtMiA0LTIgMi00IDJjMCAwLTIgMi0yIDRzMiA0IDIgNCIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />
        </div>

        <CardContent className="relative px-6 pb-6">
          {/* Avatar */}
          <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-16 mb-6">
            <div className="relative">
              <Avatar className="h-28 w-28 ring-4 ring-white dark:ring-gray-900 shadow-xl">
                <AvatarImage src={user.photoURL} alt={user.name} />
                <AvatarFallback className={`text-3xl text-white ${getRoleColor(user.role)}`}>
                  {getInitials(user.name)}
                </AvatarFallback>
              </Avatar>
              <button className="absolute bottom-1 right-1 h-8 w-8 rounded-full bg-white dark:bg-gray-800 shadow-lg flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <Camera className="h-4 w-4 text-gray-600 dark:text-gray-400" />
              </button>
            </div>
            <div className="flex-1 sm:pb-2">
              <h2 className="text-2xl font-bold">{user.name}</h2>
              <div className="flex items-center gap-2 mt-1">
                <Badge className={`${getRoleColor(user.role)} text-white border-0`}>
                  {getRoleName(user.role)}
                </Badge>
                <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-0">
                  Active
                </Badge>
              </div>
            </div>
            {!editing && (
              <Button 
                onClick={() => setEditing(true)}
                className="rounded-xl"
                variant="outline"
              >
                <Edit3 className="h-4 w-4 mr-2" />
                Chỉnh sửa
              </Button>
            )}
          </div>

          <Separator className="my-6" />

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-6 sm:grid-cols-2">
              {/* Name */}
              <div className="space-y-2">
                <Label className="text-muted-foreground text-sm">Họ và tên</Label>
                {editing ? (
                  <div>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        className="pl-10 h-11 rounded-xl"
                        {...register('name')}
                      />
                    </div>
                    {errors.name && (
                      <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                    <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                      <User className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <p className="font-medium">{user.name}</p>
                  </div>
                )}
              </div>

              {/* Student ID */}
              <div className="space-y-2">
                <Label className="text-muted-foreground text-sm">Mã số sinh viên</Label>
                {editing ? (
                  <div>
                    <div className="relative">
                      <Hash className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        className="pl-10 h-11 rounded-xl"
                        {...register('studentId')}
                      />
                    </div>
                    {errors.studentId && (
                      <p className="text-sm text-red-500 mt-1">{errors.studentId.message}</p>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                    <div className="h-10 w-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                      <Hash className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <p className="font-medium">{user.studentId}</p>
                  </div>
                )}
              </div>

              {/* Email - Read only */}
              <div className="space-y-2">
                <Label className="text-muted-foreground text-sm">Email</Label>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                  <div className="h-10 w-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                    <Mail className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <p className="font-medium truncate">{user.email}</p>
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label className="text-muted-foreground text-sm">Số điện thoại</Label>
                {editing ? (
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      className="pl-10 h-11 rounded-xl"
                      placeholder="0123456789"
                      {...register('phone')}
                    />
                  </div>
                ) : (
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                    <div className="h-10 w-10 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                      <Phone className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                    </div>
                    <p className="font-medium">{user.phone || 'Chưa cập nhật'}</p>
                  </div>
                )}
              </div>

              {/* Address */}
              <div className="space-y-2 sm:col-span-2">
                <Label className="text-muted-foreground text-sm">Địa chỉ</Label>
                {editing ? (
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      className="pl-10 h-11 rounded-xl"
                      placeholder="Địa chỉ của bạn"
                      {...register('address')}
                    />
                  </div>
                ) : (
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                    <div className="h-10 w-10 rounded-lg bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-pink-600 dark:text-pink-400" />
                    </div>
                    <p className="font-medium">{user.address || 'Chưa cập nhật'}</p>
                  </div>
                )}
              </div>

              {/* Role - Read only */}
              <div className="space-y-2">
                <Label className="text-muted-foreground text-sm">Vai trò</Label>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                  <div className="h-10 w-10 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                    <Shield className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <p className="font-medium">{getRoleName(user.role)}</p>
                </div>
              </div>

              {/* Join Date - Read only */}
              <div className="space-y-2">
                <Label className="text-muted-foreground text-sm">Ngày tham gia</Label>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                  <div className="h-10 w-10 rounded-lg bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
                  </div>
                  <p className="font-medium">{formatDate(new Date(user.createdAt))}</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            {editing && (
              <div className="flex gap-3 mt-6 pt-6 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  className="flex-1 h-11 rounded-xl"
                  disabled={saving}
                >
                  <X className="h-4 w-4 mr-2" />
                  Hủy
                </Button>
                <Button
                  type="submit"
                  className="flex-1 h-11 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                  disabled={saving}
                >
                  {saving ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Lưu thay đổi
                    </>
                  )}
                </Button>
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
