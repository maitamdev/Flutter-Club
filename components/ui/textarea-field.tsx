import { cn } from '@/lib/utils'
import { Textarea } from './textarea'

interface TextareaFieldProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> { label: string; error?: string; hint?: string; containerClassName?: string }

export function TextareaField({ label, error, hint, containerClassName, className, required, ...props }: TextareaFieldProps) {
  return (
    <div className={cn('space-y-2', containerClassName)}>
      <label className="text-sm font-medium">{label}{required && <span className="text-destructive ml-1">*</span>}</label>
      <Textarea className={cn(error && 'border-destructive', className)} {...props} />
      {hint && !error && <p className="text-xs text-muted-foreground">{hint}</p>}
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  )
}
