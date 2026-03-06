
# Part 5: Docs, more utils, components, configs (commits 106-200)
$ErrorActionPreference = "Continue"
Set-Location "c:\Users\Asus\FLUTTER_CLUB\ft-club-hub"

$count = 105
function CommitFile($path, $msg) {
    $script:count++
    git add $path 2>$null
    git commit -m "$msg" 2>$null
    Write-Host "[$script:count] $msg"
}

# ============ DOCUMENTATION ============
New-Item -ItemType Directory -Force -Path "docs" | Out-Null

@"
# Huong dan su dung he thong

## Danh cho thanh vien

### Dang ky tai khoan
1. Truy cap trang dang ky
2. Dien day du thong tin: Ho ten, MSSV, Email, Mat khau
3. Gui yeu cau va cho admin duyet

### Diem danh
1. Vao buoi hoc cua ban
2. Bam nut "Diem danh"
3. Quet ma QR hoac nhap ma du phong
4. Diem danh thanh cong!

### Lam bai tap
1. Vao muc "Bai tap"
2. Chon bai tap can nop
3. Dien link GitHub va Demo (neu co)
4. Bam "Nop bai"

### Lam quiz
1. Vao muc "Quiz"
2. Chon quiz can lam
3. Tra loi cac cau hoi trong thoi gian quy dinh
4. Bam "Nop bai" khi hoan thanh
"@ | Set-Content -Path "docs/user-guide.md" -Encoding UTF8
CommitFile "docs/user-guide.md" "docs: add user guide for members"

@"
# Huong dan danh cho Admin

## Quan ly thanh vien
- Duyet yeu cau tham gia tai muc 'Yeu cau tham gia'
- Phan quyen tai muc 'Thanh vien'
- Khoa tai khoan neu can thiet

## Quan ly buoi hoc
- Tao buoi hoc moi voi tieu de, mo ta, thoi gian
- Them tai lieu cho buoi hoc
- Mo diem danh khi buoi hoc bat dau

## Quan ly bai tap
- Tao bai tap voi rubric cham diem
- Cham diem va nhan xet bai nop
- Xuat bao cao diem so

## Quan ly quiz
- Tao quiz voi cau hoi trac nghiem
- Quiz se tu dong cham diem
- Xem ket qua cua toan bo thanh vien
"@ | Set-Content -Path "docs/admin-guide.md" -Encoding UTF8
CommitFile "docs/admin-guide.md" "docs: add admin guide"

@"
# API Documentation

## Authentication
- POST /api/auth/login - Dang nhap
- POST /api/auth/register - Dang ky
- POST /api/auth/forgot-password - Quen mat khau

## Sessions
- GET /api/sessions - Lay danh sach buoi hoc
- POST /api/sessions - Tao buoi hoc moi
- PUT /api/sessions/:id - Cap nhat buoi hoc
- DELETE /api/sessions/:id - Xoa buoi hoc

## Assignments
- GET /api/assignments - Lay danh sach bai tap
- POST /api/assignments - Tao bai tap moi
- PUT /api/assignments/:id - Cap nhat bai tap
- DELETE /api/assignments/:id - Xoa bai tap

## Quizzes
- GET /api/quizzes - Lay danh sach quiz
- POST /api/quizzes - Tao quiz moi

## Members
- GET /api/members - Lay danh sach thanh vien
- PUT /api/members/:id - Cap nhat thong tin thanh vien
"@ | Set-Content -Path "docs/api-reference.md" -Encoding UTF8
CommitFile "docs/api-reference.md" "docs: add API reference documentation"

@"
# Firebase Security Rules Guide

## Nguyen tac phan quyen
1. **Admin**: Co quyen toan bo
2. **Trainer**: Co the tao buoi hoc, bai tap, quiz, thong bao
3. **Member**: Chi xem va thuc hien (diem danh, nop bai, lam quiz)

## Cau truc rules
- isAuthenticated(): Kiem tra dang nhap
- isAdmin(): Kiem tra quyen admin
- isTrainer(): Kiem tra quyen admin hoac trainer
- isMember(): Kiem tra thanh vien hoat dong
- isOwner(uid): Kiem tra chu so huu tai lieu

## Luu y bao mat
- Khong bao gio cho phep client tu chinh quyen
- Luon xac thuc server-side cho thao tac nhay cam
- Su dung serverTimestamp() thay vi client timestamp
"@ | Set-Content -Path "docs/security-rules.md" -Encoding UTF8
CommitFile "docs/security-rules.md" "docs: add Firebase security rules guide"

@"
# Huong dan deploy

