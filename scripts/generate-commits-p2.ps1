
# Part 2: Hooks, Utils, Validations (commits 11-60)
$ErrorActionPreference = "Continue"
Set-Location "c:\Users\Asus\FLUTTER_CLUB\ft-club-hub"

$count = 10
function CommitFile($path, $msg) {
    $script:count++
    git add $path 2>$null
    git commit -m "$msg" 2>$null
    Write-Host "[$script:count] $msg"
}

# ============ HOOKS (11-25) ============
@'
'use client'
import { useState, useEffect } from 'react'

export function useDebounce<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(handler)
  }, [value, delay])
  return debouncedValue
}
'@ | Set-Content -Path "lib/hooks/useDebounce.ts" -Encoding UTF8
CommitFile "lib/hooks/useDebounce.ts" "feat(hooks): add useDebounce hook"

@'
'use client'
import { useState, useCallback } from 'react'

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') return initialValue
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch { return initialValue }
  })
  const setValue = useCallback((value: T | ((val: T) => T)) => {
    const valueToStore = value instanceof Function ? value(storedValue) : value
    setStoredValue(valueToStore)
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    }
  }, [key, storedValue])
  const removeValue = useCallback(() => {
    setStoredValue(initialValue)
    if (typeof window !== 'undefined') window.localStorage.removeItem(key)
  }, [key, initialValue])
  return [storedValue, setValue, removeValue] as const
}
'@ | Set-Content -Path "lib/hooks/useLocalStorage.ts" -Encoding UTF8
CommitFile "lib/hooks/useLocalStorage.ts" "feat(hooks): add useLocalStorage hook with SSR support"

@'
'use client'
import { useState, useCallback } from 'react'

interface ToggleReturn {
  value: boolean
  toggle: () => void
  setTrue: () => void
  setFalse: () => void
}

export function useToggle(initial: boolean = false): ToggleReturn {
  const [value, setValue] = useState(initial)
  const toggle = useCallback(() => setValue(v => !v), [])
  const setTrue = useCallback(() => setValue(true), [])
  const setFalse = useCallback(() => setValue(false), [])
  return { value, toggle, setTrue, setFalse }
}
'@ | Set-Content -Path "lib/hooks/useToggle.ts" -Encoding UTF8
CommitFile "lib/hooks/useToggle.ts" "feat(hooks): add useToggle hook"

@'
'use client'
import { useEffect, useRef } from 'react'

export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T | undefined>(undefined)
  useEffect(() => { ref.current = value }, [value])
  return ref.current
}
'@ | Set-Content -Path "lib/hooks/usePrevious.ts" -Encoding UTF8
CommitFile "lib/hooks/usePrevious.ts" "feat(hooks): add usePrevious hook"

@'
'use client'
import { useState, useCallback } from 'react'
import { useToast } from '@/components/ui/use-toast'

interface AsyncState<T> { data: T | null; loading: boolean; error: string | null }

export function useAsync<T>() {
  const [state, setState] = useState<AsyncState<T>>({ data: null, loading: false, error: null })
  const { toast } = useToast()
  const execute = useCallback(async (asyncFn: () => Promise<T>) => {
    setState({ data: null, loading: true, error: null })
    try {
      const data = await asyncFn()
      setState({ data, loading: false, error: null })
      return data
    } catch (err: any) {
      const errorMsg = err?.message || 'Co loi xay ra'
      setState({ data: null, loading: false, error: errorMsg })
      toast({ title: 'Loi', description: errorMsg, variant: 'destructive' })
      throw err
    }
  }, [toast])
  return { ...state, execute }
}
'@ | Set-Content -Path "lib/hooks/useAsync.ts" -Encoding UTF8
CommitFile "lib/hooks/useAsync.ts" "feat(hooks): add useAsync hook with toast error handling"

@'
'use client'
import { useState, useEffect } from 'react'

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)
  useEffect(() => {
    if (typeof window === 'undefined') return
    const media = window.matchMedia(query)
    setMatches(media.matches)
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches)
    media.addEventListener('change', handler)
    return () => media.removeEventListener('change', handler)
  }, [query])
  return matches
}

export function useIsMobile(): boolean {
  return useMediaQuery('(max-width: 768px)')
}

