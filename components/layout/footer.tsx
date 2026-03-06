import { cn } from '@/lib/utils'

interface FooterProps { className?: string }

export function Footer({ className }: FooterProps) {
  return (
    <footer className={cn('border-t py-6 px-4 text-center text-sm text-muted-foreground', className)}>
      <p>Â© {new Date().getFullYear()} WebOOM DHV TEC. Developed by Flutter Club - DH Hung Vuong TPHCM</p>
    </footer>
  )
}
