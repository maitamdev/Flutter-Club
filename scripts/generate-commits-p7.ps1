
# Part 7: Final commits 211-300 - more improvements and polish
$ErrorActionPreference = "Continue"
Set-Location "c:\Users\Asus\FLUTTER_CLUB\ft-club-hub"

$count = 210
function CommitFile($path, $msg) {
    $script:count++
    git add $path 2>$null
    git commit -m "$msg" 2>$null
    Write-Host "[$script:count] $msg"
}

# ============ MORE FORM COMPONENTS ============
@'
import { cn } from '@/lib/utils'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select'

interface SelectFieldProps { label: string; value: string; onChange: (value: string) => void; options: { value: string; label: string }[]; placeholder?: string; error?: string; className?: string }

export function SelectField({ label, value, onChange, options, placeholder = 'Chon...', error, className }: SelectFieldProps) {
  return (
    <div className={cn('space-y-2', className)}>
      <label className="text-sm font-medium">{label}</label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger><SelectValue placeholder={placeholder} /></SelectTrigger>
        <SelectContent>{options.map(opt => <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>)}</SelectContent>
      </Select>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  )
}
'@ | Set-Content -Path "components/ui/select-field.tsx" -Encoding UTF8
CommitFile "components/ui/select-field.tsx" "feat(ui): add SelectField form component"

@'
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
'@ | Set-Content -Path "components/ui/input-field.tsx" -Encoding UTF8
CommitFile "components/ui/input-field.tsx" "feat(ui): add InputField form component"

@'
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
'@ | Set-Content -Path "components/ui/textarea-field.tsx" -Encoding UTF8
CommitFile "components/ui/textarea-field.tsx" "feat(ui): add TextareaField form component"

# ============ MORE LAYOUT ============
@'
import { cn } from '@/lib/utils'

interface TwoColumnLayoutProps { main: React.ReactNode; sidebar: React.ReactNode; sidebarPosition?: 'left' | 'right'; className?: string }

export function TwoColumnLayout({ main, sidebar, sidebarPosition = 'right', className }: TwoColumnLayoutProps) {
  return (
    <div className={cn('grid gap-6 lg:grid-cols-3', className)}>
      {sidebarPosition === 'left' && <div className="lg:col-span-1 space-y-6">{sidebar}</div>}
      <div className="lg:col-span-2 space-y-6">{main}</div>
      {sidebarPosition === 'right' && <div className="lg:col-span-1 space-y-6">{sidebar}</div>}
    </div>
  )
}
'@ | Set-Content -Path "components/layout/two-column-layout.tsx" -Encoding UTF8
CommitFile "components/layout/two-column-layout.tsx" "feat(layout): add TwoColumnLayout component"

@'
import { cn } from '@/lib/utils'

interface StickyHeaderProps { children: React.ReactNode; className?: string }

export function StickyHeader({ children, className }: StickyHeaderProps) {
  return (
    <div className={cn('sticky top-0 z-30 bg-background/80 backdrop-blur-lg border-b -mx-6 px-6 py-4', className)}>
      {children}
    </div>
  )
}
'@ | Set-Content -Path "components/layout/sticky-header.tsx" -Encoding UTF8
CommitFile "components/layout/sticky-header.tsx" "feat(layout): add StickyHeader component"

# ============ DATA DISPLAY COMPONENTS ============
@'
import { cn } from '@/lib/utils'

interface StatComparisonProps { label: string; current: number; previous: number; unit?: string; className?: string }

export function StatComparison({ label, current, previous, unit = '', className }: StatComparisonProps) {
  const diff = current - previous
  const percentChange = previous > 0 ? Math.round((diff / previous) * 100) : 0
  const isPositive = diff >= 0
  return (
    <div className={cn('space-y-1', className)}>
      <p className="text-sm text-muted-foreground">{label}</p>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-bold">{current}{unit}</span>
        <span className={cn('text-sm font-medium', isPositive ? 'text-emerald-600' : 'text-red-600')}>
          {isPositive ? '+' : ''}{percentChange}%
        </span>
      </div>
      <p className="text-xs text-muted-foreground">Truoc do: {previous}{unit}</p>
    </div>
  )
}
'@ | Set-Content -Path "components/ui/stat-comparison.tsx" -Encoding UTF8
CommitFile "components/ui/stat-comparison.tsx" "feat(ui): add StatComparison component"

