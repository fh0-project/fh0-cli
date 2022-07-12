import { Fh0CommandController } from '@lib/Fh0CommandController';
import * as jsonrpc from 'jsonrpc-lite';
import { toArray } from '@lib/utils/to-array';
import type { Command } from 'commander';
import { Fh0Plumber } from '@lib/Fh0Plumber';
import { Fh0Exception } from '@lib/Fh0Exception';
import type { Fh0DefaultCommandConfig } from '@lib/types';

enum OptionName {
  JSON = 'json',
}

interface Options {
  [OptionName.JSON]: string;
}

export class RequestController<
  Config = Fh0DefaultCommandConfig,
> extends Fh0CommandController<Config, [], OptionName, Options> {
  path: [string] = ['request'];

  protected define(program: Command): Command {
    return program.requiredOption(
      `--${OptionName.JSON} <request-json>`,
      'JSON RPC Request object',
    );
  }

  protected async run(_command: Command, options: Options): Promise<void> {
    try {
      const rpcJson = options[OptionName.JSON];
      const plumber = new Fh0Plumber();
      let requests;
      try {
        requests = toArray(jsonrpc.jsonrpc.parse(rpcJson));
      } catch (err) {
        throw new Fh0Exception(err, 'Error parsing JSON RPC request');
      }
      return await plumber.jsonRpc(requests);
    } catch (err) {
      // console.log(err);
      throw err;
    }
  }
}