## Deploy len Vercel
1. Push code len GitHub
2. Ket noi repository voi Vercel
3. Cau hinh Environment Variables
4. Deploy

## Environment Variables can thiet
- NEXT_PUBLIC_FIREBASE_API_KEY
- NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
- NEXT_PUBLIC_FIREBASE_PROJECT_ID
- NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
- NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
- NEXT_PUBLIC_FIREBASE_APP_ID
- NEXT_PUBLIC_TOKEN_SECRET
- NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
- NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET

## Deploy Firebase Rules
firebase deploy --only firestore:rules
firebase deploy --only storage
"@ | Set-Content -Path "docs/deployment.md" -Encoding UTF8
CommitFile "docs/deployment.md" "docs: add deployment guide"

@"
# Contribute Guide

## Cach dong gop
1. Fork repository
2. Tao branch moi: git checkout -b feature/ten-tinh-nang
3. Commit thay doi: git commit -m 'feat: mo ta thay doi'
4. Push branch: git push origin feature/ten-tinh-nang
5. Tao Pull Request

## Quy tac commit
- feat: Tinh nang moi
- fix: Sua loi
- docs: Cap nhat tai lieu
- style: Chinh sua giao dien
- refactor: Tai cau truc code
- test: Them hoac sua test
- chore: Cong viec phu tro

## Quy tac code
- Su dung TypeScript strict mode
- Dat ten bien va ham bang tieng Anh
- Comment bang tieng Viet neu can
- Su dung Prettier va ESLint
"@ | Set-Content -Path "docs/CONTRIBUTING.md" -Encoding UTF8
CommitFile "docs/CONTRIBUTING.md" "docs: add contribution guidelines"

@"
# Changelog

## [1.0.0] - 2024-03-07

### Added
- He thong xac thuc (Email, Google)
- Quan ly thanh vien va phan quyen
- Quan ly buoi hoc
- Diem danh QR dong
- Quan ly bai tap voi rubric
- Quiz trac nghiem tu dong cham diem
- He thong thong bao realtime
- Tai lieu hoc tap
- AI Assistant
- Dark mode
- Xuat bao cao Excel/CSV

### Security
- Firebase Security Rules
- Storage Security Rules
- Rate limiting
- Input validation voi Zod
"@ | Set-Content -Path "docs/CHANGELOG.md" -Encoding UTF8
CommitFile "docs/CHANGELOG.md" "docs: add changelog"

@"
# Architecture Overview

## Cau truc thu muc
- app/ - Next.js App Router pages
  - (auth)/ - Cac trang xac thuc
  - (dashboard)/ - Cac trang he thong
  - api/ - API routes
- components/ - React components
  - ui/ - Base UI components (shadcn/ui)
  - layout/ - Layout components
  - charts/ - Chart components
  - providers/ - Context providers
- lib/ - Business logic
  - firebase/ - Firebase configuration va services
  - hooks/ - Custom React hooks
  - services/ - Business services
  - utils/ - Utility functions
  - validations/ - Zod schemas
  - constants/ - App constants
- types/ - TypeScript type definitions
- docs/ - Documentation
- public/ - Static assets

## Tech Stack
- Frontend: Next.js 14, React 18, TypeScript
- Styling: TailwindCSS, shadcn/ui, Radix UI
- Backend: Firebase (Auth, Firestore, Storage)
- AI: Groq SDK
- Charts: Recharts
- Forms: React Hook Form + Zod
"@ | Set-Content -Path "docs/architecture.md" -Encoding UTF8
CommitFile "docs/architecture.md" "docs: add architecture overview"

@"
# Database Schema (Firestore)

## Collections

### users
- uid (string) - Firebase Auth UID
- name (string) - Ho ten
- studentId (string) - Ma so sinh vien
- email (string)
- role (admin | trainer | member)
- status (active | pending | blocked)
- photoURL (string, optional)
- phone (string, optional)
- address (string, optional)
- createdAt (timestamp)

### sessions
- id (auto)
- title (string)
- description (string)
- location (string, optional)
- startsAt (timestamp)
- endsAt (timestamp)
- trainerId (string)
- trainerName (string)
- materials (array of {title, url})
- createdAt (timestamp)

### assignments
- id (auto)
- title (string)
- description (string)
- dueAt (timestamp)
- rubric (array of {criteria, maxPoints})
- createdBy (string)
- createdAt (timestamp)

### quizzes
- id (auto)
- sessionId (string)
- title (string)
- questions (array of {id, question, options, correctIndex})
- duration (number, minutes)
- isActive (boolean)
- startsAt, endsAt (timestamp)
- createdBy (string)
- createdAt (timestamp)

