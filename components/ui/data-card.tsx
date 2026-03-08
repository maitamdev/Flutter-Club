'use client';
import React from 'react';
import{cn}from'@/lib/utils';
export function DataCard({label,value,sublabel,className}:{label:string;value:React.ReactNode;sublabel?:string;className?:string}){return(<div className={cn('p-4 rounded-lg border bg-card',className)}><dt className='text-sm font-medium text-muted-foreground'>{label}</dt><dd className='text-2xl font-semibold mt-1'>{value}</dd>{sublabel&&<dd className='text-xs text-muted-foreground mt-0.5'>{sublabel}</dd>}</div>)}
