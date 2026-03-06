
# Part 6: More code to reach 300 commits (151-300)
$ErrorActionPreference = "Continue"
Set-Location "c:\Users\Asus\FLUTTER_CLUB\ft-club-hub"

$count = 150
function CommitFile($path, $msg) {
    $script:count++
    git add $path 2>$null
    git commit -m "$msg" 2>$null
    Write-Host "[$script:count] $msg"
}

# ============ ACCESSIBILITY COMPONENTS ============
@'
export function SkipToContent() {
  return (
    <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md">
      Chuyen den noi dung chinh
    </a>
  )
}
'@ | Set-Content -Path "components/ui/skip-to-content.tsx" -Encoding UTF8
CommitFile "components/ui/skip-to-content.tsx" "feat(a11y): add SkipToContent accessibility component"

@'
interface VisuallyHiddenProps { children: React.ReactNode }
export function VisuallyHidden({ children }: VisuallyHiddenProps) {
  return <span className="sr-only">{children}</span>
}
'@ | Set-Content -Path "components/ui/visually-hidden.tsx" -Encoding UTF8
CommitFile "components/ui/visually-hidden.tsx" "feat(a11y): add VisuallyHidden component"

# ============ LAYOUT COMPONENTS ============
@'
import { cn } from '@/lib/utils'
interface ContainerProps { children: React.ReactNode; size?: 'sm' | 'md' | 'lg' | 'xl'; className?: string }
const sizeClasses = { sm: 'max-w-2xl', md: 'max-w-4xl', lg: 'max-w-6xl', xl: 'max-w-7xl' }
export function Container({ children, size = 'lg', className }: ContainerProps) {
  return <div className={cn('mx-auto px-4 sm:px-6 lg:px-8', sizeClasses[size], className)}>{children}</div>
}
'@ | Set-Content -Path "components/layout/container.tsx" -Encoding UTF8
CommitFile "components/layout/container.tsx" "feat(layout): add Container responsive layout"

@'
import { cn } from '@/lib/utils'
interface StackProps { children: React.ReactNode; gap?: number; direction?: 'vertical' | 'horizontal'; className?: string }
export function Stack({ children, gap = 4, direction = 'vertical', className }: StackProps) {
  return <div className={cn(direction === 'vertical' ? 'flex flex-col' : 'flex flex-row items-center', `gap-${gap}`, className)}>{children}</div>
}
'@ | Set-Content -Path "components/layout/stack.tsx" -Encoding UTF8
CommitFile "components/layout/stack.tsx" "feat(layout): add Stack layout component"

@'
import { cn } from '@/lib/utils'
interface CenterProps { children: React.ReactNode; className?: string }
export function Center({ children, className }: CenterProps) {
  return <div className={cn('flex items-center justify-center', className)}>{children}</div>
}
'@ | Set-Content -Path "components/layout/center.tsx" -Encoding UTF8
CommitFile "components/layout/center.tsx" "feat(layout): add Center layout component"

# ============ MORE SERVICES ============
@'
// Date formatting service for Vietnamese locale
export function formatVietnameseDate(date: Date): string {
  const day = date.getDate(); const month = date.getMonth() + 1; const year = date.getFullYear()
  return `${day} thang ${month}, ${year}`
}
export function formatVietnameseDateTime(date: Date): string {
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  return `${hours}:${minutes}, ${formatVietnameseDate(date)}`
}
export function getGreeting(): string {
  const hour = new Date().getHours()
  if (hour < 12) return 'Chao buoi sang'
  if (hour < 18) return 'Chao buoi chieu'
  return 'Chao buoi toi'
}
export function getDayOfWeekVN(date: Date): string {
  const days = ['Chu nhat', 'Thu 2', 'Thu 3', 'Thu 4', 'Thu 5', 'Thu 6', 'Thu 7']
  return days[date.getDay()]
}
'@ | Set-Content -Path "lib/services/date-format.ts" -Encoding UTF8
CommitFile "lib/services/date-format.ts" "feat(services): add Vietnamese date formatting service"

@'
// Permission checking service
import { UserRole } from '@/types'

export const Permissions = {
  canManageMembers: (role: UserRole) => role === 'admin',
  canCreateSession: (role: UserRole) => role === 'admin' || role === 'trainer',
  canCreateAssignment: (role: UserRole) => role === 'admin' || role === 'trainer',
  canCreateQuiz: (role: UserRole) => role === 'admin' || role === 'trainer',
  canCreateAnnouncement: (role: UserRole) => role === 'admin' || role === 'trainer',
  canGradeSubmission: (role: UserRole) => role === 'admin' || role === 'trainer',
  canStartAttendance: (role: UserRole) => role === 'admin' || role === 'trainer',
  canDeleteContent: (role: UserRole) => role === 'admin',
  canApproveRequests: (role: UserRole) => role === 'admin',
  canViewAnalytics: (role: UserRole) => role === 'admin' || role === 'trainer',
  canExportData: (role: UserRole) => role === 'admin' || role === 'trainer',
  canUploadMaterial: (role: UserRole) => role === 'admin' || role === 'trainer',
}
'@ | Set-Content -Path "lib/services/permissions.ts" -Encoding UTF8
CommitFile "lib/services/permissions.ts" "feat(services): add permission checking service"

