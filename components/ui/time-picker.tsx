'use client';
import { Input } from '@/components/ui/input';
interface TimePickerProps { value?: string; onChange?: (time: string) => void; label?: string; }
export function TimePicker({ value, onChange, label }: TimePickerProps) {
  return (<div className='space-y-1'>
    {label && <label className='text-sm font-medium'>{label}</label>}
    <Input type='time' value={value} onChange={e => onChange?.(e.target.value)} />
  </div>);
}
