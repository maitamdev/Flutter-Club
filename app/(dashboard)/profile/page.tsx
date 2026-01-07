'use client'

import { User, Mail, Hash, Calendar, Shield } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { useAuth } from '@/lib/hooks/useAuth'
import { formatDate } from '@/lib/utils'

export default function ProfilePage() {
  const { user } = useAuth()

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

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Hồ sơ cá nhân</h1>
        <p className="text-muted-foreground">
          Thông tin tài khoản của bạn
        </p>
      </div>

      <Card>
        <CardContent className="p-8">
          <div className="flex flex-col items-center text-center">
            <Avatar className="h-24 w-24 mb-4">
              <AvatarImage src={user.photoURL} alt={user.name} />
              <AvatarFallback className="text-2xl bg-gradient-to-br from-blue-500 to-cyan-400 text-white">
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <Badge className="mt-2" variant="secondary">
              {getRoleName(user.role)}
            </Badge>
          </div>

          <Separator className="my-6" />

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <Mail className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <Hash className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Mã số sinh viên</p>
                <p className="font-medium">{user.studentId}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <Shield className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Vai trò</p>
                <p className="font-medium">{getRoleName(user.role)}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                <Calendar className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Ngày tham gia</p>
                <p className="font-medium">
                  {formatDate(new Date(user.createdAt))}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
