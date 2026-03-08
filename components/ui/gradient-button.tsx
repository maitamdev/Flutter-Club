'use client';
import React from 'react';
import{cn}from'@/lib/utils';
export function GradientButton({children,className,...props}:React.ButtonHTMLAttributes<HTMLButtonElement>){return(<button className={cn('px-6 py-2.5 rounded-lg font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl',className)}{...props}>{children}</button>)}
