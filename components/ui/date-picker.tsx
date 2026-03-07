'use client';
import { Input } from '@/components/ui/input';
interface DatePickerProps { value?: string; onChange?: (date: string) => void; label?: string; min?: string; max?: string; }
export function DatePicker({ value, onChange, label, min, max }: DatePickerProps) {
  return (<div className='space-y-1'>
    {label && <label className='text-sm font-medium text-gray-700 dark:text-gray-300'>{label}</label>}
    <Input type='date' value={value} onChange={e => onChange?.(e.target.value)} min={min} max={max} className='w-full' />
  </div>);
}
