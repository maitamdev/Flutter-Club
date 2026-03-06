'use client'
import { cn } from '@/lib/utils'
import { Button } from './button'
import { Check, Copy } from 'lucide-react'
import { useState } from 'react'

interface CodeBlockProps { code: string; language?: string; showCopy?: boolean; className?: string }

export function CodeBlock({ code, language = 'text', showCopy = true, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const handleCopy = () => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 2000) }
  return (
    <div className={cn('relative rounded-xl bg-zinc-950 dark:bg-zinc-900', className)}>
      {showCopy && (
        <Button variant="ghost" size="sm" onClick={handleCopy} className="absolute top-2 right-2 text-zinc-400 hover:text-white">
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        </Button>
      )}
      <pre className="p-4 overflow-x-auto text-sm text-zinc-100"><code>{code}</code></pre>
    </div>
  )
}