### announcements
- id (auto)
- title (string)
- content (string)
- createdBy (string)
- createdAt (timestamp)
"@ | Set-Content -Path "docs/database-schema.md" -Encoding UTF8
CommitFile "docs/database-schema.md" "docs: add Firestore database schema guide"

# ============ MORE HOOKS ============
@'
'use client'
import { useEffect, useRef, useState } from 'react'

export function useIntersectionObserver(options?: IntersectionObserverInit) {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!ref.current) return
    const observer = new IntersectionObserver(([entry]) => setIsIntersecting(entry.isIntersecting), options)
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [options])
  return { ref, isIntersecting }
}
'@ | Set-Content -Path "lib/hooks/useIntersectionObserver.ts" -Encoding UTF8
CommitFile "lib/hooks/useIntersectionObserver.ts" "feat(hooks): add useIntersectionObserver hook"

@'
'use client'
import { useState, useEffect } from 'react'

interface WindowSize { width: number; height: number }

export function useWindowSize(): WindowSize {
  const [size, setSize] = useState<WindowSize>({ width: 0, height: 0 })
  useEffect(() => {
    const handleResize = () => setSize({ width: window.innerWidth, height: window.innerHeight })
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  return size
}
'@ | Set-Content -Path "lib/hooks/useWindowSize.ts" -Encoding UTF8
CommitFile "lib/hooks/useWindowSize.ts" "feat(hooks): add useWindowSize hook"

@'
'use client'
import { useCallback, useState } from 'react'
import { useToast } from '@/components/ui/use-toast'

export function useFormSubmit<T>() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  const submit = useCallback(async (fn: () => Promise<T>, successMsg?: string): Promise<T | null> => {
    setLoading(true); setError(null)
    try {
      const result = await fn()
      if (successMsg) toast({ title: 'Thanh cong', description: successMsg })
      return result
    } catch (err: any) {
      const msg = err?.message || 'Co loi xay ra'
      setError(msg)
      toast({ title: 'Loi', description: msg, variant: 'destructive' })
      return null
    } finally { setLoading(false) }
  }, [toast])

  return { submit, loading, error }
}
'@ | Set-Content -Path "lib/hooks/useFormSubmit.ts" -Encoding UTF8
CommitFile "lib/hooks/useFormSubmit.ts" "feat(hooks): add useFormSubmit hook with toast feedback"

@'
'use client'
import { useState, useCallback } from 'react'

export function useSelection<T extends string | number>() {
  const [selected, setSelected] = useState<Set<T>>(new Set())
  const toggle = useCallback((id: T) => {
    setSelected(prev => { const next = new Set(prev); next.has(id) ? next.delete(id) : next.add(id); return next })
  }, [])
  const selectAll = useCallback((ids: T[]) => setSelected(new Set(ids)), [])
  const deselectAll = useCallback(() => setSelected(new Set()), [])
  const isSelected = useCallback((id: T) => selected.has(id), [selected])
  return { selected, toggle, selectAll, deselectAll, isSelected, count: selected.size }
}
'@ | Set-Content -Path "lib/hooks/useSelection.ts" -Encoding UTF8
CommitFile "lib/hooks/useSelection.ts" "feat(hooks): add useSelection hook for multi-select"

@'
'use client'
import { useEffect, useState } from 'react'

export function useOnlineStatus(): boolean {
  const [isOnline, setIsOnline] = useState(true)
  useEffect(() => {
    setIsOnline(navigator.onLine)
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    return () => { window.removeEventListener('online', handleOnline); window.removeEventListener('offline', handleOffline) }
  }, [])
  return isOnline
}
'@ | Set-Content -Path "lib/hooks/useOnlineStatus.ts" -Encoding UTF8
CommitFile "lib/hooks/useOnlineStatus.ts" "feat(hooks): add useOnlineStatus hook"

@'
'use client'
import { useCallback, useRef } from 'react'

export function useThrottle<T extends (...args: any[]) => any>(fn: T, delay: number): T {
  const lastCall = useRef(0)
  const throttled = useCallback((...args: any[]) => {
    const now = Date.now()
    if (now - lastCall.current >= delay) {
      lastCall.current = now
      return fn(...args)
    }
  }, [fn, delay]) as T
  return throttled
}
'@ | Set-Content -Path "lib/hooks/useThrottle.ts" -Encoding UTF8
CommitFile "lib/hooks/useThrottle.ts" "feat(hooks): add useThrottle hook"

# ============ MORE UTILS ============
@'
// Crypto and hash utilities
export function generateId(length: number = 20): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) { result += chars.charAt(Math.floor(Math.random() * chars.length)) }
  return result
}
export function hashCode(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash |= 0
  }
  return hash
}
export function simpleHash(str: string): string {
  return Math.abs(hashCode(str)).toString(36)
}
'@ | Set-Content -Path "lib/utils/crypto.ts" -Encoding UTF8
CommitFile "lib/utils/crypto.ts" "feat(utils): add ID generation and hash utilities"

