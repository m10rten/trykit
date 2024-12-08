/* eslint-disable @typescript-eslint/no-explicit-any */
export type Maybe<T> = Null<T> | Undefined<T>;
export type Empty<T> = Maybe<T> | "";
export type Undefined<T> = T | undefined;
export type Null<T> = T | null;
export type Number<T> = T | number;
export type Falsy<T> = false | 0 | "" | Maybe<T>;
export type Unknown<T> = T | unknown;

// Utility type for merging object types
export type UnionToIntersection<U> = (U extends unknown ? (k: U) => void : never) extends (k: infer I) => void
  ? I
  : never;
export type Pretty<T> = {
  [K in keyof T]: T[K];
} & {};

export type IsPromise<T> = T extends ((...args: any[]) => Promise<any>) | Promise<any> ? true : false;
export type ReturnTypeOf<T> = T extends Promise<infer p> | ((...args: any[]) => Promise<infer p>)
  ? p
  : T extends (...args: any[]) => infer f
  ? f
  : T;

export type ExpectFuncion<Args extends any[], Output> = (...args: Args) => Output | Promise<Output>;
