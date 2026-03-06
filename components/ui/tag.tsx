import { cn } from '@/lib/utils'

interface TagProps { children: React.ReactNode; variant?: 'default' | 'primary' | 'secondary' | 'outline'; onRemove?: () => void; className?: string }

const tagVariants = {
  default: 'bg-muted text-muted-foreground',
  primary: 'bg-primary/10 text-primary',
  secondary: 'bg-secondary text-secondary-foreground',
  outline: 'border bg-transparent',
}

export function Tag({ children, variant = 'default', onRemove, className }: TagProps) {
  return (
    <span className={cn('inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium', tagVariants[variant], className)}>
      {children}
      {onRemove && <button onClick={onRemove} className="ml-1 hover:text-foreground">Ã—</button>}
    </span>
  )
}
