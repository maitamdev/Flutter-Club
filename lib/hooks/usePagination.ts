'use client'
import { useMemo, useState } from 'react'
import { PAGINATION } from '@/lib/constants/pagination'

export function usePagination<T>(items: T[], pageSize: number = PAGINATION.DEFAULT_PAGE_SIZE) {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(items.length / pageSize)
  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return items.slice(start, start + pageSize)
  }, [items, currentPage, pageSize])
  const goToPage = (page: number) => setCurrentPage(Math.max(1, Math.min(page, totalPages)))
  const nextPage = () => goToPage(currentPage + 1)
  const prevPage = () => goToPage(currentPage - 1)
  return { paginatedItems, currentPage, totalPages, goToPage, nextPage, prevPage, hasNext: currentPage < totalPages, hasPrev: currentPage > 1 }
}
