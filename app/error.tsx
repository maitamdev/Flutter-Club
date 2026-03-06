'use client'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { AlertTriangle, RefreshCcw, Home } from 'lucide-react'
import Link from 'next/link'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error(error) }, [error])
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center mx-auto">
          <AlertTriangle className="w-10 h-10 text-destructive" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Da xay ra loi!</h2>
          <p className="text-muted-foreground mt-2">Xin loi, da co loi xay ra. Vui long thu lai.</p>
        </div>
        <div className="flex items-center justify-center gap-3">
          <Button onClick={reset} variant="outline"><RefreshCcw className="h-4 w-4 mr-2" /> Thu lai</Button>
          <Button asChild><Link href="/"><Home className="h-4 w-4 mr-2" /> Ve trang chu</Link></Button>
        </div>
      </div>
    </div>
  )
}
