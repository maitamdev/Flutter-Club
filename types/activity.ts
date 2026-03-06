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
