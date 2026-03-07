export interface DiffResult { added: string[]; removed: string[]; unchanged: string[]; }
export function textDiff(oldText: string, newText: string): DiffResult {
  const oldLines = oldText.split('\n'); const newLines = newText.split('\n');
  const added = newLines.filter(l => !oldLines.includes(l));
  const removed = oldLines.filter(l => !newLines.includes(l));
  const unchanged = oldLines.filter(l => newLines.includes(l));
  return { added, removed, unchanged };
}
export function highlightChanges(oldText: string, newText: string): string {
  const diff = textDiff(oldText, newText);
  return [...diff.removed.map(l => `- ${l}`), ...diff.added.map(l => `+ ${l}`), ...diff.unchanged.map(l => `  ${l}`)].join('\n');
}
