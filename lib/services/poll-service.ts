interface Poll { id: string; question: string; options: { text: string; votes: number }[]; voters: Set<string>; type: 'single' | 'multiple'; expiresAt?: Date; }
class PollService {
  private polls = new Map<string, Poll>();
  create(data: Omit<Poll, 'voters'>): Poll { const poll = { ...data, voters: new Set<string>() }; this.polls.set(data.id, poll); return poll; }
  vote(pollId: string, userId: string, optionIndices: number[]): boolean {
    const poll = this.polls.get(pollId); if (!poll || poll.voters.has(userId)) return false;
    if (poll.expiresAt && new Date() > poll.expiresAt) return false;
    optionIndices.forEach(i => { if (poll.options[i]) poll.options[i].votes++; }); poll.voters.add(userId); return true;
  }
  getResults(pollId: string): Poll | undefined { return this.polls.get(pollId); }
}
export const pollService = new PollService();
