'use client';
interface EventCardProps { title: string; date: string; location: string; type: string; attendees?: number; }
export function EventCard({ title, date, location, type, attendees=0 }: EventCardProps) {
  return (<div className='p-4 border rounded-xl hover:shadow-md transition-shadow bg-white dark:bg-gray-900'>
    <span className='text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700'>{type}</span>
    <h3 className='font-semibold mt-2'>{title}</h3>
    <p className='text-sm text-gray-500 mt-1'>{date}</p><p className='text-sm text-gray-500'>{location}</p>
    <p className='text-xs text-gray-400 mt-2'>{attendees} participants</p>
  </div>);
}