export function useIsTablet(): boolean {
  return useMediaQuery('(max-width: 1024px)')
}
'@ | Set-Content -Path "lib/hooks/useMediaQuery.ts" -Encoding UTF8
CommitFile "lib/hooks/useMediaQuery.ts" "feat(hooks): add useMediaQuery and useIsMobile hooks"

@'
'use client'
import { useEffect, useRef, useCallback } from 'react'

export function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef(callback)
  useEffect(() => { savedCallback.current = callback }, [callback])
  useEffect(() => {
    if (delay === null) return
    const id = setInterval(() => savedCallback.current(), delay)
    return () => clearInterval(id)
  }, [delay])
}
'@ | Set-Content -Path "lib/hooks/useInterval.ts" -Encoding UTF8
CommitFile "lib/hooks/useInterval.ts" "feat(hooks): add useInterval hook"

@'
'use client'
import { useState, useCallback } from 'react'

export function useCounter(initial: number = 0, min?: number, max?: number) {
  const [count, setCount] = useState(initial)
  const increment = useCallback(() => {
    setCount(c => max !== undefined ? Math.min(c + 1, max) : c + 1)
  }, [max])
  const decrement = useCallback(() => {
    setCount(c => min !== undefined ? Math.max(c - 1, min) : c - 1)
  }, [min])
  const reset = useCallback(() => setCount(initial), [initial])
  return { count, increment, decrement, reset, setCount }
}
'@ | Set-Content -Path "lib/hooks/useCounter.ts" -Encoding UTF8
CommitFile "lib/hooks/useCounter.ts" "feat(hooks): add useCounter hook"

@'
'use client'
import { useEffect, useRef } from 'react'

export function useClickOutside(handler: () => void) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) return
      handler()
    }
    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)
    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [handler])
  return ref
}
'@ | Set-Content -Path "lib/hooks/useClickOutside.ts" -Encoding UTF8
CommitFile "lib/hooks/useClickOutside.ts" "feat(hooks): add useClickOutside hook"

@'
'use client'
import { useState, useCallback } from 'react'

export function useClipboard(timeout: number = 2000) {
  const [copied, setCopied] = useState(false)
  const copy = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), timeout)
      return true
    } catch { return false }
  }, [timeout])
  return { copied, copy }
}
'@ | Set-Content -Path "lib/hooks/useClipboard.ts" -Encoding UTF8
CommitFile "lib/hooks/useClipboard.ts" "feat(hooks): add useClipboard hook"

@'
'use client'
import { useState, useCallback } from 'react'

interface Step { currentStep: number; totalSteps: number }
export function useMultiStep(totalSteps: number) {
  const [currentStep, setCurrentStep] = useState(0)
  const next = useCallback(() => setCurrentStep(s => Math.min(s + 1, totalSteps - 1)), [totalSteps])
  const prev = useCallback(() => setCurrentStep(s => Math.max(s - 1, 0)), [])
  const goTo = useCallback((step: number) => setCurrentStep(Math.max(0, Math.min(step, totalSteps - 1))), [totalSteps])
  const reset = useCallback(() => setCurrentStep(0), [])
  const isFirst = currentStep === 0
  const isLast = currentStep === totalSteps - 1
  return { currentStep, totalSteps, next, prev, goTo, reset, isFirst, isLast }
}
'@ | Set-Content -Path "lib/hooks/useMultiStep.ts" -Encoding UTF8
CommitFile "lib/hooks/useMultiStep.ts" "feat(hooks): add useMultiStep wizard hook"

@'
'use client'
import { useState, useCallback, useMemo } from 'react'

export function useSearch<T>(items: T[], searchFn: (item: T, query: string) => boolean) {
  const [query, setQuery] = useState('')
  const filteredItems = useMemo(() => {
    if (!query.trim()) return items
    return items.filter(item => searchFn(item, query.toLowerCase()))
  }, [items, query, searchFn])
  const clearSearch = useCallback(() => setQuery(''), [])
  return { query, setQuery, filteredItems, clearSearch, resultCount: filteredItems.length }
}
'@ | Set-Content -Path "lib/hooks/useSearch.ts" -Encoding UTF8
CommitFile "lib/hooks/useSearch.ts" "feat(hooks): add useSearch filter hook"

@'
'use client'
import { useState, useMemo } from 'react'

