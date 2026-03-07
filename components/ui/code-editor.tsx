'use client';
interface CodeEditorProps { value?: string; onChange?: (val: string) => void; language?: string; height?: string; }
export function CodeEditor({ value='', onChange, language='dart', height='300px' }: CodeEditorProps) {
  return (<div className='border rounded-lg overflow-hidden'>
    <div className='bg-gray-800 text-gray-300 px-3 py-1 text-xs flex justify-between'><span>{language}</span>
      <button onClick={() => navigator.clipboard.writeText(value)} className='hover:text-white'>Copy</button></div>
    <textarea value={value} onChange={e => onChange?.(e.target.value)} className='w-full bg-gray-900 text-green-400 font-mono text-sm p-4 focus:outline-none resize-none' style={{height}} spellCheck={false}/>
  </div>);
}
