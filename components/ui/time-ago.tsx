import { cn } from '@/lib/utils'
import { Clock } from 'lucide-react'

interface TimeAgoProps { date: Date; className?: string }

export function TimeAgo({ date, className }: TimeAgoProps) {
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)
  let text: string
  if (minutes < 1) text = 'Vua xong'
  else if (minutes < 60) text = `${minutes} phut truoc`
  else if (hours < 24) text = `${hours} gio truoc`
  else if (days < 30) text = `${days} ngay truoc`
  else text = date.toLocaleDateString('vi-VN')
  return (
    <span className={cn('inline-flex items-center gap-1 text-sm text-muted-foreground', className)}>
      <Clock className="h-3 w-3" /> {text}
    </span>
  )
}
