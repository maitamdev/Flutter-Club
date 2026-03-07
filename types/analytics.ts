export interface AnalyticsEvent { name: string; category: string; action: string; label?: string; value?: number; timestamp: Date; userId?: string; metadata?: Record<string, unknown>; }
export interface PageView { path: string; title: string; referrer?: string; duration: number; timestamp: Date; }
export type EventCategory = 'engagement' | 'navigation' | 'conversion' | 'error';