@'
import { cn } from '@/lib/utils'

interface LabelValueProps { label: string; value: React.ReactNode; horizontal?: boolean; className?: string }

export function LabelValue({ label, value, horizontal = false, className }: LabelValueProps) {
  return (
    <div className={cn(horizontal ? 'flex items-center justify-between' : 'space-y-1', className)}>
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-medium">{value}</span>
    </div>
  )
}
'@ | Set-Content -Path "components/ui/label-value.tsx" -Encoding UTF8
CommitFile "components/ui/label-value.tsx" "feat(ui): add LabelValue display component"

@'
import { cn } from '@/lib/utils'

interface EmptyListProps { icon?: string; title: string; description?: string; action?: React.ReactNode; className?: string }

export function EmptyList({ icon = '📋', title, description, action, className }: EmptyListProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-12 text-center', className)}>
      <span className="text-4xl mb-4">{icon}</span>
      <h3 className="font-semibold">{title}</h3>
      {description && <p className="text-sm text-muted-foreground mt-1 max-w-xs">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}
'@ | Set-Content -Path "components/ui/empty-list.tsx" -Encoding UTF8
CommitFile "components/ui/empty-list.tsx" "feat(ui): add EmptyList component"

@'
import { cn } from '@/lib/utils'

interface SummaryItemProps { label: string; count: number; color?: string; className?: string }
interface SummaryRowProps { items: SummaryItemProps[]; className?: string }

export function SummaryRow({ items, className }: SummaryRowProps) {
  return (
    <div className={cn('flex items-center gap-4 flex-wrap', className)}>
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-2">
          {item.color && <div className={cn('w-3 h-3 rounded-full', item.color)} />}
          <span className="text-sm text-muted-foreground">{item.label}:</span>
          <span className="text-sm font-semibold">{item.count}</span>
        </div>
      ))}
    </div>
  )
}
'@ | Set-Content -Path "components/ui/summary-row.tsx" -Encoding UTF8
CommitFile "components/ui/summary-row.tsx" "feat(ui): add SummaryRow statistics component"

# ============ MORE SERVICES ============
@'
// QR code helpers
export function generateAttendanceUrl(sessionId: string, token: string): string {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000'
  return `${baseUrl}/api/checkin?session=${sessionId}&token=${token}`
}
export function parseQRData(data: string): { sessionId: string; token: string } | null {
  try {
    const url = new URL(data)
    const sessionId = url.searchParams.get('session')
    const token = url.searchParams.get('token')
    if (sessionId && token) return { sessionId, token }
    return null
  } catch { return null }
}
'@ | Set-Content -Path "lib/services/qr-helpers.ts" -Encoding UTF8
CommitFile "lib/services/qr-helpers.ts" "feat(services): add QR code helper functions"

@'
// Sorting and comparison helpers
export function compareByDate(a: Date, b: Date, direction: 'asc' | 'desc' = 'desc'): number {
  return direction === 'asc' ? a.getTime() - b.getTime() : b.getTime() - a.getTime()
}
export function compareByString(a: string, b: string, direction: 'asc' | 'desc' = 'asc'): number {
  const result = a.localeCompare(b, 'vi')
  return direction === 'asc' ? result : -result
}
export function compareByNumber(a: number, b: number, direction: 'asc' | 'desc' = 'desc'): number {
  return direction === 'asc' ? a - b : b - a
}
'@ | Set-Content -Path "lib/services/sort-helpers.ts" -Encoding UTF8
CommitFile "lib/services/sort-helpers.ts" "feat(services): add sorting comparison helpers"

