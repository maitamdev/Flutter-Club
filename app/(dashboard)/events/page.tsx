'use client';
import { useState } from 'react';
import { PageHeader } from '@/components/ui/page-header';
export default function EventsPage() {
  const [filter, setFilter] = useState('all');
  const types = ['all','workshop','meetup','hackathon','seminar'];
  return (<div className='space-y-6'><PageHeader title='Su kien' description='Quan ly cac su kien cua CLB'/>
    <div className='flex gap-2'>{types.map(t => <button key={t} onClick={() => setFilter(t)} className={`px-3 py-1 rounded-full text-sm ${filter===t?'bg-blue-500 text-white':'bg-gray-100'}`}>{t}</button>)}</div>
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
      <div className='p-6 border rounded-xl text-center text-gray-400'>Chua co su kien nao</div>
    </div></div>);
}