type SortDirection = 'asc' | 'desc'

export function useSort<T>(items: T[], defaultKey?: keyof T, defaultDirection: SortDirection = 'asc') {
  const [sortKey, setSortKey] = useState<keyof T | undefined>(defaultKey)
  const [direction, setDirection] = useState<SortDirection>(defaultDirection)
  const sortedItems = useMemo(() => {
    if (!sortKey) return items
    return [...items].sort((a, b) => {
      const aVal = a[sortKey]; const bVal = b[sortKey]
      if (aVal < bVal) return direction === 'asc' ? -1 : 1
      if (aVal > bVal) return direction === 'asc' ? 1 : -1
      return 0
    })
  }, [items, sortKey, direction])
  const toggleSort = (key: keyof T) => {
    if (sortKey === key) setDirection(d => d === 'asc' ? 'desc' : 'asc')
    else { setSortKey(key); setDirection('asc') }
  }
  return { sortedItems, sortKey, direction, toggleSort }
}
'@ | Set-Content -Path "lib/hooks/useSort.ts" -Encoding UTF8
CommitFile "lib/hooks/useSort.ts" "feat(hooks): add useSort hook for table sorting"

@'
'use client'
import { useMemo, useState } from 'react'
import { PAGINATION } from '@/lib/constants/pagination'

export function usePagination<T>(items: T[], pageSize: number = PAGINATION.DEFAULT_PAGE_SIZE) {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(items.length / pageSize)
  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return items.slice(start, start + pageSize)
  }, [items, currentPage, pageSize])
  const goToPage = (page: number) => setCurrentPage(Math.max(1, Math.min(page, totalPages)))
  const nextPage = () => goToPage(currentPage + 1)
  const prevPage = () => goToPage(currentPage - 1)
  return { paginatedItems, currentPage, totalPages, goToPage, nextPage, prevPage, hasNext: currentPage < totalPages, hasPrev: currentPage > 1 }
}
'@ | Set-Content -Path "lib/hooks/usePagination.ts" -Encoding UTF8
CommitFile "lib/hooks/usePagination.ts" "feat(hooks): add usePagination hook"

@'
export { useAuth, AuthProvider } from './useAuth'
export { useDebounce } from './useDebounce'
export { useLocalStorage } from './useLocalStorage'
export { useToggle } from './useToggle'
export { usePrevious } from './usePrevious'
export { useAsync } from './useAsync'
export { useMediaQuery, useIsMobile, useIsTablet } from './useMediaQuery'
export { useInterval } from './useInterval'
export { useCounter } from './useCounter'
export { useClickOutside } from './useClickOutside'
export { useClipboard } from './useClipboard'
export { useMultiStep } from './useMultiStep'
export { useSearch } from './useSearch'
export { useSort } from './useSort'
export { usePagination } from './usePagination'
'@ | Set-Content -Path "lib/hooks/index.ts" -Encoding UTF8
CommitFile "lib/hooks/index.ts" "feat(hooks): add barrel export for all hooks"

# ============ UTILS (26-45) ============
@'
// String utility functions
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str
  return str.slice(0, maxLength - 3) + '...'
}
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}
export function capitalizeWords(str: string): string {
  return str.split(' ').map(capitalize).join(' ')
}
export function slugify(str: string): string {
  return str.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '')
}
export function getInitials(name: string): string {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
}
export function removeVietnameseTones(str: string): string {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[đĐ]/g, d => d === 'đ' ? 'd' : 'D')
}
'@ | Set-Content -Path "lib/utils/string.ts" -Encoding UTF8
CommitFile "lib/utils/string.ts" "feat(utils): add string utility functions"

