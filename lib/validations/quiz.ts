import { z } from 'zod';
const questionSchema = z.object({
  question: z.string().min(5), type: z.enum(['multiple-choice', 'true-false', 'short-answer']),
  options: z.array(z.string()).min(2).max(6).optional(), correctAnswer: z.string().min(1), points: z.number().min(1).max(100).default(10), explanation: z.string().optional(),
});
export const quizSchema = z.object({
  title: z.string().min(3).max(200), description: z.string().max(1000).optional(),
  questions: z.array(questionSchema).min(1, 'Quiz pháº£i cÃ³ Ã­t nháº¥t 1 cÃ¢u há»i'),
  duration: z.number().min(1, 'Thá»i gian tá»‘i thiá»ƒu 1 phÃºt').max(180),
  passingScore: z.number().min(0).max(100).default(60), shuffleQuestions: z.boolean().default(false), maxAttempts: z.number().min(1).max(5).default(1),
});
export type QuizFormData = z.infer<typeof quizSchema>;
