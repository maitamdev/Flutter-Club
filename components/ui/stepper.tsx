'use client'
import { cn } from '@/lib/utils'
import { CheckCircle, Circle, AlertCircle } from 'lucide-react'

interface Step { title: string; description?: string }
interface StepperProps { steps: Step[]; currentStep: number; className?: string }

export function Stepper({ steps, currentStep, className }: StepperProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      {steps.map((step, index) => (
        <div key={index} className="flex items-center flex-1">
          <div className="flex items-center gap-2">
            <div className={cn('flex items-center justify-center', index < currentStep ? 'text-emerald-500' : index === currentStep ? 'text-primary' : 'text-muted-foreground')}>
              {index < currentStep ? <CheckCircle className="h-6 w-6" /> : <Circle className="h-6 w-6" />}
            </div>
            <div className="hidden sm:block">
              <p className={cn('text-sm font-medium', index <= currentStep ? 'text-foreground' : 'text-muted-foreground')}>{step.title}</p>
              {step.description && <p className="text-xs text-muted-foreground">{step.description}</p>}
            </div>
          </div>
          {index < steps.length - 1 && <div className={cn('flex-1 h-0.5 mx-4', index < currentStep ? 'bg-emerald-500' : 'bg-border')} />}
        </div>
      ))}
    </div>
  )
}
