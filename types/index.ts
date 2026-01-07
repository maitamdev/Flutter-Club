// User & Auth Types
export type UserRole = 'admin' | 'trainer' | 'member'
export type UserStatus = 'active' | 'pending' | 'blocked'
export type AccessRequestStatus = 'pending' | 'approved' | 'rejected'

export interface User {
  uid: string
  name: string
  studentId: string
  email: string
  role: UserRole
  status: UserStatus
  photoURL?: string
  phone?: string
  address?: string
  createdAt: Date
}

export interface AccessRequest {
  id: string
  uid: string
  name: string
  studentId: string
  email: string
  status: AccessRequestStatus
  createdAt: Date
  reviewedAt?: Date
  reviewedBy?: string
}

// Session Types
export interface Material {
  title: string
  url: string
}

export interface Session {
  id: string
  title: string
  description: string
  location?: string
  startsAt: Date
  endsAt: Date
  trainerId: string
  trainerName?: string
  materials: Material[]
  createdAt: Date
}

// Attendance Types
export interface AttendanceWindow {
  sessionId: string
  isActive: boolean
  startedAt: Date
  endsAt: Date
  tokenSeed: string
  tokenRotatesEverySec: number
  // fallbackCode giờ được generate động từ tokenSeed
}

export type AttendanceStatus = 'on-time' | 'late'

export interface Attendance {
  uid: string
  userName?: string
  studentId?: string
  checkedAt: Date
  status: AttendanceStatus
}

// Assignment Types
export interface RubricItem {
  criteria: string
  maxPoints: number
}

export interface Assignment {
  id: string
  title: string
  description: string
  dueAt: Date
  rubric: RubricItem[]
  createdBy: string
  createdAt: Date
}

export interface Submission {
  uid: string
  userName?: string
  studentId?: string
  githubLink?: string
  demoLink?: string
  fileUrl?: string
  submittedAt: Date
  score?: number
  feedback?: string
  reviewedAt?: Date
  reviewedBy?: string
}

// Quiz Types
export interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctIndex: number
}

export interface Quiz {
  id: string
  sessionId: string
  title: string
  questions: QuizQuestion[]
  duration: number // minutes
  isActive: boolean
  startsAt: Date
  endsAt: Date
  createdBy: string
  createdAt: Date
}

export interface QuizAttempt {
  uid: string
  quizId: string
  answers: number[]
  score: number
  submittedAt: Date
}

// Announcement Types
export interface Announcement {
  id: string
  title: string
  content: string
  createdBy: string
  createdAt: Date
}

// Comment Types
export interface Comment {
  id: string
  uid: string
  userName: string
  userPhotoURL?: string
  content: string
  createdAt: Date
}

// Dashboard Stats
export interface DashboardStats {
  totalMembers: number
  activeMembers: number
  upcomingSessions: number
  pendingAssignments: number
  recentCheckIns: number
}

export interface AttendanceTrend {
  date: string
  count: number
  total: number
}
