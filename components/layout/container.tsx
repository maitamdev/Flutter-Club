import { cn } from '@/lib/utils'
interface ContainerProps { children: React.ReactNode; size?: 'sm' | 'md' | 'lg' | 'xl'; className?: string }
const sizeClasses = { sm: 'max-w-2xl', md: 'max-w-4xl', lg: 'max-w-6xl', xl: 'max-w-7xl' }
export function Container({ children, size = 'lg', className }: ContainerProps) {
  return <div className={cn('mx-auto px-4 sm:px-6 lg:px-8', sizeClasses[size], className)}>{children}</div>
}