@'
// DOM utility functions
export function scrollToTop(smooth: boolean = true): void {
  window.scrollTo({ top: 0, behavior: smooth ? 'smooth' : 'auto' })
}
export function scrollToElement(elementId: string, offset: number = 0): void {
  const element = document.getElementById(elementId)
  if (element) {
    const y = element.getBoundingClientRect().top + window.scrollY + offset
    window.scrollTo({ top: y, behavior: 'smooth' })
  }
}
export function copyToClipboard(text: string): Promise<boolean> {
  return navigator.clipboard.writeText(text).then(() => true).catch(() => false)
}
export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url; a.download = filename; a.click()
  URL.revokeObjectURL(url)
}
export function getScrollPercentage(): number {
  const h = document.documentElement
  const st = h.scrollTop || document.body.scrollTop
  const sh = h.scrollHeight - h.clientHeight
  return sh > 0 ? Math.round((st / sh) * 100) : 0
}
'@ | Set-Content -Path "lib/utils/dom.ts" -Encoding UTF8
CommitFile "lib/utils/dom.ts" "feat(utils): add DOM utility functions"

@'
// Debounce and throttle utilities
export function debounce<T extends (...args: any[]) => any>(fn: T, delay: number): (...args: Parameters<T>) => void {
  let timer: NodeJS.Timeout
  return (...args: Parameters<T>) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), delay) }
}
export function throttle<T extends (...args: any[]) => any>(fn: T, limit: number): (...args: Parameters<T>) => void {
  let inThrottle = false
  return (...args: Parameters<T>) => { if (!inThrottle) { fn(...args); inThrottle = true; setTimeout(() => (inThrottle = false), limit) } }
}
export function retry<T>(fn: () => Promise<T>, retries: number = 3, delay: number = 1000): Promise<T> {
  return fn().catch(err => retries > 0 ? new Promise(resolve => setTimeout(resolve, delay)).then(() => retry(fn, retries - 1, delay * 2)) : Promise.reject(err))
}
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}
'@ | Set-Content -Path "lib/utils/async.ts" -Encoding UTF8
CommitFile "lib/utils/async.ts" "feat(utils): add async utility functions (debounce, throttle, retry)"

@'
// Object utility functions
export function pick<T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  const result = {} as Pick<T, K>
  keys.forEach(key => { if (key in obj) result[key] = obj[key] })
  return result
}
export function omit<T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
  const result = { ...obj }
  keys.forEach(key => delete (result as any)[key])
  return result as Omit<T, K>
}
export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj))
}
export function isEmpty(obj: unknown): boolean {
  if (obj == null) return true
  if (typeof obj === 'string' || Array.isArray(obj)) return obj.length === 0
  if (typeof obj === 'object') return Object.keys(obj).length === 0
  return false
}
export function mergeDeep<T extends object>(target: T, ...sources: Partial<T>[]): T {
  const result = { ...target }
  sources.forEach(source => {
    Object.keys(source || {}).forEach(key => {
      const val = (source as any)[key]
      if (val && typeof val === 'object' && !Array.isArray(val)) {
        (result as any)[key] = mergeDeep((result as any)[key] || {}, val)
      } else { (result as any)[key] = val }
    })
  })
  return result
}
'@ | Set-Content -Path "lib/utils/object.ts" -Encoding UTF8
CommitFile "lib/utils/object.ts" "feat(utils): add object utility functions"

# ============ MORE UI COMPONENTS ============
@'
'use client'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'
import { Button } from './button'

export function ScrollToTop({ threshold = 300 }: { threshold?: number }) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const handler = () => setVisible(window.scrollY > threshold)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [threshold])
  if (!visible) return null
  return (
    <Button size="icon" className="fixed bottom-6 right-6 z-50 rounded-full shadow-lg" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
      <ArrowUp className="h-4 w-4" />
    </Button>
  )
}
'@ | Set-Content -Path "components/ui/scroll-to-top.tsx" -Encoding UTF8
CommitFile "components/ui/scroll-to-top.tsx" "feat(ui): add ScrollToTop floating button"

@'
import { cn } from '@/lib/utils'

interface GradientTextProps { children: React.ReactNode; from?: string; to?: string; className?: string }

