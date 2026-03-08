'use client';
import{useRouter}from'next/navigation';
import{Button}from'./button';
export function BackButton({label='Back'}:{label?:string}){const router=useRouter();return <Button variant='ghost' onClick={()=>router.back()} className='gap-2'><span>{'<-'}</span>{label}</Button>}
