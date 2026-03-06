import { z } from 'zod'

export const commentSchema = z.object({
  content: z.string().min(1, 'Binh luan khong duoc trong').max(500, 'Binh luan qua dai (toi da 500 ky tu)'),
})
export type CommentFormData = z.infer<typeof commentSchema>