@'
// Validation service for file uploads
import { MAX_FILE_SIZE, FILE_TYPES } from '@/lib/constants/files'

export function validateFile(file: File): { valid: boolean; error?: string } {
  if (file.size > MAX_FILE_SIZE) {
    return { valid: false, error: `File qua lon. Kich thuoc toi da la ${MAX_FILE_SIZE / 1024 / 1024}MB` }
  }
  const ext = file.name.split('.').pop()?.toLowerCase()
  if (!ext) return { valid: false, error: 'Khong the xac dinh loai file' }
  const allTypes = [...FILE_TYPES.DOCUMENT, ...FILE_TYPES.SPREADSHEET, ...FILE_TYPES.PRESENTATION, ...FILE_TYPES.IMAGE, ...FILE_TYPES.ARCHIVE]
  if (!allTypes.includes(ext)) {
    return { valid: false, error: `Loai file .${ext} khong duoc ho tro` }
  }
  return { valid: true }
}

export function validateImage(file: File, maxSizeMB: number = 5): { valid: boolean; error?: string } {
  if (file.size > maxSizeMB * 1024 * 1024) {
    return { valid: false, error: `Anh qua lon. Kich thuoc toi da la ${maxSizeMB}MB` }
  }
  if (!FILE_TYPES.IMAGE.some(ext => file.name.toLowerCase().endsWith('.' + ext))) {
    return { valid: false, error: 'Chi ho tro file anh (jpg, png, gif, webp)' }
  }
  return { valid: true }
}
'@ | Set-Content -Path "lib/services/file-validation.ts" -Encoding UTF8
CommitFile "lib/services/file-validation.ts" "feat(services): add file validation service"

@'
// CSV parsing utility
export function parseCSV(csvText: string): Record<string, string>[] {
  const lines = csvText.split('\n').filter(l => l.trim())
  if (lines.length < 2) return []
  const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''))
  return lines.slice(1).map(line => {
    const values = line.split(',').map(v => v.trim().replace(/^"|"$/g, ''))
    const row: Record<string, string> = {}
    headers.forEach((h, i) => { row[h] = values[i] || '' })
    return row
  })
}
export function toCSV(data: Record<string, unknown>[], headers: string[]): string {
  const headerRow = headers.join(',')
  const rows = data.map(item => headers.map(h => `"${String(item[h] || '').replace(/"/g, '""')}"`).join(','))
  return headerRow + '\n' + rows.join('\n')
}
'@ | Set-Content -Path "lib/services/csv-parser.ts" -Encoding UTF8
CommitFile "lib/services/csv-parser.ts" "feat(services): add CSV parsing utilities"

@'
// Statistics calculation helpers
export function calculateMedian(values: number[]): number {
  if (values.length === 0) return 0
  const sorted = [...values].sort((a, b) => a - b)
  const mid = Math.floor(sorted.length / 2)
  return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2
}
export function calculateStdDev(values: number[]): number {
  if (values.length === 0) return 0
  const mean = values.reduce((s, v) => s + v, 0) / values.length
  const squaredDiffs = values.map(v => Math.pow(v - mean, 2))
  return Math.sqrt(squaredDiffs.reduce((s, v) => s + v, 0) / values.length)
}
export function calculatePercentile(values: number[], percentile: number): number {
  const sorted = [...values].sort((a, b) => a - b)
  const index = (percentile / 100) * (sorted.length - 1)
  const lower = Math.floor(index); const upper = Math.ceil(index)
  if (lower === upper) return sorted[lower]
  return sorted[lower] + (sorted[upper] - sorted[lower]) * (index - lower)
}
export function calculateMode(values: number[]): number | undefined {
  if (values.length === 0) return undefined
  const freq = new Map<number, number>()
  values.forEach(v => freq.set(v, (freq.get(v) || 0) + 1))
  let maxFreq = 0; let mode = values[0]
  freq.forEach((f, v) => { if (f > maxFreq) { maxFreq = f; mode = v } })
  return mode
}
'@ | Set-Content -Path "lib/services/statistics.ts" -Encoding UTF8
CommitFile "lib/services/statistics.ts" "feat(services): add statistics calculation helpers"

# ============ MORE TYPES ============
@'
// Table column types
export interface TableColumn<T> {
  key: keyof T
  label: string
  sortable?: boolean
  width?: string
  render?: (value: T[keyof T], row: T) => React.ReactNode
}
export interface TableAction<T> {
  label: string
  icon?: React.ReactNode
  onClick: (row: T) => void
  variant?: 'default' | 'destructive'
  show?: (row: T) => boolean
}
'@ | Set-Content -Path "types/table.ts" -Encoding UTF8
CommitFile "types/table.ts" "feat(types): add table column and action types"

