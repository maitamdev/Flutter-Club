import { cn } from '@/lib/utils'

interface TwoColumnLayoutProps { main: React.ReactNode; sidebar: React.ReactNode; sidebarPosition?: 'left' | 'right'; className?: string }

export function TwoColumnLayout({ main, sidebar, sidebarPosition = 'right', className }: TwoColumnLayoutProps) {
  return (
    <div className={cn('grid gap-6 lg:grid-cols-3', className)}>
      {sidebarPosition === 'left' && <div className="lg:col-span-1 space-y-6">{sidebar}</div>}
      <div className="lg:col-span-2 space-y-6">{main}</div>
      {sidebarPosition === 'right' && <div className="lg:col-span-1 space-y-6">{sidebar}</div>}
    </div>
  )
}
