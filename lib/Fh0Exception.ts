import * as hbs from 'handlebars';
import { toArray } from '@lib/utils/toArray';

const FH0_EXCEPTION_SYM = Symbol('FH0_EXCEPTION_SYM');

type Fh0ExceptionDisplayMessageInput = string | boolean;

type Fh0ExceptionDisplayMessageValue = string | undefined;

type Fh0ExceptionInfoInput = Record<string, string>;

type Fh0ExceptionInfoValue = Fh0ExceptionInfoInput | undefined;

type Fh0ExceptionCodeInput = string;

type Fh0ExceptionCodeValue = Fh0ExceptionCodeInput | undefined;

type Fh0ExceptionIdInput = string;

type Fh0ExceptionIdValue = Fh0ExceptionIdInput | undefined;

type Fh0ExceptionCausesInput = unknown[];

type Fh0ExceptionCausesValue = Fh0ExceptionCausesInput | undefined;

interface Fh0ExceptionProperties extends Record<string, unknown> {
  message: string;
  displayMessage?: Fh0ExceptionDisplayMessageInput;
  info?: Fh0ExceptionInfoInput;
  code?: Fh0ExceptionCodeInput;
  id?: Fh0ExceptionIdInput;
  causes?: Fh0ExceptionCausesInput;
}

type Fh0ExceptionConstructorArgument = Partial<Fh0ExceptionProperties>;

export class Fh0Exception extends Error {
  [FH0_EXCEPTION_SYM] = true;
  private readonly exceptionProperties: Fh0ExceptionProperties;
  private compiledMessage: string | undefined;
  private compiledDisplayMessage: string | undefined;

  constructor(
    messageOrCauseOrCauses: unknown[] | unknown | string,
    messageOrArg?: string | Fh0ExceptionConstructorArgument,
    ...args: Fh0ExceptionConstructorArgument[]
  ) {
    const isMessageFirst =
      typeof messageOrCauseOrCauses === 'string' &&
      (messageOrArg === undefined || typeof messageOrArg === 'object');
    const message: string = isMessageFirst
      ? (messageOrCauseOrCauses as string)
      : (messageOrArg as string);
    const causes = isMessageFirst ? undefined : toArray(messageOrCauseOrCauses);
    super(message);
    this.exceptionProperties = { message };
    if (causes !== undefined) {
      this.setCauses(causes);
    }
    args.forEach((arg) => {
      for (const k in arg) {
        const v = arg[k];
        this.setExceptionProperty(k, v);
      }
    });
  }

  static from(exceptionProperties: Fh0ExceptionProperties): Fh0Exception {
    return new Fh0Exception(exceptionProperties.message, exceptionProperties);
  }

  static new(message: string): Fh0Exception {
    return new Fh0Exception(message);
  }

  static is(obj: unknown): obj is Fh0Exception {
    return (
      typeof obj === 'object' &&
      obj != null &&
      (obj as any)?.[FH0_EXCEPTION_SYM]
    );
  }

  setExceptionProperty<K extends keyof Fh0ExceptionProperties>(
    propName: K,
    propValue: Fh0ExceptionProperties[K],
  ): this {
    this.exceptionProperties[propName] = propValue;
    return this;
  }

  setMessage(message: string): this {
    return this.setExceptionProperty('message', message);
  }

  getMessage(): string {
    if (this.compiledMessage === undefined) {
      this.compiledMessage = hbs.compile(this.exceptionProperties.message)(
        this.exceptionProperties,
      );
    }
    return this.compiledMessage;
  }

  setDisplayMessage(
    displayMessage: Fh0ExceptionDisplayMessageInput = true,
  ): this {
    return this.setExceptionProperty('displayMessage', displayMessage);
  }

  getDisplayMessage(): Fh0ExceptionDisplayMessageValue {
    if (
      typeof this.exceptionProperties.displayMessage !== 'string' &&
      [undefined, false].includes(this.exceptionProperties.displayMessage)
    ) {
      return undefined;
    } else if (this.exceptionProperties.displayMessage === true) {
      return this.getMessage();
    }
    if (this.compiledDisplayMessage === undefined) {
      this.compiledDisplayMessage = hbs.compile(
        this.exceptionProperties.displayMessage,
      )(this.exceptionProperties);
    }
    return this.compiledMessage;
  }

  setInfo(info: Fh0ExceptionInfoInput): this {
    return this.setExceptionProperty('info', info);
  }

  getInfo(): Fh0ExceptionInfoValue {
    return this.exceptionProperties.info;
  }

  setCode(code: Fh0ExceptionCodeInput): this {
    return this.setExceptionProperty('code', code);
  }

  getCode(): Fh0ExceptionCodeValue {
    return this.exceptionProperties.code;
  }

  setId(id: Fh0ExceptionIdInput) {
    return this.setExceptionProperty('id', id);
  }

  getId(): Fh0ExceptionIdValue {
    return this.exceptionProperties.id;
  }

  setCauses(causes: Fh0ExceptionCausesInput) {
    return this.setExceptionProperty('causes', causes);
  }

  getCauses(): Fh0ExceptionCausesValue {
    return this.exceptionProperties.causes;
  }
}
