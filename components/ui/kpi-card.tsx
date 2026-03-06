import { cn } from '@/lib/utils'

interface KPICardProps { title: string; value: string | number; subtitle?: string; change?: number; icon?: React.ReactNode; className?: string }

export function KPICard({ title, value, subtitle, change, icon, className }: KPICardProps) {
  return (
    <div className={cn('p-5 rounded-2xl border bg-card hover:shadow-md transition-shadow', className)}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
          {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
          {change !== undefined && (
            <p className={cn('text-xs font-medium mt-2', change >= 0 ? 'text-emerald-600' : 'text-red-600')}>
              {change >= 0 ? 'â†‘' : 'â†“'} {Math.abs(change)}% so voi ky truoc
            </p>
          )}
        </div>
        {icon && <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">{icon}</div>}
      </div>
    </div>
  )
}
