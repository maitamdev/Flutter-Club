'use client';
interface MasonryGridProps { children: React.ReactNode[]; columns?: number; gap?: string; }
export function MasonryGrid({ children, columns=3, gap='gap-4' }: MasonryGridProps) {
  const cols: React.ReactNode[][] = Array.from({length: columns}, () => []);
  children.forEach((child, i) => cols[i % columns].push(child));
  return (<div className={`flex ${gap}`}>
    {cols.map((col, i) => <div key={i} className={`flex-1 flex flex-col ${gap}`}>{col}</div>)}
  </div>);
}
