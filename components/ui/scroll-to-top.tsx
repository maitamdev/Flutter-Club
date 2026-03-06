'use client'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'
import { Button } from './button'

export function ScrollToTop({ threshold = 300 }: { threshold?: number }) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const handler = () => setVisible(window.scrollY > threshold)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [threshold])
  if (!visible) return null
  return (
    <Button size="icon" className="fixed bottom-6 right-6 z-50 rounded-full shadow-lg" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
      <ArrowUp className="h-4 w-4" />
    </Button>
  )
}
