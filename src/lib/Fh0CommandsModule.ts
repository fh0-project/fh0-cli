import type { Fh0CommandController } from '@lib/Fh0CommandController';
import type { Fh0CommandConfig } from '@lib/Fh0CommandConfig';
import type { Fh0Program } from '@lib/Fh0Program';
import { Fh0Node } from '@lib/Fh0Node';
import type { Fh0LeafNode } from '@lib/Fh0LeafNode';
import type { Fh0CommandOptionalPath } from '@lib/types';

export abstract class Fh0CommandsModule<
  Config extends Fh0CommandConfig = Fh0CommandConfig,
> extends Fh0Node<Config> {
  protected controllers?: Fh0CommandController<Config>[];

  public getOwnControllers() {
    return this.controllers === undefined ? [] : this.controllers;
  }

  public getAllControllers(): Fh0CommandController[] {
    const allControllers: Fh0CommandController[] = this.getOwnControllers();
    this.getOwnModules().forEach((m) => {
      allControllers.push(...m.getAllControllers());
    });
    return allControllers;
  }

  public getOwnChildren(): Fh0LeafNode<Config, Fh0CommandOptionalPath>[] {
    return [...this.getOwnModules(), ...this.getOwnControllers()];
  }

  protected modules?: Fh0CommandsModule<Config>[];

  public getOwnModules() {
    return this.modules === undefined ? [] : this.modules;
  }

  constructor(config?: Config) {
    super(config);
  }

  init() {
    if (this.config !== undefined) {
      this.addConfig(this.config);
    }
    this.getOwnChildren().forEach((c) => {
      c.setParentModule(this);
    });
  }

  load(program: Fh0Program): void {
    this.getAllControllers().forEach((c) => {
      c.load(program);
    });
  }

  static create<
    Config extends Fh0CommandConfig,
    T extends Fh0CommandsModule<Config>,
  >(ModuleClass: { new (config?: Config): T }, config?: Config): T {
    const self = new ModuleClass(config);
    self.init();
    return self;
  }
}
