'use client';
import{useState,useEffect}from'react';
function getRelative(date:Date):string{const diff=Date.now()-date.getTime();const mins=Math.floor(diff/60000);if(mins<1)return'just now';if(mins<60)return mins+'m ago';const hrs=Math.floor(mins/60);if(hrs<24)return hrs+'h ago';const days=Math.floor(hrs/24);if(days<30)return days+'d ago';return date.toLocaleDateString()}export function RelativeTime({date}:{date:Date|string}){const[text,setText]=useState('');useEffect(()=>{setText(getRelative(new Date(date)))},[date]);return <time className='text-sm text-muted-foreground'>{text}</time>}
