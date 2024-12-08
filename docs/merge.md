# TryKit: `merge`

The `merge` utility in the `trykit` package provides a streamlined way to combine objects or concatenate arrays. It automatically detects the input type (array or object) and performs the appropriate operation.

---

## Description

The `merge` function offers:

- Object merging using `Object.assign()`, with later properties overwriting earlier ones.
- Array concatenation using `.concat()`, combining multiple arrays into one.

---

## API Specification

### Function Signature

```typescript
/**
 * Merges multiple objects or concatenates multiple arrays.
 *
 * @param items - Objects or arrays to merge/concatenate.
 * @returns - A merged object or concatenated array.
 */

// Merge objects (properties are combined; overlapping keys are overwritten by later objects)
export function merge<T extends Record<string, unknown>[]>(...objects: T): Pretty<UnionToIntersection<T[number]>>;

// Concatenate arrays (all elements combined into one array)
export function merge<T>(...arrays: T[][]): T[];

// Implementation
export function merge<T>(...items: (T & {})[]): T | T[] {
  if (items.length === 0) return {} as T;

  if (Array.isArray(items[0])) {
    return ([] as T[]).concat(...(items as T[][]));
  } else {
    return Object.assign({}, ...items);
  }
}
```

---

## Usage

### Example 1: Merging Objects

```typescript
import { merge } from "trykit";

// Merge two objects
const obj1 = { a: 1, b: 2 };
const obj2 = { b: 3, c: 4 };
const result = merge(obj1, obj2);

console.log(result); // Output: { a: 1, b: 3, c: 4 }
```

---

### Example 2: Concatenating Arrays

```typescript
import { merge } from "trykit";

// Concatenate arrays
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const result = merge(arr1, arr2);

console.log(result); // Output: [1, 2, 3, 4, 5, 6]
```

---

### Example 3: Combining Multiple Inputs

#### Objects

```typescript
const obj1 = { a: 1 };
const obj2 = { b: 2 };
const obj3 = { c: 3 };
const result = merge(obj1, obj2, obj3);

console.log(result); // Output: { a: 1, b: 2, c: 3 }
```

#### Arrays

```typescript
const arr1 = [1, 2];
const arr2 = [3, 4];
const arr3 = [5, 6];
const result = merge(arr1, arr2, arr3);

console.log(result); // Output: [1, 2, 3, 4, 5, 6]
```

---

### Example 4: Edge Cases

#### Empty Input

```typescript
const result1 = merge();
console.log(result1); // Output: {}
```

#### Empty Arrays

```typescript
const result2 = merge([], []);
console.log(result2); // Output: []
```

#### Nested Objects

```typescript
const obj1 = { a: { x: 1 }, b: 2 };
const obj2 = { a: { y: 2 }, c: 3 };
const result = merge(obj1, obj2);

console.log(result); // Output: { a: { y: 2 }, b: 2, c: 3 } // Shallow merge
```

---

## Key Features

1. **Flexible Input**: Handles both objects and arrays seamlessly.
2. **Shallow Merge**: Combines object properties without deeply merging nested structures.
3. **Array Concatenation**: Efficiently concatenates multiple arrays into one.
4. **Override Priority**: For objects, later properties take precedence over earlier ones.
5. **Type Safety**: Maintains correct TypeScript typings for merged outputs.

---

## Best Practices

- Use `merge` for combining configuration objects or appending lists.
- Be mindful of shallow merging for nested objects; consider deep merge utilities if needed.
- Avoid mixing arrays and objects in a single call to `merge`, as it’s not supported and may lead to unexpected results.

---

## Installation

To install `trykit`, run:

```bash
npm install trykit
```
