import { cn } from '@/lib/utils'

interface DotIndicatorProps { status: 'active' | 'inactive' | 'warning' | 'error'; pulse?: boolean; className?: string }

const dotColors = {
  active: 'bg-emerald-500', inactive: 'bg-gray-400', warning: 'bg-amber-500', error: 'bg-red-500',
}

export function DotIndicator({ status, pulse = false, className }: DotIndicatorProps) {
  return <span className={cn('inline-block w-2 h-2 rounded-full', dotColors[status], pulse && 'animate-pulse', className)} />
}
