'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { Html5Qrcode } from 'html5-qrcode'
import { Camera, X, Keyboard, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'
import { useAuth } from '@/lib/hooks/useAuth'
import { checkIn, getAttendanceWindow } from '@/lib/firebase/firestore'
import { validateToken, parseQRData, validateFallbackCode } from '@/lib/utils/token'
import { AttendanceWindow } from '@/types'

interface QRScannerProps {
  sessionId: string
  attendanceWindow: AttendanceWindow
  onSuccess: () => void
  onCancel: () => void
}

export function QRScanner({
  sessionId,
  attendanceWindow,
  onSuccess,
  onCancel,
}: QRScannerProps) {
  const { user } = useAuth()
  const { toast } = useToast()
  const [mode, setMode] = useState<'camera' | 'manual'>('camera')
  const [manualCode, setManualCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [cameraError, setCameraError] = useState(false)
  const scannerRef = useRef<Html5Qrcode | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Define processCheckin first
  const processCheckin = useCallback(async (token: string | null, fallbackCode: string) => {
    if (!user) return

    setLoading(true)
    try {
      // Refresh attendance window to get latest data
      const currentWindow = await getAttendanceWindow(sessionId)
      if (!currentWindow?.isActive) {
        toast({
          title: 'Điểm danh đã kết thúc',
          description: 'Phiên điểm danh đã đóng',
          variant: 'destructive',
        })
        onCancel()
        return
      }

      // Check if within time window
      const now = new Date()
      if (now > new Date(currentWindow.endsAt)) {
        toast({
          title: 'Hết thời gian',
          description: 'Phiên điểm danh đã hết hạn',
          variant: 'destructive',
        })
        onCancel()
        return
      }

      const rotationSec = currentWindow.tokenRotatesEverySec || 10
      
      // Validate token or fallback code
      let isValid = false

      if (token) {
        try {
          isValid = await validateToken(token, currentWindow.tokenSeed, rotationSec)
        } catch (e) {
          console.error('Token validation error:', e)
        }
      }

      if (!isValid && fallbackCode) {
        try {
          isValid = await validateFallbackCode(fallbackCode, currentWindow.tokenSeed, rotationSec)
        } catch (e) {
          console.error('Fallback code validation error:', e)
        }
      }

      if (!isValid) {
        toast({
          title: 'Mã không hợp lệ hoặc đã hết hạn',
          description: 'Mã thay đổi mỗi 10 giây, vui lòng thử lại',
          variant: 'destructive',
        })
        setLoading(false)
        return
      }

      // Calculate if late (after 5 minutes from start)
      const startTime = new Date(currentWindow.startedAt)
      const lateThreshold = new Date(startTime.getTime() + 5 * 60 * 1000)
      const isLate = now > lateThreshold

      // Check in
      await checkIn(
        sessionId,
        user.uid,
        user.name,
        user.studentId,
        isLate
      )

      toast({
        title: 'Điểm danh thành công!',
        description: isLate ? 'Bạn đã điểm danh muộn' : 'Bạn đã điểm danh đúng giờ',
      })

      // Stop scanner
      if (scannerRef.current?.isScanning) {
        await scannerRef.current.stop().catch(() => {})
      }

      onSuccess()
    } catch (error: any) {
      console.error('Checkin error:', error)
      toast({
        title: 'Lỗi điểm danh',
        description: error.message || 'Vui lòng thử lại',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }, [user, toast, sessionId, onCancel])

  // Define handleScan after processCheckin
  const handleScan = useCallback(async (decodedText: string) => {
    if (loading) return

    try {
      const qrData = parseQRData(decodedText)
      if (!qrData || !qrData.sessionId || !qrData.token) {
        console.warn('Invalid QR data:', qrData)
        return
      }
      
      if (qrData.sessionId !== sessionId) {
        toast({
          title: 'Mã QR không hợp lệ',
          description: 'Vui lòng quét mã QR của buổi học này',
          variant: 'destructive',
        })
        return
      }

      await processCheckin(qrData.token, qrData.fallbackCode)
    } catch (error) {
      console.error('QR scan error:', error)
      toast({
        title: 'Lỗi quét mã',
        description: 'Vui lòng thử lại hoặc nhập mã thủ công',
        variant: 'destructive',
      })
    }
  }, [loading, sessionId, processCheckin, toast])

  const handleManualSubmit = async () => {
    if (!manualCode.trim() || manualCode.length !== 6) {
      toast({
        title: 'Mã không hợp lệ',
        description: 'Vui lòng nhập mã 6 ký tự',
        variant: 'destructive',
      })
      return
    }
    await processCheckin(null, manualCode.trim().toUpperCase())
  }

  useEffect(() => {
    if (mode !== 'camera' || !containerRef.current) return

    let isActive = true
    const scanner = new Html5Qrcode('qr-reader')
    scannerRef.current = scanner

    scanner
      .start(
        { facingMode: 'environment' },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
        },
        (decodedText) => {
          if (isActive) {
            handleScan(decodedText)
          }
        },
        () => {} // Ignore errors during scanning
      )
      .catch((err) => {
        if (isActive) {
          console.error('Camera error:', err)
          setCameraError(true)
          setMode('manual')
        }
      })

    return () => {
      isActive = false
      if (scannerRef.current?.isScanning) {
        scannerRef.current.stop().catch(() => {})
      }
    }
  }, [mode, handleScan])

  return (
    <div className="space-y-4">
      {/* Mode Toggle */}
      <div className="flex gap-2">
        <Button
          variant={mode === 'camera' ? 'default' : 'outline'}
          size="sm"
          className="flex-1"
          onClick={() => setMode('camera')}
          disabled={cameraError}
        >
          <Camera className="mr-2 h-4 w-4" />
          Camera
        </Button>
        <Button
          variant={mode === 'manual' ? 'default' : 'outline'}
          size="sm"
          className="flex-1"
          onClick={() => setMode('manual')}
        >
          <Keyboard className="mr-2 h-4 w-4" />
          Nhập mã
        </Button>
      </div>

      {mode === 'camera' ? (
        <div className="space-y-4">
          <div
            id="qr-reader"
            ref={containerRef}
            className="w-full aspect-square rounded-lg overflow-hidden bg-black"
          />
          <p className="text-xs text-center text-muted-foreground">
            Đưa mã QR vào khung hình để quét
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="code">Mã dự phòng</Label>
            <Input
              id="code"
              placeholder="Nhập mã 6 ký tự"
              value={manualCode}
              onChange={(e) => setManualCode(e.target.value.toUpperCase())}
              maxLength={6}
              className="text-center text-2xl font-mono tracking-widest"
            />
          </div>
          <Button
            className="w-full"
            onClick={handleManualSubmit}
            disabled={loading || manualCode.length !== 6}
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              'Xác nhận'
            )}
          </Button>
        </div>
      )}

      <Button variant="ghost" className="w-full" onClick={onCancel}>
        <X className="mr-2 h-4 w-4" />
        Hủy
      </Button>
    </div>
  )
}