@'
// Date utility functions
export function isToday(date: Date): boolean {
  const today = new Date()
  return date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear()
}
export function isFuture(date: Date): boolean { return date.getTime() > Date.now() }
export function isPast(date: Date): boolean { return date.getTime() < Date.now() }
export function getDaysDiff(date1: Date, date2: Date): number {
  return Math.floor(Math.abs(date1.getTime() - date2.getTime()) / (1000 * 60 * 60 * 24))
}
export function getHoursDiff(date1: Date, date2: Date): number {
  return Math.floor(Math.abs(date1.getTime() - date2.getTime()) / (1000 * 60 * 60))
}
export function getMinutesDiff(date1: Date, date2: Date): number {
  return Math.floor(Math.abs(date1.getTime() - date2.getTime()) / (1000 * 60))
}
export function addDays(date: Date, days: number): Date {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}
export function addHours(date: Date, hours: number): Date {
  return new Date(date.getTime() + hours * 60 * 60 * 1000)
}
export function startOfDay(date: Date): Date {
  const d = new Date(date); d.setHours(0, 0, 0, 0); return d
}
export function endOfDay(date: Date): Date {
  const d = new Date(date); d.setHours(23, 59, 59, 999); return d
}
export function formatDuration(minutes: number): string {
  if (minutes < 60) return minutes + ' phut'
  const h = Math.floor(minutes / 60); const m = minutes % 60
  return m > 0 ? h + ' gio ' + m + ' phut' : h + ' gio'
}
'@ | Set-Content -Path "lib/utils/date.ts" -Encoding UTF8
CommitFile "lib/utils/date.ts" "feat(utils): add date utility functions"

@'
// Number utility functions
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}
export function percentage(value: number, total: number): number {
  if (total === 0) return 0
  return Math.round((value / total) * 100)
}
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('vi-VN').format(num)
}
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}
export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
'@ | Set-Content -Path "lib/utils/number.ts" -Encoding UTF8
CommitFile "lib/utils/number.ts" "feat(utils): add number utility functions"

@'
// Array utility functions
export function groupBy<T>(arr: T[], key: keyof T): Record<string, T[]> {
  return arr.reduce((groups, item) => {
    const val = String(item[key])
    groups[val] = groups[val] || []
    groups[val].push(item)
    return groups
  }, {} as Record<string, T[]>)
}
export function uniqueBy<T>(arr: T[], key: keyof T): T[] {
  const seen = new Set()
  return arr.filter(item => { const val = item[key]; if (seen.has(val)) return false; seen.add(val); return true })
}
export function sortBy<T>(arr: T[], key: keyof T, direction: 'asc' | 'desc' = 'asc'): T[] {
  return [...arr].sort((a, b) => {
    if (a[key] < b[key]) return direction === 'asc' ? -1 : 1
    if (a[key] > b[key]) return direction === 'asc' ? 1 : -1
    return 0
  })
}
export function chunk<T>(arr: T[], size: number): T[][] {
  return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) => arr.slice(i * size, i * size + size))
}
export function shuffle<T>(arr: T[]): T[] {
  const result = [...arr]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]]
  }
  return result
}
'@ | Set-Content -Path "lib/utils/array.ts" -Encoding UTF8
CommitFile "lib/utils/array.ts" "feat(utils): add array utility functions"

@'
// Color utility functions
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) } : null
}
export function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('')
}
export function getContrastColor(hexColor: string): string {
  const rgb = hexToRgb(hexColor)
  if (!rgb) return '#000000'
  const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000
  return brightness > 128 ? '#000000' : '#ffffff'
}
export function generateAvatarColor(name: string): string {
  let hash = 0
  for (let i = 0; i < name.length; i++) { hash = name.charCodeAt(i) + ((hash << 5) - hash) }
  const hue = Math.abs(hash) % 360
  return 'hsl(' + hue + ', 65%, 55%)'
}
'@ | Set-Content -Path "lib/utils/color.ts" -Encoding UTF8
CommitFile "lib/utils/color.ts" "feat(utils): add color utility functions"

@'
// Validation utility functions
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}
export function isValidPhone(phone: string): boolean {
  return /^(0|\+84)\d{9,10}$/.test(phone.replace(/\s/g, ''))
}
export function isValidUrl(url: string): boolean {
  try { new URL(url); return true } catch { return false }
}
export function isValidStudentId(id: string): boolean {
  return /^\d{5,15}$/.test(id)
}
export function isStrongPassword(password: string): { valid: boolean; errors: string[] } {
  const errors: string[] = []
  if (password.length < 6) errors.push('Mat khau phai co it nhat 6 ky tu')
  if (!/[A-Z]/.test(password)) errors.push('Phai co it nhat 1 chu hoa')
  if (!/[a-z]/.test(password)) errors.push('Phai co it nhat 1 chu thuong')
  if (!/[0-9]/.test(password)) errors.push('Phai co it nhat 1 so')
  return { valid: errors.length === 0, errors }
}
'@ | Set-Content -Path "lib/utils/validation.ts" -Encoding UTF8
CommitFile "lib/utils/validation.ts" "feat(utils): add validation utility functions"

