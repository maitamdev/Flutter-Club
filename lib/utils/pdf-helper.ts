export function printElement(elementId: string, title?: string): void {
  const el = document.getElementById(elementId); if (!el) return;
  const win = window.open('', '_blank');
  if (!win) return;
  win.document.write(`<!DOCTYPE html><html><head><title>${title || 'Print'}</title>
    <style>body{font-family:Arial,sans-serif;padding:20px}@media print{.no-print{display:none}}</style>
    </head><body>${el.innerHTML}</body></html>`);
  win.document.close(); win.print(); win.close();
}
export function generatePrintStyles(): string {
  return `@media print { .no-print { display: none !important; } .print-only { display: block !important; }
    body { font-size: 12pt; } a { text-decoration: none; color: #000; } }`;
}
