import { cn } from '@/lib/utils'
import { Input } from './input'

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> { label: string; error?: string; hint?: string; containerClassName?: string }

export function InputField({ label, error, hint, containerClassName, className, required, ...props }: InputFieldProps) {
  return (
    <div className={cn('space-y-2', containerClassName)}>
      <label className="text-sm font-medium">{label}{required && <span className="text-destructive ml-1">*</span>}</label>
      <Input className={cn(error && 'border-destructive', className)} {...props} />
      {hint && !error && <p className="text-xs text-muted-foreground">{hint}</p>}
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  )
}
