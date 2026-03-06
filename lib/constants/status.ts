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
