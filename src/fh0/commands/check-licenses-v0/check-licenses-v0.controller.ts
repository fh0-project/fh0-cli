import {
  Fh0CommandController,
  Fh0CommandControllerResult,
} from '@lib/Fh0CommandController';
import type { Command } from 'commander';
import { commaSeparatedList } from '@lib/utils/option-parsers';
import { LicensePermission } from '@fh0/commands/check-licenses-v0/check-licenses-v0.types';
import type { CheckLicensesV0CommandHandlerInput } from '@fh0/commands/check-licenses-v0/check-licenses-v0.handler';
import type { Fh0DefaultCommandConfig } from '@lib/types';

enum OptionName {
  ASSERT_HAS_PERMISSIONS = 'assert-has-permissions',
}

interface Options {
  [OptionName.ASSERT_HAS_PERMISSIONS]: LicensePermission[];
}

type Arguments = [];

export class CheckLicensesV0Controller extends Fh0CommandController<
  Fh0DefaultCommandConfig,
  Arguments,
  OptionName,
  Options,
  typeof Fh0CommandController.DEFAULT_HANDLER_NAME,
  {
    [Fh0CommandController.DEFAULT_HANDLER_NAME]: CheckLicensesV0CommandHandlerInput;
  }
> {
  path: [string] = ['check-licenses-v0'];

  override handlers = {
    [Fh0CommandController.DEFAULT_HANDLER_NAME]: async function defaultHandler(
      _controllerConfig: Fh0DefaultCommandConfig,
    ) {
      const { CheckLicensesV0Handler } = await import(
        '@fh0/commands/check-licenses-v0/check-licenses-v0.handler'
      );
      return new CheckLicensesV0Handler({});
    },
  };

  protected async run(
    _command: Command,
    options: Options,
  ): Promise<Fh0CommandControllerResult> {
    const assertHasPermissions = options[OptionName.ASSERT_HAS_PERMISSIONS];
    const result = await this.runHandler(
      Fh0CommandController.DEFAULT_HANDLER_NAME,
      {
        assertHasPermissions,
      },
    );
    return {
      handlerResults: [result],
    };
  }

  protected define(program: Command): Command {
    return program.option(
      `--${OptionName.ASSERT_HAS_PERMISSIONS} <permissions>`,
      [
        `Comma separated list.`,
        `Values: ${Object.values(LicensePermission).join(', ')}`,
      ].join('\n'),
      commaSeparatedList,
    );
  }
}