export function GradientText({ children, from = 'from-primary', to = 'to-blue-600', className }: GradientTextProps) {
  return <span className={cn('bg-gradient-to-r bg-clip-text text-transparent', from, to, className)}>{children}</span>
}
'@ | Set-Content -Path "components/ui/gradient-text.tsx" -Encoding UTF8
CommitFile "components/ui/gradient-text.tsx" "feat(ui): add GradientText styled component"

@'
import { cn } from '@/lib/utils'

interface GlassCardProps { children: React.ReactNode; className?: string }

export function GlassCard({ children, className }: GlassCardProps) {
  return (
    <div className={cn('rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-xl', className)}>
      {children}
    </div>
  )
}
'@ | Set-Content -Path "components/ui/glass-card.tsx" -Encoding UTF8
CommitFile "components/ui/glass-card.tsx" "feat(ui): add GlassCard glassmorphism component"

@'
'use client'
import { cn } from '@/lib/utils'
import { Wifi, WifiOff } from 'lucide-react'

interface OnlineStatusProps { isOnline: boolean; className?: string }

export function OnlineStatus({ isOnline, className }: OnlineStatusProps) {
  return (
    <div className={cn('inline-flex items-center gap-2 text-sm', className)}>
      {isOnline ? (
        <><div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /><span className="text-emerald-600 dark:text-emerald-400">Truc tuyen</span></>
      ) : (
        <><div className="w-2 h-2 rounded-full bg-red-500" /><span className="text-red-600 dark:text-red-400">Ngoai tuyen</span></>
      )}
    </div>
  )
}
'@ | Set-Content -Path "components/ui/online-status.tsx" -Encoding UTF8
CommitFile "components/ui/online-status.tsx" "feat(ui): add OnlineStatus indicator component"

@'
import { cn } from '@/lib/utils'

interface RatingStarsProps { value: number; max?: number; size?: 'sm' | 'md' | 'lg'; className?: string }

const sizeMap = { sm: 'text-sm', md: 'text-lg', lg: 'text-2xl' }

export function RatingStars({ value, max = 5, size = 'md', className }: RatingStarsProps) {
  return (
    <div className={cn('flex items-center gap-0.5', sizeMap[size], className)}>
      {Array.from({ length: max }, (_, i) => (
        <span key={i} className={i < value ? 'text-amber-400' : 'text-muted-foreground/30'}>★</span>
      ))}
    </div>
  )
}
'@ | Set-Content -Path "components/ui/rating-stars.tsx" -Encoding UTF8
CommitFile "components/ui/rating-stars.tsx" "feat(ui): add RatingStars display component"

@'
import { cn } from '@/lib/utils'

interface FooterProps { className?: string }

export function Footer({ className }: FooterProps) {
  return (
    <footer className={cn('border-t py-6 px-4 text-center text-sm text-muted-foreground', className)}>
      <p>© {new Date().getFullYear()} WebOOM DHV TEC. Developed by Flutter Club - DH Hung Vuong TPHCM</p>
    </footer>
  )
}
'@ | Set-Content -Path "components/layout/footer.tsx" -Encoding UTF8
CommitFile "components/layout/footer.tsx" "feat(layout): add Footer component"

@'
'use client'
import { cn } from '@/lib/utils'
import { useOnlineStatus } from '@/lib/hooks/useOnlineStatus'
import { WifiOff } from 'lucide-react'

export function OfflineBanner() {
  const isOnline = useOnlineStatus()
  if (isOnline) return null
  return (
    <div className="fixed top-0 left-0 right-0 z-[100] bg-amber-500 text-white text-center py-2 text-sm font-medium flex items-center justify-center gap-2">
      <WifiOff className="h-4 w-4" /> Ban dang ngoai tuyen. Kiem tra ket noi mang.
    </div>
  )
}
'@ | Set-Content -Path "components/layout/offline-banner.tsx" -Encoding UTF8
CommitFile "components/layout/offline-banner.tsx" "feat(layout): add OfflineBanner component"

# ============ CHART COMPONENTS ============
New-Item -ItemType Directory -Force -Path "components/charts" | Out-Null

@'
'use client'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'

interface DonutChartProps {
  data: { name: string; value: number; color: string }[]
  innerRadius?: number
  outerRadius?: number
  height?: number
}

