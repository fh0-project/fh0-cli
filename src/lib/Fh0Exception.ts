import { GException, GExceptionConstructorArguments } from 'g-exception';

const RETCODE_KEY = 'retCode';

type Fh0ErrorRetCodeArgument = number;

type Fh0ErrorConstructorFirstArgument =
  | GExceptionConstructorArguments[0]
  | Fh0ErrorRetCodeArgument;

type Fh0ErrorConstructorSecondArgument =
  | GExceptionConstructorArguments[1]
  | GExceptionConstructorArguments[0];

type Fh0ErrorConstructorThirdArgument =
  | GExceptionConstructorArguments[2]
  | GExceptionConstructorArguments[1];

type Fh0ErrorConstructorNthArgument = GExceptionConstructorArguments[2];

export type Fh0ErrorConstructorArguments = [
  Fh0ErrorConstructorFirstArgument,
  Fh0ErrorConstructorSecondArgument?,
  Fh0ErrorConstructorThirdArgument?,
  ...Fh0ErrorConstructorNthArgument[],
];

function parseToGErrorConstructorArguments(
  args: Fh0ErrorConstructorArguments,
): { gErrorArgs: GExceptionConstructorArguments; retCode?: number } {
  const [firstArg, ...restArgs] = args;
  if (typeof firstArg === 'number') {
    return {
      gErrorArgs: restArgs as GExceptionConstructorArguments,
      retCode: firstArg,
    };
  } else {
    return { gErrorArgs: args as GExceptionConstructorArguments };
  }
}

export class Fh0Exception extends GException {
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
    return this.setExtensionProp(Fh0Exception.RETCODE_KEY, retCode);
  }

  getRetCode(): number {
    return this.getExtensionProp(Fh0Exception.RETCODE_KEY) as number;
  }
}
