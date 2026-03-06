import { cn } from '@/lib/utils'

interface PricingCardProps { title: string; price: string; features: string[]; highlighted?: boolean; className?: string }

export function PricingCard({ title, price, features, highlighted = false, className }: PricingCardProps) {
  return (
    <div className={cn('p-6 rounded-2xl border', highlighted ? 'border-primary bg-primary/5 shadow-lg' : 'bg-card', className)}>
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="text-3xl font-bold mt-2">{price}</p>
      <ul className="mt-6 space-y-3">
        {features.map((f, i) => <li key={i} className="flex items-center gap-2 text-sm"><span className="text-emerald-500">âœ“</span> {f}</li>)}
      </ul>
    </div>
  )
}
