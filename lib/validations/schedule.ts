import { z } from 'zod';
export const scheduleSchema = z.object({
  title: z.string().min(3).max(100), dayOfWeek: z.number().min(0).max(6),
  startTime: z.string().regex(/^\d{2}:\d{2}$/), endTime: z.string().regex(/^\d{2}:\d{2}$/),
  room: z.string().max(50).optional(), recurrence: z.enum(['once', 'weekly', 'biweekly', 'monthly']),
  instructor: z.string().optional(),
}).refine(d => d.endTime > d.startTime, { message: 'Giá» káº¿t thÃºc pháº£i sau giá» báº¯t Ä‘áº§u', path: ['endTime'] });
export type ScheduleFormData = z.infer<typeof scheduleSchema>;
