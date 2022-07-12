import { Fh0LeafNode } from '@lib/Fh0LeafNode';
import type {
  Fh0CommandOptionalPath,
  Fh0DefaultCommandConfig,
} from '@lib/types';

export abstract class Fh0Node<
  Config = Fh0DefaultCommandConfig,
> extends Fh0LeafNode<Config, Fh0CommandOptionalPath> {
  public abstract getOwnChildren(): Fh0LeafNode<
    Partial<Config>,
    Fh0CommandOptionalPath
  >[];

  public override addConfig(config: Config): this {
    if (this.config === undefined) {
      this.setOwnConfig(config);
    } else {
      Object.assign(this.config, config);
    }
    this.getOwnChildren().forEach((ch) => {
      ch.addConfig(config);
    });
    return this;
  }

  constructor(config: Config) {
    super(config);
  }
}
