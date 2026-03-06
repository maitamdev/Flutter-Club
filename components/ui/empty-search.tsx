'use client'
import { cn } from '@/lib/utils'

interface EmptySearchProps {
  query: string
  message?: string
  className?: string
}

export function EmptySearch({ query, message, className }: EmptySearchProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-12 text-center', className)}>
      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
        <svg className="w-8 h-8 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold">Khong tim thay ket qua</h3>
      <p className="text-sm text-muted-foreground mt-1">
        {message || `Khong tim thay ket qua cho "${query}"`}
      </p>
    </div>
  )
}
