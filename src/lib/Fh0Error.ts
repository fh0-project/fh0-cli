import { GError, GErrorConstructorArguments } from '@lib/GError';

const RETCODE_KEY = 'retCode';

type Fh0ErrorRetCodeArgument = number;

type Fh0ErrorConstructorFirstArgument =
  | GErrorConstructorArguments[0]
  | Fh0ErrorRetCodeArgument;

type Fh0ErrorConstructorSecondArgument =
  | GErrorConstructorArguments[1]
  | GErrorConstructorArguments[0];

type Fh0ErrorConstructorThirdArgument =
  | GErrorConstructorArguments[2]
  | GErrorConstructorArguments[1];

type Fh0ErrorConstructorNthArgument = GErrorConstructorArguments[2];

export type Fh0ErrorConstructorArguments = [
  Fh0ErrorConstructorFirstArgument,
  Fh0ErrorConstructorSecondArgument?,
  Fh0ErrorConstructorThirdArgument?,
  ...Fh0ErrorConstructorNthArgument[],
];

function parseToGErrorConstructorArguments(
  args: Fh0ErrorConstructorArguments,
): { gErrorArgs: GErrorConstructorArguments; retCode?: number } {
  const [firstArg, ...restArgs] = args;
  if (typeof firstArg === 'number') {
    return {
      gErrorArgs: restArgs as GErrorConstructorArguments,
      retCode: firstArg,
    };
  } else {
    return { gErrorArgs: args as GErrorConstructorArguments };
  }
}

export class Fh0Error extends GError {
  static RETCODE_KEY = RETCODE_KEY;

  constructor(...args: Fh0ErrorConstructorArguments) {
    const { gErrorArgs, retCode } = parseToGErrorConstructorArguments(args);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    super(...gErrorArgs);
    if (retCode !== undefined) {
      this.setRetCode(retCode);
    }
  }

  setRetCode(retCode: number): this {
    return this.setExtensionProp(Fh0Error.RETCODE_KEY, retCode);
  }

  getRetCode(): number {
    return this.getExtensionProp(Fh0Error.RETCODE_KEY) as number;
  }
}
