import { cn } from '@/lib/utils'

interface NoDataProps {
  title?: string
  description?: string
  icon?: React.ReactNode
  action?: React.ReactNode
  className?: string
}

export function NoData({ title = 'Chua co du lieu', description = 'Du lieu se duoc hien thi khi co san', icon, action, className }: NoDataProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-16 text-center', className)}>
      {icon || <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4"><span className="text-3xl">ðŸ“‹</span></div>}
      <h3 className="text-lg font-semibold mt-4">{title}</h3>
      <p className="text-sm text-muted-foreground mt-2 max-w-sm">{description}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  )
}