@'
// URL and query utility functions
export function buildQueryString(params: Record<string, string | number | boolean | undefined>): string {
  const entries = Object.entries(params).filter(([_, v]) => v !== undefined && v !== '')
  if (entries.length === 0) return ''
  return '?' + entries.map(([k, v]) => encodeURIComponent(k) + '=' + encodeURIComponent(String(v))).join('&')
}
export function parseQueryString(qs: string): Record<string, string> {
  const result: Record<string, string> = {}
  const search = qs.startsWith('?') ? qs.slice(1) : qs
  search.split('&').forEach(pair => {
    const [key, value] = pair.split('=')
    if (key) result[decodeURIComponent(key)] = decodeURIComponent(value || '')
  })
  return result
}
export function getBaseUrl(): string {
  if (typeof window !== 'undefined') return window.location.origin
  return process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
}
'@ | Set-Content -Path "lib/utils/url.ts" -Encoding UTF8
CommitFile "lib/utils/url.ts" "feat(utils): add URL and query string utilities"

@'
// Storage utility functions
export function safeGetItem<T>(key: string, fallback: T): T {
  try {
    if (typeof window === 'undefined') return fallback
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : fallback
  } catch { return fallback }
}
export function safeSetItem(key: string, value: unknown): void {
  try { if (typeof window !== 'undefined') localStorage.setItem(key, JSON.stringify(value)) } catch {}
}
export function safeRemoveItem(key: string): void {
  try { if (typeof window !== 'undefined') localStorage.removeItem(key) } catch {}
}
export function clearStorage(): void {
  try { if (typeof window !== 'undefined') localStorage.clear() } catch {}
}
export const STORAGE_KEYS = {
  THEME: 'theme',
  SIDEBAR_COLLAPSED: 'sidebar-collapsed',
  TABLE_PAGE_SIZE: 'table-page-size',
  LAST_VISITED_PAGE: 'last-visited-page',
} as const
'@ | Set-Content -Path "lib/utils/storage.ts" -Encoding UTF8
CommitFile "lib/utils/storage.ts" "feat(utils): add localStorage utility functions"

@'
// Error handling utilities
export class AppError extends Error {
  code: string
  constructor(message: string, code: string = 'UNKNOWN') {
    super(message)
    this.name = 'AppError'
    this.code = code
  }
}
export function getErrorMessage(error: unknown): string {
  if (error instanceof AppError) return error.message
  if (error instanceof Error) return error.message
  if (typeof error === 'string') return error
  return 'Co loi xay ra. Vui long thu lai.'
}
export function isFirebaseError(error: unknown): boolean {
  return error instanceof Error && 'code' in error && typeof (error as any).code === 'string' && (error as any).code.startsWith('auth/')
}
export function getFirebaseErrorMessage(code: string): string {
  const messages: Record<string, string> = {
    'auth/user-not-found': 'Khong tim thay tai khoan voi email nay',
    'auth/wrong-password': 'Mat khau khong chinh xac',
    'auth/email-already-in-use': 'Email da duoc su dung',
    'auth/weak-password': 'Mat khau qua yeu',
    'auth/invalid-email': 'Email khong hop le',
    'auth/too-many-requests': 'Qua nhieu yeu cau. Vui long thu lai sau',
    'auth/network-request-failed': 'Loi ket noi mang',
    'auth/popup-closed-by-user': 'Cua so dang nhap da bi dong',
  }
  return messages[code] || 'Co loi xay ra. Vui long thu lai.'
}
'@ | Set-Content -Path "lib/utils/error.ts" -Encoding UTF8
CommitFile "lib/utils/error.ts" "feat(utils): add error handling utilities"

@'
// Logger utility
const LOG_LEVELS = { debug: 0, info: 1, warn: 2, error: 3 } as const
type LogLevel = keyof typeof LOG_LEVELS

const currentLevel: LogLevel = process.env.NODE_ENV === 'production' ? 'warn' : 'debug'

