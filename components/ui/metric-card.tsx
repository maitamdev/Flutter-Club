import { cn } from '@/lib/utils'

interface MetricCardProps {
  label: string
  value: string | number
  sublabel?: string
  icon?: React.ReactNode
  className?: string
}

export function MetricCard({ label, value, sublabel, icon, className }: MetricCardProps) {
  return (
    <div className={cn('flex items-center gap-4 p-4 rounded-xl border bg-card', className)}>
      {icon && <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">{icon}</div>}
      <div>
        <p className="text-2xl font-bold">{value}</p>
        <p className="text-sm text-muted-foreground">{label}</p>
        {sublabel && <p className="text-xs text-muted-foreground">{sublabel}</p>}
      </div>
    </div>
  )
}
