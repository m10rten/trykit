# TryKit: **`snag`**

The `snag` utility in the `trykit` package provides a way to handle errors in asynchronous operations with custom handlers for specific error types. It enables centralized error handling and graceful fallback logic for complex workflows.

---

## Description

The `snag` function wraps a Promise or asynchronous function into a `Snag` instance, allowing you to define handlers for specific error types. When the operation is executed, any error thrown can be caught and processed by the registered handlers, or it will be re-thrown if no handlers match.

This is particularly useful for scenarios where different error types require distinct responses.

---

## API Specification

### Type Definitions

```typescript
// Type of errors the snag can handle
type ErrorConstructor = new (...args: any[]) => Error;

// Class-based handler for promises with error handling
class Snag<T, Args extends any[]> {
  constructor(promise: (...args: Args) => Promise<T>);
  on<E extends ErrorConstructor>(errorType: E, handler: (error: InstanceType<E>) => void): this;
  execute(...args: Args): Promise<T | void>;
  run(...args: Args): Promise<T | void>; // Alias for execute
  go(...args: Args): Promise<T | void>; // Alias for execute
}

// Factory function for creating a snag instance
export function snag<T, Args extends any[]>(promise: (...args: Args) => Promise<T> | T): Snag<T, Args>;
```

#### Methods

- **`on<E>`**: Registers a handler for a specific error type.
  - **`errorType`**: The error class to match (e.g., `Error`, `TypeError`).
  - **`handler`**: A function that processes the error.
- **`execute`**: Executes the wrapped operation and invokes appropriate error handlers.
- **`run`**/**`go`**: Aliases for `execute`.

---

## Usage

### Example 1: Basic Usage

```typescript
import { snag } from "trykit";

const fetchData = async (id: number): Promise<string> => {
  if (id < 0) throw new Error("Invalid ID");
  return `Data for ID: ${id}`;
};

(async () => {
  const query = snag(fetchData).on(Error, (err) => console.error("Error:", err.message));

  const result = await query.execute(1); // Fetch valid data
  console.log("Result:", result); // Output: "Data for ID: 1"

  await query.execute(-1); // Handle invalid ID error
})();
```

---

### Example 2: Handling Custom Error Types

```typescript
import { snag } from "trykit";

class NetworkError extends Error {}
class DatabaseError extends Error {}

const unreliableTask = async (): Promise<void> => {
  throw new NetworkError("Network is down");
};

(async () => {
  const query = snag(unreliableTask)
    .on(NetworkError, (err) => console.error("Handled NetworkError:", err.message))
    .on(DatabaseError, (err) => console.error("Handled DatabaseError:", err.message));

  await query.execute(); // Output: "Handled NetworkError: Network is down"
})();
```

---

### Example 3: Using Aliases (`run` and `go`)

```typescript
import { snag } from "trykit";

const simpleTask = async (): Promise<number> => 42;

(async () => {
  const query = snag(simpleTask);

  console.log(await query.run()); // Output: 42
  console.log(await query.go()); // Output: 42
})();
```

---

### Example 4: Re-throwing Unhandled Errors

```typescript
import { snag } from "trykit";

(async () => {
  const query = snag(async () => {
    throw new Error("Unhandled exception");
  });

  try {
    await query.execute();
  } catch (err) {
    console.error("Re-thrown Error:", err.message); // Output: "Re-thrown Error: Unhandled exception"
  }
})();
```

---

## Key Features

1. **Error-specific Handlers**: Customize responses for different error types.
2. **Graceful Fallback**: Simplify fallback logic with centralized handlers.
3. **Flexible Input**: Accepts synchronous or asynchronous functions and Promises.
4. **Chaining Support**: Allows chaining multiple handlers for different error scenarios.
5. **Aliases**: Execute wrapped operations using `execute`, `run`, or `go`.

---

## Best Practices

- Use `snag` to manage errors in scenarios involving diverse failure modes (e.g., network vs. database errors).
- Always define fallback handlers for common error types to ensure predictable behavior.
- Re-throw unhandled errors for proper error propagation where necessary.

---

## Installation

To install `trykit`, run:

```bash
npm install trykit
```
