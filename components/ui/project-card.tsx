'use client';
interface ProjectCardProps { name: string; description: string; progress: number; techStack: string[]; members: number; }
export function ProjectCard({ name, description, progress, techStack, members }: ProjectCardProps) {
  return (<div className='p-4 border rounded-xl hover:shadow-md transition-shadow'>
    <h3 className='font-semibold'>{name}</h3><p className='text-sm text-gray-500 mt-1 line-clamp-2'>{description}</p>
    <div className='mt-3 bg-gray-200 dark:bg-gray-700 rounded-full h-2'><div className='bg-blue-500 h-2 rounded-full' style={{width:`${progress}%`}}/></div>
    <div className='flex gap-1 mt-2 flex-wrap'>{techStack.map(t => <span key={t} className='text-xs px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded'>{t}</span>)}</div>
    <p className='text-xs text-gray-400 mt-2'>{members} members</p>
  </div>);
}
