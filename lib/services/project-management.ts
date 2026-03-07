interface ProjectTask { id: string; title: string; status: 'todo' | 'doing' | 'done'; assignee?: string; priority: 'low' | 'medium' | 'high'; }
class ProjectManagementService {
  private tasks = new Map<string, ProjectTask[]>();
  addTask(projectId: string, task: ProjectTask): void { const list = this.tasks.get(projectId) || []; list.push(task); this.tasks.set(projectId, list); }
  updateStatus(projectId: string, taskId: string, status: ProjectTask['status']): boolean {
    const list = this.tasks.get(projectId); const task = list?.find(t => t.id === taskId); if (!task) return false; task.status = status; return true;
  }
  getProgress(projectId: string): number { const list = this.tasks.get(projectId) || []; if (!list.length) return 0; return Math.round(list.filter(t => t.status === 'done').length / list.length * 100); }
  getByStatus(projectId: string, status: ProjectTask['status']): ProjectTask[] { return (this.tasks.get(projectId) || []).filter(t => t.status === status); }
}
export const projectManagement = new ProjectManagementService();