export function DonutChart({ data, innerRadius = 60, outerRadius = 90, height = 300 }: DonutChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Pie data={data} cx="50%" cy="50%" innerRadius={innerRadius} outerRadius={outerRadius} dataKey="value" paddingAngle={2}>
          {data.map((entry, index) => (<Cell key={index} fill={entry.color} />))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}
'@ | Set-Content -Path "components/charts/donut-chart.tsx" -Encoding UTF8
CommitFile "components/charts/donut-chart.tsx" "feat(charts): add DonutChart component"

@'
'use client'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

interface SimpleBarChartProps {
  data: Record<string, any>[]
  xDataKey: string
  bars: { dataKey: string; color: string; name: string }[]
  height?: number
}

export function SimpleBarChart({ data, xDataKey, bars, height = 300 }: SimpleBarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis dataKey={xDataKey} className="text-xs" />
        <YAxis className="text-xs" />
        <Tooltip />
        <Legend />
        {bars.map(bar => (<Bar key={bar.dataKey} dataKey={bar.dataKey} fill={bar.color} name={bar.name} radius={[4, 4, 0, 0]} />))}
      </BarChart>
    </ResponsiveContainer>
  )
}
'@ | Set-Content -Path "components/charts/bar-chart.tsx" -Encoding UTF8
CommitFile "components/charts/bar-chart.tsx" "feat(charts): add SimpleBarChart component"

@'
'use client'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

interface SimpleLineChartProps {
  data: Record<string, any>[]
  xDataKey: string
  lines: { dataKey: string; color: string; name: string }[]
  height?: number
}

export function SimpleLineChart({ data, xDataKey, lines, height = 300 }: SimpleLineChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis dataKey={xDataKey} className="text-xs" />
        <YAxis className="text-xs" />
        <Tooltip />
        <Legend />
        {lines.map(line => (<Line key={line.dataKey} type="monotone" dataKey={line.dataKey} stroke={line.color} name={line.name} strokeWidth={2} dot={{ r: 4 }} />))}
      </LineChart>
    </ResponsiveContainer>
  )
}
'@ | Set-Content -Path "components/charts/line-chart.tsx" -Encoding UTF8
CommitFile "components/charts/line-chart.tsx" "feat(charts): add SimpleLineChart component"

@'
'use client'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface SimpleAreaChartProps {
  data: Record<string, any>[]
  xDataKey: string
  yDataKey: string
  color?: string
  height?: number
}

export function SimpleAreaChart({ data, xDataKey, yDataKey, color = 'hsl(var(--primary))', height = 300 }: SimpleAreaChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis dataKey={xDataKey} className="text-xs" />
        <YAxis className="text-xs" />
        <Tooltip />
        <Area type="monotone" dataKey={yDataKey} stroke={color} fill={color} fillOpacity={0.1} strokeWidth={2} />
      </AreaChart>
    </ResponsiveContainer>
  )
}
'@ | Set-Content -Path "components/charts/area-chart.tsx" -Encoding UTF8
CommitFile "components/charts/area-chart.tsx" "feat(charts): add SimpleAreaChart component"

@'
export { DonutChart } from './donut-chart'
export { SimpleBarChart } from './bar-chart'
export { SimpleLineChart } from './line-chart'
export { SimpleAreaChart } from './area-chart'
'@ | Set-Content -Path "components/charts/index.ts" -Encoding UTF8
CommitFile "components/charts/index.ts" "feat(charts): add barrel export for chart components"

# ============ MORE VALIDATIONS ============
@'
import { z } from 'zod'

export const commentSchema = z.object({
  content: z.string().min(1, 'Binh luan khong duoc trong').max(500, 'Binh luan qua dai (toi da 500 ky tu)'),
})
export type CommentFormData = z.infer<typeof commentSchema>
'@ | Set-Content -Path "lib/validations/comment.ts" -Encoding UTF8
CommitFile "lib/validations/comment.ts" "feat(validations): add comment validation schema"

@'
import { z } from 'zod'
import { ATTENDANCE_CONFIG } from '@/lib/constants/attendance'

export const attendanceWindowSchema = z.object({
  duration: z.number()
    .min(ATTENDANCE_CONFIG.MIN_DURATION_MINUTES, 'Thoi gian it nhat ' + ATTENDANCE_CONFIG.MIN_DURATION_MINUTES + ' phut')
    .max(ATTENDANCE_CONFIG.MAX_DURATION_MINUTES, 'Thoi gian toi da ' + ATTENDANCE_CONFIG.MAX_DURATION_MINUTES + ' phut'),
})
export type AttendanceWindowFormData = z.infer<typeof attendanceWindowSchema>
'@ | Set-Content -Path "lib/validations/attendance.ts" -Encoding UTF8
CommitFile "lib/validations/attendance.ts" "feat(validations): add attendance window validation"

@'
import { z } from 'zod'

