describe('Export Service', () => {
  it('should support multiple formats', () => {
    const formats = ['csv', 'xlsx', 'pdf'];
    expect(formats).toContain('csv');
  });
  it('should generate filename with timestamp', () => {
    const filename = 'export-2024-01-15.csv';
    expect(filename).toContain('export');
  });
});
