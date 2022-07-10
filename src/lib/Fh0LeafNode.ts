import { Fh0Configurable } from '@lib/Fh0Configurable';
import type { Fh0CommandConfig } from '@lib/Fh0CommandConfig';
import type { Fh0CommandsModule } from '@lib/Fh0CommandsModule';
import type {
  Fh0CommandOptionalPath,
  Fh0CommandRequiredPath,
} from '@lib/types';

export abstract class Fh0LeafNode<
  Config extends Fh0CommandConfig = Fh0CommandConfig,
  Path extends Fh0CommandOptionalPath = Fh0CommandRequiredPath,
> extends Fh0Configurable<Config> {
  protected parentModule?: Fh0CommandsModule;

  public setParentModule(parentModule: Fh0CommandsModule): this {
    this.parentModule = parentModule;
    return this;
  }

  public getParentModule(): Fh0CommandsModule | undefined {
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
    ] as Path;
  }
}
