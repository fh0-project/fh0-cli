import '../lib/init';

import { RequestCommand } from '@plumber-commands/request/command';
import { program } from '@lib/program';

async function main() {
  program.loadCommands([new RequestCommand()]);
  return await program.parseAsync(process.argv);
}

main();
