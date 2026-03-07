import { z } from 'zod';
const MAX_SIZE = 10 * 1024 * 1024;
const ALLOWED_TYPES = ['image/jpeg','image/png','image/webp','application/pdf','application/msword','application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
export const fileUploadSchema = z.object({
  file: z.custom<File>().refine(f => f instanceof File, 'Vui lÃ²ng chá»n file')
    .refine(f => f.size <= MAX_SIZE, 'File khÃ´ng quÃ¡ 10MB')
    .refine(f => ALLOWED_TYPES.includes(f.type), 'Äá»‹nh dáº¡ng khÃ´ng há»— trá»£'),
  description: z.string().max(500).optional(), folder: z.string().optional(),
});
export const multiFileSchema = z.object({ files: z.array(fileUploadSchema.shape.file).min(1).max(10) });
export type FileUploadData = z.infer<typeof fileUploadSchema>;
