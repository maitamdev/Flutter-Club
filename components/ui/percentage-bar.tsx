'use client';
import{cn}from'@/lib/utils';
export function PercentageBar({value,max=100,color='bg-primary',className}:{value:number;max?:number;color?:string;className?:string}){const pct=Math.min(100,Math.round((value/max)*100));return(<div className={cn('w-full',className)}><div className='flex justify-between text-xs mb-1'><span>{pct}%</span></div><div className='h-2 bg-muted rounded-full overflow-hidden'><div className={cn('h-full rounded-full transition-all duration-500',color)} style={{width:pct+'%'}}/></div></div>)}
