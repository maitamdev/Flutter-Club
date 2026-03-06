import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center space-y-6">
        <div className="text-8xl font-bold text-primary/20">404</div>
        <div>
          <h2 className="text-2xl font-bold">Khong tim thay trang</h2>
          <p className="text-muted-foreground mt-2">Trang ban dang tim kiem khong ton tai hoac da bi di chuyen.</p>
        </div>
        <div className="flex items-center justify-center gap-3">
          <Button variant="outline" asChild><Link href="javascript:history.back()"><ArrowLeft className="h-4 w-4 mr-2" /> Quay lai</Link></Button>
          <Button asChild><Link href="/"><Home className="h-4 w-4 mr-2" /> Ve trang chu</Link></Button>
        </div>
      </div>
    </div>
  )
}
