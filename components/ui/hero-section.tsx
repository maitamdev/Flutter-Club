import { cn } from '@/lib/utils'

interface HeroSectionProps { title: string; subtitle?: string; children?: React.ReactNode; className?: string }

export function HeroSection({ title, subtitle, children, className }: HeroSectionProps) {
  return (
    <section className={cn('relative py-20 px-4 text-center', className)}>
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{title}</h1>
      {subtitle && <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>}
      {children && <div className="mt-8">{children}</div>}
    </section>
  )
}
