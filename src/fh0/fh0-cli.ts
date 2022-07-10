import '../lib/init';

import { program } from '@lib/program';
import { V0Module } from '@fh0/modules/v0.module';
import { Fh0CommandsModule } from '@lib/Fh0CommandsModule';

async function main() {
  program.load([Fh0CommandsModule.create(V0Module)]);
  return await program.parseAsync(process.argv);
}

main();
