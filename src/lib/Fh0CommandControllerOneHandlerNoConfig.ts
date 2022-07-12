import type { Fh0DefaultCommandConfig } from '@lib/types';
import { Fh0CommandControllerOneHandler } from '@lib/Fh0CommandControllerOneHandler';

export abstract class Fh0CommandControllerOneHandlerNoConfig<
  Arguments extends string[] = [],
  Options extends Record<string, unknown> = never,
  DefaultHandlerInput = never,
> extends Fh0CommandControllerOneHandler<
  Fh0DefaultCommandConfig,
  Arguments,
  Options,
  DefaultHandlerInput
> {}
