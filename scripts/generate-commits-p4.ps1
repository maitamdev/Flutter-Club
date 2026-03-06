
# Part 4: Pages, Config, SEO, Types, Services (commits 71-150)
$ErrorActionPreference = "Continue"
Set-Location "c:\Users\Asus\FLUTTER_CLUB\ft-club-hub"

$count = 70
function CommitFile($path, $msg) {
    $script:count++
    git add $path 2>$null
    git commit -m "$msg" 2>$null
    Write-Host "[$script:count] $msg"
}

# ============ APP PAGES ============
@'
'use client'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { AlertTriangle, RefreshCcw, Home } from 'lucide-react'
import Link from 'next/link'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error(error) }, [error])
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center mx-auto">
          <AlertTriangle className="w-10 h-10 text-destructive" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Da xay ra loi!</h2>
          <p className="text-muted-foreground mt-2">Xin loi, da co loi xay ra. Vui long thu lai.</p>
        </div>
        <div className="flex items-center justify-center gap-3">
          <Button onClick={reset} variant="outline"><RefreshCcw className="h-4 w-4 mr-2" /> Thu lai</Button>
          <Button asChild><Link href="/"><Home className="h-4 w-4 mr-2" /> Ve trang chu</Link></Button>
        </div>
      </div>
    </div>
  )
}
'@ | Set-Content -Path "app/error.tsx" -Encoding UTF8
CommitFile "app/error.tsx" "feat(app): add global error boundary page"

@'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center space-y-6">
        <div className="text-8xl font-bold text-primary/20">404</div>
        <div>
          <h2 className="text-2xl font-bold">Khong tim thay trang</h2>
          <p className="text-muted-foreground mt-2">Trang ban dang tim kiem khong ton tai hoac da bi di chuyen.</p>
        </div>
        <div className="flex items-center justify-center gap-3">
          <Button variant="outline" asChild><Link href="javascript:history.back()"><ArrowLeft className="h-4 w-4 mr-2" /> Quay lai</Link></Button>
          <Button asChild><Link href="/"><Home className="h-4 w-4 mr-2" /> Ve trang chu</Link></Button>
        </div>
      </div>
    </div>
  )
}
'@ | Set-Content -Path "app/not-found.tsx" -Encoding UTF8
CommitFile "app/not-found.tsx" "feat(app): add custom 404 Not Found page"

@'
import { PageLoading } from '@/components/layout/loading'
export default function DashboardLoading() { return <PageLoading /> }
'@ | Set-Content -Path "app/(dashboard)/loading.tsx" -Encoding UTF8
CommitFile "app/(dashboard)/loading.tsx" "feat(app): add dashboard loading state"

@'
import { PageLoading } from '@/components/layout/loading'
export default function SessionsLoading() { return <PageLoading /> }
'@ | Set-Content -Path "app/(dashboard)/sessions/loading.tsx" -Encoding UTF8
CommitFile "app/(dashboard)/sessions/loading.tsx" "feat(app): add sessions loading state"

@'
import { PageLoading } from '@/components/layout/loading'
export default function AssignmentsLoading() { return <PageLoading /> }
'@ | Set-Content -Path "app/(dashboard)/assignments/loading.tsx" -Encoding UTF8
CommitFile "app/(dashboard)/assignments/loading.tsx" "feat(app): add assignments loading state"

@'
import { PageLoading } from '@/components/layout/loading'
export default function QuizzesLoading() { return <PageLoading /> }
'@ | Set-Content -Path "app/(dashboard)/quizzes/loading.tsx" -Encoding UTF8
CommitFile "app/(dashboard)/quizzes/loading.tsx" "feat(app): add quizzes loading state"

@'
import { PageLoading } from '@/components/layout/loading'
export default function MembersLoading() { return <PageLoading /> }
'@ | Set-Content -Path "app/(dashboard)/members/loading.tsx" -Encoding UTF8
CommitFile "app/(dashboard)/members/loading.tsx" "feat(app): add members loading state"

