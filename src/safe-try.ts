export type SafeTryResult<T> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      error: Error;
    };

const awaiter = async <T>(callback: Promise<T> | (() => Promise<T>)): Promise<SafeTryResult<T>> => {
  try {
    return {
      success: true,
      data: await (callback instanceof Function ? callback() : callback),
    };
  } catch (e: unknown) {
    return { success: false, error: e instanceof Error ? e : new TypeError("Invalid error was thrown") };
  }
};

export function safetry<T>(callback: Promise<T> | (() => Promise<T>)): Promise<SafeTryResult<T>>;
// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export function safetry<T>(callback: (() => T) | Function): SafeTryResult<T>;
export function safetry<T>(
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  callback: Promise<T> | (() => Promise<T>) | (() => T) | Function,
): Promise<SafeTryResult<T>> | SafeTryResult<T> {
  try {
    const result = typeof callback === "function" || callback instanceof Function ? callback() : callback;
    if (result instanceof Promise) {
      return awaiter(result);
    }
    return {
      data: result,
      success: true,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        success: false,
        error,
      };
    }
    return {
      error: new TypeError("error was not instanceof Error"),
      success: false,
    };
  }
}
