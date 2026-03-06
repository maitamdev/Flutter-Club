import { cn } from '@/lib/utils'

interface TimelineItem { title: string; description?: string; time: string; icon?: React.ReactNode; status?: 'completed' | 'current' | 'upcoming' }
interface TimelineProps { items: TimelineItem[]; className?: string }

export function Timeline({ items, className }: TimelineProps) {
  return (
    <div className={cn('space-y-0', className)}>
      {items.map((item, index) => (
        <div key={index} className="flex gap-4">
          <div className="flex flex-col items-center">
            <div className={cn('w-8 h-8 rounded-full flex items-center justify-center text-sm', item.status === 'completed' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-200' : item.status === 'current' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground')}>
              {item.icon || (index + 1)}
            </div>
            {index < items.length - 1 && <div className="w-0.5 h-full bg-border min-h-[2rem]" />}
          </div>
          <div className="pb-6">
            <p className="text-sm font-medium">{item.title}</p>
            {item.description && <p className="text-xs text-muted-foreground mt-1">{item.description}</p>}
            <p className="text-xs text-muted-foreground mt-1">{item.time}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
