import type { Fh0CommandHandlerResult } from '@lib/Fh0CommandHandlerBase';
import type { Fh0CommandHandlerBase } from '@lib/Fh0CommandHandlerBase';
import type { Fh0DefaultCommandConfig } from '@lib/types';
import {
  Fh0CommandControllerBase,
  Fh0CommandControllerHandlerFactory,
  Fh0CommandControllerHandlersConfig,
  Fh0CommandControllerRunInput,
} from '@lib/Fh0CommandControllerBase';

export interface Fh0CommandControllerResult {
  handlerResults: (Fh0CommandHandlerResult | void)[];
}

export abstract class Fh0CommandControllerOneHandler<
  Config = Fh0DefaultCommandConfig,
  Arguments extends string[] = [],
  Options extends Record<string, unknown> = never,
  DefaultHandlerInput = never,
> extends Fh0CommandControllerBase<
  Config,
  Arguments,
  Options,
  {
    [Fh0CommandControllerBase.DEFAULT_HANDLER_NAME]: DefaultHandlerInput;
  }
> {
  protected abstract handler: Fh0CommandControllerHandlerFactory<
    {
      [Fh0CommandControllerBase.DEFAULT_HANDLER_NAME]: DefaultHandlerInput;
    },
    Config
  >;

  protected handlers!: Fh0CommandControllerHandlersConfig<
    {
      [Fh0CommandControllerBase.DEFAULT_HANDLER_NAME]: DefaultHandlerInput;
    },
    Config
  >;

  init() {
    this.handlers = {
      [Fh0CommandControllerBase.DEFAULT_HANDLER_NAME]: this.handler,
    };
  }

  protected async getDefaultHandler(): Promise<
    Fh0CommandHandlerBase<DefaultHandlerInput, unknown> | undefined
  > {
    return await this.getHandler(Fh0CommandControllerBase.DEFAULT_HANDLER_NAME);
  }

  protected async runDefaultHandler(
    input: DefaultHandlerInput,
  ): Promise<Fh0CommandHandlerResult | void> {
    return await this.runHandler(
      Fh0CommandControllerBase.DEFAULT_HANDLER_NAME,
      input,
    );
  }

  protected abstract makeHandlerInput(
    runInput: Fh0CommandControllerRunInput<Arguments, Options>,
  ): DefaultHandlerInput;

  protected async run(
    runInput: Fh0CommandControllerRunInput<Arguments, Options>,
  ): Promise<Fh0CommandControllerResult | void> {
    return {
      handlerResults: [
        await this.runDefaultHandler(this.makeHandlerInput(runInput)),
      ],
    };
  }
}
