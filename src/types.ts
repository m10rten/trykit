export type Maybe<T> = Null<T> | Undefined<T>;
export type Empty<T> = Maybe<T> | "";
export type Undefined<T> = T | undefined;
export type Null<T> = T | null;
export type Number<T> = T | number;
export type Falsy<T> = false | 0 | "" | Maybe<T>;
export type Unknown<T> = T | unknown;

// Utility type for merging object types
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
export type Pretty<T> = {
  [K in keyof T]: T[K];
} & {};
