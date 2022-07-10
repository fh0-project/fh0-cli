import type { Fh0CommandConfig } from '@lib/Fh0CommandConfig';
import { Fh0Configurable } from '@lib/Fh0Configurable';

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

export type Fh0CommandHandlerInput = Record<string, unknown>;

export abstract class Fh0CommandHandler<
  Input extends Fh0CommandHandlerInput,
  Config extends Fh0CommandConfig = Fh0CommandConfig,
> extends Fh0Configurable<Config> {
  constructor(config?: Config) {
    super(config);
  }

  public abstract run(input: Input): Promise<Fh0CommandHandlerResult | void>;
}
