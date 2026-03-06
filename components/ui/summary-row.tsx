import { cn } from '@/lib/utils'

interface SummaryItemProps { label: string; count: number; color?: string; className?: string }
interface SummaryRowProps { items: SummaryItemProps[]; className?: string }

export function SummaryRow({ items, className }: SummaryRowProps) {
  return (
    <div className={cn('flex items-center gap-4 flex-wrap', className)}>
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-2">
          {item.color && <div className={cn('w-3 h-3 rounded-full', item.color)} />}
          <span className="text-sm text-muted-foreground">{item.label}:</span>
          <span className="text-sm font-semibold">{item.count}</span>
        </div>
      ))}
    </div>
  )
}