@'
import { PageLoading } from '@/components/layout/loading'
export default function MaterialsLoading() { return <PageLoading /> }
'@ | Set-Content -Path "app/(dashboard)/materials/loading.tsx" -Encoding UTF8
CommitFile "app/(dashboard)/materials/loading.tsx" "feat(app): add materials loading state"

@'
import { PageLoading } from '@/components/layout/loading'
export default function AnnouncementsLoading() { return <PageLoading /> }
'@ | Set-Content -Path "app/(dashboard)/announcements/loading.tsx" -Encoding UTF8
CommitFile "app/(dashboard)/announcements/loading.tsx" "feat(app): add announcements loading state"

@'
import { PageLoading } from '@/components/layout/loading'
export default function ProfileLoading() { return <PageLoading /> }
'@ | Set-Content -Path "app/(dashboard)/profile/loading.tsx" -Encoding UTF8
CommitFile "app/(dashboard)/profile/loading.tsx" "feat(app): add profile loading state"

# ============ SEO ============
@'
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/api/', '/sessions/', '/assignments/', '/quizzes/', '/members/', '/access-requests/', '/profile/'] },
    sitemap: 'https://weboom-dhv-tec.vercel.app/sitemap.xml',
  }
}
'@ | Set-Content -Path "app/robots.ts" -Encoding UTF8
CommitFile "app/robots.ts" "feat(seo): add robots.txt generation"

@'
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://weboom-dhv-tec.vercel.app'
  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: baseUrl + '/login', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: baseUrl + '/signup', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: baseUrl + '/request-access', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  ]
}
'@ | Set-Content -Path "app/sitemap.ts" -Encoding UTF8
CommitFile "app/sitemap.ts" "feat(seo): add sitemap.xml generation"

# ============ CONFIG UPDATE ============
@'
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
      { protocol: 'https', hostname: 'firebasestorage.googleapis.com' },
      { protocol: 'https', hostname: 'res.cloudinary.com' },
    ],
  },
}

module.exports = nextConfig
'@ | Set-Content -Path "next.config.js" -Encoding UTF8
CommitFile "next.config.js" "fix(config): migrate images.domains to remotePatterns"

# ============ MIDDLEWARE ============
@'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const publicPaths = ['/', '/login', '/signup', '/forgot-password', '/request-access', '/admin']
const authPaths = ['/login', '/signup', '/forgot-password', '/request-access', '/admin']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  // Allow public paths and API routes
  if (publicPaths.some(p => pathname === p) || pathname.startsWith('/api/') || pathname.startsWith('/_next/')) {
    return NextResponse.next()
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|images/).*)'],
}
'@ | Set-Content -Path "middleware.ts" -Encoding UTF8
CommitFile "middleware.ts" "feat(auth): add Next.js middleware for route matching"

# ============ ENV VALIDATION ============
@'
import { z } from 'zod'

const envSchema = z.object({
  NEXT_PUBLIC_FIREBASE_API_KEY: z.string().min(1),
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: z.string().min(1),
  NEXT_PUBLIC_FIREBASE_PROJECT_ID: z.string().min(1),
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: z.string().min(1),
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: z.string().min(1),
  NEXT_PUBLIC_FIREBASE_APP_ID: z.string().min(1),
})

export function validateEnv() {
  const result = envSchema.safeParse(process.env)
  if (!result.success) {
    console.error('Missing environment variables:', result.error.flatten().fieldErrors)
    throw new Error('Missing required environment variables. Check .env.local file.')
  }
  return result.data
}
'@ | Set-Content -Path "lib/env.ts" -Encoding UTF8
CommitFile "lib/env.ts" "feat(config): add runtime environment validation"

# ============ TYPES ============
@'
// Dashboard widget types
export interface DashboardWidget {
  id: string
  title: string
  type: 'stats' | 'chart' | 'list' | 'calendar'
  size: 'small' | 'medium' | 'large'
  position: number
}
export interface WidgetData {
  widgetId: string
  data: unknown
  lastUpdated: Date
}
'@ | Set-Content -Path "types/dashboard.ts" -Encoding UTF8
CommitFile "types/dashboard.ts" "feat(types): add dashboard widget types"