@'
// Badge/Achievement calculation
export interface Badge { id: string; name: string; description: string; icon: string; condition: (stats: any) => boolean }

export const BADGES: Badge[] = [
  { id: 'first_checkin', name: 'Lan dau diem danh', description: 'Diem danh lan dau tien', icon: '🎯', condition: (s) => s.totalCheckins >= 1 },
  { id: 'perfect_attendance', name: 'Sieu cham chi', description: 'Diem danh 10 buoi lien tiep', icon: '🏆', condition: (s) => s.consecutiveCheckins >= 10 },
  { id: 'quiz_master', name: 'Trum quiz', description: 'Dat 100% 3 quiz lien tiep', icon: '🧠', condition: (s) => s.perfectQuizStreak >= 3 },
  { id: 'fast_submitter', name: 'Nop bai som', description: 'Nop bai truoc deadline 3 ngay', icon: '⚡', condition: (s) => s.earlySubmissions >= 1 },
  { id: 'all_assignments', name: 'Hoan thanh tat ca', description: 'Nop day du 100% bai tap', icon: '✅', condition: (s) => s.submissionRate >= 100 },
  { id: 'top_scorer', name: 'Diem cao nhat', description: 'Dat diem cao nhat lop', icon: '⭐', condition: (s) => s.isTopScorer },
  { id: 'helpful', name: 'Nguoi giup do', description: 'Binh luan giup do 10 lan', icon: '🤝', condition: (s) => s.helpfulComments >= 10 },
]
'@ | Set-Content -Path "lib/services/badges.ts" -Encoding UTF8
CommitFile "lib/services/badges.ts" "feat(services): add badge/achievement system"

@'
// Calendar event helpers
import { CalendarEvent } from '@/types/calendar'

export function getEventsForDate(events: CalendarEvent[], date: Date): CalendarEvent[] {
  return events.filter(event => {
    const eventDate = new Date(event.start)
    return eventDate.getFullYear() === date.getFullYear() && eventDate.getMonth() === date.getMonth() && eventDate.getDate() === date.getDate()
  })
}
export function getEventsForMonth(events: CalendarEvent[], year: number, month: number): CalendarEvent[] {
  return events.filter(event => {
    const d = new Date(event.start)
    return d.getFullYear() === year && d.getMonth() === month
  })
}
export function eventTypeColors(type: string): string {
  const colors: Record<string, string> = {
    session: 'bg-blue-500', assignment: 'bg-amber-500', quiz: 'bg-purple-500', announcement: 'bg-emerald-500',
  }
  return colors[type] || 'bg-gray-500'
}
'@ | Set-Content -Path "lib/services/calendar-helpers.ts" -Encoding UTF8
CommitFile "lib/services/calendar-helpers.ts" "feat(services): add calendar event helper functions"

@'
// Theme utility
export function getSystemTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}
export function applyTheme(theme: 'light' | 'dark' | 'system') {
  const resolved = theme === 'system' ? getSystemTheme() : theme
  document.documentElement.classList.toggle('dark', resolved === 'dark')
}
'@ | Set-Content -Path "lib/services/theme-utils.ts" -Encoding UTF8
CommitFile "lib/services/theme-utils.ts" "feat(services): add theme utility service"

# ============ MORE TYPES ============
@'
// Badge and achievement types
export interface UserBadge { badgeId: string; earnedAt: Date }
export interface UserStats {
  totalCheckins: number
  consecutiveCheckins: number
  totalSubmissions: number
  submissionRate: number
  averageScore: number
  quizzesTaken: number
  perfectQuizStreak: number
  earlySubmissions: number
  helpfulComments: number
  isTopScorer: boolean
}
'@ | Set-Content -Path "types/badge.ts" -Encoding UTF8
CommitFile "types/badge.ts" "feat(types): add badge and user stats types"

