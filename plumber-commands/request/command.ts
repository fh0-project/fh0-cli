import type { Fh0Command } from '@lib/Fh0Command';
import type { Fh0Program } from '@lib/Fh0Program';
import jsonrpc from 'jsonrpc-lite';
import { toArray } from '@lib/utils/toArray';
import pMap from 'p-map';

const COMMAND_NAME = 'request';

enum OptName {
  json = 'json',
}

interface Options {
  [OptName.json]: string;
}

export class RequestCommand implements Fh0Command {
  load(program: Fh0Program): void {
    program
      .command(COMMAND_NAME)
      .option(`--${OptName.json} <request-json>`, 'JSON RPC Request object')
      .action(async (options: Options) => {
        const requests = toArray(jsonrpc.parse(options[OptName.json]));
        await pMap(
          requests,
          async (r) => {
            console.log(r);
            throw new Error();
          },
          { concurrency: 1 },
        );
      });
  }
}
