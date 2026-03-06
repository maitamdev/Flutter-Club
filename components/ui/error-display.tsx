'use client'
import { cn } from '@/lib/utils'
import { AlertTriangle, RefreshCcw } from 'lucide-react'
import { Button } from './button'

interface ErrorDisplayProps { title?: string; message?: string; onRetry?: () => void; className?: string }

export function ErrorDisplay({ title = 'Co loi xay ra', message = 'Vui long thu lai sau', onRetry, className }: ErrorDisplayProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-12 text-center', className)}>
      <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
        <AlertTriangle className="w-8 h-8 text-destructive" />
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground mt-1 max-w-md">{message}</p>
      {onRetry && (
        <Button variant="outline" onClick={onRetry} className="mt-4">
          <RefreshCcw className="h-4 w-4 mr-2" /> Thu lai
        </Button>
      )}
    </div>
  )
}
