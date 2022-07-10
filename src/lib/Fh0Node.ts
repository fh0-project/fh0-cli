import type { Fh0CommandConfig } from '@lib/Fh0CommandConfig';
import { Fh0LeafNode } from '@lib/Fh0LeafNode';
import type { Fh0CommandOptionalPath } from '@lib/types';

export abstract class Fh0Node<
  Config extends Fh0CommandConfig = Fh0CommandConfig,
> extends Fh0LeafNode<Config, Fh0CommandOptionalPath> {
  public abstract getOwnChildren(): Fh0LeafNode<
    Config,
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

  constructor(config?: Config) {
    super(config);
  }
}
