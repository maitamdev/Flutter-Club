import { z } from 'zod';
export const announcementSchema = z.object({
  title: z.string().min(5, 'TiÃªu Ä‘á» tá»‘i thiá»ƒu 5 kÃ½ tá»±').max(150),
  content: z.string().min(10, 'Ná»™i dung tá»‘i thiá»ƒu 10 kÃ½ tá»±').max(5000),
  priority: z.enum(['low', 'normal', 'high', 'urgent']).default('normal'),
  targetAudience: z.enum(['all', 'members', 'trainers', 'admins']).default('all'),
  pinned: z.boolean().default(false),
  expiresAt: z.date().optional(),
});
export type AnnouncementFormData = z.infer<typeof announcementSchema>;
