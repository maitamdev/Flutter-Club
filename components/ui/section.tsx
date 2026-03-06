import { cn } from '@/lib/utils'

interface SectionProps { title: string; description?: string; children: React.ReactNode; actions?: React.ReactNode; className?: string }

export function Section({ title, description, children, actions, className }: SectionProps) {
  return (
    <section className={cn('space-y-4', className)}>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
        {actions}
      </div>
      {children}
    </section>
  )
}
