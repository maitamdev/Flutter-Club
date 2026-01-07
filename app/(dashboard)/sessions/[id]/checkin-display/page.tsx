'use client'

import { useEffect, useState, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import QRCode from 'qrcode'
import { ArrowLeft, Clock, Users, RefreshCw } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useAuth } from '@/lib/hooks/useAuth'
import {
  getSession,
  subscribeToAttendanceWindow,
  subscribeToAttendance,
  endAttendanceWindow,
} from '@/lib/firebase/firestore'
import { generateToken, generateQRData, generateFallbackCode } from '@/lib/utils/token'
import { Session, AttendanceWindow, Attendance } from '@/types'

export default function CheckinDisplayPage() {
  const params = useParams()
  const router = useRouter()
  const { isTrainer } = useAuth()
  const sessionId = params.id as string

  const [session, setSession] = useState<Session | null>(null)
  const [attendanceWindow, setAttendanceWindow] = useState<AttendanceWindow | null>(null)
  const [attendance, setAttendance] = useState<Attendance[]>([])
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('')
  const [fallbackCode, setFallbackCode] = useState<string>('')
  const [timeLeft, setTimeLeft] = useState<number>(0)
  const [tokenCountdown, setTokenCountdown] = useState<number>(10)

  // Fetch session data
  useEffect(() => {
    const fetchSession = async () => {
      const data = await getSession(sessionId)
      if (!data) {
        router.push('/sessions')
        return
      }
      setSession(data)
    }
    fetchSession()
  }, [sessionId, router])

  // Subscribe to attendance window
  useEffect(() => {
    const unsubscribe = subscribeToAttendanceWindow(sessionId, (window) => {
      setAttendanceWindow(window)
      if (!window?.isActive) {
        router.push(`/sessions/${sessionId}`)
      }
    })
    return () => unsubscribe()
  }, [sessionId, router])

  // Subscribe to attendance list
  useEffect(() => {
    const unsubscribe = subscribeToAttendance(sessionId, setAttendance)
    return () => unsubscribe()
  }, [sessionId])

  // Generate QR code with rotating token
  const generateQR = useCallback(async () => {
    if (!attendanceWindow?.tokenSeed || !attendanceWindow.isActive) return

    try {
      const rotationSec = attendanceWindow.tokenRotatesEverySec || 10
      const token = await generateToken(attendanceWindow.tokenSeed, rotationSec)
      const code = await generateFallbackCode(attendanceWindow.tokenSeed, rotationSec)
      
      setFallbackCode(code)
      
      const qrData = generateQRData(sessionId, token, code)
      const url = await QRCode.toDataURL(qrData, {
        width: 400,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#ffffff',
        },
      })
      setQrCodeUrl(url)
    } catch (error) {
      console.error('Error generating QR code:', error)
    }
  }, [attendanceWindow, sessionId])

  // Rotate QR code token every 10 seconds
  useEffect(() => {
    if (!attendanceWindow?.isActive) return

    const rotationSec = attendanceWindow.tokenRotatesEverySec || 10
    
    generateQR()
    setTokenCountdown(rotationSec)

    const interval = setInterval(() => {
      generateQR()
      setTokenCountdown(rotationSec)
    }, rotationSec * 1000)

    // Countdown timer for token
    const countdownInterval = setInterval(() => {
      setTokenCountdown((prev) => (prev > 0 ? prev - 1 : rotationSec))
    }, 1000)

    return () => {
      clearInterval(interval)
      clearInterval(countdownInterval)
    }
  }, [attendanceWindow, generateQR])

  // Countdown timer for session
  useEffect(() => {
    if (!attendanceWindow?.endsAt) return

    const updateTimer = () => {
      const now = new Date().getTime()
      const end = new Date(attendanceWindow.endsAt).getTime()
      const diff = Math.max(0, Math.floor((end - now) / 1000))
      setTimeLeft(diff)

      if (diff === 0) {
        endAttendanceWindow(sessionId)
      }
    }

    updateTimer()
    const interval = setInterval(updateTimer, 1000)
    return () => clearInterval(interval)
  }, [attendanceWindow, sessionId])

  const formatTimeLeft = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  if (!isTrainer) {
    router.push(`/sessions/${sessionId}`)
    return null
  }

  if (!session || !attendanceWindow) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-10 bg-background/80 backdrop-blur-xl border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href={`/sessions/${sessionId}`}>
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Quay lại
            </Button>
          </Link>
          <div className="text-center">
            <h1 className="font-bold">{session.title}</h1>
            <p className="text-sm text-muted-foreground">Điểm danh đang mở</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="success" className="animate-pulse">
              <span className="mr-1 h-2 w-2 rounded-full bg-green-500 inline-block" />
              LIVE
            </Badge>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pt-24 pb-8">
        <div className="grid gap-8 lg:grid-cols-2 items-center min-h-[calc(100vh-8rem)]">
          {/* QR Code */}
          <div className="flex flex-col items-center justify-center">
            <Card className="p-8 bg-white dark:bg-gray-900 shadow-2xl">
              <CardContent className="p-0">
                {qrCodeUrl ? (
                  <div className="relative">
                    <img
                      src={qrCodeUrl}
                      alt="QR Code"
                      className="w-80 h-80 mx-auto"
                    />
                    {/* Token countdown indicator */}
                    <div className="absolute -bottom-2 -right-2 bg-blue-500 text-white rounded-full h-10 w-10 flex items-center justify-center font-bold">
                      {tokenCountdown}
                    </div>
                  </div>
                ) : (
                  <div className="w-80 h-80 flex items-center justify-center bg-muted rounded-lg">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
              <RefreshCw className="h-4 w-4 animate-spin" />
              <span>Mã tự động thay đổi mỗi {attendanceWindow.tokenRotatesEverySec || 10} giây</span>
            </div>

            {/* Fallback Code - Dynamic */}
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground mb-2">Mã dự phòng (thay đổi mỗi 10s)</p>
              <div className="relative inline-block">
                <p className="text-4xl font-mono font-bold tracking-[0.5em] text-blue-600 bg-blue-50 dark:bg-blue-900/30 px-6 py-3 rounded-lg">
                  {fallbackCode}
                </p>
                <div className="absolute -top-2 -right-2 bg-orange-500 text-white rounded-full h-8 w-8 flex items-center justify-center text-sm font-bold">
                  {tokenCountdown}
                </div>
              </div>
            </div>
          </div>

          {/* Stats & Attendance List */}
          <div className="space-y-6">
            {/* Timer */}
            <Card className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Clock className="h-8 w-8" />
                    <div>
                      <p className="text-sm opacity-80">Thời gian còn lại</p>
                      <p className="text-4xl font-bold font-mono">
                        {formatTimeLeft(timeLeft)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2">
                      <Users className="h-6 w-6" />
                      <span className="text-3xl font-bold">{attendance.length}</span>
                    </div>
                    <p className="text-sm opacity-80">đã điểm danh</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Check-ins */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Điểm danh gần đây
                </h3>
                {attendance.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">
                    Chưa có ai điểm danh
                  </p>
                ) : (
                  <div className="space-y-3 max-h-[400px] overflow-y-auto">
                    {attendance
                      .sort(
                        (a, b) =>
                          new Date(b.checkedAt).getTime() -
                          new Date(a.checkedAt).getTime()
                      )
                      .map((att, index) => (
                        <div
                          key={att.uid}
                          className={`flex items-center justify-between p-3 rounded-lg ${
                            index === 0
                              ? 'bg-green-100 dark:bg-green-900/30 animate-pulse'
                              : 'bg-muted'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                              {att.userName?.charAt(0) || '?'}
                            </div>
                            <div>
                              <p className="font-medium">{att.userName}</p>
                              <p className="text-sm text-muted-foreground">
                                {att.studentId}
                              </p>
                            </div>
                          </div>
                          <Badge
                            variant={att.status === 'on-time' ? 'success' : 'warning'}
                          >
                            {att.status === 'on-time' ? 'Đúng giờ' : 'Muộn'}
                          </Badge>
                        </div>
                      ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
