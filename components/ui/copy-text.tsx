'use client';
import{useState}from'react';
import{cn}from'@/lib/utils';
export function CopyText({text,className}:{text:string;className?:string}){const[copied,setCopied]=useState(false);const copy=async()=>{await navigator.clipboard.writeText(text);setCopied(true);setTimeout(()=>setCopied(false),2000)};return(<button onClick={copy} className={cn('inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition',className)}><code className='bg-muted px-1.5 py-0.5 rounded text-xs'>{text}</code><span>{copied?'Copied':'Copy'}</span></button>)}
