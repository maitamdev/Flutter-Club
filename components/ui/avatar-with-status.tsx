'use client';
import{Avatar,AvatarImage,AvatarFallback}from'./avatar';
import{StatusDot}from'./status-dot';
export function AvatarWithStatus({src,name,status}:{src?:string;name:string;status:string}){const initials=name.split(' ').map(n=>n[0]).join('').slice(0,2);return(<div className='relative inline-block'><Avatar><AvatarImage src={src}/><AvatarFallback>{initials}</AvatarFallback></Avatar><span className='absolute bottom-0 right-0'><StatusDot status={status}/></span></div>)}
