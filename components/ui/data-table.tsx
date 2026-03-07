'use client';
import { useState } from 'react';
interface Column<T> { key: keyof T; label: string; sortable?: boolean; }
interface DataTableProps<T> { data: T[]; columns: Column<T>[]; pageSize?: number; }
export function DataTable<T extends Record<string, unknown>>({ data, columns, pageSize=10 }: DataTableProps<T>) {
  const [page, setPage] = useState(0);
  const [sortKey, setSortKey] = useState<keyof T|null>(null);
  const [sortDir, setSortDir] = useState<'asc'|'desc'>('asc');
  let sorted = [...data];
  if (sortKey) sorted.sort((a,b) => sortDir==='asc' ? String(a[sortKey]).localeCompare(String(b[sortKey])) : String(b[sortKey]).localeCompare(String(a[sortKey])));
  const paged = sorted.slice(page*pageSize, (page+1)*pageSize);
  const totalPages = Math.ceil(data.length/pageSize);
  return (<div className='overflow-x-auto'><table className='w-full text-sm'><thead><tr className='border-b'>
    {columns.map(c => <th key={String(c.key)} onClick={() => c.sortable && (sortKey===c.key ? setSortDir(d=>d==='asc'?'desc':'asc') : (setSortKey(c.key), setSortDir('asc')))} className='px-4 py-3 text-left font-medium cursor-pointer'>{c.label}</th>)}
  </tr></thead><tbody>{paged.map((row,i) => <tr key={i} className='border-b hover:bg-gray-50 dark:hover:bg-gray-800/50'>
    {columns.map(c => <td key={String(c.key)} className='px-4 py-3'>{String(row[c.key]??'')}</td>)}</tr>)}</tbody></table>
  {totalPages>1 && <div className='flex justify-center gap-2 py-3'>{Array.from({length:totalPages},(_,i) => <button key={i} onClick={() => setPage(i)} className={`px-3 py-1 rounded ${i===page?'bg-blue-500 text-white':'hover:bg-gray-100'}`}>{i+1}</button>)}</div>}
  </div>);
}
