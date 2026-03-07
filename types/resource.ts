export interface Resource { id: string; title: string; description: string; type: ResourceType; url: string; fileSize?: number; mimeType?: string; uploadedBy: string; downloads: number; tags: string[]; createdAt: Date; }
export type ResourceType = 'document' | 'video' | 'presentation' | 'code' | 'link' | 'template';
