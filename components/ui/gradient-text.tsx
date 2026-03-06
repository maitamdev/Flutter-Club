import { cn } from '@/lib/utils'

interface GradientTextProps { children: React.ReactNode; from?: string; to?: string; className?: string }

export function GradientText({ children, from = 'from-primary', to = 'to-blue-600', className }: GradientTextProps) {
  return <span className={cn('bg-gradient-to-r bg-clip-text text-transparent', from, to, className)}>{children}</span>
}
