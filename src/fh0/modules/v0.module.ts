import { Fh0CommandsModule } from '@lib/Fh0CommandsModule';
import { CheckLicensesV0Controller } from '@fh0/commands/check-licenses-v0/check-licenses-v0.controller';

export class V0Module extends Fh0CommandsModule {
  path = ['v0'];
  override controllers = [new CheckLicensesV0Controller()];
}
