class PDFGenerationService {
  async generateFromHTML(html: string, options?: { title?: string; orientation?: 'portrait' | 'landscape' }): Promise<Blob> {
    const printWindow = document.createElement('iframe'); printWindow.style.display = 'none'; document.body.appendChild(printWindow);
    const doc = printWindow.contentDocument; if (!doc) throw new Error('Cannot create print frame');
    doc.write(`<!DOCTYPE html><html><head><title>${options?.title || 'Document'}</title><style>@page{size:${options?.orientation || 'portrait'};margin:1cm}body{font-family:Arial,sans-serif}</style></head><body>${html}</body></html>`);
    doc.close();
    return new Blob([doc.documentElement.outerHTML], { type: 'text/html' });
  }
  printElement(elementId: string): void { const el = document.getElementById(elementId); if (el) { const w = window.open(''); w?.document.write(el.innerHTML); w?.print(); w?.close(); } }
}
export const pdfService = new PDFGenerationService();
