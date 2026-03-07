'use client';
import ReactMarkdown from 'react-markdown';
interface MarkdownPreviewProps { content: string; className?: string; }
export function MarkdownPreview({ content, className }: MarkdownPreviewProps) {
  return (<div className={`prose dark:prose-invert max-w-none ${className || ''}`}><ReactMarkdown>{content}</ReactMarkdown></div>);
}
