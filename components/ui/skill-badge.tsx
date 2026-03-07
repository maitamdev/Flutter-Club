'use client';
interface SkillBadgeProps { name: string; level: 'beginner'|'intermediate'|'advanced'|'expert'; }
export function SkillBadge({ name, level }: SkillBadgeProps) {
  const colors = { beginner:'bg-gray-100 text-gray-700', intermediate:'bg-blue-100 text-blue-700', advanced:'bg-purple-100 text-purple-700', expert:'bg-yellow-100 text-yellow-800' };
  const dots = { beginner:1, intermediate:2, advanced:3, expert:4 };
  return (<span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${colors[level]}`}>
    {name}<span className='flex gap-0.5'>{Array.from({length:4},(_,i) => <span key={i} className={`w-1.5 h-1.5 rounded-full ${i<dots[level]?'bg-current':'bg-current/20'}`}/>)}</span>
  </span>);
}
