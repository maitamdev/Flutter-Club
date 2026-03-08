'use client';
import{cn}from'@/lib/utils';
const iconMap:Record<string,string>={pdf:'PDF',doc:'DOC',xls:'XLS',ppt:'PPT',zip:'ZIP',png:'IMG',jpg:'IMG',mp4:'VID'};
export function FileIcon({extension,className}:{extension:string;className?:string}){const ext=extension.toLowerCase();const label=iconMap[ext]||'FILE';return <span className={cn('inline-flex items-center justify-center w-8 h-8 rounded bg-muted text-xs font-bold',className)}>{label}</span>}
