import { Fh0CommandController } from '@lib/Fh0CommandController';
import * as jsonrpc from 'jsonrpc-lite';
import { toArray } from '@lib/utils/to-array';
import { GError } from '@lib/GError';
import type { Command } from 'commander';
import { Fh0Plumber } from '@lib/Fh0Plumber';
import type { Fh0CommandConfig } from '@lib/Fh0CommandConfig';

enum OptName {
  JSON = 'json',
}

interface Options extends Record<string, string> {
  [OptName.JSON]: string;
}

export class RequestController<
  Config extends Fh0CommandConfig = Fh0CommandConfig,
> extends Fh0CommandController<Config, Options, []> {
  path: [string] = ['request'];

  protected define(program: Command): Command {
    return program.requiredOption(
      `--${OptName.JSON} <request-json>`,
      'JSON RPC Request object',
    );
  }

  protected async run(_command: Command, options: Options): Promise<void> {
    try {
      const rpcJson = options[OptName.JSON];
      const plumber = new Fh0Plumber();
      let requests;
      try {
        requests = toArray(jsonrpc.jsonrpc.parse(rpcJson));
      } catch (err) {
        throw new GError(err, 'Error parsing JSON RPC request');
      }
      return await plumber.jsonRpc(requests);
    } catch (err) {
      // console.log(err);
      throw err;
    }
  }
}
