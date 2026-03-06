import { cn } from '@/lib/utils'

interface StatComparisonProps { label: string; current: number; previous: number; unit?: string; className?: string }

export function StatComparison({ label, current, previous, unit = '', className }: StatComparisonProps) {
  const diff = current - previous
  const percentChange = previous > 0 ? Math.round((diff / previous) * 100) : 0
  const isPositive = diff >= 0
  return (
    <div className={cn('space-y-1', className)}>
      <p className="text-sm text-muted-foreground">{label}</p>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-bold">{current}{unit}</span>
        <span className={cn('text-sm font-medium', isPositive ? 'text-emerald-600' : 'text-red-600')}>
          {isPositive ? '+' : ''}{percentChange}%
        </span>
      </div>
      <p className="text-xs text-muted-foreground">Truoc do: {previous}{unit}</p>
    </div>
  )
}
