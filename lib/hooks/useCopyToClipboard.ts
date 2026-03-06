'use client'
import { useCallback, useState } from 'react'

type CopiedValue = string | null

export function useCopyToClipboard(): [CopiedValue, (text: string) => Promise<boolean>] {
  const [copiedText, setCopiedText] = useState<CopiedValue>(null)
  const copy = useCallback(async (text: string) => {
    if (!navigator?.clipboard) { console.warn('Clipboard not supported'); return false }
    try { await navigator.clipboard.writeText(text); setCopiedText(text); return true }
    catch (err) { console.warn('Copy failed', err); setCopiedText(null); return false }
  }, [])
  return [copiedText, copy]
}
