import { Command } from 'commander';
import type { Fh0Command } from '@lib/Fh0Command';

export class Fh0Program extends Command {
  loadCommands(commands: Fh0Command[]): void {
    commands.forEach((c) => {
      c.load(this);
    });
  }
}
