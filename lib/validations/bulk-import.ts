import { z } from 'zod';
const memberRowSchema = z.object({
  fullName: z.string().min(2), email: z.string().email(), studentId: z.string().min(8),
  phone: z.string().optional(), faculty: z.string().optional(), role: z.enum(['member', 'trainer']).default('member'),
});
export const bulkImportSchema = z.object({
  data: z.array(memberRowSchema).min(1, 'Dá»¯ liá»‡u trá»‘ng').max(500, 'Tá»‘i Ä‘a 500 dÃ²ng'),
  skipDuplicates: z.boolean().default(true), sendInvitations: z.boolean().default(false),
});
export type BulkImportData = z.infer<typeof bulkImportSchema>;
export type MemberRow = z.infer<typeof memberRowSchema>;
