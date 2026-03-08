'use client';
import React from 'react';
export function EmptyState({icon,title,description,action}:{icon?:React.ReactNode;title:string;description?:string;action?:React.ReactNode}){return(<div className='flex flex-col items-center justify-center py-12 text-center'>{icon&&<div className='mb-4 text-muted-foreground'>{icon}</div>}<h3 className='text-lg font-medium'>{title}</h3>{description&&<p className='mt-1 text-sm text-muted-foreground max-w-sm'>{description}</p>}{action&&<div className='mt-4'>{action}</div>}</div>)}
