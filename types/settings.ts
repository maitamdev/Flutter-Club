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
