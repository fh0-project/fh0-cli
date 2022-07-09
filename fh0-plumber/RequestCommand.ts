import type { Fh0Command } from '@lib/Fh0Command';
import type { Fh0Program } from '@lib/Fh0Program';
import jsonrpc from 'jsonrpc-lite';
import { toArray } from '@lib/utils/toArray';
import pMap from 'p-map';
import { Fh0Exception } from '@lib/Fh0Exception';

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
      .requiredOption(
        `--${OptName.json} <request-json>`,
        'JSON RPC Request object',
      )
      .action(async (options: Options) => {
        let requests;
        try {
          requests = toArray(jsonrpc.parse(options[OptName.json]));
        } catch (err) {
          throw new Fh0Exception(err, 'Error parsing JSON RPC request');
        }
        console.log(requests);
        await pMap(
          requests,
          async (r) => {
            console.log(r);
            // throw new Error();
          },
          { concurrency: 1 },
        );
      });
  }
}
