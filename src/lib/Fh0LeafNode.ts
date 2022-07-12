import { Fh0Configurable } from '@lib/Fh0Configurable';
import type { Fh0CommandsModule } from '@lib/Fh0CommandsModule';
import type {
  Fh0CommandRequiredPath,
  Fh0DefaultCommandConfig,
} from '@lib/types';

export abstract class Fh0LeafNode<
  Config = Fh0DefaultCommandConfig,
  Path extends Array<unknown> = Fh0CommandRequiredPath,
> extends Fh0Configurable<Config> {
  protected parentModule?: Fh0CommandsModule<Config>;

  public setParentModule(parentModule: Fh0CommandsModule<Config>): this {
    this.parentModule = parentModule;
    return this;
  }

  public getParentModule(): Fh0CommandsModule<Config> | undefined {
    return this.parentModule;
  }

  protected abstract path: Path;

  public setPath(path: Path): this {
    this.path = path;
    return this;
  }

  public getOwnPath(): Path {
    return this.path;
  }

  public getFullPath(): Path {
    return [
      ...(this.parentModule?.getFullPath() || []),
      ...this.getOwnPath(),
    ] as unknown as Path;
  }
}
