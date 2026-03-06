'use client'
import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

const spinnerVariants = cva('animate-spin rounded-full border-2 border-current border-t-transparent', {
  variants: {
    size: { sm: 'h-4 w-4', md: 'h-6 w-6', lg: 'h-8 w-8', xl: 'h-12 w-12' },
  },
  defaultVariants: { size: 'md' },
})

interface SpinnerProps extends VariantProps<typeof spinnerVariants> { className?: string }

export function Spinner({ size, className }: SpinnerProps) {
  return <div className={cn(spinnerVariants({ size }), className)} role="status"><span className="sr-only">Dang tai...</span></div>
}
