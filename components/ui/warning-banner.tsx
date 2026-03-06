import { cn } from '@/lib/utils'

interface WarningBannerProps { message: string; action?: React.ReactNode; className?: string }

export function WarningBanner({ message, action, className }: WarningBannerProps) {
  return (
    <div className={cn('flex items-center justify-between px-4 py-3 rounded-xl bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800', className)}>
      <div className="flex items-center gap-2">
        <span>âš ï¸</span>
        <p className="text-sm text-amber-800 dark:text-amber-200">{message}</p>
      </div>
      {action}
    </div>
  )
}
