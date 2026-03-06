import { z } from 'zod'

export const materialSchema = z.object({
  title: z.string().min(3, 'Tieu de phai co it nhat 3 ky tu'),
  category: z.string().min(1, 'Vui long chon danh muc'),
  file: z.any().optional(),
})

export type MaterialFormData = z.infer<typeof materialSchema>
