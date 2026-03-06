'use client'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface CollapsibleSectionProps { title: string; children: React.ReactNode; defaultOpen?: boolean; className?: string }

export function CollapsibleSection({ title, children, defaultOpen = true, className }: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  return (
    <div className={cn('rounded-xl border', className)}>
      <button onClick={() => setIsOpen(!isOpen)} className="flex items-center justify-between w-full p-4 text-left hover:bg-muted/50 transition-colors">
        <h3 className="font-semibold">{title}</h3>
        {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </button>
      {isOpen && <div className="p-4 pt-0">{children}</div>}
    </div>
  )
}
