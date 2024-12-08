# TryKit: **`safetry`**

The `safetry` utility in the `trykit` package provides a safe wrapper around synchronous and asynchronous operations. It captures exceptions and ensures a consistent structure for handling success and failure cases.

## Description

`safetry` allows you to safely execute synchronous functions, asynchronous functions, or Promises. It returns a result object that includes a `success` flag and either the result data (`data`) or an error object (`error`).

This eliminates the need for `try-catch` blocks and simplifies error handling in both synchronous and asynchronous code.

---

## API Specification

### Type Definitions

```typescript
export type SafeTryResult<T> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      error: Error;
    };
```

### Function Signature

```typescript
export function safetry<T>(
  callback: Promise<T> | (() => Promise<T>) | (() => T) | Function,
): Promise<SafeTryResult<T>> | SafeTryResult<T>;
```

#### Parameters

- **`callback`**: The function or promise to execute safely.
  - If it's a synchronous function, `safetry` returns a `SafeTryResult` synchronously.
  - If it's an asynchronous function or promise, `safetry` returns a `Promise` resolving to `SafeTryResult`.

#### Returns

- A `SafeTryResult` object:
  - `{ success: true, data: T }` if the operation succeeds.
  - `{ success: false, error: Error }` if the operation throws an error or rejects.

---

## Usage

### Example 1: Handling a Synchronous Function

```typescript
import { safetry } from "trykit";

function divide(a: number, b: number): number {
  if (b === 0) {
    throw new Error("Division by zero");
  }
  return a / b;
}

// Safe execution
const result = safetry(() => divide(10, 2));

if (result.success) {
  console.log("Result:", result.data); // Output: Result: 5
} else {
  console.error("Error:", result.error.message);
}
```

### Example 2: Handling an Asynchronous Function

```typescript
import { safetry } from "trykit";

async function fetchData(): Promise<string> {
  // Simulating an API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Data fetched successfully!");
    }, 1000);
  });
}

// Safe execution
(async () => {
  const result = await safetry(fetchData);

  if (result.success) {
    console.log("Result:", result.data); // Output: Result: Data fetched successfully!
  } else {
    console.error("Error:", result.error.message);
  }
})();
```

### Example 3: Handling Errors in Promises

```typescript
import { safetry } from "trykit";

const failingPromise = new Promise<number>((_, reject) => reject(new Error("Promise failed")));

(async () => {
  const result = await safetry(failingPromise);

  if (result.success) {
    console.log("Result:", result.data);
  } else {
    console.error("Error:", result.error.message); // Output: Error: Promise failed
  }
})();
```

### Example 4: Handling Invalid Error Types

```typescript
import { safetry } from "trykit";

function throwNonError() {
  throw "This is not an Error instance";
}

const result = safetry(throwNonError);

if (!result.success) {
  console.error(result.error instanceof TypeError); // Output: true
  console.error(result.error.message); // Output: error was not instanceof Error
}
```

---

## Key Features

1. **Universal Handling**: Supports synchronous functions, asynchronous functions, and Promises.
2. **Error Normalization**: Converts non-Error exceptions into `TypeError` for consistent handling.
3. **Type-Safe API**: Leverages TypeScript for strongly typed results.
4. **No Dependencies**: Lightweight and focused.

---

## Best Practices

- Use `safetry` to centralize error handling in reusable utility functions.
- Always check the `success` property before accessing `data` or `error`.
- Combine with modern async patterns for clean and readable code.

---

## Installation

To install `trykit`, run:

```bash
npm install trykit
```
