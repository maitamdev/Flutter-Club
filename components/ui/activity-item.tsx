import { cn } from '@/lib/utils'

interface ActivityItemProps { icon: string; user: string; action: string; target: string; time: string; className?: string }

export function ActivityItem({ icon, user, action, target, time, className }: ActivityItemProps) {
  return (
    <div className={cn('flex items-center gap-3 py-3', className)}>
      <span className="text-lg">{icon}</span>
      <div className="flex-1 min-w-0">
        <p className="text-sm"><span className="font-medium">{user}</span> {action} <span className="font-medium">{target}</span></p>
        <p className="text-xs text-muted-foreground">{time}</p>
      </div>
    </div>
  )
}
