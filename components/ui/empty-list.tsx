import { cn } from '@/lib/utils'

interface EmptyListProps { icon?: string; title: string; description?: string; action?: React.ReactNode; className?: string }

export function EmptyList({ icon = 'ðŸ“‹', title, description, action, className }: EmptyListProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-12 text-center', className)}>
      <span className="text-4xl mb-4">{icon}</span>
      <h3 className="font-semibold">{title}</h3>
      {description && <p className="text-sm text-muted-foreground mt-1 max-w-xs">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}