function shouldLog(level: LogLevel): boolean {
  return LOG_LEVELS[level] >= LOG_LEVELS[currentLevel]
}

export const logger = {
  debug: (message: string, ...args: unknown[]) => { if (shouldLog('debug')) console.debug('[DEBUG]', message, ...args) },
  info: (message: string, ...args: unknown[]) => { if (shouldLog('info')) console.info('[INFO]', message, ...args) },
  warn: (message: string, ...args: unknown[]) => { if (shouldLog('warn')) console.warn('[WARN]', message, ...args) },
  error: (message: string, ...args: unknown[]) => { if (shouldLog('error')) console.error('[ERROR]', message, ...args) },
}
'@ | Set-Content -Path "lib/utils/logger.ts" -Encoding UTF8
CommitFile "lib/utils/logger.ts" "feat(utils): add logger utility with log levels"

# ============ VALIDATIONS (36-40) ============
@'
import { z } from 'zod'

export const profileSchema = z.object({
  name: z.string().min(2, 'Ten phai co it nhat 2 ky tu'),
  phone: z.string().optional().refine(val => !val || /^(0|\+84)\d{9,10}$/.test(val.replace(/\s/g, '')), { message: 'So dien thoai khong hop le' }),
  address: z.string().optional(),
})

export type ProfileFormData = z.infer<typeof profileSchema>
'@ | Set-Content -Path "lib/validations/profile.ts" -Encoding UTF8
CommitFile "lib/validations/profile.ts" "feat(validations): add profile update validation schema"

@'
import { z } from 'zod'

export const materialSchema = z.object({
  title: z.string().min(3, 'Tieu de phai co it nhat 3 ky tu'),
  category: z.string().min(1, 'Vui long chon danh muc'),
  file: z.any().optional(),
})

export type MaterialFormData = z.infer<typeof materialSchema>
'@ | Set-Content -Path "lib/validations/material.ts" -Encoding UTF8
CommitFile "lib/validations/material.ts" "feat(validations): add material upload validation"

@'
import { z } from 'zod'

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(6, 'Mat khau phai co it nhat 6 ky tu'),
  newPassword: z.string().min(6, 'Mat khau moi phai co it nhat 6 ky tu'),
  confirmNewPassword: z.string(),
}).refine(data => data.newPassword === data.confirmNewPassword, {
  message: 'Mat khau moi khong khop',
  path: ['confirmNewPassword'],
}).refine(data => data.currentPassword !== data.newPassword, {
  message: 'Mat khau moi phai khac mat khau cu',
  path: ['newPassword'],
})

export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>
'@ | Set-Content -Path "lib/validations/password.ts" -Encoding UTF8
CommitFile "lib/validations/password.ts" "feat(validations): add change password validation"

@'
import { z } from 'zod'

export const searchSchema = z.object({
  query: z.string().min(1, 'Vui long nhap tu khoa tim kiem').max(100, 'Tu khoa tim kiem qua dai'),
})

export const filterSchema = z.object({
  role: z.enum(['all', 'admin', 'trainer', 'member']).optional(),
  status: z.enum(['all', 'active', 'pending', 'blocked']).optional(),
  dateFrom: z.date().optional(),
  dateTo: z.date().optional(),
})

export type SearchFormData = z.infer<typeof searchSchema>
export type FilterFormData = z.infer<typeof filterSchema>
'@ | Set-Content -Path "lib/validations/search.ts" -Encoding UTF8
CommitFile "lib/validations/search.ts" "feat(validations): add search and filter validation"

@'
import { z } from 'zod'

export const feedbackSchema = z.object({
  type: z.enum(['bug', 'feature', 'question', 'other'], { required_error: 'Vui long chon loai phan hoi' }),
  subject: z.string().min(5, 'Tieu de phai co it nhat 5 ky tu'),
  description: z.string().min(20, 'Mo ta phai co it nhat 20 ky tu'),
  priority: z.enum(['low', 'medium', 'high']).default('medium'),
})

export type FeedbackFormData = z.infer<typeof feedbackSchema>
'@ | Set-Content -Path "lib/validations/feedback.ts" -Encoding UTF8
CommitFile "lib/validations/feedback.ts" "feat(validations): add feedback form validation"

Write-Host "`n=== Part 2 done: $count commits ==="
