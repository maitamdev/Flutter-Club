import { cn } from '@/lib/utils'

interface LabelValueProps { label: string; value: React.ReactNode; horizontal?: boolean; className?: string }

export function LabelValue({ label, value, horizontal = false, className }: LabelValueProps) {
  return (
    <div className={cn(horizontal ? 'flex items-center justify-between' : 'space-y-1', className)}>
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-medium">{value}</span>
    </div>
  )
}
