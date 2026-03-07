import { z } from 'zod';
export const contactSchema = z.object({
  name: z.string().min(2, 'TÃªn tá»‘i thiá»ƒu 2 kÃ½ tá»±').max(100),
  email: z.string().email('Email khÃ´ng há»£p lá»‡'),
  phone: z.string().regex(/^(0|\+84)(3|5|7|8|9)\d{8}$/, 'Sá»‘ Ä‘iá»‡n thoáº¡i VN khÃ´ng há»£p lá»‡').optional(),
  subject: z.string().min(5).max(200),
  message: z.string().min(10, 'Tin nháº¯n tá»‘i thiá»ƒu 10 kÃ½ tá»±').max(2000),
  agreeToTerms: z.boolean().refine(v => v === true, 'Vui lÃ²ng Ä‘á»“ng Ã½ Ä‘iá»u khoáº£n'),
});
export type ContactFormData = z.infer<typeof contactSchema>;
