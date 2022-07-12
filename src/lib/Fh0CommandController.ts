import type { Fh0Program } from '@lib/Fh0Program';
import type { Command } from 'commander';
import type { Fh0CommandHandlerResult } from '@lib/Fh0CommandHandler';
import type { Fh0CommandHandler } from '@lib/Fh0CommandHandler';
import { Fh0LeafNode } from '@lib/Fh0LeafNode';
import { jsonStringifySafe } from '@lib/utils/json-stringify-safe';
import { Fh0Exception } from '@lib/Fh0Exception';
import type { Fh0DefaultCommandConfig } from '@lib/types';

export interface Fh0CommandControllerResult {
  handlerResults: (Fh0CommandHandlerResult | void)[];
}

type Fh0CommandControllerHandlersConfig<
  HandlerName extends string,
  HandlerInput extends Record<HandlerName, unknown>,
  Config = Fh0DefaultCommandConfig,
> = Record<
  HandlerName,
  (config: Config) => Promise<Fh0CommandHandler<HandlerInput[HandlerName]>>
>;

export abstract class Fh0CommandController<
  Config = Fh0DefaultCommandConfig,
  Arguments extends string[] = [],
  OptionName extends string = never,
  Options extends Record<OptionName, unknown> = never,
  HandlerName extends string = never,
  HandlerInput extends Record<HandlerName, unknown> = never,
> extends Fh0LeafNode<Config> {
  static readonly DEFAULT_HANDLER_NAME = `Fh0CommandController:DEFAULT_HANDLER`;

  constructor(config: Config) {
    super(config);
  }

  protected handlers?: Fh0CommandControllerHandlersConfig<
    HandlerName,
    HandlerInput,
    Config
  >;

  protected async getHandler(
    name: HandlerName,
  ): Promise<Fh0CommandHandler<HandlerInput[HandlerName]> | undefined> {
    return await this.handlers?.[name](this.config);
  }

  protected async runHandler(
    name: HandlerName,
    input: HandlerInput[HandlerName],
  ): Promise<Fh0CommandHandlerResult | void> {
    const handler = await this.getHandler(name);
    if (handler === undefined) {
      throw new Fh0Exception(`Fh0CommandController::No handler by ${name}`);
    }
    return handler.run(input);
  }

  protected abstract define(program: Command): Command;

  protected abstract run(
    command: Command,
    options: Options,
    ...args: Arguments
  ): Promise<Fh0CommandControllerResult | void>;

  public load(program: Fh0Program): Command {
    let p: Command = program;
    this.getFullPath().forEach((pSegment) => {
      p = p.command(pSegment);
    });
    p = this.define(p);
    p = p.action(async (...args) => {
      try {
        const cliArgs = args.length <= 2 ? [] : args.slice(0, args.length - 2);
        const optionsArg = args[args.length - 2];
        const commandArg = args[args.length - 1];
        const reorderedArgs = [commandArg, optionsArg, ...cliArgs];
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const result = await this.run(...reorderedArgs);
        console.log('result', jsonStringifySafe(result));
      } catch (err) {
        console.log(err);
        // console.log(err, (err as any)?.getMessage());
      }
    });
    return p;
  }
}
