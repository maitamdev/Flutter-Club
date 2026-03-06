import { cn } from '@/lib/utils'

interface ScoreDisplayProps { score: number; maxScore: number; size?: 'sm' | 'md' | 'lg'; className?: string }

function getScoreColor(pct: number): string {
  if (pct >= 90) return 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950'
  if (pct >= 70) return 'text-blue-600 bg-blue-50 dark:bg-blue-950'
  if (pct >= 50) return 'text-amber-600 bg-amber-50 dark:bg-amber-950'
  return 'text-red-600 bg-red-50 dark:bg-red-950'
}

const sizeClasses = { sm: 'w-10 h-10 text-xs', md: 'w-14 h-14 text-sm', lg: 'w-20 h-20 text-lg' }

export function ScoreDisplay({ score, maxScore, size = 'md', className }: ScoreDisplayProps) {
  const pct = maxScore > 0 ? (score / maxScore) * 100 : 0
  return (
    <div className={cn('rounded-full flex flex-col items-center justify-center font-bold', sizeClasses[size], getScoreColor(pct), className)}>
      <span>{score}</span>
      <span className="text-[0.6em] opacity-70">/{maxScore}</span>
    </div>
  )
}
