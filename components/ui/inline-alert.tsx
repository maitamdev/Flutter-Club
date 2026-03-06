'use client'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react'

type AlertType = 'success' | 'error' | 'warning' | 'info'

interface InlineAlertProps { type: AlertType; title?: string; message: string; dismissible?: boolean; className?: string }

const alertConfig = {
  success: { icon: CheckCircle, bg: 'bg-emerald-50 dark:bg-emerald-950', border: 'border-emerald-200 dark:border-emerald-800', text: 'text-emerald-800 dark:text-emerald-200' },
  error: { icon: XCircle, bg: 'bg-red-50 dark:bg-red-950', border: 'border-red-200 dark:border-red-800', text: 'text-red-800 dark:text-red-200' },
  warning: { icon: AlertTriangle, bg: 'bg-amber-50 dark:bg-amber-950', border: 'border-amber-200 dark:border-amber-800', text: 'text-amber-800 dark:text-amber-200' },
  info: { icon: Info, bg: 'bg-blue-50 dark:bg-blue-950', border: 'border-blue-200 dark:border-blue-800', text: 'text-blue-800 dark:text-blue-200' },
}

export function InlineAlert({ type, title, message, dismissible = false, className }: InlineAlertProps) {
  const [visible, setVisible] = useState(true)
  if (!visible) return null
  const config = alertConfig[type]
  const Icon = config.icon
  return (
    <div className={cn('flex items-start gap-3 p-4 rounded-xl border', config.bg, config.border, config.text, className)}>
      <Icon className="h-5 w-5 mt-0.5 shrink-0" />
      <div className="flex-1">
        {title && <p className="text-sm font-semibold">{title}</p>}
        <p className="text-sm">{message}</p>
      </div>
      {dismissible && <button onClick={() => setVisible(false)}><X className="h-4 w-4" /></button>}
    </div>
  )
}
