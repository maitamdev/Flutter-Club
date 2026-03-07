'use client';
interface AvatarStackProps { avatars: { src?: string; name: string }[]; max?: number; size?: number; }
export function AvatarStack({ avatars, max=5, size=32 }: AvatarStackProps) {
  const visible = avatars.slice(0, max); const remaining = avatars.length - max;
  return (<div className='flex -space-x-2'>
    {visible.map((a, i) => <div key={i} className='rounded-full border-2 border-white dark:border-gray-900 bg-gray-200 flex items-center justify-center overflow-hidden' style={{width:size,height:size,zIndex:max-i}}>
      {a.src ? <img src={a.src} alt={a.name} className='w-full h-full object-cover'/> : <span className='text-xs font-medium'>{a.name[0]}</span>}
    </div>)}
    {remaining > 0 && <div className='rounded-full border-2 border-white bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-xs font-medium' style={{width:size,height:size}}>+{remaining}</div>}
  </div>);
}
