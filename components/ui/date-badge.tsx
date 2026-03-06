import { cn } from '@/lib/utils'

interface DateBadgeProps { date: Date; className?: string }

export function DateBadge({ date, className }: DateBadgeProps) {
  const day = date.getDate()
  const month = date.toLocaleString('vi-VN', { month: 'short' })
  return (
    <div className={cn('flex flex-col items-center justify-center w-12 h-14 rounded-xl bg-primary/10 text-primary', className)}>
      <span className="text-lg font-bold leading-none">{day}</span>
      <span className="text-[10px] uppercase mt-0.5">{month}</span>
    </div>
  )
}
