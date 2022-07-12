import type { Fh0CommandController } from '@lib/Fh0CommandController';
import type { Fh0Program } from '@lib/Fh0Program';
import { Fh0Node } from '@lib/Fh0Node';
import type { Fh0LeafNode } from '@lib/Fh0LeafNode';
import type {
  Fh0CommandOptionalPath,
  Fh0DefaultCommandConfig,
} from '@lib/types';

export abstract class Fh0CommandsModule<
  Config = Fh0DefaultCommandConfig,
> extends Fh0Node<Config> {
  protected controllers?: Fh0CommandController<Partial<Config>>[] | undefined;

  public getOwnControllers() {
    return this.controllers === undefined ? [] : this.controllers;
  }

  public getAllControllers() {
    const allControllers = this.getOwnControllers();
    this.getOwnModules().forEach((m) => {
      allControllers.push(...m.getAllControllers());
    });
    return allControllers;
  }

  public getOwnChildren(): Fh0LeafNode<
    Partial<Config>,
    Fh0CommandOptionalPath
  >[] {
    return [...this.getOwnModules(), ...this.getOwnControllers()];
  }

  protected modules?: Fh0CommandsModule<Config>[];

  public getOwnModules() {
    return this.modules === undefined ? [] : this.modules;
  }

  constructor(config: Config) {
    super(config);
  }

  init(): this {
    if (this.config !== undefined) {
      this.addConfig(this.config);
    }
    this.getOwnChildren().forEach((c) => {
      c.setParentModule(this);
    });
    return this;
  }

  load(program: Fh0Program): void {
    this.getAllControllers().forEach((c) => {
      c.load(program);
    });
  }

  static create<
    Config = Fh0DefaultCommandConfig,
    T extends Fh0CommandsModule<Config> = Fh0CommandsModule<Config>,
  >(ModuleClass: { new (config: Config): T }, config: Config): T {
    const self = new ModuleClass(config);
    self.init();
    return self;
  }
}
