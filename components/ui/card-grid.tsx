import { cn } from '@/lib/utils'

interface CardGridProps { children: React.ReactNode; cols?: 1 | 2 | 3 | 4; className?: string }

const colClasses = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
}

export function CardGrid({ children, cols = 3, className }: CardGridProps) {
  return <div className={cn('grid gap-4', colClasses[cols], className)}>{children}</div>
}
