import type { Fh0Program } from '@lib/Fh0Program';
import type { Command } from 'commander';
import type {
  Fh0CommandHandlerInput,
  Fh0CommandHandlerResult,
} from '@lib/Fh0CommandHandler';
import type { Fh0CommandConfig } from '@lib/Fh0CommandConfig';
import type { Fh0CommandHandler } from '@lib/Fh0CommandHandler';
import { Fh0LeafNode } from '@lib/Fh0LeafNode';
import { jsonStringifySafe } from '@lib/utils/json-stringify-safe';
import { Fh0Exception } from '@lib/Fh0Exception';

export interface Fh0CommandControllerResult {
  handlerResults: (Fh0CommandHandlerResult | void)[];
}

type Fh0CommandControllerHandlersConfig<
  HandlerName extends string,
  HandlerInput extends Record<HandlerName, Fh0CommandHandlerInput>,
  Config extends Fh0CommandConfig = Fh0CommandConfig,
> = Record<
  HandlerName,
  (config?: Config) => Promise<Fh0CommandHandler<HandlerInput[HandlerName]>>
>;

export abstract class Fh0CommandController<
  Config extends Fh0CommandConfig = Fh0CommandConfig,
  Options extends Record<string, unknown> = Record<string, unknown>,
  Arguments extends string[] = string[],
  HandlerName extends string = never,
  HandlerInput extends Record<HandlerName, Fh0CommandHandlerInput> = never,
> extends Fh0LeafNode<Config> {
  constructor(config?: Config) {
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
