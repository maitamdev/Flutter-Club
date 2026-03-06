import { cn } from '@/lib/utils'

interface GlassCardProps { children: React.ReactNode; className?: string }

export function GlassCard({ children, className }: GlassCardProps) {
  return (
    <div className={cn('rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-xl', className)}>
      {children}
    </div>
  )
}
