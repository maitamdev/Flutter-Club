export interface Notification { id: string; userId: string; title: string; message: string; type: 'info' | 'warning' | 'success' | 'error'; read: boolean; link?: string; createdAt: Date; }
export interface NotificationPreferences { email: boolean; push: boolean; inApp: boolean; digest: 'daily' | 'weekly' | 'none'; }
export type NotificationChannel = 'email' | 'push' | 'in-app' | 'sms';
