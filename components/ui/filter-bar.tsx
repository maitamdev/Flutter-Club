'use client'
import { cn } from '@/lib/utils'
import { Button } from './button'
import { X, Filter } from 'lucide-react'

interface FilterBarProps {
  activeFilters: { key: string; label: string; value: string }[]
  onRemoveFilter: (key: string) => void
  onClearAll: () => void
  className?: string
}

export function FilterBar({ activeFilters, onRemoveFilter, onClearAll, className }: FilterBarProps) {
  if (activeFilters.length === 0) return null
  return (
    <div className={cn('flex items-center gap-2 flex-wrap', className)}>
      <Filter className="h-4 w-4 text-muted-foreground" />
      {activeFilters.map(f => (
        <span key={f.key} className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full bg-primary/10 text-primary">
          {f.label}: {f.value}
          <button onClick={() => onRemoveFilter(f.key)}><X className="h-3 w-3" /></button>
        </span>
      ))}
      <button onClick={onClearAll} className="text-xs text-muted-foreground hover:text-foreground">Xoa tat ca</button>
    </div>
  )
}
