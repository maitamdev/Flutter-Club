import { cn } from '@/lib/utils'
import { STATUS_COLORS, STATUS_LABELS } from '@/lib/constants/status'
import { ROLE_COLORS, ROLE_LABELS } from '@/lib/constants/roles'

interface StatusBadgeProps { status: string; type?: 'status' | 'role'; className?: string }

export function StatusBadge({ status, type = 'status', className }: StatusBadgeProps) {
  const colors = type === 'role' ? ROLE_COLORS : STATUS_COLORS
  const labels = type === 'role' ? ROLE_LABELS : STATUS_LABELS
  return (
    <span className={cn('inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium', colors[status] || 'bg-gray-100 text-gray-800', className)}>
      {labels[status] || status}
    </span>
  )
}
