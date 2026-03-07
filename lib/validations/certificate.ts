import { z } from 'zod';
export const certificateSchema = z.object({
  userId: z.string().min(1), type: z.enum(['completion', 'achievement', 'participation', 'excellence']),
  title: z.string().min(5).max(200), description: z.string().max(500).optional(),
  skills: z.array(z.string()).min(1), issueDate: z.date(), expiryDate: z.date().optional(),
  templateId: z.string().min(1),
}).refine(d => !d.expiryDate || d.expiryDate > d.issueDate, { message: 'NgÃ y háº¿t háº¡n pháº£i sau ngÃ y cáº¥p', path: ['expiryDate'] });
export type CertificateFormData = z.infer<typeof certificateSchema>;
