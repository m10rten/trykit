import { safetry, type SafeTryResult } from "./safe-try.js";

export type TryParseSchema<T> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  parse: ((input: unknown) => T) | ((input: any) => T) | ((input: unknown, ...args: unknown[]) => T);
};

export function tryparse<T>(schema: TryParseSchema<T>, input: unknown, ...args: unknown[]): SafeTryResult<T> {
  const result = safetry(() => schema.parse(input, ...args));
  return result;
}
