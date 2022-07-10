import {
  Fh0CommandHandler,
  Fh0CommandHandlerInput,
  Fh0CommandHandlerResult,
} from '@lib/Fh0CommandHandler';
import type { LicensePermission } from '@fh0/commands/check-licenses-v0/check-licenses-v0.types';
import type { Fh0CommandConfig } from '@lib/Fh0CommandConfig';
import { Fh0Exception } from '@lib/Fh0Exception';

export interface CheckLicensesV0CommandHandlerInput
  extends Fh0CommandHandlerInput {
  assertHasPermissions?: LicensePermission[];
}

export class CheckLicensesV0Handler<
  Config extends Fh0CommandConfig = Fh0CommandConfig,
> extends Fh0CommandHandler<CheckLicensesV0CommandHandlerInput, Config> {
  async run(
    _input: CheckLicensesV0CommandHandlerInput,
  ): Promise<Fh0CommandHandlerResult> {
    throw new Fh0Exception(2, 'heh {{info.x}}', { info: { x: 1 } });
    // return {
    //   retCode: 0,
    // };
  }
}
