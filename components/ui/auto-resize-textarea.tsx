'use client'
import { cn } from '@/lib/utils'
import { useState, useRef, useEffect } from 'react'

interface AutoResizeTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> { minRows?: number; maxRows?: number }

export function AutoResizeTextarea({ minRows = 2, maxRows = 10, className, ...props }: AutoResizeTextareaProps) {
  const ref = useRef<HTMLTextAreaElement>(null)
  useEffect(() => {
    if (!ref.current) return
    ref.current.style.height = 'auto'
    const lineHeight = parseInt(getComputedStyle(ref.current).lineHeight)
    const minH = lineHeight * minRows; const maxH = lineHeight * maxRows
    ref.current.style.height = Math.min(Math.max(ref.current.scrollHeight, minH), maxH) + 'px'
  })
  return <textarea ref={ref} className={cn('w-full resize-none rounded-md border border-input bg-background px-3 py-2 text-sm', className)} rows={minRows} {...props} />
}
