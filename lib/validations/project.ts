import { z } from 'zod';
export const projectSchema = z.object({
  name: z.string().min(3).max(100), description: z.string().min(20).max(2000),
  techStack: z.array(z.string()).min(1, 'Chá»n Ã­t nháº¥t 1 cÃ´ng nghá»‡'),
  teamMembers: z.array(z.string()).min(1), leaderId: z.string().min(1),
  repoUrl: z.string().url('URL repo khÃ´ng há»£p lá»‡').optional().or(z.literal('')),
  demoUrl: z.string().url('URL demo khÃ´ng há»£p lá»‡').optional().or(z.literal('')),
  deadline: z.date().optional(),
});
export type ProjectFormData = z.infer<typeof projectSchema>;