@'
// Filter types
export interface FilterConfig {
  key: string
  label: string
  type: 'select' | 'date' | 'search' | 'checkbox'
  options?: { value: string; label: string }[]
}
export interface ActiveFilter {
  key: string
  value: string | boolean | Date
  label: string
}
export interface SortConfig {
  key: string
  direction: 'asc' | 'desc'
}
'@ | Set-Content -Path "types/filter.ts" -Encoding UTF8
CommitFile "types/filter.ts" "feat(types): add filter and sort configuration types"

@'
// Permission types
export type Permission =
  | 'manage_members'
  | 'create_session'
  | 'create_assignment'
  | 'create_quiz'
  | 'create_announcement'
  | 'grade_submission'
  | 'start_attendance'
  | 'delete_content'
  | 'approve_requests'
  | 'view_analytics'
  | 'export_data'
  | 'upload_material'

export interface RolePermissions {
  role: string
  permissions: Permission[]
}
'@ | Set-Content -Path "types/permission.ts" -Encoding UTF8
CommitFile "types/permission.ts" "feat(types): add permission enum types"

@'
// Validation result types
export interface ValidationResult {
  valid: boolean
  errors: ValidationError[]
}
export interface ValidationError {
  field: string
  message: string
  code: string
}
export interface FieldValidation {
  required?: boolean
  minLength?: number
  maxLength?: number
  pattern?: RegExp
  custom?: (value: unknown) => string | null
}
'@ | Set-Content -Path "types/validation.ts" -Encoding UTF8
CommitFile "types/validation.ts" "feat(types): add validation result types"

@'
// Toast and notification display types
export type ToastVariant = 'default' | 'destructive' | 'success' | 'warning' | 'info'
export interface ToastConfig {
  title: string
  description?: string
  variant?: ToastVariant
  duration?: number
  action?: { label: string; onClick: () => void }
}
export interface ConfirmConfig {
  title: string
  description: string
  confirmText?: string
  cancelText?: string
  variant?: 'default' | 'destructive'
}
'@ | Set-Content -Path "types/toast.ts" -Encoding UTF8
CommitFile "types/toast.ts" "feat(types): add toast configuration types"

@'
// Theme and styling types
export interface ThemeColors {
  primary: string
  secondary: string
  accent: string
  background: string
  foreground: string
  muted: string
  destructive: string
}
export interface SpacingScale {
  xs: string
  sm: string
  md: string
  lg: string
  xl: string
  '2xl': string
}
export interface BreakpointConfig {
  sm: number
  md: number
  lg: number
  xl: number
  '2xl': number
}
'@ | Set-Content -Path "types/theme.ts" -Encoding UTF8
CommitFile "types/theme.ts" "feat(types): add theme and design token types"

# ============ MORE DOCUMENTATION ============
@"
# Testing Guide

## Cau truc test
- Unit tests cho utils va services
- Component tests cho UI components
- Integration tests cho form submissions
- E2E tests cho user flows

## Chay tests
npm run test         # Unit + Component
npm run test:e2e     # End-to-end

## Test coverage
npm run test:coverage

## Best practices
1. Moi function util nen co unit test
2. Moi form nen test validation
3. Moi API route nen test response format
4. Test ca truong hop loi va edge cases
"@ | Set-Content -Path "docs/testing-guide.md" -Encoding UTF8
CommitFile "docs/testing-guide.md" "docs: add testing guide"

@"
# Performance Optimization Guide

## Lazy Loading
- Su dung next/dynamic cho components lon
- Su dung React.lazy cho modal dialogs

## Image Optimization
- Su dung next/image voi width va height
- Su dung WebP format
- Compress anh truoc khi upload

## Bundle Size
- Tree-shake imports (import cu the, khong import *)
- Su dung dynamic imports cho libraries lon
- Kiem tra bundle size voi next/bundle-analyzer

## Caching
- Su dung SWR hoac React Query cho data fetching
- Cache Firebase queries o client
- Su dung ISR cho trang ít thay doi

## Database
- Tao indexes cho Firestore queries
- Limit so luong documents load moi lan
- Su dung pagination thay vi load tat ca
"@ | Set-Content -Path "docs/performance-guide.md" -Encoding UTF8
CommitFile "docs/performance-guide.md" "docs: add performance optimization guide"

@"
# Huong dan su dung Accessibility

## Nguyen tac WCAG 2.1
1. Perceivable: Noi dung co the nhan biet
2. Operable: Giao dien co the thao tac
3. Understandable: Noi dung de hieu
4. Robust: Tuong thich voi cong nghe ho tro

