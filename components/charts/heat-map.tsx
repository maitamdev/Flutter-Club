'use client';
interface HeatMapProps { data: { day: string; hour: number; value: number }[]; maxValue?: number; }
export function HeatMap({ data, maxValue }: HeatMapProps) {
  const max = maxValue || Math.max(...data.map(d => d.value));
  const days = [...new Set(data.map(d => d.day))];
  const hours = [...new Set(data.map(d => d.hour))].sort((a,b)=>a-b);
  const getColor = (v: number) => { const intensity = Math.round((v/max)*255); return `rgb(59, ${255-intensity}, ${255-intensity})`; };
  return (<div className='overflow-x-auto'><table className='text-xs'><thead><tr><th></th>{hours.map(h => <th key={h} className='px-1'>{h}h</th>)}</tr></thead>
    <tbody>{days.map(day => <tr key={day}><td className='pr-2 font-medium'>{day}</td>
      {hours.map(h => { const cell = data.find(d => d.day===day && d.hour===h); return <td key={h} className='w-6 h-6' style={{backgroundColor: cell?getColor(cell.value):'#f3f4f6'}} title={`${cell?.value||0}`}/>; })}
    </tr>)}</tbody></table></div>);
}
