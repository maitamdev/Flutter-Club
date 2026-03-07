import { z } from 'zod';
export const dateRangeSchema = z.object({
  startDate: z.date({ required_error: 'Chá»n ngÃ y báº¯t Ä‘áº§u' }), endDate: z.date({ required_error: 'Chá»n ngÃ y káº¿t thÃºc' }),
  includeWeekends: z.boolean().default(true),
}).refine(d => d.endDate >= d.startDate, { message: 'NgÃ y káº¿t thÃºc pháº£i >= ngÃ y báº¯t Ä‘áº§u', path: ['endDate'] })
  .refine(d => { const diff = (d.endDate.getTime() - d.startDate.getTime()) / 86400000; return diff <= 365; }, { message: 'Khoáº£ng thá»i gian tá»‘i Ä‘a 1 nÄƒm', path: ['endDate'] });
export type DateRangeData = z.infer<typeof dateRangeSchema>;