@'
// API response types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}
export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  total: number
  page: number
  pageSize: number
  totalPages: number
}
export interface ApiError {
  code: string
  message: string
  details?: Record<string, string>
}
'@ | Set-Content -Path "types/api.ts" -Encoding UTF8
CommitFile "types/api.ts" "feat(types): add API response types"

@'
// Navigation types
export interface MenuItem {
  id: string
  label: string
  href: string
  icon?: string
  badge?: number
  children?: MenuItem[]
}
export interface BreadcrumbItem {
  label: string
  href?: string
}
export type ThemeMode = 'light' | 'dark' | 'system'
'@ | Set-Content -Path "types/navigation.ts" -Encoding UTF8
CommitFile "types/navigation.ts" "feat(types): add navigation and theme types"

@'
// Form state types
export type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

export interface FormState<T> {
  data: T
  status: FormStatus
  errors: Partial<Record<keyof T, string>>
  message?: string
}
export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}
export interface DateRange {
  from: Date
  to: Date
}
'@ | Set-Content -Path "types/form.ts" -Encoding UTF8
CommitFile "types/form.ts" "feat(types): add form state and select option types"

@'
// Chart data types
export interface ChartDataPoint {
  label: string
  value: number
  color?: string
}
export interface TimeSeriesPoint {
  date: string
  value: number
}
export interface PieChartData {
  name: string
  value: number
  color: string
}
export interface BarChartData {
  category: string
  values: Record<string, number>
}
'@ | Set-Content -Path "types/chart.ts" -Encoding UTF8
CommitFile "types/chart.ts" "feat(types): add chart data types for Recharts"

@'
// Event and calendar types
export interface CalendarEvent {
  id: string
  title: string
  start: Date
  end: Date
  type: 'session' | 'assignment' | 'quiz' | 'announcement'
  color?: string
  description?: string
}
export interface CalendarDay {
  date: Date
  events: CalendarEvent[]
  isToday: boolean
  isCurrentMonth: boolean
}
'@ | Set-Content -Path "types/calendar.ts" -Encoding UTF8
CommitFile "types/calendar.ts" "feat(types): add calendar event types"

@'
// Report and analytics types
export interface AttendanceReport {
  userId: string
  userName: string
  totalSessions: number
  attendedSessions: number
  lateCount: number
  absentCount: number
  attendanceRate: number
}
export interface AssignmentReport {
  userId: string
  userName: string
  totalAssignments: number
  submitted: number
  graded: number
  averageScore: number
}
export interface QuizReport {
  userId: string
  userName: string
  quizzesTaken: number
  averageScore: number
  highestScore: number
  lowestScore: number
}
'@ | Set-Content -Path "types/report.ts" -Encoding UTF8
CommitFile "types/report.ts" "feat(types): add report and analytics data types"

@'
// File and upload types
export interface UploadedFile {
  id: string
  name: string
  size: number
  type: string
  url: string
  uploadedAt: Date
  uploadedBy: string
}
export interface UploadProgress {
  fileId: string
  progress: number
  status: 'pending' | 'uploading' | 'completed' | 'error'
  error?: string
}
export type FileCategory = 'document' | 'image' | 'video' | 'audio' | 'archive' | 'other'
'@ | Set-Content -Path "types/file.ts" -Encoding UTF8
CommitFile "types/file.ts" "feat(types): add file upload types"

@'
// Activity log types
export type ActivityAction = 'create' | 'update' | 'delete' | 'login' | 'logout' | 'checkin' | 'submit' | 'grade'

export interface ActivityLog {
  id: string
  userId: string
  userName: string
  action: ActivityAction
  targetType: string
  targetId: string
  targetName?: string
  metadata?: Record<string, unknown>
  createdAt: Date
}
'@ | Set-Content -Path "types/activity.ts" -Encoding UTF8
CommitFile "types/activity.ts" "feat(types): add activity log types"

@'
// Settings types
export interface AppSettings {
  clubName: string
  clubDescription: string
  semesterName: string
  maxMembers: number
  autoApproveRequests: boolean
  attendanceDuration: number
  qrRotationInterval: number
}
export interface UserPreferences {
  theme: 'light' | 'dark' | 'system'
  language: 'vi' | 'en'
  emailNotifications: boolean
  pushNotifications: boolean
  sidebarCollapsed: boolean
}
'@ | Set-Content -Path "types/settings.ts" -Encoding UTF8
CommitFile "types/settings.ts" "feat(types): add app settings and user preferences types"

