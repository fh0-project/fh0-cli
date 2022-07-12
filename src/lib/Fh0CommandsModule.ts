import type { Fh0CommandControllerBase } from '@lib/Fh0CommandControllerBase';
import { Fh0Node } from '@lib/Fh0Node';
import type { Fh0LeafNode } from '@lib/Fh0LeafNode';
import type {
  Fh0CommandOptionalPath,
  Fh0DefaultCommandConfig,
} from '@lib/types';
import type { Command } from 'commander';

export abstract class Fh0CommandsModule<
  Config = Fh0DefaultCommandConfig,
> extends Fh0Node<Config> {
  protected controllers?:
    | Fh0CommandControllerBase<
        Partial<Config>,
        string[],
        Record<string, unknown>,
        Record<string, unknown>
      >[]
    | undefined;

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

  load(program: Command): void {
    let p: Command = program;
    this.getOwnPath().forEach((pSegment) => {
      p = p.command(pSegment);
    });
    this.getAllControllers().forEach((c) => {
      c.load(p);
    });
  }
}
