'use client';
import{cn}from'@/lib/utils';
const colors:Record<string,string>={online:'bg-green-500',offline:'bg-gray-400',busy:'bg-red-500',away:'bg-yellow-500'};
export function StatusDot({status,className}:{status:string;className?:string}){return <span className={cn('inline-block w-2.5 h-2.5 rounded-full',colors[status]||'bg-gray-400',className)}/>}