export const settingsSchema = z.object({
  clubName: z.string().min(3, 'Ten CLB phai co it nhat 3 ky tu'),
  clubDescription: z.string().optional(),
  semesterName: z.string().min(1, 'Vui long nhap ten hoc ky'),
  maxMembers: z.number().min(5).max(500),
  autoApproveRequests: z.boolean(),
  attendanceDuration: z.number().min(5).max(30),
  qrRotationInterval: z.number().min(5).max(60),
})
export type SettingsFormData = z.infer<typeof settingsSchema>
'@ | Set-Content -Path "lib/validations/settings.ts" -Encoding UTF8
CommitFile "lib/validations/settings.ts" "feat(validations): add app settings validation"

# ============ MORE CONSTANTS ============
@'
// File type constants
export const FILE_TYPES = {
  DOCUMENT: ['pdf', 'doc', 'docx', 'txt', 'rtf'],
  SPREADSHEET: ['xls', 'xlsx', 'csv'],
  PRESENTATION: ['ppt', 'pptx'],
  IMAGE: ['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'],
  VIDEO: ['mp4', 'avi', 'mov', 'mkv'],
  ARCHIVE: ['zip', 'rar', '7z', 'tar', 'gz'],
}

export const FILE_ICONS: Record<string, string> = {
  pdf: '📄', doc: '📝', docx: '📝', txt: '📃',
  xls: '📊', xlsx: '📊', csv: '📊',
  ppt: '📎', pptx: '📎',
  jpg: '🖼️', jpeg: '🖼️', png: '🖼️', gif: '🖼️',
  mp4: '🎬', avi: '🎬', mov: '🎬',
  zip: '📦', rar: '📦', '7z': '📦',
}

export const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
'@ | Set-Content -Path "lib/constants/files.ts" -Encoding UTF8
CommitFile "lib/constants/files.ts" "feat(constants): add file type constants"

@'
// Date and time constants
export const DAYS_OF_WEEK = ['Chu nhat', 'Thu 2', 'Thu 3', 'Thu 4', 'Thu 5', 'Thu 6', 'Thu 7']
export const MONTHS = ['Thang 1', 'Thang 2', 'Thang 3', 'Thang 4', 'Thang 5', 'Thang 6', 'Thang 7', 'Thang 8', 'Thang 9', 'Thang 10', 'Thang 11', 'Thang 12']
export const TIME_SLOTS = [
  '07:00', '07:30', '08:00', '08:30', '09:00', '09:30',
  '10:00', '10:30', '11:00', '11:30', '12:00', '12:30',
  '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30', '17:00', '17:30', '18:00', '18:30',
  '19:00', '19:30', '20:00', '20:30', '21:00',
]
'@ | Set-Content -Path "lib/constants/datetime.ts" -Encoding UTF8
CommitFile "lib/constants/datetime.ts" "feat(constants): add date/time constants"

@'
// Material categories
export const MATERIAL_CATEGORIES = [
  { value: 'lesson', label: 'Bai hoc' },
  { value: 'exercise', label: 'Bai tap' },
  { value: 'reference', label: 'Tai lieu tham khao' },
  { value: 'tool', label: 'Cong cu' },
  { value: 'video', label: 'Video' },
  { value: 'other', label: 'Khac' },
]
export const MATERIAL_CATEGORY_LABELS: Record<string, string> = Object.fromEntries(
  MATERIAL_CATEGORIES.map(c => [c.value, c.label])
)
'@ | Set-Content -Path "lib/constants/materials.ts" -Encoding UTF8
CommitFile "lib/constants/materials.ts" "feat(constants): add material category constants"

@'
// Notification type labels and icons
export const NOTIFICATION_LABELS: Record<string, string> = {
  session_created: 'Buoi hoc moi',
  session_reminder: 'Nhac nho buoi hoc',
  assignment_created: 'Bai tap moi',
  assignment_due: 'Sap het han nop bai',
  submission_graded: 'Bai tap da cham',
  quiz_available: 'Quiz moi',
  announcement: 'Thong bao',
  access_approved: 'Yeu cau duoc duyet',
  access_rejected: 'Yeu cau bi tu choi',
}
export const NOTIFICATION_ICONS: Record<string, string> = {
  session_created: '📅', session_reminder: '⏰', assignment_created: '📝',
  assignment_due: '⚠️', submission_graded: '✅', quiz_available: '❓',
  announcement: '📢', access_approved: '✅', access_rejected: '❌',
}
'@ | Set-Content -Path "lib/constants/notifications.ts" -Encoding UTF8
CommitFile "lib/constants/notifications.ts" "feat(constants): add notification type constants"

