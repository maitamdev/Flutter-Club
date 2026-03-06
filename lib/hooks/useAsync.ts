'use client'
import { useState, useCallback } from 'react'
import { useToast } from '@/components/ui/use-toast'

interface AsyncState<T> { data: T | null; loading: boolean; error: string | null }

export function useAsync<T>() {
  const [state, setState] = useState<AsyncState<T>>({ data: null, loading: false, error: null })
  const { toast } = useToast()
  const execute = useCallback(async (asyncFn: () => Promise<T>) => {
    setState({ data: null, loading: true, error: null })
    try {
      const data = await asyncFn()
      setState({ data, loading: false, error: null })
      return data
    } catch (err: any) {
      const errorMsg = err?.message || 'Co loi xay ra'
      setState({ data: null, loading: false, error: errorMsg })
      toast({ title: 'Loi', description: errorMsg, variant: 'destructive' })
      throw err
    }
  }, [toast])
  return { ...state, execute }
}
