'use client'
import { cn } from '@/lib/utils'
import { Button } from './button'
import { LucideIcon } from 'lucide-react'

interface ActionButtonProps {
  icon: LucideIcon
  label: string
  onClick?: () => void
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  loading?: boolean
  disabled?: boolean
  className?: string
}

export function ActionButton({ icon: Icon, label, onClick, variant = 'default', loading = false, disabled = false, className }: ActionButtonProps) {
  return (
    <Button variant={variant} onClick={onClick} disabled={disabled || loading} className={cn('gap-2', className)}>
      {loading ? <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" /> : <Icon className="h-4 w-4" />}
      {label}
    </Button>
  )
}
