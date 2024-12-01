import type { Pretty, UnionToIntersection } from "./types";

// Type for merging objects
export function merge<T extends Record<string, unknown>[]>(...objects: T): Pretty<UnionToIntersection<T[number]>>;

// Type for concatenating arrays
export function merge<T>(...arrays: T[][]): T[];

// Implementation
export function merge<T>(...items: (T & {})[]) {
  if (items.length === 0) return {} as T;

  if (Array.isArray(items[0])) {
    return ([] as T[]).concat(...(items as T[][]));
  } else {
    return Object.assign({}, ...items);
  }
}
