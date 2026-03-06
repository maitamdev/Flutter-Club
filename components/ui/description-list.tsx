import { cn } from '@/lib/utils'

interface DescriptionListProps { children: React.ReactNode; className?: string }
interface DescriptionItemProps { term: string; detail: React.ReactNode; className?: string }

export function DescriptionList({ children, className }: DescriptionListProps) {
  return <div className={cn('divide-y', className)}>{children}</div>
}

export function DescriptionItem({ term, detail, className }: DescriptionItemProps) {
  return (
    <div className={cn('flex items-center justify-between py-3', className)}>
      <dt className="text-sm text-muted-foreground">{term}</dt>
      <dd className="text-sm font-medium">{detail}</dd>
    </div>
  )
}
