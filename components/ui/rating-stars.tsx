import { cn } from '@/lib/utils'

interface RatingStarsProps { value: number; max?: number; size?: 'sm' | 'md' | 'lg'; className?: string }

const sizeMap = { sm: 'text-sm', md: 'text-lg', lg: 'text-2xl' }

export function RatingStars({ value, max = 5, size = 'md', className }: RatingStarsProps) {
  return (
    <div className={cn('flex items-center gap-0.5', sizeMap[size], className)}>
      {Array.from({ length: max }, (_, i) => (
        <span key={i} className={i < value ? 'text-amber-400' : 'text-muted-foreground/30'}>â˜…</span>
      ))}
    </div>
  )
}
