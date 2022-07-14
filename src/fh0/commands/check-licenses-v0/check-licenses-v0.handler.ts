import {
  Fh0CommandHandlerBase,
  Fh0CommandHandlerResult,
} from '@lib/Fh0CommandHandlerBase';
import type { LicensePermission } from '@fh0/commands/check-licenses-v0/check-licenses-v0.types';
import { GException } from 'g-exception';

export interface CheckLicensesV0CommandHandlerInput {
  assertHasPermissions?: LicensePermission[];
}

export class CheckLicensesV0Handler extends Fh0CommandHandlerBase<CheckLicensesV0CommandHandlerInput> {
  async run(
    _input: CheckLicensesV0CommandHandlerInput,
  ): Promise<Fh0CommandHandlerResult> {
    throw new GException('heh {{info.x}}', 2, { info: { x: 1 } });
    // return {
    //   retCode: 0,
    // };
  }

  init() {
    return;
  }
}
