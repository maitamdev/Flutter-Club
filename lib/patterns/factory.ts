// Factory pattern
export type Creator<T> = (...args: unknown[]) => T;
export class Factory<T> { private creators = new Map<string, Creator<T>>(); register(type: string, creator: Creator<T>): void { this.creators.set(type, creator); } create(type: string, ...args: unknown[]): T { const creator = this.creators.get(type); if (!creator) throw new Error('Unknown type: ' + type); return creator(...args); } getTypes(): string[] { return Array.from(this.creators.keys()); } }
