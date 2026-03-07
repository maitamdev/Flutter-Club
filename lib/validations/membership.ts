import { z } from 'zod';
export const membershipSchema = z.object({
  fullName: z.string().min(2).max(100), studentId: z.string().regex(/^\d{8,12}$/, 'MSSV khÃ´ng há»£p lá»‡'),
  email: z.string().email(), phone: z.string().min(10).max(11),
  faculty: z.string().min(2), year: z.number().min(1).max(6),
  reason: z.string().min(20, 'LÃ½ do tá»‘i thiá»ƒu 20 kÃ½ tá»±').max(1000),
  skills: z.array(z.string()).min(1, 'Chá»n Ã­t nháº¥t 1 ká»¹ nÄƒng'),
  experience: z.enum(['beginner', 'intermediate', 'advanced']),
});
export type MembershipFormData = z.infer<typeof membershipSchema>;
