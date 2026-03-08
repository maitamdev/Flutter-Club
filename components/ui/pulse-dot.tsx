'use client';
import{cn}from'@/lib/utils';
export function PulseDot({color='bg-green-500',className}:{color?:string;className?:string}){return(<span className={cn('relative flex h-3 w-3',className)}><span className={cn('animate-ping absolute inline-flex h-full w-full rounded-full opacity-75',color)}/><span className={cn('relative inline-flex rounded-full h-3 w-3',color)}/></span>)}
