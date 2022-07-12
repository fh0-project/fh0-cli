import { Fh0CommandsModule } from '@lib/Fh0CommandsModule';
import { CheckLicensesV0Controller } from '@fh0/commands/check-licenses-v0/check-licenses-v0.controller';
import { Fh0Configurable } from '@lib/Fh0Configurable';

export class V0Module extends Fh0CommandsModule {
  path = ['v0'];
  override controllers = [
    Fh0Configurable.create(CheckLicensesV0Controller, {}),
  ];
}
