'use client';
import React from 'react';
import{cn}from'@/lib/utils';
export function KeyValueList({items,className}:{items:{key:string;value:React.ReactNode}[];className?:string}){return(<dl className={cn('space-y-3',className)}>{items.map((item,i)=>(<div key={i} className='flex justify-between items-center'><dt className='text-sm text-muted-foreground'>{item.key}</dt><dd className='text-sm font-medium'>{item.value}</dd></div>))}</dl>)}
