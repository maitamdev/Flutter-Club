'use client'
import { cn } from '@/lib/utils'
import { useState } from 'react'

interface AccordionItem { title: string; content: React.ReactNode }
interface AccordionProps { items: AccordionItem[]; className?: string }

export function Accordion({ items, className }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  return (
    <div className={cn('divide-y rounded-xl border', className)}>
      {items.map((item, index) => (
        <div key={index}>
          <button onClick={() => setOpenIndex(openIndex === index ? null : index)} className="flex items-center justify-between w-full p-4 text-left hover:bg-muted/50 transition-colors">
            <span className="font-medium text-sm">{item.title}</span>
            <span className="text-muted-foreground">{openIndex === index ? 'âˆ’' : '+'}</span>
          </button>
          {openIndex === index && <div className="p-4 pt-0 text-sm text-muted-foreground">{item.content}</div>}
        </div>
      ))}
    </div>
  )
}
