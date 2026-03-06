import { cn } from '@/lib/utils'

interface SortButtonProps {
  label: string
  active: boolean
  direction?: 'asc' | 'desc'
  onClick: () => void
  className?: string
}

export function SortButton({ label, active, direction, onClick, className }: SortButtonProps) {
  return (
    <button onClick={onClick} className={cn('inline-flex items-center gap-1 text-sm font-medium transition-colors', active ? 'text-foreground' : 'text-muted-foreground hover:text-foreground', className)}>
      {label}
      {active && <span className="text-xs">{direction === 'asc' ? 'â†‘' : 'â†“'}</span>}
    </button>
  )
}
