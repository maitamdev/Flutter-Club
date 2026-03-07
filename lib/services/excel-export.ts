class ExcelExportService {
  async exportToXLSX<T extends Record<string, unknown>>(data: T[], filename: string, sheetName = 'Sheet1'): Promise<void> {
    const { utils, writeFile } = await import('xlsx');
    const ws = utils.json_to_sheet(data); const wb = utils.book_new(); utils.book_append_sheet(wb, ws, sheetName);
    writeFile(wb, `${filename}.xlsx`);
  }
  async exportMultiSheet(sheets: { name: string; data: Record<string, unknown>[] }[], filename: string): Promise<void> {
    const { utils, writeFile } = await import('xlsx');
    const wb = utils.book_new();
    sheets.forEach(s => { const ws = utils.json_to_sheet(s.data); utils.book_append_sheet(wb, ws, s.name); });
    writeFile(wb, `${filename}.xlsx`);
  }
}
export const excelExport = new ExcelExportService();
