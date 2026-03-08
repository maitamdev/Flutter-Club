// Command pattern
export interface Command { execute(): void; undo?(): void; }
export class CommandHistory { private history: Command[] = []; private undone: Command[] = []; execute(command: Command): void { command.execute(); this.history.push(command); this.undone = []; } undo(): void { const cmd = this.history.pop(); if (cmd?.undo) { cmd.undo(); this.undone.push(cmd); } } redo(): void { const cmd = this.undone.pop(); if (cmd) { cmd.execute(); this.history.push(cmd); } } canUndo(): boolean { return this.history.length > 0; } canRedo(): boolean { return this.undone.length > 0; } }
