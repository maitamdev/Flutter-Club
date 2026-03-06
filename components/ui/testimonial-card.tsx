import { cn } from '@/lib/utils'

interface TestimonialCardProps { quote: string; author: string; role?: string; avatar?: string; className?: string }

export function TestimonialCard({ quote, author, role, avatar, className }: TestimonialCardProps) {
  return (
    <div className={cn('p-6 rounded-2xl border bg-card', className)}>
      <p className="text-sm italic text-muted-foreground mb-4">&ldquo;{quote}&rdquo;</p>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
          {avatar ? <img src={avatar} alt={author} className="w-full h-full rounded-full object-cover" /> : author[0]}
        </div>
        <div>
          <p className="text-sm font-medium">{author}</p>
          {role && <p className="text-xs text-muted-foreground">{role}</p>}
        </div>
      </div>
    </div>
  )
}
