import { z } from 'zod';
export const sessionSchema = z.object({
  title: z.string().min(3).max(200),
  description: z.string().max(2000).optional(),
  date: z.date({ required_error: 'Vui lÃ²ng chá»n ngÃ y' }),
  startTime: z.string().regex(/^\d{2}:\d{2}$/, 'Äá»‹nh dáº¡ng HH:MM'),
  endTime: z.string().regex(/^\d{2}:\d{2}$/, 'Äá»‹nh dáº¡ng HH:MM'),
  location: z.string().max(200).optional(),
  type: z.enum(['lecture', 'lab', 'workshop', 'review', 'exam']).default('lecture'),
  maxAttendees: z.number().min(1).max(200).optional(),
  materials: z.array(z.string().url()).optional(),
});
export type SessionFormData = z.infer<typeof sessionSchema>;
