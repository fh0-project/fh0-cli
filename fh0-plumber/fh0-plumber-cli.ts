import '../lib/init';

import { RequestCommand } from '@fh0-plumber/RequestCommand';
import { program } from '@lib/program';

async function main() {
  program.loadCommands([new RequestCommand()]);
  return await program.parseAsync(process.argv);
}

main();
