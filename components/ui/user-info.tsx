import { cn } from '@/lib/utils'
import { User } from 'lucide-react'

interface UserInfoProps {
  name: string
  email?: string
  role?: string
  avatar?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizeConfig = {
  sm: { avatar: 'w-8 h-8 text-xs', name: 'text-sm', email: 'text-xs' },
  md: { avatar: 'w-10 h-10 text-sm', name: 'text-base', email: 'text-sm' },
  lg: { avatar: 'w-14 h-14 text-lg', name: 'text-lg', email: 'text-base' },
}

export function UserInfo({ name, email, role, avatar, size = 'md', className }: UserInfoProps) {
  const s = sizeConfig[size]
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <div className={cn('rounded-full bg-primary/10 flex items-center justify-center overflow-hidden shrink-0', s.avatar)}>
        {avatar ? <img src={avatar} alt={name} className="w-full h-full object-cover" /> : <User className="w-1/2 h-1/2 text-primary" />}
      </div>
      <div className="min-w-0">
        <p className={cn('font-medium truncate', s.name)}>{name}</p>
        {email && <p className={cn('text-muted-foreground truncate', s.email)}>{email}</p>}
        {role && <p className="text-xs text-muted-foreground capitalize">{role}</p>}
      </div>
    </div>
  )
}
