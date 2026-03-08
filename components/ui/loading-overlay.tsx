'use client';
import React from 'react';
export function LoadingOverlay({message='Loading...'}:{message?:string}){return(<div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'><div className='bg-white dark:bg-gray-800 rounded-lg p-6 text-center'><div className='animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4'/><p className='text-sm text-muted-foreground'>{message}</p></div></div>)}
