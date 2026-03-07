import { z } from 'zod';
export const assignmentSchema = z.object({
  title: z.string().min(3, 'TiÃªu Ä‘á» tá»‘i thiá»ƒu 3 kÃ½ tá»±').max(200),
  description: z.string().min(10).max(5000),
  dueDate: z.date({ required_error: 'Vui lÃ²ng chá»n háº¡n ná»™p' }),
  maxScore: z.number().min(1).max(1000).default(100),
  type: z.enum(['individual', 'group']).default('individual'),
  allowLateSubmission: z.boolean().default(false),
  latePenalty: z.number().min(0).max(100).default(10),
  attachments: z.array(z.string()).max(5).optional(),
  rubric: z.string().max(3000).optional(),
});
export type AssignmentFormData = z.infer<typeof assignmentSchema>;
