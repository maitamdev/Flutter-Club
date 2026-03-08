'use client';
import{useState,useEffect}from'react';
export function AnimatedCounter({value,duration=1000}:{value:number;duration?:number}){const[count,setCount]=useState(0);useEffect(()=>{let start=0;const step=value/((duration/16));const timer=setInterval(()=>{start+=step;if(start>=value){setCount(value);clearInterval(timer)}else{setCount(Math.floor(start))}},16);return()=>clearInterval(timer)},[value,duration]);return <span className='tabular-nums font-bold'>{count.toLocaleString()}</span>}
