import { z } from 'zod';
export const eventSchema = z.object({
  title: z.string().min(3, 'TÃªn sá»± kiá»‡n tá»‘i thiá»ƒu 3 kÃ½ tá»±').max(100),
  description: z.string().min(10, 'MÃ´ táº£ tá»‘i thiá»ƒu 10 kÃ½ tá»±').max(2000),
  type: z.enum(['workshop', 'meetup', 'hackathon', 'seminar', 'social', 'competition']),
  startDate: z.date({ required_error: 'Vui lÃ²ng chá»n ngÃ y báº¯t Ä‘áº§u' }),
  endDate: z.date({ required_error: 'Vui lÃ²ng chá»n ngÃ y káº¿t thÃºc' }),
  location: z.string().min(2).max(200),
  maxParticipants: z.number().min(1).max(500).optional(),
  coverImage: z.string().url().optional(),
  tags: z.array(z.string()).max(10).optional(),
}).refine(d => d.endDate > d.startDate, { message: 'NgÃ y káº¿t thÃºc pháº£i sau ngÃ y báº¯t Ä‘áº§u', path: ['endDate'] });
export type EventFormData = z.infer<typeof eventSchema>;
