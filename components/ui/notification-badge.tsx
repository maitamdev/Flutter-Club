'use client';
import{cn}from'@/lib/utils';
export function NotificationBadge({count,className}:{count:number;className?:string}){if(count<=0)return null;return <span className={cn('inline-flex items-center justify-center min-w-5 h-5 px-1.5 text-xs font-bold text-white bg-red-500 rounded-full',className)}>{count>99?'99+':count}</span>}
