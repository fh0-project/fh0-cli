import { Command } from 'commander';
// import type { CommanderStatic } from 'commander';
import * as chalk from 'chalk';

const program = new Command();

program
  .command('test1')
  .option('--test1 <testInput>')
  .action(() => {
    console.log('test112');
  });

program.on('command:*', () => {
  console.error(
    `\nInvalid command: ${chalk.red('%s')}`,
    program.args.join(' '),
  );
  console.log(`See ${chalk.red('--help')} for a list of available commands.\n`);
  process.exit(1);
});

program.parse(process.argv);
