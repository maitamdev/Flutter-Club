'use client';
import { useState } from 'react';
const DEFAULT_PRESETS = ['#ef4444','#f59e0b','#10b981','#3b82f6','#8b5cf6','#ec4899','#6b7280','#000000'];
interface ColorPickerProps { value?: string; onChange?: (color: string) => void; presets?: string[]; }
export function ColorPicker({ value='#3b82f6', onChange, presets=DEFAULT_PRESETS }: ColorPickerProps) {
  const [color, setColor] = useState(value);
  const handleChange = (c: string) => { setColor(c); onChange?.(c); };
  return (<div className='flex flex-wrap gap-2 items-center'>
    <input type='color' value={color} onChange={e => handleChange(e.target.value)} className='w-10 h-10 rounded cursor-pointer border-0' />
    {presets.map(c => (<button key={c} onClick={() => handleChange(c)} className='w-7 h-7 rounded-full border-2' style={{ backgroundColor: c, borderColor: c===color?'#000':'transparent' }} />))}
  </div>);
}
