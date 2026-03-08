'use client';
import React from 'react';
import{cn}from'@/lib/utils';
export function IconLabel({icon,label,className}:{icon:React.ReactNode;label:string;className?:string}){return(<div className={cn('flex items-center gap-2 text-sm text-muted-foreground',className)}>{icon}<span>{label}</span></div>)}