@'
// Export and import types
export interface ExportConfig {
  format: 'csv' | 'xlsx' | 'pdf'
  fields: string[]
  filename: string
  sheetName?: string
}
export interface ImportResult {
  success: number
  failed: number
  errors: { row: number; message: string }[]
}
'@ | Set-Content -Path "types/export.ts" -Encoding UTF8
CommitFile "types/export.ts" "feat(types): add export/import types"

@'
// Realtime subscription types
export type UnsubscribeFn = () => void

export interface RealtimeConfig {
  collection: string
  orderBy?: string
  orderDirection?: 'asc' | 'desc'
  limitTo?: number
  where?: { field: string; op: string; value: unknown }[]
}
'@ | Set-Content -Path "types/realtime.ts" -Encoding UTF8
CommitFile "types/realtime.ts" "feat(types): add realtime subscription types"

# ============ MORE COMPONENTS ============
@'
'use client'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface FAQItem { question: string; answer: string }
interface FAQListProps { items: FAQItem[]; className?: string }

export function FAQList({ items, className }: FAQListProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  return (
    <div className={cn('space-y-2', className)}>
      {items.map((item, index) => (
        <div key={index} className="rounded-xl border">
          <button onClick={() => setOpenIndex(openIndex === index ? null : index)} className="flex items-center justify-between w-full p-4 text-left">
            <span className="font-medium text-sm">{item.question}</span>
            <ChevronDown className={cn('h-4 w-4 transition-transform', openIndex === index && 'rotate-180')} />
          </button>
          {openIndex === index && <p className="px-4 pb-4 text-sm text-muted-foreground">{item.answer}</p>}
        </div>
      ))}
    </div>
  )
}
'@ | Set-Content -Path "components/ui/faq-list.tsx" -Encoding UTF8
CommitFile "components/ui/faq-list.tsx" "feat(ui): add FAQList accordion component"

@'
import { cn } from '@/lib/utils'

interface HeroSectionProps { title: string; subtitle?: string; children?: React.ReactNode; className?: string }

export function HeroSection({ title, subtitle, children, className }: HeroSectionProps) {
  return (
    <section className={cn('relative py-20 px-4 text-center', className)}>
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{title}</h1>
      {subtitle && <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>}
      {children && <div className="mt-8">{children}</div>}
    </section>
  )
}
'@ | Set-Content -Path "components/ui/hero-section.tsx" -Encoding UTF8
CommitFile "components/ui/hero-section.tsx" "feat(ui): add HeroSection landing component"

@'
import { cn } from '@/lib/utils'

interface TestimonialCardProps { quote: string; author: string; role?: string; avatar?: string; className?: string }

export function TestimonialCard({ quote, author, role, avatar, className }: TestimonialCardProps) {
  return (
    <div className={cn('p-6 rounded-2xl border bg-card', className)}>
      <p className="text-sm italic text-muted-foreground mb-4">&ldquo;{quote}&rdquo;</p>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
          {avatar ? <img src={avatar} alt={author} className="w-full h-full rounded-full object-cover" /> : author[0]}
        </div>
        <div>
          <p className="text-sm font-medium">{author}</p>
          {role && <p className="text-xs text-muted-foreground">{role}</p>}
        </div>
      </div>
    </div>
  )
}
'@ | Set-Content -Path "components/ui/testimonial-card.tsx" -Encoding UTF8
CommitFile "components/ui/testimonial-card.tsx" "feat(ui): add TestimonialCard component"

@'
import { cn } from '@/lib/utils'

interface PricingCardProps { title: string; price: string; features: string[]; highlighted?: boolean; className?: string }

export function PricingCard({ title, price, features, highlighted = false, className }: PricingCardProps) {
  return (
    <div className={cn('p-6 rounded-2xl border', highlighted ? 'border-primary bg-primary/5 shadow-lg' : 'bg-card', className)}>
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="text-3xl font-bold mt-2">{price}</p>
      <ul className="mt-6 space-y-3">
        {features.map((f, i) => <li key={i} className="flex items-center gap-2 text-sm"><span className="text-emerald-500">✓</span> {f}</li>)}
      </ul>
    </div>
  )
}
'@ | Set-Content -Path "components/ui/pricing-card.tsx" -Encoding UTF8
CommitFile "components/ui/pricing-card.tsx" "feat(ui): add PricingCard component"

