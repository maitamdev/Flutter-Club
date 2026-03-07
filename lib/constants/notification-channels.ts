export const NOTIFICATION_CHANNELS = {
  IN_APP: { id: 'in_app', label: 'Trong á»©ng dá»¥ng', icon: 'Bell', enabled: true },
  EMAIL: { id: 'email', label: 'Email', icon: 'Mail', enabled: true },
  PUSH: { id: 'push', label: 'ThÃ´ng bÃ¡o Ä‘áº©y', icon: 'Smartphone', enabled: false },
  SMS: { id: 'sms', label: 'SMS', icon: 'MessageSquare', enabled: false },
} as const;
export const NOTIFICATION_TYPES = {
  SESSION_REMINDER: { label: 'Nháº¯c buá»•i há»c', defaultChannel: 'in_app' },
  ASSIGNMENT_DUE: { label: 'Háº¡n ná»™p bÃ i', defaultChannel: 'email' },
  GRADE_POSTED: { label: 'Äiá»ƒm Ä‘Ã£ Ä‘Äƒng', defaultChannel: 'in_app' },
  ANNOUNCEMENT: { label: 'ThÃ´ng bÃ¡o chung', defaultChannel: 'in_app' },
  SYSTEM_UPDATE: { label: 'Cáº­p nháº­t há»‡ thá»‘ng', defaultChannel: 'email' },
} as const;
