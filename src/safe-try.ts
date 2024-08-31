export type SafeTryResult<T> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      error: Error;
    };

export async function safetry<T>(callback: Promise<T> | (() => Promise<T>)): Promise<SafeTryResult<T>> {
  try {
    const data = await (callback instanceof Function ? callback() : callback);
    return {
      success: true,
      data,
    };
  } catch (error) {
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
