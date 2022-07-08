import type { Fh0Program } from '@lib/Fh0Program';

export abstract class Fh0Command {
  public abstract load(program: Fh0Program): void;
}
