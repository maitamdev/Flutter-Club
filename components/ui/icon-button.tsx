import { cn } from '@/lib/utils'

interface IconButtonProps {
  icon: React.ReactNode
  onClick?: () => void
  variant?: 'default' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  label: string
  className?: string
}

const sizeClasses = { sm: 'h-8 w-8', md: 'h-10 w-10', lg: 'h-12 w-12' }
const variantClasses = {
  default: 'bg-primary text-primary-foreground hover:bg-primary/90',
  ghost: 'hover:bg-accent hover:text-accent-foreground',
  outline: 'border border-input hover:bg-accent hover:text-accent-foreground',
}

export function IconButton({ icon, onClick, variant = 'ghost', size = 'md', label, className }: IconButtonProps) {
  return (
    <button onClick={onClick} className={cn('inline-flex items-center justify-center rounded-lg transition-colors', sizeClasses[size], variantClasses[variant], className)} aria-label={label} title={label}>
      {icon}
    </button>
  )
}
