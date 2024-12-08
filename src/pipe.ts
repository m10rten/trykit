/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ExpectFuncion, IsPromise, ReturnTypeOf } from "./types";

abstract class BasePipeline<Args extends any[], Return, Func extends ExpectFuncion<Args, Return>> {
  protected _actions: ExpectFuncion<any[], any>[];

  constructor(protected readonly initialAction: Func) {
    this._actions = [initialAction];
  }

  set actions(_a: typeof this._actions) {
    this._actions = _a;
  }

  protected abstract createNewPipeline(): this;

  pipe<TArgs extends [ReturnTypeOf<Func>], TReturn, TFunc extends ExpectFuncion<TArgs, TReturn>>(
    nextAction: TFunc,
  ): IsPromise<TFunc> extends true ? AsyncPipeline<TArgs, TReturn, TFunc> : this {
    const isAsync = nextAction.constructor.name === "AsyncFunction";
    const newPipeline = isAsync ? new AsyncPipeline(this.initialAction) : this.createNewPipeline();
    newPipeline.actions = [...this._actions, nextAction];
    return newPipeline as any;
  }

  protected executeInternal(args: Args[], index: number): any {
    if (index >= this._actions.length) {
      return args[0];
    }

    const result = this._actions[index]!(...args);

    if (result instanceof Promise) {
      return result.then((value) => this.executeInternal([value], index + 1));
    }

    return this.executeInternal([result], index + 1);
  }
}

class AsyncPipeline<Args extends any[], Return, Func extends ExpectFuncion<Args, Return>> extends BasePipeline<
  Args,
  Return,
  Func
> {
  protected createNewPipeline(): this {
    return new AsyncPipeline(this.initialAction) as this;
  }

  async execute(...args: Args): Promise<ReturnTypeOf<Func>> {
    return this.executeInternal(args, 0);
  }
}

export class Pipeline<Args extends any[], Return, Func extends ExpectFuncion<Args, Return>> extends BasePipeline<
  Args,
  Return,
  Func
> {
  protected createNewPipeline(): this {
    return new Pipeline(this.initialAction) as this;
  }

  execute(...args: Args): ReturnTypeOf<Func> {
    return this.executeInternal(args, 0);
  }
}

// Helper function to create a pipeline
export function pipeline<F extends ExpectFuncion<any[], any>>(originalAction: F) {
  return new Pipeline(originalAction);
}
