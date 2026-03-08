'use client';
import React from 'react';
import{Button}from'./button';
export function ErrorBoundaryFallback({error,reset}:{error:Error;reset:()=>void}){return(<div className='flex flex-col items-center justify-center p-8'><h2 className='text-lg font-semibold text-destructive mb-2'>Something went wrong</h2><p className='text-sm text-muted-foreground mb-4'>{error.message}</p><Button onClick={reset}>Try Again</Button></div>)}
