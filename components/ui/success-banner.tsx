import { cn } from '@/lib/utils'

interface SuccessBannerProps { message: string; className?: string }

export function SuccessBanner({ message, className }: SuccessBannerProps) {
  return (
    <div className={cn('flex items-center gap-2 px-4 py-3 rounded-xl bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800', className)}>
      <span>âœ…</span>
      <p className="text-sm text-emerald-800 dark:text-emerald-200">{message}</p>
    </div>
  )
}
