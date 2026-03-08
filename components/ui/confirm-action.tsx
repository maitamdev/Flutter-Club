'use client';
import{useState}from'react';
import{Button}from'./button';
export function ConfirmAction({onConfirm,label='Delete',confirmLabel='Are you sure?'}:{onConfirm:()=>void;label?:string;confirmLabel?:string}){const[pending,setPending]=useState(false);if(pending)return(<div className='flex gap-2'><span className='text-sm text-destructive'>{confirmLabel}</span><Button size='sm' variant='destructive' onClick={()=>{onConfirm();setPending(false)}}>Yes</Button><Button size='sm' variant='outline' onClick={()=>setPending(false)}>No</Button></div>);return <Button variant='destructive' size='sm' onClick={()=>setPending(true)}>{label}</Button>}
