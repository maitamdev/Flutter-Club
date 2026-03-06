import { z } from 'zod'

export const feedbackSchema = z.object({
  type: z.enum(['bug', 'feature', 'question', 'other'], { required_error: 'Vui long chon loai phan hoi' }),
  subject: z.string().min(5, 'Tieu de phai co it nhat 5 ky tu'),
  description: z.string().min(20, 'Mo ta phai co it nhat 20 ky tu'),
  priority: z.enum(['low', 'medium', 'high']).default('medium'),
})

export type FeedbackFormData = z.infer<typeof feedbackSchema>
