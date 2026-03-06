import { cn } from '@/lib/utils'

interface InfoCardProps { title: string; children: React.ReactNode; icon?: React.ReactNode; variant?: 'default' | 'info' | 'warning' | 'success' | 'error'; className?: string }

const variantStyles = {
  default: 'bg-card border',
  info: 'bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800',
  warning: 'bg-amber-50 border-amber-200 dark:bg-amber-950 dark:border-amber-800',
  success: 'bg-emerald-50 border-emerald-200 dark:bg-emerald-950 dark:border-emerald-800',
  error: 'bg-red-50 border-red-200 dark:bg-red-950 dark:border-red-800',
}

export function InfoCard({ title, children, icon, variant = 'default', className }: InfoCardProps) {
  return (
    <div className={cn('rounded-xl border p-4', variantStyles[variant], className)}>
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <h3 className="text-sm font-semibold">{title}</h3>
      </div>
      <div className="text-sm text-muted-foreground">{children}</div>
    </div>
  )
}
