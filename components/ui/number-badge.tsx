import { cn } from '@/lib/utils'

interface NumberBadgeProps { value: number; max?: number; className?: string }

export function NumberBadge({ value, max = 99, className }: NumberBadgeProps) {
  if (value <= 0) return null
  const display = value > max ? `${max}+` : String(value)
  return (
    <span className={cn('inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-bold text-white bg-red-500 rounded-full', className)}>
      {display}
    </span>
  )
}
