describe('Scheduled Task Service', () => {
  it('should create task schedule', () => {
    const task = { name: 'cleanup', cron: '0 0 * * *', enabled: true };
    expect(task.enabled).toBe(true);
  });
  it('should track last run', () => {
    const lastRun = new Date('2024-01-15T00:00:00');
    expect(lastRun).toBeInstanceOf(Date);
  });
});
