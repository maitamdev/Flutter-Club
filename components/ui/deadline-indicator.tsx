import { cn } from '@/lib/utils'
import { CheckCircle, Clock, AlertTriangle } from 'lucide-react'

type DeadlineStatus = 'on-time' | 'due-soon' | 'overdue'

interface DeadlineIndicatorProps {
  deadline: Date
  className?: string
}

function getStatus(deadline: Date): DeadlineStatus {
  const now = Date.now(); const diff = deadline.getTime() - now
  if (diff < 0) return 'overdue'
  if (diff < 24 * 60 * 60 * 1000) return 'due-soon'
  return 'on-time'
}

const statusConfig = {
  'on-time': { icon: CheckCircle, color: 'text-emerald-600', label: 'Con han' },
  'due-soon': { icon: Clock, color: 'text-amber-600', label: 'Sap het han' },
  'overdue': { icon: AlertTriangle, color: 'text-red-600', label: 'Qua han' },
}

export function DeadlineIndicator({ deadline, className }: DeadlineIndicatorProps) {
  const status = getStatus(deadline)
  const config = statusConfig[status]
  const Icon = config.icon
  return (
    <div className={cn('inline-flex items-center gap-1.5 text-sm', config.color, className)}>
      <Icon className="h-4 w-4" /> {config.label}
    </div>
  )
}
