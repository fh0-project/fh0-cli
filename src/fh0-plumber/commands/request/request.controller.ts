import {
  Fh0CommandControllerBase,
  Fh0CommandControllerRunInput,
} from '@lib/Fh0CommandControllerBase';
import * as jsonrpc from 'jsonrpc-lite';
import { toArray } from '@lib/utils/to-array';
import type { Command } from 'commander';
import { Fh0Plumber } from '@lib/Fh0Plumber';
import type { Fh0DefaultCommandConfig } from '@lib/types';
import { GException } from 'g-exception';

enum OptionName {
  JSON = 'json',
}

type Options = {
  [OptionName.JSON]: string;
};

export class RequestController<
  Config = Fh0DefaultCommandConfig,
> extends Fh0CommandControllerBase<Config, [], Options> {
  path: [string] = ['request'];

  handlers = {};

  init(): void {
    return;
  }

  protected define(program: Command): Command {
    return program.requiredOption(
      `--${OptionName.JSON} <request-json>`,
      'JSON RPC Request object',
    );
  }

  protected async run({
    options,
  }: Fh0CommandControllerRunInput<[], Options>): Promise<void> {
    try {
      const rpcJson = options[OptionName.JSON];
      const plumber = new Fh0Plumber();
      let requests;
      try {
        requests = toArray(jsonrpc.jsonrpc.parse(rpcJson));
      } catch (err) {
        throw new GException(err, 'Error parsing JSON RPC request');
      }
      return await plumber.jsonRpc(requests);
    } catch (err) {
      // console.log(err);
      throw err;
    }
  }
}