@'
import { cn } from '@/lib/utils'

interface NotificationItemProps {
  icon: string
  title: string
  message: string
  time: string
  isRead: boolean
  onClick?: () => void
  className?: string
}

export function NotificationItem({ icon, title, message, time, isRead, onClick, className }: NotificationItemProps) {
  return (
    <button onClick={onClick} className={cn('flex items-start gap-3 p-3 rounded-lg w-full text-left hover:bg-muted/50 transition-colors', !isRead && 'bg-primary/5', className)}>
      <span className="text-xl mt-0.5">{icon}</span>
      <div className="flex-1 min-w-0">
        <p className={cn('text-sm', !isRead && 'font-semibold')}>{title}</p>
        <p className="text-xs text-muted-foreground line-clamp-2">{message}</p>
        <p className="text-xs text-muted-foreground mt-1">{time}</p>
      </div>
      {!isRead && <span className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />}
    </button>
  )
}
'@ | Set-Content -Path "components/ui/notification-item.tsx" -Encoding UTF8
CommitFile "components/ui/notification-item.tsx" "feat(ui): add NotificationItem component"

@'
import { cn } from '@/lib/utils'

interface ActivityItemProps { icon: string; user: string; action: string; target: string; time: string; className?: string }

export function ActivityItem({ icon, user, action, target, time, className }: ActivityItemProps) {
  return (
    <div className={cn('flex items-center gap-3 py-3', className)}>
      <span className="text-lg">{icon}</span>
      <div className="flex-1 min-w-0">
        <p className="text-sm"><span className="font-medium">{user}</span> {action} <span className="font-medium">{target}</span></p>
        <p className="text-xs text-muted-foreground">{time}</p>
      </div>
    </div>
  )
}
'@ | Set-Content -Path "components/ui/activity-item.tsx" -Encoding UTF8
CommitFile "components/ui/activity-item.tsx" "feat(ui): add ActivityItem feed component"

@'
import { cn } from '@/lib/utils'

interface CardFooterActionsProps { children: React.ReactNode; className?: string }

export function CardFooterActions({ children, className }: CardFooterActionsProps) {
  return (
    <div className={cn('flex items-center justify-end gap-2 pt-4 border-t mt-4', className)}>
      {children}
    </div>
  )
}
'@ | Set-Content -Path "components/ui/card-footer-actions.tsx" -Encoding UTF8
CommitFile "components/ui/card-footer-actions.tsx" "feat(ui): add CardFooterActions component"

@'
import { cn } from '@/lib/utils'

interface ResponsiveGridProps { children: React.ReactNode; minWidth?: string; className?: string }

export function ResponsiveGrid({ children, minWidth = '280px', className }: ResponsiveGridProps) {
  return (
    <div className={cn('grid gap-4', className)} style={{ gridTemplateColumns: `repeat(auto-fill, minmax(${minWidth}, 1fr))` }}>
      {children}
    </div>
  )
}
'@ | Set-Content -Path "components/ui/responsive-grid.tsx" -Encoding UTF8
CommitFile "components/ui/responsive-grid.tsx" "feat(ui): add ResponsiveGrid auto-fill layout"

@'
import { cn } from '@/lib/utils'

interface KPICardProps { title: string; value: string | number; subtitle?: string; change?: number; icon?: React.ReactNode; className?: string }

