import type { Fh0CommandConfig } from '@lib/Fh0CommandConfig';

export abstract class Fh0Configurable<
  Config extends Fh0CommandConfig = Fh0CommandConfig,
> {
  protected config?: Config;

  public setOwnConfig(config?: Config): this {
    if (config !== undefined) {
      this.config = config;
    } else {
      delete this.config;
    }
    return this;
  }

  public addConfig(config: Config): this {
    if (this.config === undefined) {
      this.config = config;
    } else {
      Object.assign(this.config, config);
    }
    return this;
  }

  constructor(config?: Config) {
    this.setOwnConfig(config);
  }
}
