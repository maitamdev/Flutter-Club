import { cn } from '@/lib/utils'

interface AvatarGroupProps { avatars: { name: string; src?: string }[]; max?: number; size?: 'sm' | 'md' | 'lg'; className?: string }

const sizeClasses = { sm: 'w-6 h-6 text-xs', md: 'w-8 h-8 text-sm', lg: 'w-10 h-10 text-base' }

export function AvatarGroup({ avatars, max = 5, size = 'md', className }: AvatarGroupProps) {
  const visible = avatars.slice(0, max)
  const remaining = avatars.length - max
  return (
    <div className={cn('flex items-center -space-x-2', className)}>
      {visible.map((avatar, i) => (
        <div key={i} className={cn('rounded-full border-2 border-background bg-muted flex items-center justify-center overflow-hidden', sizeClasses[size])} title={avatar.name}>
          {avatar.src ? <img src={avatar.src} alt={avatar.name} className="w-full h-full object-cover" /> : <span>{avatar.name[0]}</span>}
        </div>
      ))}
      {remaining > 0 && (
        <div className={cn('rounded-full border-2 border-background bg-muted flex items-center justify-center font-medium', sizeClasses[size])}>
          +{remaining}
        </div>
      )}
    </div>
  )
}
