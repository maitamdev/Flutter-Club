'use client'
import { useCallback, useState } from 'react'
import { useToast } from '@/components/ui/use-toast'

export function useFormSubmit<T>() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  const submit = useCallback(async (fn: () => Promise<T>, successMsg?: string): Promise<T | null> => {
    setLoading(true); setError(null)
    try {
      const result = await fn()
      if (successMsg) toast({ title: 'Thanh cong', description: successMsg })
      return result
    } catch (err: any) {
      const msg = err?.message || 'Co loi xay ra'
      setError(msg)
      toast({ title: 'Loi', description: msg, variant: 'destructive' })
      return null
    } finally { setLoading(false) }
  }, [toast])

  return { submit, loading, error }
}
