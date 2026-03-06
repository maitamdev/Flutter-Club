import { cn } from '@/lib/utils'
import { Calendar, Clock } from 'lucide-react'
import { formatDate, formatTime } from '@/lib/utils'

interface DateTimeDisplayProps {
  date: Date
  showTime?: boolean
  showIcon?: boolean
  className?: string
}

export function DateTimeDisplay({ date, showTime = true, showIcon = true, className }: DateTimeDisplayProps) {
  return (
    <div className={cn('flex items-center gap-2 text-sm text-muted-foreground', className)}>
      {showIcon && <Calendar className="h-4 w-4" />}
      <span>{formatDate(date)}</span>
      {showTime && (
        <>
          {showIcon && <Clock className="h-4 w-4 ml-2" />}
          <span>{formatTime(date)}</span>
        </>
      )}
    </div>
  )
}
