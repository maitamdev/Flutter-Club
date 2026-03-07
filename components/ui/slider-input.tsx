'use client';
interface SliderInputProps { value?: number; onChange?: (val: number) => void; min?: number; max?: number; step?: number; label?: string; }
export function SliderInput({ value=50, onChange, min=0, max=100, step=1, label }: SliderInputProps) {
  return (<div className='space-y-1'>
    {label && <div className='flex justify-between text-sm'><span>{label}</span><span className='font-medium'>{value}</span></div>}
    <input type='range' value={value} onChange={e => onChange?.(Number(e.target.value))} min={min} max={max} step={step}
      className='w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500'/>
    <div className='flex justify-between text-xs text-gray-400'><span>{min}</span><span>{max}</span></div>
  </div>);
}
