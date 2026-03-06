import { cn } from '@/lib/utils'

interface CharacterCountProps { current: number; max: number; className?: string }

export function CharacterCount({ current, max, className }: CharacterCountProps) {
  const isOver = current > max
  const isNear = current > max * 0.9
  return (
    <span className={cn('text-xs', isOver ? 'text-destructive font-medium' : isNear ? 'text-amber-500' : 'text-muted-foreground', className)}>
      {current}/{max}
    </span>
  )
}
