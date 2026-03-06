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
