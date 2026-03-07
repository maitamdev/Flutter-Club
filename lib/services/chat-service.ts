interface Message { id: string; channelId: string; senderId: string; content: string; timestamp: Date; type: 'text' | 'system'; }
class ChatService {
  private messages = new Map<string, Message[]>();
  sendMessage(channelId: string, senderId: string, content: string): Message {
    const msg: Message = { id: crypto.randomUUID(), channelId, senderId, content, timestamp: new Date(), type: 'text' };
    const channel = this.messages.get(channelId) || []; channel.push(msg); this.messages.set(channelId, channel); return msg;
  }
  getMessages(channelId: string, limit = 50): Message[] { return (this.messages.get(channelId) || []).slice(-limit); }
  deleteMessage(channelId: string, messageId: string): boolean {
    const channel = this.messages.get(channelId); if (!channel) return false;
    const idx = channel.findIndex(m => m.id === messageId); if (idx === -1) return false; channel.splice(idx, 1); return true;
  }
}
export const chatService = new ChatService();
