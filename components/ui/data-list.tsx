import { cn } from '@/lib/utils'

interface DataListProps { className?: string; children: React.ReactNode }
interface DataListItemProps { label: string; value: React.ReactNode; className?: string }

export function DataList({ className, children }: DataListProps) {
  return <dl className={cn('space-y-3', className)}>{children}</dl>
}

export function DataListItem({ label, value, className }: DataListItemProps) {
  return (
    <div className={cn('flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4', className)}>
      <dt className="text-sm font-medium text-muted-foreground min-w-[140px]">{label}</dt>
      <dd className="text-sm">{value}</dd>
    </div>
  )
}
