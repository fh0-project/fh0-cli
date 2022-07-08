import '../lib/init';
import { program } from '@lib/program';

async function main() {
  program.loadCommands([]);
  return await program.parseAsync(process.argv);
}

main();
