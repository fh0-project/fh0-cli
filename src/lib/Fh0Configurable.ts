import type { Fh0DefaultCommandConfig } from '@lib/types';

export abstract class Fh0Configurable<Config = Fh0DefaultCommandConfig> {
  protected config: Config;

  public setOwnConfig(config: Config): this {
    this.config = config;
    return this;
  }

  public abstract init(): void;

  public addConfig(config: Config): this {
    if (this.config === undefined) {
      this.config = config;
    } else {
      Object.assign(this.config, config);
    }
    return this;
  }

  public static create<Config, T extends Fh0Configurable<Config>>(
    ConfigurableClass: { new (config: Config): T },
    config: Config,
  ): T {
    const self = new ConfigurableClass(config);
    self.init();
    return self;
  }

  constructor(config: Config) {
    this.config = config;
  }
}
