'use client';
import { useRef } from 'react';
interface RichTextEditorProps { value?: string; onChange?: (html: string) => void; placeholder?: string; }
export function RichTextEditor({ value='', onChange, placeholder='Type here...' }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const exec = (cmd: string) => { document.execCommand(cmd, false); onChange?.(editorRef.current?.innerHTML || ''); };
  return (<div className='border rounded-lg overflow-hidden'>
    <div className='flex gap-1 p-2 border-b bg-gray-50 dark:bg-gray-800'>
      {[{cmd:'bold',icon:'B'},{cmd:'italic',icon:'I'},{cmd:'underline',icon:'U'}].map(b =>
        <button key={b.cmd} onClick={() => exec(b.cmd)} className='px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-sm font-medium'>{b.icon}</button>)}
    </div>
    <div ref={editorRef} contentEditable suppressContentEditableWarning onInput={() => onChange?.(editorRef.current?.innerHTML || '')}
      className='min-h-[150px] p-3 focus:outline-none' dangerouslySetInnerHTML={{ __html: value }} />
  </div>);
}
