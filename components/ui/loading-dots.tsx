export function LoadingDots({ className }: { className?: string }) {
  return (
    <span className={className}>
      <span className="inline-block animate-bounce" style={{ animationDelay: '0ms' }}>.</span>
      <span className="inline-block animate-bounce" style={{ animationDelay: '150ms' }}>.</span>
      <span className="inline-block animate-bounce" style={{ animationDelay: '300ms' }}>.</span>
    </span>
  )
}