# ============ MORE UI COMPONENTS ============
@'
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
'@ | Set-Content -Path "components/ui/action-button.tsx" -Encoding UTF8
CommitFile "components/ui/action-button.tsx" "feat(ui): add ActionButton with loading state"

@'
import { cn } from '@/lib/utils'

interface MetricCardProps {
  label: string
  value: string | number
  sublabel?: string
  icon?: React.ReactNode
  className?: string
}

export function MetricCard({ label, value, sublabel, icon, className }: MetricCardProps) {
  return (
    <div className={cn('flex items-center gap-4 p-4 rounded-xl border bg-card', className)}>
      {icon && <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">{icon}</div>}
      <div>
        <p className="text-2xl font-bold">{value}</p>
        <p className="text-sm text-muted-foreground">{label}</p>
        {sublabel && <p className="text-xs text-muted-foreground">{sublabel}</p>}
      </div>
    </div>
  )
}
'@ | Set-Content -Path "components/ui/metric-card.tsx" -Encoding UTF8
CommitFile "components/ui/metric-card.tsx" "feat(ui): add MetricCard dashboard component"

@'
import { cn } from '@/lib/utils'

interface CardGridProps { children: React.ReactNode; cols?: 1 | 2 | 3 | 4; className?: string }

const colClasses = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
}

export function CardGrid({ children, cols = 3, className }: CardGridProps) {
  return <div className={cn('grid gap-4', colClasses[cols], className)}>{children}</div>
}
'@ | Set-Content -Path "components/ui/card-grid.tsx" -Encoding UTF8
CommitFile "components/ui/card-grid.tsx" "feat(ui): add CardGrid responsive layout component"

@'
import { cn } from '@/lib/utils'

interface SortButtonProps {
  label: string
  active: boolean
  direction?: 'asc' | 'desc'
  onClick: () => void
  className?: string
}

export function SortButton({ label, active, direction, onClick, className }: SortButtonProps) {
  return (
    <button onClick={onClick} className={cn('inline-flex items-center gap-1 text-sm font-medium transition-colors', active ? 'text-foreground' : 'text-muted-foreground hover:text-foreground', className)}>
      {label}
      {active && <span className="text-xs">{direction === 'asc' ? '↑' : '↓'}</span>}
    </button>
  )
}
'@ | Set-Content -Path "components/ui/sort-button.tsx" -Encoding UTF8
CommitFile "components/ui/sort-button.tsx" "feat(ui): add SortButton for table headers"

@'
import { cn } from '@/lib/utils'
import { User } from 'lucide-react'

interface UserInfoProps {
  name: string
  email?: string
  role?: string
  avatar?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizeConfig = {
  sm: { avatar: 'w-8 h-8 text-xs', name: 'text-sm', email: 'text-xs' },
  md: { avatar: 'w-10 h-10 text-sm', name: 'text-base', email: 'text-sm' },
  lg: { avatar: 'w-14 h-14 text-lg', name: 'text-lg', email: 'text-base' },
}

export function UserInfo({ name, email, role, avatar, size = 'md', className }: UserInfoProps) {
  const s = sizeConfig[size]
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <div className={cn('rounded-full bg-primary/10 flex items-center justify-center overflow-hidden shrink-0', s.avatar)}>
        {avatar ? <img src={avatar} alt={name} className="w-full h-full object-cover" /> : <User className="w-1/2 h-1/2 text-primary" />}
      </div>
      <div className="min-w-0">
        <p className={cn('font-medium truncate', s.name)}>{name}</p>
        {email && <p className={cn('text-muted-foreground truncate', s.email)}>{email}</p>}
        {role && <p className="text-xs text-muted-foreground capitalize">{role}</p>}
      </div>
    </div>
  )
}
'@ | Set-Content -Path "components/ui/user-info.tsx" -Encoding UTF8
CommitFile "components/ui/user-info.tsx" "feat(ui): add UserInfo display component"

