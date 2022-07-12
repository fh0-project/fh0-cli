import { Fh0CommandControllerOneHandlerNoConfig } from '@lib/Fh0CommandControllerOneHandlerNoConfig';

export abstract class Fh0CommandControllerOneHandlerNoConfigNoArguments<
  Options extends Record<string, unknown> = never,
  DefaultHandlerInput = never,
> extends Fh0CommandControllerOneHandlerNoConfig<
  [],
  Options,
  DefaultHandlerInput
> {}
