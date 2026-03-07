interface ScheduledTask { id: string; name: string; cronExpression: string; handler: () => Promise<void>; lastRun?: Date; nextRun?: Date; enabled: boolean; }
class ScheduledTaskService {
  private tasks = new Map<string, ScheduledTask>();
  register(task: ScheduledTask): void { this.tasks.set(task.id, task); }
  async execute(taskId: string): Promise<boolean> {
    const task = this.tasks.get(taskId); if (!task || !task.enabled) return false;
    try { await task.handler(); task.lastRun = new Date(); return true; } catch { return false; }
  }
  enable(taskId: string): void { const t = this.tasks.get(taskId); if (t) t.enabled = true; }
  disable(taskId: string): void { const t = this.tasks.get(taskId); if (t) t.enabled = false; }
  getAll(): ScheduledTask[] { return [...this.tasks.values()]; }
}
export const scheduledTasks = new ScheduledTaskService();