## Checklist
- [ ] Tat ca hinh anh co alt text
- [ ] Form fields co labels
- [ ] Contrast ratio >= 4.5:1
- [ ] Focus indicators visible
- [ ] Keyboard navigation hoat dong
- [ ] ARIA labels cho interactive elements
- [ ] Error messages accessible
- [ ] Skip to content link
"@ | Set-Content -Path "docs/accessibility-guide.md" -Encoding UTF8
CommitFile "docs/accessibility-guide.md" "docs: add accessibility guidelines"

@"
# Code Review Checklist

## General
- [ ] Code clean va de doc
- [ ] Khong co console.log con sot
- [ ] Naming conventions nhat quan
- [ ] TypeScript types dung va day du

## Security
- [ ] Input duoc validate
- [ ] Khong expose sensitive data
- [ ] Firebase rules bao ve data
- [ ] XSS prevention

## Performance
- [ ] Khong re-render khong can thiet
- [ ] useCallback/useMemo duoc su dung dung
- [ ] Images optimized
- [ ] No memory leaks

## UI/UX
- [ ] Responsive tren mobile
- [ ] Dark mode hoat dong
- [ ] Loading states
- [ ] Error handling
- [ ] Empty states
"@ | Set-Content -Path "docs/code-review-checklist.md" -Encoding UTF8
CommitFile "docs/code-review-checklist.md" "docs: add code review checklist"

