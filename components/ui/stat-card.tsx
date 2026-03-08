'use client';
import React from 'react';
import{cn}from'@/lib/utils';
export function StatCard({title,value,change,icon,className}:{title:string;value:string|number;change?:string;icon?:React.ReactNode;className?:string}){return(<div className={cn('rounded-lg border bg-card p-6',className)}><div className='flex items-center justify-between'><p className='text-sm text-muted-foreground'>{title}</p>{icon}</div><p className='text-2xl font-bold mt-2'>{value}</p>{change&&<p className='text-xs text-muted-foreground mt-1'>{change}</p>}</div>)}