@'
'use client'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Eye, EyeOff } from 'lucide-react'
import { Input } from './input'

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> { className?: string }

export function PasswordInput({ className, ...props }: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false)
  return (
    <div className="relative">
      <Input type={showPassword ? 'text' : 'password'} className={cn('pr-10', className)} {...props} />
      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </button>
    </div>
  )
}
'@ | Set-Content -Path "components/ui/password-input.tsx" -Encoding UTF8
CommitFile "components/ui/password-input.tsx" "feat(ui): add PasswordInput with visibility toggle"

@'
import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'

interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
  className?: string
}

export function FeatureCard({ icon: Icon, title, description, className }: FeatureCardProps) {
  return (
    <div className={cn('group p-6 rounded-2xl border bg-card hover:shadow-lg transition-all duration-300', className)}>
      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  )
}
'@ | Set-Content -Path "components/ui/feature-card.tsx" -Encoding UTF8
CommitFile "components/ui/feature-card.tsx" "feat(ui): add FeatureCard component for landing page"

@'
import { cn } from '@/lib/utils'
import { Calendar, Clock } from 'lucide-react'
import { formatDate, formatTime } from '@/lib/utils'

interface DateTimeDisplayProps {
  date: Date
  showTime?: boolean
  showIcon?: boolean
  className?: string
}

export function DateTimeDisplay({ date, showTime = true, showIcon = true, className }: DateTimeDisplayProps) {
  return (
    <div className={cn('flex items-center gap-2 text-sm text-muted-foreground', className)}>
      {showIcon && <Calendar className="h-4 w-4" />}
      <span>{formatDate(date)}</span>
      {showTime && (
        <>
          {showIcon && <Clock className="h-4 w-4 ml-2" />}
          <span>{formatTime(date)}</span>
        </>
      )}
    </div>
  )
}
'@ | Set-Content -Path "components/ui/datetime-display.tsx" -Encoding UTF8
CommitFile "components/ui/datetime-display.tsx" "feat(ui): add DateTimeDisplay component"

@'
import { cn } from '@/lib/utils'

interface NoDataProps {
  title?: string
  description?: string
  icon?: React.ReactNode
  action?: React.ReactNode
  className?: string
}

export function NoData({ title = 'Chua co du lieu', description = 'Du lieu se duoc hien thi khi co san', icon, action, className }: NoDataProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-16 text-center', className)}>
      {icon || <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4"><span className="text-3xl">📋</span></div>}
      <h3 className="text-lg font-semibold mt-4">{title}</h3>
      <p className="text-sm text-muted-foreground mt-2 max-w-sm">{description}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  )
}
'@ | Set-Content -Path "components/ui/no-data.tsx" -Encoding UTF8
CommitFile "components/ui/no-data.tsx" "feat(ui): add NoData empty state component"

# ============ SERVICES ============
@'
// Analytics service helpers
import { formatDate } from '@/lib/utils'

export function calculateAttendanceRate(attended: number, total: number): number {
  if (total === 0) return 0
  return Math.round((attended / total) * 100)
}
export function calculateAverageScore(scores: number[]): number {
  if (scores.length === 0) return 0
  return Math.round(scores.reduce((sum, s) => sum + s, 0) / scores.length * 10) / 10
}
export function getGradeLabel(score: number, maxScore: number): string {
  const pct = (score / maxScore) * 100
  if (pct >= 90) return 'Xuat sac'
  if (pct >= 80) return 'Gioi'
  if (pct >= 70) return 'Kha'
  if (pct >= 50) return 'Trung binh'
  return 'Yeu'
}
export function getGradeColor(score: number, maxScore: number): string {
  const pct = (score / maxScore) * 100
  if (pct >= 90) return 'text-emerald-600'
  if (pct >= 80) return 'text-blue-600'
  if (pct >= 70) return 'text-amber-600'
  if (pct >= 50) return 'text-orange-600'
  return 'text-red-600'
}
'@ | Set-Content -Path "lib/services/analytics.ts" -Encoding UTF8
CommitFile "lib/services/analytics.ts" "feat(services): add analytics calculation helpers"

