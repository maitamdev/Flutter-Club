
# Part 3: UI Components (commits 41-100)
$ErrorActionPreference = "Continue"
Set-Location "c:\Users\Asus\FLUTTER_CLUB\ft-club-hub"

$count = 40
function CommitFile($path, $msg) {
    $script:count++
    git add $path 2>$null
    git commit -m "$msg" 2>$null
    Write-Host "[$script:count] $msg"
}

# ============ UI COMPONENTS ============

@'
'use client'
import * as React from 'react'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import { cn } from '@/lib/utils'

const TooltipProvider = TooltipPrimitive.Provider
const Tooltip = TooltipPrimitive.Root
const TooltipTrigger = TooltipPrimitive.Trigger
const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      'z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95',
      className
    )}
    {...props}
  />
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName
export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
'@ | Set-Content -Path "components/ui/tooltip.tsx" -Encoding UTF8
CommitFile "components/ui/tooltip.tsx" "feat(ui): add Tooltip component using Radix"

@'
'use client'
import React from 'react'
import { ChevronRight, Home } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface BreadcrumbItem { label: string; href?: string }
interface BreadcrumbProps { items: BreadcrumbItem[]; className?: string }

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav className={cn('flex items-center space-x-1 text-sm text-muted-foreground', className)}>
      <Link href="/" className="flex items-center hover:text-foreground transition-colors">
        <Home className="h-4 w-4" />
      </Link>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight className="h-4 w-4" />
          {item.href ? (
            <Link href={item.href} className="hover:text-foreground transition-colors">{item.label}</Link>
          ) : (
            <span className="text-foreground font-medium">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  )
}
'@ | Set-Content -Path "components/ui/breadcrumb.tsx" -Encoding UTF8
CommitFile "components/ui/breadcrumb.tsx" "feat(ui): add Breadcrumb navigation component"

@'
'use client'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './alert-dialog'

interface ConfirmDialogProps {
  trigger: React.ReactNode
  title: string
  description: string
  confirmText?: string
  cancelText?: string
  variant?: 'default' | 'destructive'
  onConfirm: () => void | Promise<void>
}

