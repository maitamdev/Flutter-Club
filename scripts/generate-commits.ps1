
# Generate 300 commits - Master Script
$ErrorActionPreference = "Continue"
Set-Location "c:\Users\Asus\FLUTTER_CLUB\ft-club-hub"

$count = 0
function CommitFile($path, $msg) {
    $script:count++
    git add $path 2>$null
    git commit -m "$msg" 2>$null
    Write-Host "[$script:count] $msg"
}

# ============================================================
# PART 1: LIB CONSTANTS (commits 1-10)
# ============================================================

New-Item -ItemType Directory -Force -Path "lib/constants" | Out-Null

@'
// App-wide constants
export const APP_NAME = 'WebOOM DHV TEC'
export const APP_DESCRIPTION = 'He thong quan ly Cau lac bo Flutter - Khoa KTCN - DH Hung Vuong TPHCM'
export const APP_VERSION = '1.0.0'
'@ | Set-Content -Path "lib/constants/app.ts" -Encoding UTF8
CommitFile "lib/constants/app.ts" "feat(constants): add app metadata constants"

@'
// User role constants
export const ROLES = {
  ADMIN: 'admin' as const,
  TRAINER: 'trainer' as const,
  MEMBER: 'member' as const,
}

export const ROLE_LABELS: Record<string, string> = {
  admin: 'Quan tri vien',
  trainer: 'Huong dan vien',
  member: 'Thanh vien',
}

export const ROLE_COLORS: Record<string, string> = {
  admin: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  trainer: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  member: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
}
'@ | Set-Content -Path "lib/constants/roles.ts" -Encoding UTF8
CommitFile "lib/constants/roles.ts" "feat(constants): add role constants and labels"

@'
// Status constants
export const USER_STATUS = {
  ACTIVE: 'active' as const,
  PENDING: 'pending' as const,
  BLOCKED: 'blocked' as const,
}

export const STATUS_LABELS: Record<string, string> = {
  active: 'Hoat dong',
  pending: 'Cho duyet',
  blocked: 'Da khoa',
}

export const STATUS_COLORS: Record<string, string> = {
  active: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200',
  pending: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200',
  blocked: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
}
'@ | Set-Content -Path "lib/constants/status.ts" -Encoding UTF8
CommitFile "lib/constants/status.ts" "feat(constants): add user status constants"

@'
// Navigation constants for sidebar
import { BookOpen, Users, Calendar, FileText, MessageSquare, Brain, ClipboardList, Settings } from 'lucide-react'

export interface NavItem {
  title: string
  href: string
  icon: any
  roles?: string[]
}

export const NAV_ITEMS: NavItem[] = [
  { title: 'Buoi hoc', href: '/sessions', icon: Calendar },
  { title: 'Bai tap', href: '/assignments', icon: ClipboardList },
  { title: 'Quiz', href: '/quizzes', icon: Brain },
  { title: 'Tai lieu', href: '/materials', icon: BookOpen },
  { title: 'Thong bao', href: '/announcements', icon: MessageSquare },
  { title: 'Thanh vien', href: '/members', icon: Users, roles: ['admin', 'trainer'] },
  { title: 'Yeu cau tham gia', href: '/access-requests', icon: FileText, roles: ['admin'] },
]
'@ | Set-Content -Path "lib/constants/navigation.ts" -Encoding UTF8
CommitFile "lib/constants/navigation.ts" "feat(constants): add navigation items config"

@'
// Pagination defaults
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [5, 10, 20, 50],
  MAX_PAGE_SIZE: 100,
}
'@ | Set-Content -Path "lib/constants/pagination.ts" -Encoding UTF8
CommitFile "lib/constants/pagination.ts" "feat(constants): add pagination defaults"

@'
// Attendance configuration
export const ATTENDANCE_CONFIG = {
  DEFAULT_DURATION_MINUTES: 10,
  TOKEN_ROTATION_SECONDS: 10,
  MAX_DURATION_MINUTES: 30,
  MIN_DURATION_MINUTES: 5,
  LATE_THRESHOLD_MINUTES: 5,
}
'@ | Set-Content -Path "lib/constants/attendance.ts" -Encoding UTF8
CommitFile "lib/constants/attendance.ts" "feat(constants): add attendance config values"

@'
// Quiz configuration
export const QUIZ_CONFIG = {
  MIN_QUESTIONS: 1,
  MAX_QUESTIONS: 50,
  MIN_DURATION: 1,
  MAX_DURATION: 60,
  MIN_OPTIONS: 2,
  MAX_OPTIONS: 6,
  DEFAULT_DURATION: 15,
}
'@ | Set-Content -Path "lib/constants/quiz.ts" -Encoding UTF8
CommitFile "lib/constants/quiz.ts" "feat(constants): add quiz configuration"

@'
// Assignment configuration
export const ASSIGNMENT_CONFIG = {
  MAX_FILE_SIZE_MB: 10,
  ALLOWED_FILE_TYPES: ['.pdf', '.doc', '.docx', '.zip', '.rar'],
  MAX_RUBRIC_ITEMS: 20,
  MAX_SCORE: 100,
}
'@ | Set-Content -Path "lib/constants/assignment.ts" -Encoding UTF8
CommitFile "lib/constants/assignment.ts" "feat(constants): add assignment configuration"

@'
// API error messages
export const ERROR_MESSAGES = {
  UNAUTHORIZED: 'Ban khong co quyen truy cap',
  NOT_FOUND: 'Khong tim thay du lieu',
  NETWORK_ERROR: 'Loi ket noi mang',
  SERVER_ERROR: 'Loi he thong',
  INVALID_INPUT: 'Du lieu khong hop le',
  SESSION_EXPIRED: 'Phien dang nhap het han',
  PERMISSION_DENIED: 'Khong du quyen thuc hien',
  FILE_TOO_LARGE: 'File qua lon',
  INVALID_FILE_TYPE: 'Loai file khong duoc ho tro',
}
'@ | Set-Content -Path "lib/constants/errors.ts" -Encoding UTF8
CommitFile "lib/constants/errors.ts" "feat(constants): add error message constants"

@'
export * from './app'
export * from './roles'
export * from './status'
export * from './pagination'
export * from './attendance'
export * from './quiz'
export * from './assignment'
export * from './errors'
'@ | Set-Content -Path "lib/constants/index.ts" -Encoding UTF8
CommitFile "lib/constants/index.ts" "feat(constants): add barrel export for constants"

Write-Host "`n=== Part 1 done: $count commits ==="
