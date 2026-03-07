interface FeedbackItem { id: string; userId: string; type: 'bug' | 'feature' | 'general'; message: string; rating?: number; status: 'pending' | 'reviewed' | 'resolved'; createdAt: Date; }
class FeedbackService {
  private items: FeedbackItem[] = [];
  submit(data: Omit<FeedbackItem, 'id' | 'status' | 'createdAt'>): FeedbackItem {
    const item = { ...data, id: crypto.randomUUID(), status: 'pending' as const, createdAt: new Date() };
    this.items.push(item); return item;
  }
  getAll(status?: FeedbackItem['status']): FeedbackItem[] { return status ? this.items.filter(i => i.status === status) : this.items; }
  updateStatus(id: string, status: FeedbackItem['status']): boolean { const item = this.items.find(i => i.id === id); if (!item) return false; item.status = status; return true; }
  getAverageRating(): number { const rated = this.items.filter(i => i.rating); return rated.length ? rated.reduce((s, i) => s + (i.rating || 0), 0) / rated.length : 0; }
}
export const feedbackService = new FeedbackService();