export function ConfirmDialog({ trigger, title, description, confirmText = 'Xac nhan', cancelText = 'Huy', variant = 'default', onConfirm }: ConfirmDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{cancelText}</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} className={variant === 'destructive' ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90' : ''}>
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
'@ | Set-Content -Path "components/ui/confirm-dialog.tsx" -Encoding UTF8
CommitFile "components/ui/confirm-dialog.tsx" "feat(ui): add ConfirmDialog reusable component"

@'
'use client'
import { Search, X } from 'lucide-react'
import { Input } from './input'
import { cn } from '@/lib/utils'

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export function SearchInput({ value, onChange, placeholder = 'Tim kiem...', className }: SearchInputProps) {
  return (
    <div className={cn('relative', className)}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="pl-9 pr-9"
      />
      {value && (
        <button onClick={() => onChange('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}
'@ | Set-Content -Path "components/ui/search-input.tsx" -Encoding UTF8
CommitFile "components/ui/search-input.tsx" "feat(ui): add SearchInput component with clear button"

@'
import { cn } from '@/lib/utils'
import { STATUS_COLORS, STATUS_LABELS } from '@/lib/constants/status'
import { ROLE_COLORS, ROLE_LABELS } from '@/lib/constants/roles'

interface StatusBadgeProps { status: string; type?: 'status' | 'role'; className?: string }

export function StatusBadge({ status, type = 'status', className }: StatusBadgeProps) {
  const colors = type === 'role' ? ROLE_COLORS : STATUS_COLORS
  const labels = type === 'role' ? ROLE_LABELS : STATUS_LABELS
  return (
    <span className={cn('inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium', colors[status] || 'bg-gray-100 text-gray-800', className)}>
      {labels[status] || status}
    </span>
  )
}
'@ | Set-Content -Path "components/ui/status-badge.tsx" -Encoding UTF8
CommitFile "components/ui/status-badge.tsx" "feat(ui): add StatusBadge component"

@'
import { cn } from '@/lib/utils'

interface PageHeaderProps {
  title: string
  description?: string
  icon?: React.ReactNode
  actions?: React.ReactNode
  className?: string
}

export function PageHeader({ title, description, icon, actions, className }: PageHeaderProps) {
  return (
    <div className={cn('flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4', className)}>
      <div className="flex items-center gap-3">
        {icon && <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-primary">{icon}</div>}
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
          {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
        </div>
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  )
}
'@ | Set-Content -Path "components/ui/page-header.tsx" -Encoding UTF8
CommitFile "components/ui/page-header.tsx" "feat(ui): add PageHeader component"

@'
'use client'
import { cn } from '@/lib/utils'

interface EmptySearchProps {
  query: string
  message?: string
  className?: string
}

export function EmptySearch({ query, message, className }: EmptySearchProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-12 text-center', className)}>
      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
        <svg className="w-8 h-8 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold">Khong tim thay ket qua</h3>
      <p className="text-sm text-muted-foreground mt-1">
        {message || `Khong tim thay ket qua cho "${query}"`}
      </p>
    </div>
  )
}
'@ | Set-Content -Path "components/ui/empty-search.tsx" -Encoding UTF8
CommitFile "components/ui/empty-search.tsx" "feat(ui): add EmptySearch state component"

@'
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
'@ | Set-Content -Path "components/ui/spinner.tsx" -Encoding UTF8
CommitFile "components/ui/spinner.tsx" "feat(ui): add Spinner loading component"

@'
import { cn } from '@/lib/utils'

interface StatsCardProps {
  title: string
  value: string | number
  icon?: React.ReactNode
  description?: string
  trend?: { value: number; isPositive: boolean }
  className?: string
}

export function StatsCard({ title, value, icon, description, trend, className }: StatsCardProps) {
  return (
    <div className={cn('rounded-2xl border bg-card p-6 shadow-sm', className)}>
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </div>
      <div className="mt-2 flex items-baseline gap-2">
        <p className="text-3xl font-bold">{value}</p>
        {trend && (
          <span className={cn('text-sm font-medium', trend.isPositive ? 'text-emerald-600' : 'text-red-600')}>
            {trend.isPositive ? '+' : ''}{trend.value}%
          </span>
        )}
      </div>
      {description && <p className="mt-1 text-xs text-muted-foreground">{description}</p>}
    </div>
  )
}
'@ | Set-Content -Path "components/ui/stats-card.tsx" -Encoding UTF8
CommitFile "components/ui/stats-card.tsx" "feat(ui): add StatsCard component with trend indicator"

@'
'use client'
import { cn } from '@/lib/utils'

interface CopyButtonProps { text: string; className?: string }

export function CopyButton({ text, className }: CopyButtonProps) {
  const [copied, setCopied] = React.useState(false)
  const handleCopy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <button onClick={handleCopy} className={cn('inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors', className)}>
      {copied ? (
        <><svg className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> Da sao chep</>
      ) : (
        <><svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg> Sao chep</>
      )}
    </button>
  )
}

import React from 'react'
'@ | Set-Content -Path "components/ui/copy-button.tsx" -Encoding UTF8
CommitFile "components/ui/copy-button.tsx" "feat(ui): add CopyButton component"

@'
import { cn } from '@/lib/utils'

interface DataListProps { className?: string; children: React.ReactNode }
interface DataListItemProps { label: string; value: React.ReactNode; className?: string }

export function DataList({ className, children }: DataListProps) {
  return <dl className={cn('space-y-3', className)}>{children}</dl>
}

export function DataListItem({ label, value, className }: DataListItemProps) {
  return (
    <div className={cn('flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4', className)}>
      <dt className="text-sm font-medium text-muted-foreground min-w-[140px]">{label}</dt>
      <dd className="text-sm">{value}</dd>
    </div>
  )
}
'@ | Set-Content -Path "components/ui/data-list.tsx" -Encoding UTF8
CommitFile "components/ui/data-list.tsx" "feat(ui): add DataList component for key-value display"

@'
import { cn } from '@/lib/utils'

interface SectionProps { title: string; description?: string; children: React.ReactNode; actions?: React.ReactNode; className?: string }

export function Section({ title, description, children, actions, className }: SectionProps) {
  return (
    <section className={cn('space-y-4', className)}>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
        {actions}
      </div>
      {children}
    </section>
  )
}
'@ | Set-Content -Path "components/ui/section.tsx" -Encoding UTF8
CommitFile "components/ui/section.tsx" "feat(ui): add Section layout component"

@'
'use client'
import { cn } from '@/lib/utils'
import { Button } from './button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  className?: string
}

export function Pagination({ currentPage, totalPages, onPageChange, className }: PaginationProps) {
  if (totalPages <= 1) return null
  const pages: number[] = []
  const range = 2
  for (let i = Math.max(1, currentPage - range); i <= Math.min(totalPages, currentPage + range); i++) {
    pages.push(i)
  }
  return (
    <div className={cn('flex items-center justify-center gap-1', className)}>
      <Button variant="outline" size="sm" onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
        <ChevronLeft className="h-4 w-4" />
      </Button>
      {pages[0] > 1 && <><Button variant="outline" size="sm" onClick={() => onPageChange(1)}>1</Button>{pages[0] > 2 && <span className="px-2">...</span>}</>}
      {pages.map(page => (
        <Button key={page} variant={page === currentPage ? 'default' : 'outline'} size="sm" onClick={() => onPageChange(page)}>{page}</Button>
      ))}
      {pages[pages.length - 1] < totalPages && <>{pages[pages.length - 1] < totalPages - 1 && <span className="px-2">...</span>}<Button variant="outline" size="sm" onClick={() => onPageChange(totalPages)}>{totalPages}</Button></>}
      <Button variant="outline" size="sm" onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}
'@ | Set-Content -Path "components/ui/pagination.tsx" -Encoding UTF8
CommitFile "components/ui/pagination.tsx" "feat(ui): add Pagination component"

@'
import { cn } from '@/lib/utils'

interface TimelineItem { title: string; description?: string; time: string; icon?: React.ReactNode; status?: 'completed' | 'current' | 'upcoming' }
interface TimelineProps { items: TimelineItem[]; className?: string }

export function Timeline({ items, className }: TimelineProps) {
  return (
    <div className={cn('space-y-0', className)}>
      {items.map((item, index) => (
        <div key={index} className="flex gap-4">
          <div className="flex flex-col items-center">
            <div className={cn('w-8 h-8 rounded-full flex items-center justify-center text-sm', item.status === 'completed' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-200' : item.status === 'current' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground')}>
              {item.icon || (index + 1)}
            </div>
            {index < items.length - 1 && <div className="w-0.5 h-full bg-border min-h-[2rem]" />}
          </div>
          <div className="pb-6">
            <p className="text-sm font-medium">{item.title}</p>
            {item.description && <p className="text-xs text-muted-foreground mt-1">{item.description}</p>}
            <p className="text-xs text-muted-foreground mt-1">{item.time}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
'@ | Set-Content -Path "components/ui/timeline.tsx" -Encoding UTF8
CommitFile "components/ui/timeline.tsx" "feat(ui): add Timeline component"

@'
import { cn } from '@/lib/utils'

interface InfoCardProps { title: string; children: React.ReactNode; icon?: React.ReactNode; variant?: 'default' | 'info' | 'warning' | 'success' | 'error'; className?: string }

const variantStyles = {
  default: 'bg-card border',
  info: 'bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800',
  warning: 'bg-amber-50 border-amber-200 dark:bg-amber-950 dark:border-amber-800',
  success: 'bg-emerald-50 border-emerald-200 dark:bg-emerald-950 dark:border-emerald-800',
  error: 'bg-red-50 border-red-200 dark:bg-red-950 dark:border-red-800',
}

export function InfoCard({ title, children, icon, variant = 'default', className }: InfoCardProps) {
  return (
    <div className={cn('rounded-xl border p-4', variantStyles[variant], className)}>
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <h3 className="text-sm font-semibold">{title}</h3>
      </div>
      <div className="text-sm text-muted-foreground">{children}</div>
    </div>
  )
}
'@ | Set-Content -Path "components/ui/info-card.tsx" -Encoding UTF8
CommitFile "components/ui/info-card.tsx" "feat(ui): add InfoCard component with variants"

@'
import { cn } from '@/lib/utils'

interface AvatarGroupProps { avatars: { name: string; src?: string }[]; max?: number; size?: 'sm' | 'md' | 'lg'; className?: string }

const sizeClasses = { sm: 'w-6 h-6 text-xs', md: 'w-8 h-8 text-sm', lg: 'w-10 h-10 text-base' }

export function AvatarGroup({ avatars, max = 5, size = 'md', className }: AvatarGroupProps) {
  const visible = avatars.slice(0, max)
  const remaining = avatars.length - max
  return (
    <div className={cn('flex items-center -space-x-2', className)}>
      {visible.map((avatar, i) => (
        <div key={i} className={cn('rounded-full border-2 border-background bg-muted flex items-center justify-center overflow-hidden', sizeClasses[size])} title={avatar.name}>
          {avatar.src ? <img src={avatar.src} alt={avatar.name} className="w-full h-full object-cover" /> : <span>{avatar.name[0]}</span>}
        </div>
      ))}
      {remaining > 0 && (
        <div className={cn('rounded-full border-2 border-background bg-muted flex items-center justify-center font-medium', sizeClasses[size])}>
          +{remaining}
        </div>
      )}
    </div>
  )
}
'@ | Set-Content -Path "components/ui/avatar-group.tsx" -Encoding UTF8
CommitFile "components/ui/avatar-group.tsx" "feat(ui): add AvatarGroup component"

@'
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
'@ | Set-Content -Path "components/ui/count-up.tsx" -Encoding UTF8
CommitFile "components/ui/count-up.tsx" "feat(ui): add CountUp animation component"

@'
import { cn } from '@/lib/utils'

interface KeyboardShortcutProps { keys: string[]; className?: string }

export function KeyboardShortcut({ keys, className }: KeyboardShortcutProps) {
  return (
    <span className={cn('inline-flex items-center gap-0.5', className)}>
      {keys.map((key, i) => (
        <span key={i}>
          <kbd className="inline-flex items-center justify-center h-5 px-1.5 text-xs font-medium text-muted-foreground bg-muted border rounded">{key}</kbd>
          {i < keys.length - 1 && <span className="text-muted-foreground mx-0.5">+</span>}
        </span>
      ))}
    </span>
  )
}
'@ | Set-Content -Path "components/ui/keyboard-shortcut.tsx" -Encoding UTF8
CommitFile "components/ui/keyboard-shortcut.tsx" "feat(ui): add KeyboardShortcut display component"

@'
'use client'
import { cn } from '@/lib/utils'
import { useState } from 'react'

interface Tab { id: string; label: string; icon?: React.ReactNode; count?: number }
interface CustomTabsProps { tabs: Tab[]; defaultTab?: string; onChange?: (tabId: string) => void; className?: string }

export function CustomTabs({ tabs, defaultTab, onChange, className }: CustomTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id)
  const handleTabChange = (id: string) => {
    setActiveTab(id)
    onChange?.(id)
  }
  return (
    <div className={cn('flex items-center gap-1 p-1 bg-muted rounded-xl', className)}>
      {tabs.map(tab => (
        <button key={tab.id} onClick={() => handleTabChange(tab.id)} className={cn('flex items-center gap-2 px-4 py-2 text-sm rounded-lg transition-all', activeTab === tab.id ? 'bg-background text-foreground shadow-sm font-medium' : 'text-muted-foreground hover:text-foreground')}>
          {tab.icon}
          {tab.label}
          {tab.count !== undefined && <span className={cn('ml-1 px-1.5 py-0.5 text-xs rounded-full', activeTab === tab.id ? 'bg-primary text-primary-foreground' : 'bg-muted-foreground/20')}>{tab.count}</span>}
        </button>
      ))}
    </div>
  )
}
'@ | Set-Content -Path "components/ui/custom-tabs.tsx" -Encoding UTF8
CommitFile "components/ui/custom-tabs.tsx" "feat(ui): add CustomTabs component with icons and counts"

# ============ More components for features ============

@'
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
'@ | Set-Content -Path "components/ui/stepper.tsx" -Encoding UTF8
CommitFile "components/ui/stepper.tsx" "feat(ui): add Stepper progress component"

@'
import { cn } from '@/lib/utils'

interface DescriptionListProps { children: React.ReactNode; className?: string }
interface DescriptionItemProps { term: string; detail: React.ReactNode; className?: string }

export function DescriptionList({ children, className }: DescriptionListProps) {
  return <div className={cn('divide-y', className)}>{children}</div>
}

export function DescriptionItem({ term, detail, className }: DescriptionItemProps) {
  return (
    <div className={cn('flex items-center justify-between py-3', className)}>
      <dt className="text-sm text-muted-foreground">{term}</dt>
      <dd className="text-sm font-medium">{detail}</dd>
    </div>
  )
}
'@ | Set-Content -Path "components/ui/description-list.tsx" -Encoding UTF8
CommitFile "components/ui/description-list.tsx" "feat(ui): add DescriptionList component"

@'
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
'@ | Set-Content -Path "components/ui/error-display.tsx" -Encoding UTF8
CommitFile "components/ui/error-display.tsx" "feat(ui): add ErrorDisplay component with retry"

@'
import { cn } from '@/lib/utils'

interface ProgressBarProps { value: number; max?: number; label?: string; showPercentage?: boolean; variant?: 'default' | 'success' | 'warning' | 'danger'; className?: string }

const variantColors = {
  default: 'bg-primary',
  success: 'bg-emerald-500',
  warning: 'bg-amber-500',
  danger: 'bg-red-500',
}

export function ProgressBar({ value, max = 100, label, showPercentage = true, variant = 'default', className }: ProgressBarProps) {
  const percentage = Math.min(Math.round((value / max) * 100), 100)
  return (
    <div className={cn('space-y-2', className)}>
      {(label || showPercentage) && (
        <div className="flex items-center justify-between text-sm">
          {label && <span className="text-muted-foreground">{label}</span>}
          {showPercentage && <span className="font-medium">{percentage}%</span>}
        </div>
      )}
      <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
        <div className={cn('h-full rounded-full transition-all duration-500 ease-out', variantColors[variant])} style={{ width: percentage + '%' }} />
      </div>
    </div>
  )
}
'@ | Set-Content -Path "components/ui/progress-bar.tsx" -Encoding UTF8
CommitFile "components/ui/progress-bar.tsx" "feat(ui): add ProgressBar component with variants"

@'
import { cn } from '@/lib/utils'

interface FilePreviewProps {
  fileName: string
  fileSize?: number
  fileType?: string
  onRemove?: () => void
  className?: string
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
}

const typeIcons: Record<string, string> = {
  pdf: '📄', doc: '📝', docx: '📝', xls: '📊', xlsx: '📊', ppt: '📎', pptx: '📎',
  zip: '📦', rar: '📦', jpg: '🖼️', jpeg: '🖼️', png: '🖼️', gif: '🖼️',
}

export function FilePreview({ fileName, fileSize, fileType, onRemove, className }: FilePreviewProps) {
  const ext = fileName.split('.').pop()?.toLowerCase() || ''
  const icon = typeIcons[ext] || '📁'
  return (
    <div className={cn('flex items-center gap-3 p-3 rounded-lg border bg-card', className)}>
      <span className="text-2xl">{icon}</span>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{fileName}</p>
        {fileSize && <p className="text-xs text-muted-foreground">{formatSize(fileSize)}</p>}
      </div>
      {onRemove && <button onClick={onRemove} className="text-muted-foreground hover:text-destructive"><span className="text-lg">×</span></button>}
    </div>
  )
}
'@ | Set-Content -Path "components/ui/file-preview.tsx" -Encoding UTF8
CommitFile "components/ui/file-preview.tsx" "feat(ui): add FilePreview component"

@'
'use client'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from './button'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  return (
    <Button variant="ghost" size="icon" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="rounded-xl">
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Chuyen doi giao dien</span>
    </Button>
  )
}
'@ | Set-Content -Path "components/ui/theme-toggle.tsx" -Encoding UTF8
CommitFile "components/ui/theme-toggle.tsx" "feat(ui): add ThemeToggle button component"

@'
import { cn } from '@/lib/utils'

interface FormFieldProps { label: string; error?: string; required?: boolean; children: React.ReactNode; description?: string; className?: string }

export function FormField({ label, error, required, children, description, className }: FormFieldProps) {
  return (
    <div className={cn('space-y-2', className)}>
      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </label>
      {description && <p className="text-xs text-muted-foreground">{description}</p>}
      {children}
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  )
}
'@ | Set-Content -Path "components/ui/form-field.tsx" -Encoding UTF8
CommitFile "components/ui/form-field.tsx" "feat(ui): add FormField wrapper component"

@'
import { cn } from '@/lib/utils'

interface TagProps { children: React.ReactNode; variant?: 'default' | 'primary' | 'secondary' | 'outline'; onRemove?: () => void; className?: string }

const tagVariants = {
  default: 'bg-muted text-muted-foreground',
  primary: 'bg-primary/10 text-primary',
  secondary: 'bg-secondary text-secondary-foreground',
  outline: 'border bg-transparent',
}

export function Tag({ children, variant = 'default', onRemove, className }: TagProps) {
  return (
    <span className={cn('inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium', tagVariants[variant], className)}>
      {children}
      {onRemove && <button onClick={onRemove} className="ml-1 hover:text-foreground">×</button>}
    </span>
  )
}
'@ | Set-Content -Path "components/ui/tag.tsx" -Encoding UTF8
CommitFile "components/ui/tag.tsx" "feat(ui): add Tag component with variants"

@'
import { cn } from '@/lib/utils'

interface DividerProps { label?: string; className?: string }

export function Divider({ label, className }: DividerProps) {
  if (!label) return <hr className={cn('border-border', className)} />
  return (
    <div className={cn('flex items-center gap-4', className)}>
      <div className="flex-1 border-t border-border" />
      <span className="text-sm text-muted-foreground">{label}</span>
      <div className="flex-1 border-t border-border" />
    </div>
  )
}
'@ | Set-Content -Path "components/ui/divider.tsx" -Encoding UTF8
CommitFile "components/ui/divider.tsx" "feat(ui): add Divider component with optional label"

@'
import { cn } from '@/lib/utils'

interface CharacterCountProps { current: number; max: number; className?: string }

export function CharacterCount({ current, max, className }: CharacterCountProps) {
  const isOver = current > max
  const isNear = current > max * 0.9
  return (
    <span className={cn('text-xs', isOver ? 'text-destructive font-medium' : isNear ? 'text-amber-500' : 'text-muted-foreground', className)}>
      {current}/{max}
    </span>
  )
}
'@ | Set-Content -Path "components/ui/character-count.tsx" -Encoding UTF8
CommitFile "components/ui/character-count.tsx" "feat(ui): add CharacterCount indicator component"

@'
'use client'
import { cn } from '@/lib/utils'
import { useState, useRef } from 'react'
import { Upload, X } from 'lucide-react'

interface FileDropzoneProps { onFileDrop: (files: File[]) => void; accept?: string; multiple?: boolean; maxSize?: number; className?: string }

export function FileDropzone({ onFileDrop, accept, multiple = false, maxSize, className }: FileDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); setIsDragging(false)
    const files = Array.from(e.dataTransfer.files)
    onFileDrop(multiple ? files : files.slice(0, 1))
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) onFileDrop(Array.from(e.target.files))
  }
  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      className={cn('border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors', isDragging ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50', className)}
    >
      <input ref={inputRef} type="file" accept={accept} multiple={multiple} onChange={handleChange} className="hidden" />
      <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-3" />
      <p className="text-sm font-medium">Keo tha file vao day hoac click de chon</p>
      {maxSize && <p className="text-xs text-muted-foreground mt-1">Kich thuoc toi da: {(maxSize / 1024 / 1024).toFixed(0)}MB</p>}
    </div>
  )
}
'@ | Set-Content -Path "components/ui/file-dropzone.tsx" -Encoding UTF8
CommitFile "components/ui/file-dropzone.tsx" "feat(ui): add FileDropzone drag-and-drop component"

@'
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
'@ | Set-Content -Path "components/ui/inline-alert.tsx" -Encoding UTF8
CommitFile "components/ui/inline-alert.tsx" "feat(ui): add InlineAlert component with dismiss"

Write-Host "`n=== Part 3 done: $count commits ==="
