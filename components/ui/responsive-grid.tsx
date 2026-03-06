import { cn } from '@/lib/utils'

interface ResponsiveGridProps { children: React.ReactNode; minWidth?: string; className?: string }

export function ResponsiveGrid({ children, minWidth = '280px', className }: ResponsiveGridProps) {
  return (
    <div className={cn('grid gap-4', className)} style={{ gridTemplateColumns: `repeat(auto-fill, minmax(${minWidth}, 1fr))` }}>
      {children}
    </div>
  )
}
