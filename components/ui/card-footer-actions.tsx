import { cn } from '@/lib/utils'

interface CardFooterActionsProps { children: React.ReactNode; className?: string }

export function CardFooterActions({ children, className }: CardFooterActionsProps) {
  return (
    <div className={cn('flex items-center justify-end gap-2 pt-4 border-t mt-4', className)}>
      {children}
    </div>
  )
}
