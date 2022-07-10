import {
  Fh0CommandController,
  Fh0CommandControllerResult,
} from '@lib/Fh0CommandController';
import type { Command } from 'commander';
import { commaSeparatedList } from '@lib/utils/option-parsers';
import { LicensePermission } from '@fh0/commands/check-licenses-v0/check-licenses-v0.types';
import type { Fh0CommandConfig } from '@lib/Fh0CommandConfig';
import type { CheckLicensesV0CommandHandlerInput } from '@fh0/commands/check-licenses-v0/check-licenses-v0.handler';

enum OptName {
  ASSERT_HAS_PERMISSIONS = 'assert-has-permissions',
}

interface Options extends Record<string, unknown> {
  [OptName.ASSERT_HAS_PERMISSIONS]: LicensePermission[];
}

const DEFAULT_HANDLER_NAME = 'default';

export class CheckLicensesV0Controller<
  Config extends Fh0CommandConfig = Fh0CommandConfig,
> extends Fh0CommandController<
  Config,
  Options,
  [],
  typeof DEFAULT_HANDLER_NAME,
  { [DEFAULT_HANDLER_NAME]: CheckLicensesV0CommandHandlerInput }
> {
  path: [string] = ['check-licenses-v0'];

  override handlers = {
    [DEFAULT_HANDLER_NAME]: async function defaultHandler(config?: Config) {
      const { CheckLicensesV0Handler } = await import(
        '@fh0/commands/check-licenses-v0/check-licenses-v0.handler'
      );
      return new CheckLicensesV0Handler(config);
    },
  };

  protected async run(
    _command: Command,
    options: Options,
  ): Promise<Fh0CommandControllerResult> {
    const assertHasPermissions = options[OptName.ASSERT_HAS_PERMISSIONS];
    const result = await this.runHandler(DEFAULT_HANDLER_NAME, {
      assertHasPermissions,
    });
    return {
      handlerResults: [result],
    };
  }

  protected define(program: Command): Command {
    return program.option(
      `--${OptName.ASSERT_HAS_PERMISSIONS} <permissions>`,
      [
        `Comma separated list.`,
        `Values: ${Object.values(LicensePermission).join(', ')}`,
      ].join('\n'),
      commaSeparatedList,
    );
  }
}
