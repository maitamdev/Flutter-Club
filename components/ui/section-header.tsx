'use client';
import React from 'react';
export function SectionHeader({title,description,action}:{title:string;description?:string;action?:React.ReactNode}){return(<div className='flex items-center justify-between mb-6'><div><h2 className='text-xl font-semibold'>{title}</h2>{description&&<p className='text-sm text-muted-foreground mt-1'>{description}</p>}</div>{action}</div>)}
