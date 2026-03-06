import { cn } from '@/lib/utils'

interface TruncatedTextProps { text: string; maxLength?: number; className?: string }

export function TruncatedText({ text, maxLength = 100, className }: TruncatedTextProps) {
  const truncated = text.length > maxLength
  return (
    <span className={cn(className)} title={truncated ? text : undefined}>
      {truncated ? text.slice(0, maxLength) + '...' : text}
    </span>
  )
}
