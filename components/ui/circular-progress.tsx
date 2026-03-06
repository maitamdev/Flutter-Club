import { cn } from '@/lib/utils'

interface CircularProgressProps { value: number; max?: number; size?: number; strokeWidth?: number; className?: string }

export function CircularProgress({ value, max = 100, size = 60, strokeWidth = 6, className }: CircularProgressProps) {
  const percentage = Math.min(Math.round((value / max) * 100), 100)
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (percentage / 100) * circumference
  return (
    <div className={cn('relative inline-flex items-center justify-center', className)}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="currentColor" strokeWidth={strokeWidth} className="text-muted" />
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" className="text-primary transition-all duration-500" />
      </svg>
      <span className="absolute text-xs font-bold">{percentage}%</span>
    </div>
  )
}
