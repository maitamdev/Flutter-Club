import { cn } from '@/lib/utils'

interface KeyboardShortcutProps { keys: string[]; className?: string }

export function KeyboardShortcut({ keys, className }: KeyboardShortcutProps) {
  return (
    <span className={cn('inline-flex items-center gap-0.5', className)}>
      {keys.map((key, i) => (
        <span key={i}>
          <kbd className="inline-flex items-center justify-center h-5 px-1.5 text-xs font-medium text-muted-foreground bg-muted border rounded">{key}</kbd>
          {i < keys.length - 1 && <span className="text-muted-foreground mx-0.5">+</span>}
        </span>
      ))}
    </span>
  )
}
