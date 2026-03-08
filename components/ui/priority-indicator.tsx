'use client';
import{cn}from'@/lib/utils';
const priorityConfig:Record<string,{color:string;label:string}>={high:{color:'text-red-500',label:'High'},medium:{color:'text-yellow-500',label:'Medium'},low:{color:'text-green-500',label:'Low'}};
export function PriorityIndicator({priority,showLabel=true}:{priority:string;showLabel?:boolean}){const config=priorityConfig[priority]||priorityConfig.low;return(<span className={cn('inline-flex items-center gap-1',config.color)}><span>*</span>{showLabel&&<span className='text-xs font-medium'>{config.label}</span>}</span>)}
