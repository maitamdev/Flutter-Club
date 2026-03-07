'use client';
import { useState } from 'react';
interface CalendarProps { events?: { date: string; title: string }[]; onDateSelect?: (date: string) => void; }
export function CalendarView({ events=[], onDateSelect }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const year = currentMonth.getFullYear(); const month = currentMonth.getMonth();
  const firstDay = new Date(year, month, 1).getDay(); const daysInMonth = new Date(year, month+1, 0).getDate();
  const days = Array.from({length: firstDay}, () => null).concat(Array.from({length: daysInMonth}, (_, i) => i+1));
  const monthNames = ['Th1','Th2','Th3','Th4','Th5','Th6','Th7','Th8','Th9','Th10','Th11','Th12'];
  return (<div className='bg-white dark:bg-gray-900 rounded-lg p-4 border'>
    <div className='flex justify-between items-center mb-4'>
      <button onClick={() => setCurrentMonth(new Date(year, month-1))} className='p-1 hover:bg-gray-100 rounded'>&lt;</button>
      <h3 className='font-semibold'>{monthNames[month]} {year}</h3>
      <button onClick={() => setCurrentMonth(new Date(year, month+1))} className='p-1 hover:bg-gray-100 rounded'>&gt;</button>
    </div>
    <div className='grid grid-cols-7 gap-1 text-center text-sm'>
      {['CN','T2','T3','T4','T5','T6','T7'].map(d => <div key={d} className='font-medium text-gray-500 py-1'>{d}</div>)}
      {days.map((day, i) => <div key={i} onClick={() => day && onDateSelect?.(`${year}-${String(month+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`)} className='p-2 rounded cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/20'>{day}</div>)}
    </div>
  </div>);
}
