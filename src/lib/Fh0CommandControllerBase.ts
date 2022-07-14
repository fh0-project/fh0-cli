import type { Command } from 'commander';
import type { Fh0CommandHandlerResult } from '@lib/Fh0CommandHandlerBase';
import type { Fh0CommandHandlerBase } from '@lib/Fh0CommandHandlerBase';
import { Fh0LeafNode } from '@lib/Fh0LeafNode';
import { jsonStringifySafe } from '@lib/utils/json-stringify-safe';
import type { Fh0DefaultCommandConfig } from '@lib/types';
import { GException } from 'g-exception';

export interface Fh0CommandControllerResult {
  handlerResults: (Fh0CommandHandlerResult | void)[];
}

export type Fh0CommandControllerHandlerFactory<HandlerInput, Config> = (
  config: Config,
) => Promise<Fh0CommandHandlerBase<HandlerInput[keyof HandlerInput]>>;

export type Fh0CommandControllerHandlersConfig<
  HandlerInput extends Record<string, unknown>,
  Config = Fh0DefaultCommandConfig,
> = Record<
  keyof HandlerInput,
  Fh0CommandControllerHandlerFactory<HandlerInput, Config>
>;

export interface Fh0CommandControllerRunInput<
  Arguments extends string[] = [],
  Options extends Record<string, unknown> = never,
> {
  command: Command;
  options: Options;
  args: Arguments;
}

export abstract class Fh0CommandControllerBase<
  Config = Fh0DefaultCommandConfig,
  Arguments extends string[] = [],
  Options extends Record<string, unknown> = never,
  HandlerInput extends Record<string, unknown> = never,
> extends Fh0LeafNode<Config> {
  static readonly DEFAULT_HANDLER_NAME = `Fh0CommandController:DEFAULT_HANDLER`;

  constructor(config: Config) {
    super(config);
  }

  protected abstract handlers: Fh0CommandControllerHandlersConfig<
    HandlerInput,
    Config
  >;

  protected async getHandler(
    name: keyof HandlerInput,
  ): Promise<
    Fh0CommandHandlerBase<HandlerInput[keyof HandlerInput], unknown> | undefined
  > {
    return await this.handlers?.[name](this.config);
  }

  protected async runHandler(
    name: keyof HandlerInput,
    input: HandlerInput[keyof HandlerInput],
  ): Promise<Fh0CommandHandlerResult | void> {
    const handler = await this.getHandler(name);
    if (handler === undefined) {
      throw new GException(
        `Fh0CommandController::No handler by ${String(name)}`,
      );
    }
    return handler.run(input);
  }

  protected abstract define(program: Command): Command;

  protected abstract run(
    runInput: Fh0CommandControllerRunInput<Arguments, Options>,
  ): Promise<Fh0CommandControllerResult | void>;

  public load(program: Command): Command {
    let p: Command = program;
    this.getOwnPath().forEach((pSegment) => {
      p = p.command(pSegment);
    });
    p = this.define(p);
    p = p.action(async (...args) => {
      try {
        const cliArgs = args.length <= 2 ? [] : args.slice(0, args.length - 2);
        const optionsArg = args[args.length - 2];
        const commandArg = args[args.length - 1];
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const result = await this.run({
          command: commandArg as Command,
          options: optionsArg as Options,
          args: cliArgs as Arguments,
        });
        console.log('result', jsonStringifySafe(result));
      } catch (err) {
        console.log(err);
        // console.log(err, (err as any)?.getMessage());
      }
    });
    return p;
  }
}
