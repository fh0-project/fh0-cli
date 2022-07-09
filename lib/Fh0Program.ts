import { Command } from 'commander';
import type { Fh0Command } from '@lib/Fh0Command';

export class Fh0Program extends Command {
  loadCommands(commands: Fh0Command[]): void {
    commands.forEach((c) => {
      c.load(this);
    });
  }

  // setErrorHandler(): void {
  //   this.on('command:*', () => {
  //     console.error(
  //       `\n${ERROR_PREFIX} Invalid command: ${chalk.red('%s')}`,
  //       program.args.join(' '),
  //     );
  //     console.log(
  //       `See ${chalk.red('--help')} for a list of available commands.\n`,
  //     );
  //     process.exit(1);
  //   });
  // }
}