export function KPICard({ title, value, subtitle, change, icon, className }: KPICardProps) {
  return (
    <div className={cn('p-5 rounded-2xl border bg-card hover:shadow-md transition-shadow', className)}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
          {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
          {change !== undefined && (
            <p className={cn('text-xs font-medium mt-2', change >= 0 ? 'text-emerald-600' : 'text-red-600')}>
              {change >= 0 ? '↑' : '↓'} {Math.abs(change)}% so voi ky truoc
            </p>
          )}
        </div>
        {icon && <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">{icon}</div>}
      </div>
    </div>
  )
}
'@ | Set-Content -Path "components/ui/kpi-card.tsx" -Encoding UTF8
CommitFile "components/ui/kpi-card.tsx" "feat(ui): add KPICard dashboard component"

# ============ FINAL DOCS & CONFIGS ============
@"
# Environment Setup

## Windows
1. Cai Node.js >= 18: https://nodejs.org
2. Cai Git: https://git-scm.com
3. Cai VS Code: https://code.visualstudio.com
4. Clone va cd vao project
5. npm install
6. Copy .env.example thanh .env.local
7. npm run dev

## macOS
1. brew install node
2. brew install git
3. Clone va cd vao project
4. npm install
5. Copy .env.example thanh .env.local
6. npm run dev

## Linux
1. sudo apt install nodejs npm
2. sudo apt install git
3. Clone va cd vao project
4. npm install
5. Copy .env.example thanh .env.local
6. npm run dev
"@ | Set-Content -Path "docs/environment-setup.md" -Encoding UTF8
CommitFile "docs/environment-setup.md" "docs: add environment setup guide for all platforms"

@"
# Troubleshooting Guide

## Loi thuong gap

### npm install that bai
- Xoa node_modules va package-lock.json
- Chay lai npm install
- Neu van loi, thu npm install --legacy-peer-deps

### Firebase permission denied
- Kiem tra Firebase Security Rules
- Kiem tra tai khoan co role phu hop
- Kiem tra .env.local co dung thong tin

### Build loi
- Xoa .next/
- Chay npm run build lai
- Kiem tra TypeScript errors

### QR diem danh khong hoat dong
- Kiem tra camera permissions trong browser
- Thu dung HTTPS (khong dung HTTP)
- Kiem tra QR code con hieu luc (10 giay)

### Dark mode loi
- Xoa localStorage
- Chon lai theme

### Anh khong hien thi
- Kiem tra Cloudinary config
- Kiem tra next.config.js remotePatterns
"@ | Set-Content -Path "docs/troubleshooting.md" -Encoding UTF8
CommitFile "docs/troubleshooting.md" "docs: add troubleshooting guide"

@"
# Git Workflow

## Branch naming
- feature/ten-tinh-nang
- fix/mo-ta-loi
- docs/noi-dung-cap-nhat
- refactor/mo-ta-thay-doi

## Commit message format
type(scope): description

### Types
- feat: Tinh nang moi
- fix: Sua loi
- docs: Tai lieu
- style: Giao dien
- refactor: Tai cau truc
- test: Testing
- chore: Maintenance

### Examples
feat(auth): add Google login
fix(quiz): fix score calculation
docs: update README
style(ui): improve button hover effect
"@ | Set-Content -Path "docs/git-workflow.md" -Encoding UTF8
CommitFile "docs/git-workflow.md" "docs: add Git workflow guide"

@"
# Responsive Design Guide

## Breakpoints
- sm: 640px (mobile landscape)
- md: 768px (tablet)
- lg: 1024px (desktop)
- xl: 1280px (large desktop)
- 2xl: 1536px (extra large)

## Mobile First
- Bat dau voi mobile layout
- Them responsive classes cho tablet/desktop
- Su dung sm:, md:, lg: prefixes
- Test tren nhieu kich thuoc man hinh

## Common Patterns
- Grid: grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
- Flex direction: flex-col sm:flex-row
- Spacing: p-4 sm:p-6 lg:p-8
- Font size: text-lg md:text-xl lg:text-2xl
- Visibility: hidden sm:block
"@ | Set-Content -Path "docs/responsive-guide.md" -Encoding UTF8
CommitFile "docs/responsive-guide.md" "docs: add responsive design guide"

# ============ FINAL STRETCH: More small files ============

@'
// Input sanitization
export function sanitizeInput(input: string): string {
  return input.replace(/[<>&"']/g, char => {
    const map: Record<string, string> = { '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&#39;' }
    return map[char] || char
  })
}
export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '')
}
export function normalizeWhitespace(str: string): string {
  return str.replace(/\s+/g, ' ').trim()
}
'@ | Set-Content -Path "lib/utils/sanitize.ts" -Encoding UTF8
CommitFile "lib/utils/sanitize.ts" "feat(utils): add input sanitization utilities"

