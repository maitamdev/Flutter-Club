export interface Schedule { id: string; title: string; dayOfWeek: number; startTime: string; endTime: string; room?: string; recurrence: 'once' | 'weekly' | 'biweekly' | 'monthly'; instructor?: string; isActive: boolean; }
export interface TimeSlot { start: string; end: string; available: boolean; }
