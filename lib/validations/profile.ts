import { z } from 'zod'

export const profileSchema = z.object({
  name: z.string().min(2, 'Ten phai co it nhat 2 ky tu'),
  phone: z.string().optional().refine(val => !val || /^(0|\+84)\d{9,10}$/.test(val.replace(/\s/g, '')), { message: 'So dien thoai khong hop le' }),
  address: z.string().optional(),
})

export type ProfileFormData = z.infer<typeof profileSchema>
