import { cn } from '@/lib/utils'

interface StickyHeaderProps { children: React.ReactNode; className?: string }

export function StickyHeader({ children, className }: StickyHeaderProps) {
  return (
    <div className={cn('sticky top-0 z-30 bg-background/80 backdrop-blur-lg border-b -mx-6 px-6 py-4', className)}>
      {children}
    </div>
  )
}
