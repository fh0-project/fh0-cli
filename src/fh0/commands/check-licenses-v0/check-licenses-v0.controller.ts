import {
  Fh0CommandControllerBase,
  Fh0CommandControllerResult,
  Fh0CommandControllerRunInput,
} from '@lib/Fh0CommandControllerBase';
import type { Command } from 'commander';
import { commaSeparatedList } from '@lib/utils/option-parsers';
import { LicensePermission } from '@fh0/commands/check-licenses-v0/check-licenses-v0.types';
import type { CheckLicensesV0CommandHandlerInput } from '@fh0/commands/check-licenses-v0/check-licenses-v0.handler';
import type { Fh0DefaultCommandConfig } from '@lib/types';
import { Fh0Configurable } from '@lib/Fh0Configurable';

type Arguments = [];

enum OptionName {
  ASSERT_HAS_PERMISSIONS = 'assert-has-permissions',
}

type Options = {
  [OptionName.ASSERT_HAS_PERMISSIONS]: LicensePermission[];
};

export class CheckLicensesV0Controller extends Fh0CommandControllerBase<
  Partial<Fh0DefaultCommandConfig>,
  Arguments,
  Options,
  {
    [Fh0CommandControllerBase.DEFAULT_HANDLER_NAME]: CheckLicensesV0CommandHandlerInput;
  }
> {
  path: [string] = ['check-licenses-v0'];

  handlers = {
    [Fh0CommandControllerBase.DEFAULT_HANDLER_NAME]:
      async function defaultHandler(
        _controllerConfig: Partial<Fh0DefaultCommandConfig>,
      ) {
        const { CheckLicensesV0Handler } = await import(
          '@fh0/commands/check-licenses-v0/check-licenses-v0.handler'
        );
        return Fh0Configurable.create(CheckLicensesV0Handler, {});
      },
  };

  init(): void {
    return;
  }

  protected async run({
    options,
  }: Fh0CommandControllerRunInput<
    Arguments,
    Options
  >): Promise<Fh0CommandControllerResult> {
    const assertHasPermissions = options[OptionName.ASSERT_HAS_PERMISSIONS];
    const result = await this.runHandler(
      Fh0CommandControllerBase.DEFAULT_HANDLER_NAME,
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
