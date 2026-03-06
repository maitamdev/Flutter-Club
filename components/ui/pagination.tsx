'use client'
import { cn } from '@/lib/utils'
import { Button } from './button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  className?: string
}

export function Pagination({ currentPage, totalPages, onPageChange, className }: PaginationProps) {
  if (totalPages <= 1) return null
  const pages: number[] = []
  const range = 2
  for (let i = Math.max(1, currentPage - range); i <= Math.min(totalPages, currentPage + range); i++) {
    pages.push(i)
  }
  return (
    <div className={cn('flex items-center justify-center gap-1', className)}>
      <Button variant="outline" size="sm" onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
        <ChevronLeft className="h-4 w-4" />
      </Button>
      {pages[0] > 1 && <><Button variant="outline" size="sm" onClick={() => onPageChange(1)}>1</Button>{pages[0] > 2 && <span className="px-2">...</span>}</>}
      {pages.map(page => (
        <Button key={page} variant={page === currentPage ? 'default' : 'outline'} size="sm" onClick={() => onPageChange(page)}>{page}</Button>
      ))}
      {pages[pages.length - 1] < totalPages && <>{pages[pages.length - 1] < totalPages - 1 && <span className="px-2">...</span>}<Button variant="outline" size="sm" onClick={() => onPageChange(totalPages)}>{totalPages}</Button></>}
      <Button variant="outline" size="sm" onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}
