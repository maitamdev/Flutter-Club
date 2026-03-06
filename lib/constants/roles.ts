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
