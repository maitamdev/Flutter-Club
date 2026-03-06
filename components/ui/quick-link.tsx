import { cn } from '@/lib/utils'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

interface QuickLinkProps { title: string; description: string; href: string; icon: React.ReactNode; className?: string }

export function QuickLink({ title, description, href, icon, className }: QuickLinkProps) {
  return (
    <Link href={href} className={cn('group flex items-center gap-4 p-4 rounded-xl border hover:border-primary/50 hover:bg-primary/5 transition-all', className)}>
      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors">{icon}</div>
      <div className="flex-1">
        <p className="font-medium group-hover:text-primary transition-colors">{title}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
    </Link>
  )
}
