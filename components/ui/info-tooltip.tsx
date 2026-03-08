'use client';
import{Tooltip,TooltipContent,TooltipProvider,TooltipTrigger}from'./tooltip';
export function InfoTooltip({text}:{text:string}){return(<TooltipProvider><Tooltip><TooltipTrigger asChild><span className='inline-flex items-center justify-center w-4 h-4 rounded-full bg-muted text-muted-foreground text-xs cursor-help'>?</span></TooltipTrigger><TooltipContent><p className='max-w-xs text-sm'>{text}</p></TooltipContent></Tooltip></TooltipProvider>)}
