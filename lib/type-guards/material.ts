// Material type guards
export interface Material { id: string; title: string; type: string; url: string; }
export function isMaterial(obj: unknown): obj is Material { return typeof obj === 'object' && obj !== null && 'id' in obj && 'title' in obj && 'url' in obj; }
export function isVideo(material: Material): boolean { return material.type === 'video'; }
export function isDocument(material: Material): boolean { return ['pdf', 'doc', 'docx'].includes(material.type); }
