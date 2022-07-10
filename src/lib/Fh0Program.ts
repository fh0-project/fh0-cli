import { Command } from 'commander';
import type { Fh0CommandsModule } from '@lib/Fh0CommandsModule';

export class Fh0Program extends Command {
  load(modules: Fh0CommandsModule[]): void {
    modules.forEach((m) => {
      m.load(this);
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
