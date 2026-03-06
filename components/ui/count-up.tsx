'use client'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'

interface CountUpProps { end: number; duration?: number; className?: string; prefix?: string; suffix?: string }

export function CountUp({ end, duration = 1000, className, prefix = '', suffix = '' }: CountUpProps) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    let startTime: number | null = null
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setCount(Math.floor(progress * end))
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [end, duration])
  return <span className={className}>{prefix}{count}{suffix}</span>
}
