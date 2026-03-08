'use client';
export function TruncateMiddle({text,maxLength=30}:{text:string;maxLength?:number}){if(text.length<=maxLength)return <span>{text}</span>;const start=text.slice(0,Math.ceil(maxLength/2)-1);const end=text.slice(-(Math.floor(maxLength/2)-2));return <span title={text}>{start}...{end}</span>}
