import { z } from 'zod';
export const pollSchema = z.object({
  question: z.string().min(5, 'CÃ¢u há»i tá»‘i thiá»ƒu 5 kÃ½ tá»±').max(500),
  options: z.array(z.string().min(1)).min(2, 'Tá»‘i thiá»ƒu 2 lá»±a chá»n').max(10, 'Tá»‘i Ä‘a 10 lá»±a chá»n'),
  type: z.enum(['single', 'multiple']).default('single'),
  isAnonymous: z.boolean().default(false),
  expiresAt: z.date().optional(),
});
export type PollFormData = z.infer<typeof pollSchema>;
