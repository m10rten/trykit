import { safetry } from "./safe-try";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ErrorConstructor = new (...args: any[]) => Error;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
class Snag<T, Args extends any[]> {
  private promise: (...args: Args) => Promise<T>;
  private handlers: Map<ErrorConstructor, (error: Error) => void> = new Map();

  constructor(promise: (...args: Args) => Promise<T>) {
    this.promise = promise;
  }

  on<E extends ErrorConstructor>(errorType: E, handler: (error: InstanceType<E>) => void): this {
    this.handlers.set(errorType, handler as (error: Error) => void);
    return this;
  }

  async execute(...args: Args): Promise<T | void> {
    const result = await safetry(this.promise(...args));
    if (result.success) return result.data;
    else {
      const error = result.error;
      if (error instanceof Error) {
        for (const [ErrorClass, handler] of this.handlers.entries()) {
          if (error instanceof ErrorClass) {
            return handler(error);
          }
        }
      }
      throw error; // Re-throw if no handler matched
    }
  }

  // Aliases for execute
  run = this.execute;
  go = this.execute;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function snag<T, Args extends any[]>(promise: (...args: Args) => Promise<T> | T): Snag<T, Args> {
  const wrappedPromise = async (...args: Args): Promise<T> => {
    const result = promise(...args);
    return result instanceof Promise ? result : Promise.resolve(result);
  };
  return new Snag(wrappedPromise);
}
