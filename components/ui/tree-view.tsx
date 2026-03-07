'use client';
import { useState } from 'react';
interface TreeNode { id: string; label: string; children?: TreeNode[]; }
function TreeItem({ node, depth, onSelect }: { node: TreeNode; depth: number; onSelect?: (id: string) => void }) {
  const [open, setOpen] = useState(false);
  const hasChildren = node.children && node.children.length > 0;
  return (<div><div onClick={() => { hasChildren && setOpen(!open); onSelect?.(node.id); }}
    className='flex items-center gap-1 px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded cursor-pointer' style={{ paddingLeft: depth*16+8 }}>
    {hasChildren && <span className='text-xs'>{open ? 'v' : '>'}</span>}<span className='text-sm'>{node.label}</span></div>
    {open && node.children?.map(c => <TreeItem key={c.id} node={c} depth={depth+1} onSelect={onSelect} />)}</div>);
}
export function TreeView({ data, onSelect }: { data: TreeNode[]; onSelect?: (id: string) => void }) {
  return (<div className='border rounded-lg p-2'>{data.map(n => <TreeItem key={n.id} node={n} depth={0} onSelect={onSelect} />)}</div>);
}
