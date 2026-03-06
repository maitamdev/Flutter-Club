'use client'
import { cn } from '@/lib/utils'
import { Wifi, WifiOff } from 'lucide-react'

interface OnlineStatusProps { isOnline: boolean; className?: string }

export function OnlineStatus({ isOnline, className }: OnlineStatusProps) {
  return (
    <div className={cn('inline-flex items-center gap-2 text-sm', className)}>
      {isOnline ? (
        <><div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /><span className="text-emerald-600 dark:text-emerald-400">Truc tuyen</span></>
      ) : (
        <><div className="w-2 h-2 rounded-full bg-red-500" /><span className="text-red-600 dark:text-red-400">Ngoai tuyen</span></>
      )}
    </div>
  )
}
