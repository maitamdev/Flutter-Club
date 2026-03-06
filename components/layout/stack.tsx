import { cn } from '@/lib/utils'
interface StackProps { children: React.ReactNode; gap?: number; direction?: 'vertical' | 'horizontal'; className?: string }
export function Stack({ children, gap = 4, direction = 'vertical', className }: StackProps) {
  return <div className={cn(direction === 'vertical' ? 'flex flex-col' : 'flex flex-row items-center', `gap-${gap}`, className)}>{children}</div>
}
