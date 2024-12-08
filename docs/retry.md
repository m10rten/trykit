# TryKit: **`retry`**

The `retry` utility in the `trykit` package provides a mechanism to retry asynchronous operations with configurable options for attempts, delay, and backoff factor. It is built on top of the `safetry` function for consistent and safe error handling.

---

## Description

The `retry` function repeatedly executes an asynchronous operation (function or Promise) until it succeeds or the maximum number of attempts is reached. Delays between retries can be customized, and a backoff factor can be applied to increase the delay after each attempt.

This utility is useful for handling transient failures in asynchronous workflows, such as network requests.

---

## API Specification

### Type Definitions

```typescript
export type RetryConfig = {
  attempts?: number; // Number of retry attempts (default: 3).
  delay?: number; // Initial delay between retries in milliseconds (default: 1000).
  factor?: number; // Backoff factor to multiply delay after each retry (default: 2).
};
```

### Function Signature

```typescript
export async function retry<T>(
  callback: Promise<T> | (() => Promise<T>),
  config?: Partial<RetryConfig>,
): Promise<SafeTryResult<T>>;
```

#### Parameters

- **`callback`**: The asynchronous operation to execute. Can be a Promise or a function returning a Promise.
- **`config`** _(optional)_: A `RetryConfig` object to customize retry behavior.
  - `attempts`: Maximum number of retry attempts. Default is `3`.
  - `delay`: Delay between retries in milliseconds. Default is `1000`.
  - `factor`: Multiplier for increasing the delay after each retry. Default is `2`.

#### Returns

- A `Promise` resolving to a `SafeTryResult`:
  - `{ success: true, data: T }` if the operation succeeds within the retry limit.
  - `{ success: false, error: Error }` if all attempts fail.

---

## Usage

### Example 1: Retrying an Async Function

```typescript
import { retry } from "trykit";

async function fetchData(): Promise<string> {
  const shouldFail = Math.random() < 0.7; // Simulate transient failure
  if (shouldFail) {
    throw new Error("Network error");
  }
  return "Fetched data successfully!";
}

(async () => {
  const result = await retry(fetchData);

  if (result.success) {
    console.log("Result:", result.data); // Example output: "Fetched data successfully!"
  } else {
    console.error("Error:", result.error.message); // Example output: "Error: Network error"
  }
})();
```

### Example 2: Custom Retry Configuration

```typescript
import { retry } from "trykit";

async function unstableOperation(): Promise<number> {
  const randomFail = Math.random() < 0.8;
  if (randomFail) {
    throw new Error("Random failure");
  }
  return 42;
}

(async () => {
  const result = await retry(unstableOperation, { attempts: 5, delay: 500, factor: 1.5 });

  if (result.success) {
    console.log("Success:", result.data); // Example output: "Success: 42"
  } else {
    console.error("Failed after retries. Error:", result.error.message);
  }
})();
```

### Example 3: Exhausting Retry Attempts

```typescript
import { retry } from "trykit";

const failingTask = async () => {
  throw new Error("This task always fails");
};

(async () => {
  const result = await retry(failingTask, { attempts: 3, delay: 100 });

  if (!result.success) {
    console.error("Error after retries:", result.error.message); // Output: "Error after retries: This task always fails"
  }
})();
```

---

## Key Features

1. **Configurable Behavior**: Customize retries with `attempts`, `delay`, and `factor`.
2. **Safe Error Handling**: Leverages `safetry` for robust error management.
3. **Backoff Strategy**: Implements exponential backoff for retry delays.
4. **Flexible Input**: Supports Promises and async functions.

---

## Best Practices

- Use `retry` for handling transient failures in tasks like API calls or file I/O.
- Fine-tune `RetryConfig` based on expected failure scenarios and system load.
- Always handle the case where retries exhaust all attempts.

---

## Installation

To install `trykit`, run:

```bash
npm install trykit
```
