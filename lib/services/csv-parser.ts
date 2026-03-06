// CSV parsing utility
export function parseCSV(csvText: string): Record<string, string>[] {
  const lines = csvText.split('\n').filter(l => l.trim())
  if (lines.length < 2) return []
  const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''))
  return lines.slice(1).map(line => {
    const values = line.split(',').map(v => v.trim().replace(/^"|"$/g, ''))
    const row: Record<string, string> = {}
    headers.forEach((h, i) => { row[h] = values[i] || '' })
    return row
  })
}
export function toCSV(data: Record<string, unknown>[], headers: string[]): string {
  const headerRow = headers.join(',')
  const rows = data.map(item => headers.map(h => `"${String(item[h] || '').replace(/"/g, '""')}"`).join(','))
  return headerRow + '\n' + rows.join('\n')
}
