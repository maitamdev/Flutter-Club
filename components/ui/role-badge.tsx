'use client';
import{cn}from'@/lib/utils';
const roleColors:Record<string,string>={admin:'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',moderator:'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',member:'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'};
export function RoleBadge({role,className}:{role:string;className?:string}){return <span className={cn('px-2 py-0.5 rounded-full text-xs font-medium',roleColors[role]||'bg-gray-100 text-gray-800',className)}>{role}</span>}
