import { cn } from '@/lib/utils'

interface ListItemProps { children: React.ReactNode; leading?: React.ReactNode; trailing?: React.ReactNode; onClick?: () => void; className?: string }

export function ListItem({ children, leading, trailing, onClick, className }: ListItemProps) {
  const Comp = onClick ? 'button' : 'div'
  return (
    <Comp onClick={onClick} className={cn('flex items-center gap-3 p-4 rounded-xl border hover:bg-muted/50 transition-colors w-full text-left', onClick && 'cursor-pointer', className)}>
      {leading && <div className="shrink-0">{leading}</div>}
      <div className="flex-1 min-w-0">{children}</div>
      {trailing && <div className="shrink-0">{trailing}</div>}
    </Comp>
  )
}
