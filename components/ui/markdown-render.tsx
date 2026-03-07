'use client';
import ReactMarkdown from 'react-markdown';
interface MarkdownRenderProps { source: string; compact?: boolean; className?: string; }
export function MarkdownRender({ source, compact=false, className='' }: MarkdownRenderProps) {
  return <div className={`prose dark:prose-invert ${compact?'prose-sm':''} max-w-none ${className}`}><ReactMarkdown>{source}</ReactMarkdown></div>;
}
