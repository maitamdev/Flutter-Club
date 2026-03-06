import { cn } from '@/lib/utils'

interface NotificationItemProps {
  icon: string
  title: string
  message: string
  time: string
  isRead: boolean
  onClick?: () => void
  className?: string
}

export function NotificationItem({ icon, title, message, time, isRead, onClick, className }: NotificationItemProps) {
  return (
    <button onClick={onClick} className={cn('flex items-start gap-3 p-3 rounded-lg w-full text-left hover:bg-muted/50 transition-colors', !isRead && 'bg-primary/5', className)}>
      <span className="text-xl mt-0.5">{icon}</span>
      <div className="flex-1 min-w-0">
        <p className={cn('text-sm', !isRead && 'font-semibold')}>{title}</p>
        <p className="text-xs text-muted-foreground line-clamp-2">{message}</p>
        <p className="text-xs text-muted-foreground mt-1">{time}</p>
      </div>
      {!isRead && <span className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />}
    </button>
  )
}
