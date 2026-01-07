'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  FileText,
  ExternalLink,
  QrCode,
  CheckCircle,
  Users,
  Download,
  Loader2,
  Play,
  Square,
  Upload,
  Trash2,
  Video,
  File,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useToast } from '@/components/ui/use-toast'
import { useAuth } from '@/lib/hooks/useAuth'
import {
  getSession,
  getAttendanceWindow,
  startAttendanceWindow,
  endAttendanceWindow,
  subscribeToAttendance,
  getUserAttendance,
  updateSession,
} from '@/lib/firebase/firestore'
import { uploadToCloudinary, CLOUDINARY_CLOUD_NAME } from '@/lib/cloudinary/config'
import { Session, Attendance, AttendanceWindow } from '@/types'
import { formatDateTime, formatTime, downloadExcel } from '@/lib/utils'
import { PageLoading } from '@/components/layout/loading'
import { QRScanner } from '@/components/attendance/qr-scanner'

export default function SessionDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const { user, isTrainer } = useAuth()
  const sessionId = params.id as string

  const [session, setSession] = useState<Session | null>(null)
  const [attendanceWindow, setAttendanceWindow] = useState<AttendanceWindow | null>(null)
  const [attendance, setAttendance] = useState<Attendance[]>([])
  const [userAttendance, setUserAttendance] = useState<Attendance | null>(null)
  const [loading, setLoading] = useState(true)
  const [startingCheckin, setStartingCheckin] = useState(false)
  const [showScanner, setShowScanner] = useState(false)
  const [uploadingMaterial, setUploadingMaterial] = useState(false)
  const [materialTitle, setMaterialTitle] = useState('')
  const [materialFile, setMaterialFile] = useState<File | null>(null)
  const [materialUrl, setMaterialUrl] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [sessionData, windowData] = await Promise.all([
          getSession(sessionId),
          getAttendanceWindow(sessionId),
        ])

        if (!sessionData) {
          router.push('/sessions')
          return
        }

        setSession(sessionData)
        setAttendanceWindow(windowData)

        if (user) {
          const userAtt = await getUserAttendance(sessionId, user.uid)
          setUserAttendance(userAtt)
        }
      } catch (error) {
        console.error('Error fetching session:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [sessionId, user, router])

  // Subscribe to realtime attendance updates
  useEffect(() => {
    const unsubscribe = subscribeToAttendance(sessionId, (data) => {
      setAttendance(data)
    })

    return () => unsubscribe()
  }, [sessionId])

  const handleStartCheckin = async () => {
    setStartingCheckin(true)
    try {
      const result = await startAttendanceWindow(sessionId)
      setAttendanceWindow({
        sessionId,
        isActive: true,
        startedAt: new Date(),
        endsAt: result.endsAt,
        tokenSeed: result.tokenSeed,
        tokenRotatesEverySec: 10,
      })
      toast({
        title: 'Đã bắt đầu điểm danh',
        description: 'Mã QR và mã dự phòng thay đổi mỗi 10 giây',
      })
    } catch (error: any) {
      toast({
        title: 'Lỗi',
        description: error.message,
        variant: 'destructive',
      })
    } finally {
      setStartingCheckin(false)
    }
  }

  const handleEndCheckin = async () => {
    try {
      await endAttendanceWindow(sessionId)
      setAttendanceWindow((prev) => (prev ? { ...prev, isActive: false } : null))
      toast({
        title: 'Đã kết thúc điểm danh',
      })
    } catch (error: any) {
      toast({
        title: 'Lỗi',
        description: error.message,
        variant: 'destructive',
      })
    }
  }

  const handleExportExcel = () => {
    downloadExcel(
      attendance.map((a) => ({
        name: a.userName || '',
        studentId: a.studentId || '',
        checkedAt: formatDateTime(new Date(a.checkedAt)),
        status: a.status === 'on-time' ? 'Đúng giờ' : 'Muộn',
      })),
      [
        { key: 'name', label: 'Họ tên' },
        { key: 'studentId', label: 'MSSV' },
        { key: 'checkedAt', label: 'Thời gian' },
        { key: 'status', label: 'Trạng thái' },
      ],
      `diem-danh-${session?.title || sessionId}.xlsx`,
      'Điểm danh'
    )
  }

  const handleCheckinSuccess = () => {
    setShowScanner(false)
    if (user) {
      getUserAttendance(sessionId, user.uid).then(setUserAttendance)
    }
  }

  const handleAddMaterial = async () => {
    if (!materialTitle.trim()) {
      toast({
        title: 'Lỗi',
        description: 'Vui lòng nhập tiêu đề tài liệu',
        variant: 'destructive',
      })
      return
    }

    if (!materialFile && !materialUrl.trim()) {
      toast({
        title: 'Lỗi',
        description: 'Vui lòng upload file hoặc nhập URL',
        variant: 'destructive',
      })
      return
    }

    setUploadingMaterial(true)
    try {
      let url = materialUrl.trim()
      
      if (materialFile) {
        if (!CLOUDINARY_CLOUD_NAME) {
          toast({
            title: 'Lỗi',
            description: 'Cloudinary chưa được cấu hình. Vui lòng nhập URL thay vì upload file.',
            variant: 'destructive',
          })
          setUploadingMaterial(false)
          return
        }
        url = await uploadToCloudinary(materialFile)
      }

      const newMaterial = { title: materialTitle.trim(), url }
      const updatedMaterials = [...(session?.materials || []), newMaterial]
      
      await updateSession(sessionId, { materials: updatedMaterials })
      
      setSession((prev) => prev ? { ...prev, materials: updatedMaterials } : null)
      setMaterialTitle('')
      setMaterialFile(null)
      setMaterialUrl('')
      
      toast({
        title: 'Thêm tài liệu thành công',
      })
    } catch (error: any) {
      toast({
        title: 'Lỗi',
        description: error.message,
        variant: 'destructive',
      })
    } finally {
      setUploadingMaterial(false)
    }
  }

  const handleRemoveMaterial = async (index: number) => {
    if (!session) return
    
    try {
      const updatedMaterials = session.materials.filter((_, i) => i !== index)
      await updateSession(sessionId, { materials: updatedMaterials })
      setSession((prev) => prev ? { ...prev, materials: updatedMaterials } : null)
      toast({
        title: 'Đã xóa tài liệu',
      })
    } catch (error: any) {
      toast({
        title: 'Lỗi',
        description: error.message,
        variant: 'destructive',
      })
    }
  }

  const getDownloadUrl = (url: string) => {
    // Add fl_attachment to Cloudinary URLs to force download
    if (url.includes('cloudinary.com')) {
      return url.replace('/upload/', '/upload/fl_attachment/')
    }
    return url
  }

  const getFileIcon = (url: string) => {
    const lower = url.toLowerCase()
    if (lower.includes('youtube') || lower.includes('youtu.be') || lower.match(/\.(mp4|webm|mov)$/)) {
      return <Video className="h-4 w-4 text-red-500" />
    }
    return <File className="h-4 w-4 text-blue-500" />
  }

  if (loading) {
    return <PageLoading />
  }

  if (!session) {
    return null
  }

  const isActive = attendanceWindow?.isActive && new Date(attendanceWindow.endsAt) > new Date()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <Link href="/sessions">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold">{session.title}</h1>
            <p className="text-muted-foreground">
              {formatDateTime(new Date(session.startsAt))}
            </p>
          </div>
        </div>

        {isTrainer && (
          <div className="flex gap-2">
            {isActive ? (
              <>
                <Link href={`/sessions/${sessionId}/checkin-display`}>
                  <Button variant="outline">
                    <QrCode className="mr-2 h-4 w-4" />
                    Hiển thị QR
                  </Button>
                </Link>
                <Button variant="destructive" onClick={handleEndCheckin}>
                  <Square className="mr-2 h-4 w-4" />
                  Kết thúc điểm danh
                </Button>
              </>
            ) : (
              <Button
                onClick={handleStartCheckin}
                disabled={startingCheckin}
                className="bg-gradient-to-r from-green-500 to-emerald-500"
              >
                {startingCheckin ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Play className="mr-2 h-4 w-4" />
                )}
                Bắt đầu điểm danh
              </Button>
            )}
          </div>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Session Info */}
          <Card>
            <CardHeader>
              <CardTitle>Thông tin buổi học</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">{session.description}</p>

              <Separator />

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Ngày</p>
                    <p className="font-medium">
                      {new Date(session.startsAt).toLocaleDateString('vi-VN', {
                        weekday: 'long',
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <Clock className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Thời gian</p>
                    <p className="font-medium">
                      {formatTime(new Date(session.startsAt))} -{' '}
                      {formatTime(new Date(session.endsAt))}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                    <User className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Giảng viên</p>
                    <p className="font-medium">{session.trainerName || 'N/A'}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                    <Users className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Điểm danh</p>
                    <p className="font-medium">{attendance.length} người</p>
                  </div>
                </div>
              </div>

              {/* Materials */}
              {session.materials && session.materials.length > 0 && (
                <>
                  <Separator />
                  <div>
                    <h4 className="font-medium mb-3 flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Tài liệu ({session.materials.length})
                    </h4>
                    <div className="space-y-2">
                      {session.materials.map((material, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                        >
                          <a
                            href={material.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm text-blue-600 hover:underline flex-1"
                          >
                            {getFileIcon(material.url)}
                            {material.title}
                          </a>
                          <div className="flex items-center gap-1">
                            <a
                              href={getDownloadUrl(material.url)}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-blue-500 hover:text-blue-600 hover:bg-blue-100"
                              >
                                <Download className="h-4 w-4" />
                              </Button>
                            </a>
                            {isTrainer && (
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-100"
                                onClick={() => handleRemoveMaterial(index)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* Add Material Form (Trainer only) */}
              {isTrainer && (
                <>
                  <Separator />
                  <div>
                    <h4 className="font-medium mb-3 flex items-center gap-2">
                      <Upload className="h-4 w-4" />
                      Thêm tài liệu mới
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor="materialTitle">Tiêu đề</Label>
                        <Input
                          id="materialTitle"
                          placeholder="VD: Slide bài giảng tuần 1"
                          value={materialTitle}
                          onChange={(e) => setMaterialTitle(e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="materialFile">Upload file</Label>
                        <Input
                          id="materialFile"
                          type="file"
                          onChange={(e) => {
                            setMaterialFile(e.target.files?.[0] || null)
                            if (e.target.files?.[0]) setMaterialUrl('')
                          }}
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          Hỗ trợ: PDF, Word, PowerPoint, hình ảnh, video (tối đa 100MB)
                        </p>
                      </div>
                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs">
                          <span className="bg-card px-2 text-muted-foreground">hoặc nhập URL</span>
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="materialUrl">URL (YouTube, Google Drive, ...)</Label>
                        <Input
                          id="materialUrl"
                          placeholder="https://..."
                          value={materialUrl}
                          onChange={(e) => {
                            setMaterialUrl(e.target.value)
                            if (e.target.value) setMaterialFile(null)
                          }}
                        />
                      </div>
                      <Button
                        onClick={handleAddMaterial}
                        disabled={uploadingMaterial}
                        className="w-full"
                      >
                        {uploadingMaterial ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <Upload className="mr-2 h-4 w-4" />
                        )}
                        Thêm tài liệu
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Attendance List */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Danh sách điểm danh</CardTitle>
                <CardDescription>
                  {attendance.length} người đã điểm danh
                </CardDescription>
              </div>
              {isTrainer && attendance.length > 0 && (
                <Button variant="outline" size="sm" onClick={handleExportExcel}>
                  <Download className="mr-2 h-4 w-4" />
                  Xuất Excel
                </Button>
              )}
            </CardHeader>
            <CardContent>
              {attendance.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  Chưa có ai điểm danh
                </p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Họ tên</TableHead>
                      <TableHead>MSSV</TableHead>
                      <TableHead>Thời gian</TableHead>
                      <TableHead>Trạng thái</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {attendance.map((att) => (
                      <TableRow key={att.uid}>
                        <TableCell className="font-medium">
                          {att.userName}
                        </TableCell>
                        <TableCell>{att.studentId}</TableCell>
                        <TableCell>
                          {formatTime(new Date(att.checkedAt))}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              att.status === 'on-time' ? 'success' : 'warning'
                            }
                          >
                            {att.status === 'on-time' ? 'Đúng giờ' : 'Muộn'}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - Check-in */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <QrCode className="h-5 w-5" />
                Điểm danh
              </CardTitle>
            </CardHeader>
            <CardContent>
              {userAttendance ? (
                <div className="text-center space-y-4">
                  <div className="h-16 w-16 mx-auto rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-green-600">Đã điểm danh</p>
                    <p className="text-sm text-muted-foreground">
                      {formatTime(new Date(userAttendance.checkedAt))}
                    </p>
                  </div>
                  <Badge
                    variant={
                      userAttendance.status === 'on-time' ? 'success' : 'warning'
                    }
                  >
                    {userAttendance.status === 'on-time' ? 'Đúng giờ' : 'Muộn'}
                  </Badge>
                </div>
              ) : isActive ? (
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground text-center">
                    Điểm danh đang mở. Quét mã QR hoặc nhập mã dự phòng để điểm danh.
                  </p>
                  {showScanner ? (
                    <QRScanner
                      sessionId={sessionId}
                      attendanceWindow={attendanceWindow!}
                      onSuccess={handleCheckinSuccess}
                      onCancel={() => setShowScanner(false)}
                    />
                  ) : (
                    <Button
                      className="w-full bg-gradient-to-r from-blue-500 to-cyan-500"
                      onClick={() => setShowScanner(true)}
                    >
                      <QrCode className="mr-2 h-4 w-4" />
                      Quét mã QR
                    </Button>
                  )}
                </div>
              ) : (
                <div className="text-center space-y-2">
                  <p className="text-muted-foreground">
                    Điểm danh chưa mở hoặc đã kết thúc
                  </p>
                  {attendanceWindow && !attendanceWindow.isActive && (
                    <p className="text-sm text-muted-foreground">
                      Đã kết thúc lúc {formatTime(new Date(attendanceWindow.endsAt))}
                    </p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Info for Trainer */}
          {isTrainer && isActive && attendanceWindow && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Thông tin điểm danh</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Mã QR và mã dự phòng thay đổi mỗi 10 giây
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Bấm "Hiển thị QR" để chiếu lên màn hình
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
