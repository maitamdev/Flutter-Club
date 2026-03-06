import { cn } from '@/lib/utils'
interface CenterProps { children: React.ReactNode; className?: string }
export function Center({ children, className }: CenterProps) {
  return <div className={cn('flex items-center justify-center', className)}>{children}</div>
}
