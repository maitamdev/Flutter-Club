import { cn } from '@/lib/utils'

interface ProgressBarProps { value: number; max?: number; label?: string; showPercentage?: boolean; variant?: 'default' | 'success' | 'warning' | 'danger'; className?: string }

const variantColors = {
  default: 'bg-primary',
  success: 'bg-emerald-500',
  warning: 'bg-amber-500',
  danger: 'bg-red-500',
}

export function ProgressBar({ value, max = 100, label, showPercentage = true, variant = 'default', className }: ProgressBarProps) {
  const percentage = Math.min(Math.round((value / max) * 100), 100)
  return (
    <div className={cn('space-y-2', className)}>
      {(label || showPercentage) && (
        <div className="flex items-center justify-between text-sm">
          {label && <span className="text-muted-foreground">{label}</span>}
          {showPercentage && <span className="font-medium">{percentage}%</span>}
        </div>
      )}
      <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
        <div className={cn('h-full rounded-full transition-all duration-500 ease-out', variantColors[variant])} style={{ width: percentage + '%' }} />
      </div>
    </div>
  )
}
