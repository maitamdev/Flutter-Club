// Notification type guards
export interface Notification { id: string; type: string; message: string; read: boolean; createdAt: Date; }
export function isNotification(obj: unknown): obj is Notification { return typeof obj === 'object' && obj !== null && 'id' in obj && 'type' in obj && 'message' in obj; }
export function isUnread(notif: Notification): boolean { return !notif.read; }
