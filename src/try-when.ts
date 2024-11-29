export type Condition<T, C, D> = T extends C ? D : T;

type Empty<T> = T extends null | undefined | "" ? T : never;
type Falsy<T> = T extends false | 0 | "" | null | undefined ? T : never;
type Truthy<T> = T extends Falsy<T> ? never : T;
type Nullish<T> = T extends null | undefined ? T : never;
type Negative<T> = T extends number ? (T extends `-${number}` ? T : never) : never;
type Positive<T> = T extends number ? (T extends `-${number}` | 0 ? never : T) : never;
type Zero<T> = T extends 0 ? T : never;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type Array<T> = T extends (infer _)[] ? T : never;
type Object<T> = T extends object ? (T extends null ? never : T) : never;
type Function = (...args: unknown[]) => unknown;

export class TryWhen {
  static empty<T, D>(input: T, fallback: D): Condition<T, Empty<T>, D> {
    return (input === null || input === undefined || input === "" ? fallback : input) as Condition<T, Empty<T>, D>;
  }
  static falsy<T, D>(input: T, fallback: D): Condition<T, Falsy<T>, D> {
    return (!input ? fallback : input) as Condition<T, Falsy<T>, D>;
  }
  static truthy<T, D>(input: T, fallback: D): Condition<T, Truthy<T>, D> {
    return (input ? input : fallback) as Condition<T, Truthy<T>, D>;
  }
  static nullish<T, D>(input: T, fallback: D): Condition<T, Nullish<T>, D> {
    return (input ?? fallback) as Condition<T, Nullish<T>, D>;
  }
  static negative<T, D>(input: T, fallback: D): Condition<T, Negative<T>, D> {
    return (typeof input === "number" && input < 0 ? fallback : input) as Condition<T, Negative<T>, D>;
  }
  static zero<T, D>(input: T, fallback: D): Condition<T, Zero<T>, D> {
    return (input === 0 ? fallback : input) as Condition<T, Zero<T>, D>;
  }
  static array<T, D>(input: T, fallback: D): Condition<T, Array<T>, D> {
    return (Array.isArray(input) ? input : fallback) as Condition<T, Array<T>, D>;
  }
  static positive<T, D>(input: T, fallback: D): Condition<T, Positive<T>, D> {
    return (typeof input === "number" && input > 0 ? input : fallback) as Condition<T, Positive<T>, D>;
  }
  static function<T, D>(input: T, fallback: D): Condition<T, Function, D> {
    return (typeof input === "function" ? input : fallback) as Condition<T, Function, D>;
  }
  static object<T, D>(input: T, fallback: D): Condition<T, Object<T>, D> {
    return (typeof input === "object" && input !== null ? input : fallback) as Condition<T, Object<T>, D>;
  }
}
export default TryWhen;
