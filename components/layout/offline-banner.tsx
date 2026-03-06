'use client'
import { cn } from '@/lib/utils'
import { useOnlineStatus } from '@/lib/hooks/useOnlineStatus'
import { WifiOff } from 'lucide-react'

export function OfflineBanner() {
  const isOnline = useOnlineStatus()
  if (isOnline) return null
  return (
    <div className="fixed top-0 left-0 right-0 z-[100] bg-amber-500 text-white text-center py-2 text-sm font-medium flex items-center justify-center gap-2">
      <WifiOff className="h-4 w-4" /> Ban dang ngoai tuyen. Kiem tra ket noi mang.
    </div>
  )
}
