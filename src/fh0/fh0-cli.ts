import '../lib/init';

import { program } from '@lib/program';
import { V0Module } from '@fh0/modules/v0.module';
import { Fh0Configurable } from '@lib/Fh0Configurable';

async function main() {
  program.load([Fh0Configurable.create(V0Module, {})]);
  return await program.parseAsync(process.argv);
}

main();
