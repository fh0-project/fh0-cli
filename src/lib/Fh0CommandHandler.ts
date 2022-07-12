import { Fh0Configurable } from '@lib/Fh0Configurable';
import type { Fh0DefaultCommandConfig } from '@lib/types';

export enum Fh0CommandHandlerResultOutputFormat {
  LINES = 'LINES',
}

export interface Fh0CommandHandlerResultOutput {
  format: Fh0CommandHandlerResultOutputFormat;
  data: Fh0CommandHandlerResultOutputData[Fh0CommandHandlerResultOutputFormat];
}

export interface Fh0CommandHandlerResultOutputData {
  [Fh0CommandHandlerResultOutputFormat.LINES]: string[];
}

export interface Fh0CommandHandlerResult {
  retCode?: number;
  output?: Fh0CommandHandlerResultOutput;
}

export abstract class Fh0CommandHandler<
  Input = never,
  Config = Fh0DefaultCommandConfig,
> extends Fh0Configurable<Config> {
  constructor(config: Config) {
    super(config);
  }

  public abstract run(input: Input): Promise<Fh0CommandHandlerResult | void>;
}
