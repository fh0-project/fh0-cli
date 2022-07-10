import '../lib/init';

import { program } from '@lib/program';
import { RequestController } from '@fh0-plumber/commands/request/request.controller';
import { Fh0CommandsModule } from '@lib/Fh0CommandsModule';

class Fh0PlumberRootModule extends Fh0CommandsModule {
  path = [];
  override controllers = [new RequestController()];
}

async function main() {
  program.load([Fh0CommandsModule.create(Fh0PlumberRootModule)]);
  return await program.parseAsync(process.argv);
}

main();