@'
// Export service - generate report data
import { downloadExcel } from '@/lib/utils'

export function exportAttendanceReport(data: any[], sessionTitle: string) {
  const headers = [
    { key: 'userName', label: 'Ho ten' },
    { key: 'studentId', label: 'MSSV' },
    { key: 'status', label: 'Trang thai' },
    { key: 'checkedAt', label: 'Thoi gian' },
  ]
  downloadExcel(data, headers, `diem-danh-${sessionTitle}.xlsx`, 'Diem danh')
}
export function exportMembersReport(data: any[]) {
  const headers = [
    { key: 'name', label: 'Ho ten' },
    { key: 'studentId', label: 'MSSV' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Vai tro' },
    { key: 'status', label: 'Trang thai' },
  ]
  downloadExcel(data, headers, 'danh-sach-thanh-vien.xlsx', 'Thanh vien')
}
export function exportGradesReport(data: any[], assignmentTitle: string) {
  const headers = [
    { key: 'userName', label: 'Ho ten' },
    { key: 'studentId', label: 'MSSV' },
    { key: 'score', label: 'Diem' },
    { key: 'feedback', label: 'Nhan xet' },
    { key: 'submittedAt', label: 'Thoi gian nop' },
  ]
  downloadExcel(data, headers, `diem-${assignmentTitle}.xlsx`, 'Diem so')
}
'@ | Set-Content -Path "lib/services/export.ts" -Encoding UTF8
CommitFile "lib/services/export.ts" "feat(services): add report export service"

@'
// Notification helpers
import { createNotification, createNotificationForAll } from '@/lib/firebase/firestore'

export async function notifyNewSession(sessionTitle: string, creatorId: string) {
  await createNotificationForAll('session_created', 'Buoi hoc moi', 'Buoi hoc "' + sessionTitle + '" da duoc tao', '/sessions', creatorId)
}
export async function notifyNewAssignment(assignmentTitle: string, creatorId: string) {
  await createNotificationForAll('assignment_created', 'Bai tap moi', 'Bai tap "' + assignmentTitle + '" da duoc giao', '/assignments', creatorId)
}
export async function notifySubmissionGraded(userId: string, assignmentTitle: string, score: number) {
  await createNotification(userId, 'submission_graded', 'Bai tap da cham diem', 'Bai tap "' + assignmentTitle + '" da duoc cham: ' + score + ' diem', '/assignments')
}
export async function notifyNewQuiz(quizTitle: string, creatorId: string) {
  await createNotificationForAll('quiz_available', 'Quiz moi', 'Quiz "' + quizTitle + '" da san sang', '/quizzes', creatorId)
}
export async function notifyNewAnnouncement(title: string, creatorId: string) {
  await createNotificationForAll('announcement', 'Thong bao moi', title, '/announcements', creatorId)
}
'@ | Set-Content -Path "lib/services/notification-helpers.ts" -Encoding UTF8
CommitFile "lib/services/notification-helpers.ts" "feat(services): add notification helper functions"

@'
// Search and filter service
import { removeVietnameseTones } from '@/lib/utils/string'

export function searchItems<T>(items: T[], query: string, fields: (keyof T)[]): T[] {
  if (!query.trim()) return items
  const normalizedQuery = removeVietnameseTones(query.toLowerCase())
  return items.filter(item => fields.some(field => {
    const value = String(item[field] || '')
    return removeVietnameseTones(value.toLowerCase()).includes(normalizedQuery)
  }))
}
export function filterByDateRange<T>(items: T[], dateField: keyof T, from?: Date, to?: Date): T[] {
  return items.filter(item => {
    const date = item[dateField] as unknown as Date
    if (!date) return false
    if (from && date < from) return false
    if (to && date > to) return false
    return true
  })
}
export function filterByField<T>(items: T[], field: keyof T, value: string): T[] {
  if (!value || value === 'all') return items
  return items.filter(item => String(item[field]) === value)
}
'@ | Set-Content -Path "lib/services/search.ts" -Encoding UTF8
CommitFile "lib/services/search.ts" "feat(services): add search and filter service"

Write-Host "`n=== Part 4 done: $count commits ==="