@'
// Platform detection
export function isBrowser(): boolean { return typeof window !== 'undefined' }
export function isServer(): boolean { return typeof window === 'undefined' }
export function isMobileDevice(): boolean {
  if (!isBrowser()) return false
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}
export function isIOS(): boolean {
  if (!isBrowser()) return false
  return /iPad|iPhone|iPod/.test(navigator.userAgent)
}
export function isAndroid(): boolean {
  if (!isBrowser()) return false
  return /Android/i.test(navigator.userAgent)
}
export function isTouchDevice(): boolean {
  if (!isBrowser()) return false
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0
}
'@ | Set-Content -Path "lib/utils/platform.ts" -Encoding UTF8
CommitFile "lib/utils/platform.ts" "feat(utils): add platform detection utilities"

@'
// Focus trap utility
export function getFocusableElements(container: HTMLElement): HTMLElement[] {
  const selectors = 'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
  return Array.from(container.querySelectorAll<HTMLElement>(selectors))
}
export function trapFocus(container: HTMLElement, event: KeyboardEvent) {
  const focusable = getFocusableElements(container)
  if (focusable.length === 0) return
  const first = focusable[0]; const last = focusable[focusable.length - 1]
  if (event.key === 'Tab') {
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
  }
}
'@ | Set-Content -Path "lib/utils/focus-trap.ts" -Encoding UTF8
CommitFile "lib/utils/focus-trap.ts" "feat(a11y): add focus trap utility for modals"

@'
// Responsive image helper
export function getOptimizedImageUrl(url: string, width: number, quality: number = 80): string {
  if (url.includes('cloudinary.com')) {
    return url.replace('/upload/', `/upload/w_${width},q_${quality},f_auto/`)
  }
  return url
}
export function getImageDimensions(file: File): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve({ width: img.width, height: img.height })
    img.onerror = reject
    img.src = URL.createObjectURL(file)
  })
}
'@ | Set-Content -Path "lib/utils/image.ts" -Encoding UTF8
CommitFile "lib/utils/image.ts" "feat(utils): add image optimization utilities"

@'
// Browser notification service
export async function requestNotificationPermission(): Promise<boolean> {
  if (!('Notification' in window)) return false
  if (Notification.permission === 'granted') return true
  const permission = await Notification.requestPermission()
  return permission === 'granted'
}
export function showBrowserNotification(title: string, options?: NotificationOptions): void {
  if (Notification.permission === 'granted') {
    new Notification(title, { icon: '/images/logo.jpg', badge: '/images/logo.jpg', ...options })
  }
}
'@ | Set-Content -Path "lib/services/browser-notification.ts" -Encoding UTF8
CommitFile "lib/services/browser-notification.ts" "feat(services): add browser notification service"

@'
// Keyboard shortcut definitions
export interface KeyboardShortcutDef {
  key: string
  ctrl?: boolean
  shift?: boolean
  alt?: boolean
  description: string
  action: string
}
export const APP_SHORTCUTS: KeyboardShortcutDef[] = [
  { key: 'k', ctrl: true, description: 'Tim kiem', action: 'search' },
  { key: 'n', ctrl: true, description: 'Tao moi', action: 'create' },
  { key: '/', description: 'Focus tim kiem', action: 'focus-search' },
  { key: 'Escape', description: 'Dong dialog', action: 'close' },
  { key: '1', alt: true, description: 'Buoi hoc', action: 'nav-sessions' },
  { key: '2', alt: true, description: 'Bai tap', action: 'nav-assignments' },
  { key: '3', alt: true, description: 'Quiz', action: 'nav-quizzes' },
]
'@ | Set-Content -Path "lib/constants/shortcuts.ts" -Encoding UTF8
CommitFile "lib/constants/shortcuts.ts" "feat(constants): add keyboard shortcut definitions"