# ============ CONFIG FILES ============
@'
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": { "@/*": ["./*"] }
  },
  "exclude": ["node_modules"]
}
'@ | Set-Content -Path "jsconfig.json" -Encoding UTF8
CommitFile "jsconfig.json" "chore: add jsconfig.json for editor support"

@'
{
  "extends": "next/core-web-vitals",
  "rules": {
    "react/no-unescaped-entities": "off",
    "@next/next/no-img-element": "warn",
    "prefer-const": "error",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }]
  }
}
'@ | Set-Content -Path ".eslintrc.json" -Encoding UTF8
CommitFile ".eslintrc.json" "chore: add ESLint configuration"

@'
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100,
  "bracketSpacing": true,
  "arrowParens": "always",
  "endOfLine": "auto"
}
'@ | Set-Content -Path ".prettierrc" -Encoding UTF8
CommitFile ".prettierrc" "chore: add Prettier configuration"

@'
node_modules
.next
build
coverage
*.min.js
'@ | Set-Content -Path ".prettierignore" -Encoding UTF8
CommitFile ".prettierignore" "chore: add Prettier ignore file"

@'
{
  "version": 2,
  "builds": [{ "src": "package.json", "use": "@vercel/next" }],
  "env": {}
}
'@ | Set-Content -Path "vercel.json" -Encoding UTF8
CommitFile "vercel.json" "chore: add Vercel deployment config"

@'
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": { "source.fixAll.eslint": "explicit" },
  "typescript.tsdk": "node_modules/typescript/lib",
  "files.associations": { "*.css": "tailwindcss" },
  "tailwindCSS.experimental.classRegex": ["cn\\(([^)]*)\\)"]
}
'@ | Set-Content -Path ".vscode/settings.json" -Encoding UTF8
CommitFile ".vscode/settings.json" "chore: update VS Code workspace settings"

@'
{
  "recommendations": [
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "bradlc.vscode-tailwindcss",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense"
  ]
}
'@ | Set-Content -Path ".vscode/extensions.json" -Encoding UTF8
CommitFile ".vscode/extensions.json" "chore: add recommended VS Code extensions"

# ============ MORE COMPONENTS ============
@'
'use client'
import { cn } from '@/lib/utils'
import { Button } from './button'
import { X, Filter } from 'lucide-react'

interface FilterBarProps {
  activeFilters: { key: string; label: string; value: string }[]
  onRemoveFilter: (key: string) => void
  onClearAll: () => void
  className?: string
}

export function FilterBar({ activeFilters, onRemoveFilter, onClearAll, className }: FilterBarProps) {
  if (activeFilters.length === 0) return null
  return (
    <div className={cn('flex items-center gap-2 flex-wrap', className)}>
      <Filter className="h-4 w-4 text-muted-foreground" />
      {activeFilters.map(f => (
        <span key={f.key} className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full bg-primary/10 text-primary">
          {f.label}: {f.value}
          <button onClick={() => onRemoveFilter(f.key)}><X className="h-3 w-3" /></button>
        </span>
      ))}
      <button onClick={onClearAll} className="text-xs text-muted-foreground hover:text-foreground">Xoa tat ca</button>
    </div>
  )
}
'@ | Set-Content -Path "components/ui/filter-bar.tsx" -Encoding UTF8
CommitFile "components/ui/filter-bar.tsx" "feat(ui): add FilterBar active filters display"

@'
import { cn } from '@/lib/utils'

interface HighlightTextProps { text: string; highlight: string; className?: string }

export function HighlightText({ text, highlight, className }: HighlightTextProps) {
  if (!highlight.trim()) return <span className={className}>{text}</span>
  const regex = new RegExp(`(${highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
  const parts = text.split(regex)
  return (
    <span className={className}>
      {parts.map((part, i) => regex.test(part) ? <mark key={i} className="bg-yellow-200 dark:bg-yellow-800 rounded px-0.5">{part}</mark> : part)}
    </span>
  )
}
'@ | Set-Content -Path "components/ui/highlight-text.tsx" -Encoding UTF8
CommitFile "components/ui/highlight-text.tsx" "feat(ui): add HighlightText search result component"

@'
'use client'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface CollapsibleSectionProps { title: string; children: React.ReactNode; defaultOpen?: boolean; className?: string }

export function CollapsibleSection({ title, children, defaultOpen = true, className }: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  return (
    <div className={cn('rounded-xl border', className)}>
      <button onClick={() => setIsOpen(!isOpen)} className="flex items-center justify-between w-full p-4 text-left hover:bg-muted/50 transition-colors">
        <h3 className="font-semibold">{title}</h3>
        {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </button>
      {isOpen && <div className="p-4 pt-0">{children}</div>}
    </div>
  )
}
'@ | Set-Content -Path "components/ui/collapsible-section.tsx" -Encoding UTF8
CommitFile "components/ui/collapsible-section.tsx" "feat(ui): add CollapsibleSection component"

@'
import { cn } from '@/lib/utils'
import { Clock } from 'lucide-react'

interface TimeAgoProps { date: Date; className?: string }

export function TimeAgo({ date, className }: TimeAgoProps) {
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)
  let text: string
  if (minutes < 1) text = 'Vua xong'
  else if (minutes < 60) text = `${minutes} phut truoc`
  else if (hours < 24) text = `${hours} gio truoc`
  else if (days < 30) text = `${days} ngay truoc`
  else text = date.toLocaleDateString('vi-VN')
  return (
    <span className={cn('inline-flex items-center gap-1 text-sm text-muted-foreground', className)}>
      <Clock className="h-3 w-3" /> {text}
    </span>
  )
}
'@ | Set-Content -Path "components/ui/time-ago.tsx" -Encoding UTF8
CommitFile "components/ui/time-ago.tsx" "feat(ui): add TimeAgo relative time component"

@'
import { cn } from '@/lib/utils'

interface NumberBadgeProps { value: number; max?: number; className?: string }

export function NumberBadge({ value, max = 99, className }: NumberBadgeProps) {
  if (value <= 0) return null
  const display = value > max ? `${max}+` : String(value)
  return (
    <span className={cn('inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-bold text-white bg-red-500 rounded-full', className)}>
      {display}
    </span>
  )
}
'@ | Set-Content -Path "components/ui/number-badge.tsx" -Encoding UTF8
CommitFile "components/ui/number-badge.tsx" "feat(ui): add NumberBadge notification count"

@'
import { cn } from '@/lib/utils'

interface DotIndicatorProps { status: 'active' | 'inactive' | 'warning' | 'error'; pulse?: boolean; className?: string }

const dotColors = {
  active: 'bg-emerald-500', inactive: 'bg-gray-400', warning: 'bg-amber-500', error: 'bg-red-500',
}

export function DotIndicator({ status, pulse = false, className }: DotIndicatorProps) {
  return <span className={cn('inline-block w-2 h-2 rounded-full', dotColors[status], pulse && 'animate-pulse', className)} />
}
'@ | Set-Content -Path "components/ui/dot-indicator.tsx" -Encoding UTF8
CommitFile "components/ui/dot-indicator.tsx" "feat(ui): add DotIndicator status component"

@'
export function LoadingDots({ className }: { className?: string }) {
  return (
    <span className={className}>
      <span className="inline-block animate-bounce" style={{ animationDelay: '0ms' }}>.</span>
      <span className="inline-block animate-bounce" style={{ animationDelay: '150ms' }}>.</span>
      <span className="inline-block animate-bounce" style={{ animationDelay: '300ms' }}>.</span>
    </span>
  )
}
'@ | Set-Content -Path "components/ui/loading-dots.tsx" -Encoding UTF8
CommitFile "components/ui/loading-dots.tsx" "feat(ui): add LoadingDots animation component"

@'
import { cn } from '@/lib/utils'

interface ListItemProps { children: React.ReactNode; leading?: React.ReactNode; trailing?: React.ReactNode; onClick?: () => void; className?: string }

export function ListItem({ children, leading, trailing, onClick, className }: ListItemProps) {
  const Comp = onClick ? 'button' : 'div'
  return (
    <Comp onClick={onClick} className={cn('flex items-center gap-3 p-4 rounded-xl border hover:bg-muted/50 transition-colors w-full text-left', onClick && 'cursor-pointer', className)}>
      {leading && <div className="shrink-0">{leading}</div>}
      <div className="flex-1 min-w-0">{children}</div>
      {trailing && <div className="shrink-0">{trailing}</div>}
    </Comp>
  )
}
'@ | Set-Content -Path "components/ui/list-item.tsx" -Encoding UTF8
CommitFile "components/ui/list-item.tsx" "feat(ui): add ListItem component"

@'
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
'@ | Set-Content -Path "components/ui/icon-button.tsx" -Encoding UTF8
CommitFile "components/ui/icon-button.tsx" "feat(ui): add IconButton component with a11y"

@'
'use client'
import { cn } from '@/lib/utils'
import { useState, useRef, useEffect } from 'react'

interface AutoResizeTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> { minRows?: number; maxRows?: number }

export function AutoResizeTextarea({ minRows = 2, maxRows = 10, className, ...props }: AutoResizeTextareaProps) {
  const ref = useRef<HTMLTextAreaElement>(null)
  useEffect(() => {
    if (!ref.current) return
    ref.current.style.height = 'auto'
    const lineHeight = parseInt(getComputedStyle(ref.current).lineHeight)
    const minH = lineHeight * minRows; const maxH = lineHeight * maxRows
    ref.current.style.height = Math.min(Math.max(ref.current.scrollHeight, minH), maxH) + 'px'
  })
  return <textarea ref={ref} className={cn('w-full resize-none rounded-md border border-input bg-background px-3 py-2 text-sm', className)} rows={minRows} {...props} />
}
'@ | Set-Content -Path "components/ui/auto-resize-textarea.tsx" -Encoding UTF8
CommitFile "components/ui/auto-resize-textarea.tsx" "feat(ui): add AutoResizeTextarea component"

# ============ MORE HOOKS ============
@'
'use client'
import { useEffect, useRef } from 'react'

export function useKeyPress(targetKey: string, handler: () => void) {
  const handlerRef = useRef(handler)
  useEffect(() => { handlerRef.current = handler }, [handler])
  useEffect(() => {
    const listener = (e: KeyboardEvent) => { if (e.key === targetKey) handlerRef.current() }
    window.addEventListener('keydown', listener)
    return () => window.removeEventListener('keydown', listener)
  }, [targetKey])
}
'@ | Set-Content -Path "lib/hooks/useKeyPress.ts" -Encoding UTF8
CommitFile "lib/hooks/useKeyPress.ts" "feat(hooks): add useKeyPress keyboard hook"

@'
'use client'
import { useEffect, useState } from 'react'

export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  return mounted
}
'@ | Set-Content -Path "lib/hooks/useMounted.ts" -Encoding UTF8
CommitFile "lib/hooks/useMounted.ts" "feat(hooks): add useMounted SSR-safe hook"

@'
'use client'
import { useRef, useEffect, useCallback } from 'react'

export function useEventListener<K extends keyof WindowEventMap>(eventName: K, handler: (event: WindowEventMap[K]) => void, element?: HTMLElement | Window | null) {
  const savedHandler = useRef(handler)
  useEffect(() => { savedHandler.current = handler }, [handler])
  useEffect(() => {
    const targetElement = element || window
    const listener = (event: Event) => savedHandler.current(event as WindowEventMap[K])
    targetElement.addEventListener(eventName, listener)
    return () => targetElement.removeEventListener(eventName, listener)
  }, [eventName, element])
}
'@ | Set-Content -Path "lib/hooks/useEventListener.ts" -Encoding UTF8
CommitFile "lib/hooks/useEventListener.ts" "feat(hooks): add useEventListener hook"

@'
'use client'
import { useEffect, useCallback, useRef } from 'react'

export function useTimeout(callback: () => void, delay: number | null) {
  const savedCallback = useRef(callback)
  useEffect(() => { savedCallback.current = callback }, [callback])
  useEffect(() => {
    if (delay === null) return
    const id = setTimeout(() => savedCallback.current(), delay)
    return () => clearTimeout(id)
  }, [delay])
}
'@ | Set-Content -Path "lib/hooks/useTimeout.ts" -Encoding UTF8
CommitFile "lib/hooks/useTimeout.ts" "feat(hooks): add useTimeout hook"

@'
'use client'
import { useCallback, useState } from 'react'

type CopiedValue = string | null

export function useCopyToClipboard(): [CopiedValue, (text: string) => Promise<boolean>] {
  const [copiedText, setCopiedText] = useState<CopiedValue>(null)
  const copy = useCallback(async (text: string) => {
    if (!navigator?.clipboard) { console.warn('Clipboard not supported'); return false }
    try { await navigator.clipboard.writeText(text); setCopiedText(text); return true }
    catch (err) { console.warn('Copy failed', err); setCopiedText(null); return false }
  }, [])
  return [copiedText, copy]
}
'@ | Set-Content -Path "lib/hooks/useCopyToClipboard.ts" -Encoding UTF8
CommitFile "lib/hooks/useCopyToClipboard.ts" "feat(hooks): add useCopyToClipboard hook"

@'
'use client'
import { useState, useCallback } from 'react'

export function useMap<K, V>(initialEntries?: [K, V][]) {
  const [map, setMap] = useState(new Map<K, V>(initialEntries))
  const set = useCallback((key: K, value: V) => setMap(prev => new Map(prev).set(key, value)), [])
  const remove = useCallback((key: K) => setMap(prev => { const next = new Map(prev); next.delete(key); return next }), [])
  const clear = useCallback(() => setMap(new Map()), [])
  const get = useCallback((key: K) => map.get(key), [map])
  return { map, set, get, remove, clear, size: map.size, has: (key: K) => map.has(key) }
}
'@ | Set-Content -Path "lib/hooks/useMap.ts" -Encoding UTF8
CommitFile "lib/hooks/useMap.ts" "feat(hooks): add useMap data structure hook"

# ============ FINAL BATCH ============

@'
// Attendance status labels
export const ATTENDANCE_STATUS_LABELS: Record<string, string> = {
  'on-time': 'Dung gio',
  'late': 'Tre',
  'absent': 'Vang mat',
}
export const ATTENDANCE_STATUS_COLORS: Record<string, string> = {
  'on-time': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200',
  'late': 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200',
  'absent': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
}
'@ | Set-Content -Path "lib/constants/attendance-status.ts" -Encoding UTF8
CommitFile "lib/constants/attendance-status.ts" "feat(constants): add attendance status labels and colors"

@'
// Grade scale constants
export const GRADE_SCALE = [
  { min: 90, label: 'Xuat sac', color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-950' },
  { min: 80, label: 'Gioi', color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-950' },
  { min: 70, label: 'Kha', color: 'text-cyan-600', bg: 'bg-cyan-50 dark:bg-cyan-950' },
  { min: 50, label: 'Trung binh', color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-950' },
  { min: 0, label: 'Yeu', color: 'text-red-600', bg: 'bg-red-50 dark:bg-red-950' },
]
export function getGrade(score: number, maxScore: number) {
  const pct = maxScore > 0 ? (score / maxScore) * 100 : 0
  return GRADE_SCALE.find(g => pct >= g.min) || GRADE_SCALE[GRADE_SCALE.length - 1]
}
'@ | Set-Content -Path "lib/constants/grades.ts" -Encoding UTF8
CommitFile "lib/constants/grades.ts" "feat(constants): add grade scale constants"

@'
// Social and contact links
export const SOCIAL_LINKS = {
  GITHUB: 'https://github.com/ft-club-hub',
  FACEBOOK: 'https://facebook.com/ftclub.dhv',
  YOUTUBE: 'https://youtube.com/@ftclub',
  WEBSITE: 'https://weboom-dhv-tec.vercel.app',
}
export const CONTACT_INFO = {
  EMAIL: 'ftclub@dhv.edu.vn',
  PHONE: '028-1234-5678',
  ADDRESS: 'Truong DH Hung Vuong TPHCM, 736 Nguyen Trai, P.11, Q.5',
}
'@ | Set-Content -Path "lib/constants/contact.ts" -Encoding UTF8
CommitFile "lib/constants/contact.ts" "feat(constants): add social links and contact info"

@"
# FAQ - Cau hoi thuong gap

## Thanh vien

### Lam sao de tham gia CLB?
1. Truy cap trang dang ky
2. Dien form yeu cau tham gia
3. Doi admin duyet

### Toi quen mat khau?
- Bam 'Quen mat khau' tai trang dang nhap
- Nhap email da dang ky
- Kiem tra email de reset mat khau

### Lam sao de diem danh?
- Vao buoi hoc hien tai
- Quet ma QR hoac nhap ma du phong
- Diem danh chi kha dung trong thoi gian cho phep

## Admin

### Lam sao tao tai khoan admin?
Chay lenh: npx tsx scripts/seed-admin.ts

### Lam sao deploy len production?
Xem docs/deployment.md

### Cloudinary free bao nhieu?
Cloudinary free tier: 25GB storage, 25GB bandwidth/thang
"@ | Set-Content -Path "docs/FAQ.md" -Encoding UTF8
CommitFile "docs/FAQ.md" "docs: add FAQ page"

@"
# Glossary - Tu dien thuat ngu

## A
- **Admin**: Quan tri vien co toan quyen trong he thong
- **Attendance**: Diem danh

## C
- **CLB**: Cau lac bo
- **Cloudinary**: Dich vu luu tru hinh anh/file cloud

## F
- **Firebase**: Nen tang backend-as-a-service cua Google
- **Firestore**: Co so du lieu NoSQL cua Firebase

## M
- **Member**: Thanh vien thong thuong cua CLB
- **MSSV**: Ma so sinh vien

## Q
- **QR Code**: Ma QR dung de diem danh
- **Quiz**: Bai kiem tra trac nghiem

## R
- **Rubric**: Bang tieu chi cham diem

## T
- **Trainer**: Huong dan vien, co quyen tao bai tap va buoi hoc
"@ | Set-Content -Path "docs/glossary.md" -Encoding UTF8
CommitFile "docs/glossary.md" "docs: add glossary of terms"

@'
import { cn } from '@/lib/utils'

interface WarningBannerProps { message: string; action?: React.ReactNode; className?: string }

export function WarningBanner({ message, action, className }: WarningBannerProps) {
  return (
    <div className={cn('flex items-center justify-between px-4 py-3 rounded-xl bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800', className)}>
      <div className="flex items-center gap-2">
        <span>⚠️</span>
        <p className="text-sm text-amber-800 dark:text-amber-200">{message}</p>
      </div>
      {action}
    </div>
  )
}
'@ | Set-Content -Path "components/ui/warning-banner.tsx" -Encoding UTF8
CommitFile "components/ui/warning-banner.tsx" "feat(ui): add WarningBanner component"

@'
import { cn } from '@/lib/utils'

interface SuccessBannerProps { message: string; className?: string }

export function SuccessBanner({ message, className }: SuccessBannerProps) {
  return (
    <div className={cn('flex items-center gap-2 px-4 py-3 rounded-xl bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800', className)}>
      <span>✅</span>
      <p className="text-sm text-emerald-800 dark:text-emerald-200">{message}</p>
    </div>
  )
}
'@ | Set-Content -Path "components/ui/success-banner.tsx" -Encoding UTF8
CommitFile "components/ui/success-banner.tsx" "feat(ui): add SuccessBanner component"

@'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

interface QuickLinkProps { title: string; description: string; href: string; icon: React.ReactNode; className?: string }

export function QuickLink({ title, description, href, icon, className }: QuickLinkProps) {
  return (
    <Link href={href} className={cn('group flex items-center gap-4 p-4 rounded-xl border hover:border-primary/50 hover:bg-primary/5 transition-all', className)}>
      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors">{icon}</div>
      <div className="flex-1">
        <p className="font-medium group-hover:text-primary transition-colors">{title}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
    </Link>
  )
}
'@ | Set-Content -Path "components/ui/quick-link.tsx" -Encoding UTF8
CommitFile "components/ui/quick-link.tsx" "feat(ui): add QuickLink navigation card"

@'
import { cn } from '@/lib/utils'

interface CircularProgressProps { value: number; max?: number; size?: number; strokeWidth?: number; className?: string }

export function CircularProgress({ value, max = 100, size = 60, strokeWidth = 6, className }: CircularProgressProps) {
  const percentage = Math.min(Math.round((value / max) * 100), 100)
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (percentage / 100) * circumference
  return (
    <div className={cn('relative inline-flex items-center justify-center', className)}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="currentColor" strokeWidth={strokeWidth} className="text-muted" />
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" className="text-primary transition-all duration-500" />
      </svg>
      <span className="absolute text-xs font-bold">{percentage}%</span>
    </div>
  )
}
'@ | Set-Content -Path "components/ui/circular-progress.tsx" -Encoding UTF8
CommitFile "components/ui/circular-progress.tsx" "feat(ui): add CircularProgress component"

@'
import { cn } from '@/lib/utils'

interface DateBadgeProps { date: Date; className?: string }

export function DateBadge({ date, className }: DateBadgeProps) {
  const day = date.getDate()
  const month = date.toLocaleString('vi-VN', { month: 'short' })
  return (
    <div className={cn('flex flex-col items-center justify-center w-12 h-14 rounded-xl bg-primary/10 text-primary', className)}>
      <span className="text-lg font-bold leading-none">{day}</span>
      <span className="text-[10px] uppercase mt-0.5">{month}</span>
    </div>
  )
}
'@ | Set-Content -Path "components/ui/date-badge.tsx" -Encoding UTF8
CommitFile "components/ui/date-badge.tsx" "feat(ui): add DateBadge calendar-style component"

@'
'use client'
import { cn } from '@/lib/utils'
import { Button } from './button'
import { Check, Copy } from 'lucide-react'
import { useState } from 'react'

interface CodeBlockProps { code: string; language?: string; showCopy?: boolean; className?: string }

export function CodeBlock({ code, language = 'text', showCopy = true, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const handleCopy = () => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 2000) }
  return (
    <div className={cn('relative rounded-xl bg-zinc-950 dark:bg-zinc-900', className)}>
      {showCopy && (
        <Button variant="ghost" size="sm" onClick={handleCopy} className="absolute top-2 right-2 text-zinc-400 hover:text-white">
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        </Button>
      )}
      <pre className="p-4 overflow-x-auto text-sm text-zinc-100"><code>{code}</code></pre>
    </div>
  )
}
'@ | Set-Content -Path "components/ui/code-block.tsx" -Encoding UTF8
CommitFile "components/ui/code-block.tsx" "feat(ui): add CodeBlock with copy button"

Write-Host "`n=== Part 6 done: $count commits ==="