# ============ MORE COMPONENTS ============
@'
import { cn } from '@/lib/utils'
import { CheckCircle, Clock, AlertTriangle } from 'lucide-react'

type DeadlineStatus = 'on-time' | 'due-soon' | 'overdue'

interface DeadlineIndicatorProps {
  deadline: Date
  className?: string
}

function getStatus(deadline: Date): DeadlineStatus {
  const now = Date.now(); const diff = deadline.getTime() - now
  if (diff < 0) return 'overdue'
  if (diff < 24 * 60 * 60 * 1000) return 'due-soon'
  return 'on-time'
}

const statusConfig = {
  'on-time': { icon: CheckCircle, color: 'text-emerald-600', label: 'Con han' },
  'due-soon': { icon: Clock, color: 'text-amber-600', label: 'Sap het han' },
  'overdue': { icon: AlertTriangle, color: 'text-red-600', label: 'Qua han' },
}

export function DeadlineIndicator({ deadline, className }: DeadlineIndicatorProps) {
  const status = getStatus(deadline)
  const config = statusConfig[status]
  const Icon = config.icon
  return (
    <div className={cn('inline-flex items-center gap-1.5 text-sm', config.color, className)}>
      <Icon className="h-4 w-4" /> {config.label}
    </div>
  )
}
'@ | Set-Content -Path "components/ui/deadline-indicator.tsx" -Encoding UTF8
CommitFile "components/ui/deadline-indicator.tsx" "feat(ui): add DeadlineIndicator component"

@'
'use client'
import { cn } from '@/lib/utils'
import { useState } from 'react'

interface AccordionItem { title: string; content: React.ReactNode }
interface AccordionProps { items: AccordionItem[]; className?: string }

export function Accordion({ items, className }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  return (
    <div className={cn('divide-y rounded-xl border', className)}>
      {items.map((item, index) => (
        <div key={index}>
          <button onClick={() => setOpenIndex(openIndex === index ? null : index)} className="flex items-center justify-between w-full p-4 text-left hover:bg-muted/50 transition-colors">
            <span className="font-medium text-sm">{item.title}</span>
            <span className="text-muted-foreground">{openIndex === index ? '−' : '+'}</span>
          </button>
          {openIndex === index && <div className="p-4 pt-0 text-sm text-muted-foreground">{item.content}</div>}
        </div>
      ))}
    </div>
  )
}
'@ | Set-Content -Path "components/ui/accordion.tsx" -Encoding UTF8
CommitFile "components/ui/accordion.tsx" "feat(ui): add simple Accordion component"

@'
import { cn } from '@/lib/utils'

interface ScoreDisplayProps { score: number; maxScore: number; size?: 'sm' | 'md' | 'lg'; className?: string }

function getScoreColor(pct: number): string {
  if (pct >= 90) return 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950'
  if (pct >= 70) return 'text-blue-600 bg-blue-50 dark:bg-blue-950'
  if (pct >= 50) return 'text-amber-600 bg-amber-50 dark:bg-amber-950'
  return 'text-red-600 bg-red-50 dark:bg-red-950'
}

const sizeClasses = { sm: 'w-10 h-10 text-xs', md: 'w-14 h-14 text-sm', lg: 'w-20 h-20 text-lg' }

export function ScoreDisplay({ score, maxScore, size = 'md', className }: ScoreDisplayProps) {
  const pct = maxScore > 0 ? (score / maxScore) * 100 : 0
  return (
    <div className={cn('rounded-full flex flex-col items-center justify-center font-bold', sizeClasses[size], getScoreColor(pct), className)}>
      <span>{score}</span>
      <span className="text-[0.6em] opacity-70">/{maxScore}</span>
    </div>
  )
}
'@ | Set-Content -Path "components/ui/score-display.tsx" -Encoding UTF8
CommitFile "components/ui/score-display.tsx" "feat(ui): add ScoreDisplay component"

@'
import { cn } from '@/lib/utils'

interface TruncatedTextProps { text: string; maxLength?: number; className?: string }

export function TruncatedText({ text, maxLength = 100, className }: TruncatedTextProps) {
  const truncated = text.length > maxLength
  return (
    <span className={cn(className)} title={truncated ? text : undefined}>
      {truncated ? text.slice(0, maxLength) + '...' : text}
    </span>
  )
}
'@ | Set-Content -Path "components/ui/truncated-text.tsx" -Encoding UTF8
CommitFile "components/ui/truncated-text.tsx" "feat(ui): add TruncatedText component"

Write-Host "`n=== Part 5 done: $count commits ==="