@'
// Animation variants for Framer Motion
export const fadeIn = { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
export const slideUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 } }
export const slideDown = { initial: { opacity: 0, y: -20 }, animate: { opacity: 1, y: 0 } }
export const slideLeft = { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 } }
export const slideRight = { initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 } }
export const scaleIn = { initial: { opacity: 0, scale: 0.95 }, animate: { opacity: 1, scale: 1 } }
export const staggerContainer = { animate: { transition: { staggerChildren: 0.1 } } }
export const listItem = { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 } }
'@ | Set-Content -Path "lib/constants/animations.ts" -Encoding UTF8
CommitFile "lib/constants/animations.ts" "feat(constants): add Framer Motion animation variants"

@'
// Regex patterns
export const PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_VN: /^(0|\+84)\d{9,10}$/,
  URL: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/,
  STUDENT_ID: /^\d{5,15}$/,
  GITHUB_URL: /^https:\/\/github\.com\/[\w-]+\/[\w.-]+\/?$/,
  STRONG_PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/,
  SLUG: /^[a-z0-9]+(-[a-z0-9]+)*$/,
  HEX_COLOR: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
}
'@ | Set-Content -Path "lib/constants/patterns.ts" -Encoding UTF8
CommitFile "lib/constants/patterns.ts" "feat(constants): add regex validation patterns"

@'
// Event emitter for client-side events
type EventHandler = (...args: any[]) => void

class EventBus {
  private events: Map<string, EventHandler[]> = new Map()

  on(event: string, handler: EventHandler) {
    const handlers = this.events.get(event) || []
    handlers.push(handler)
    this.events.set(event, handlers)
    return () => this.off(event, handler)
  }

  off(event: string, handler: EventHandler) {
    const handlers = this.events.get(event) || []
    this.events.set(event, handlers.filter(h => h !== handler))
  }

  emit(event: string, ...args: any[]) {
    const handlers = this.events.get(event) || []
    handlers.forEach(h => h(...args))
  }

  clear() { this.events.clear() }
}

export const eventBus = new EventBus()

// Event names
export const EVENTS = {
  NOTIFICATION_RECEIVED: 'notification:received',
  USER_UPDATED: 'user:updated',
  THEME_CHANGED: 'theme:changed',
  SESSION_STARTED: 'session:started',
  ATTENDANCE_OPENED: 'attendance:opened',
}
'@ | Set-Content -Path "lib/services/event-bus.ts" -Encoding UTF8
CommitFile "lib/services/event-bus.ts" "feat(services): add client-side EventBus service"

@'
// Rate limiting for client-side actions
const actionTimestamps = new Map<string, number[]>()

export function isRateLimited(actionKey: string, maxAttempts: number = 5, windowMs: number = 60000): boolean {
  const now = Date.now()
  const timestamps = actionTimestamps.get(actionKey) || []
  const recent = timestamps.filter(t => now - t < windowMs)
  actionTimestamps.set(actionKey, recent)
  if (recent.length >= maxAttempts) return true
  recent.push(now)
  actionTimestamps.set(actionKey, recent)
  return false
}
export function clearRateLimit(actionKey: string): void {
  actionTimestamps.delete(actionKey)
}
'@ | Set-Content -Path "lib/services/client-rate-limit.ts" -Encoding UTF8
CommitFile "lib/services/client-rate-limit.ts" "feat(services): add client-side rate limiting"

Write-Host "`n=== Part 7 done: $count total commits ==="
