import { cn } from '@/lib/utils'

interface DividerProps { label?: string; className?: string }

export function Divider({ label, className }: DividerProps) {
  if (!label) return <hr className={cn('border-border', className)} />
  return (
    <div className={cn('flex items-center gap-4', className)}>
      <div className="flex-1 border-t border-border" />
      <span className="text-sm text-muted-foreground">{label}</span>
      <div className="flex-1 border-t border-border" />
    </div>
  )
}
