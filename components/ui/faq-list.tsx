'use client'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface FAQItem { question: string; answer: string }
interface FAQListProps { items: FAQItem[]; className?: string }

export function FAQList({ items, className }: FAQListProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  return (
    <div className={cn('space-y-2', className)}>
      {items.map((item, index) => (
        <div key={index} className="rounded-xl border">
          <button onClick={() => setOpenIndex(openIndex === index ? null : index)} className="flex items-center justify-between w-full p-4 text-left">
            <span className="font-medium text-sm">{item.question}</span>
            <ChevronDown className={cn('h-4 w-4 transition-transform', openIndex === index && 'rotate-180')} />
          </button>
          {openIndex === index && <p className="px-4 pb-4 text-sm text-muted-foreground">{item.answer}</p>}
        </div>
      ))}
    </div>
  )
}
