import { Fh0CommandControllerOneHandlerNoConfigNoArguments } from '@lib/Fh0CommandControllerOneHandlerNoConfigNoArguments';

export abstract class Fh0CommandControllerOneHandlerNoConfigNoArgumentsNoOptions<
  DefaultHandlerInput = never,
> extends Fh0CommandControllerOneHandlerNoConfigNoArguments<
  Record<string, never>,
  DefaultHandlerInput
> {}
