import { cn } from '@/lib/utils'

interface HighlightTextProps { text: string; highlight: string; className?: string }

export function HighlightText({ text, highlight, className }: HighlightTextProps) {
  if (!highlight.trim()) return <span className={className}>{text}</span>
  const regex = new RegExp(`(${highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
  const parts = text.split(regex)
  return (
    <span className={className}>
      {parts.map((part, i) => regex.test(part) ? <mark key={i} className="bg-yellow-200 dark:bg-yellow-800 rounded px-0.5">{part}</mark> : part)}
    </span>
  )
}
