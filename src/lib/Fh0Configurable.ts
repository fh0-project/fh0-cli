import type { Fh0DefaultCommandConfig } from '@lib/types';

export abstract class Fh0Configurable<Config = Fh0DefaultCommandConfig> {
  protected config: Config;

  public setOwnConfig(config: Config): this {
    this.config = config;
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

  constructor(config: Config) {
    this.config = config;
  }
}
