# TryKit: **`pipe`**

The `pipe` utility in the `trykit` package provides a versatile pipeline mechanism for chaining functions. It allows users to compose synchronous and asynchronous operations in a declarative, functional style.

---

## Description

The `Pipeline` class and its `AsyncPipeline` variant facilitate sequential execution of operations. You can chain multiple functions using `.pipe()` and then execute the pipeline with `.execute()`.

The pipeline determines whether to execute synchronously or asynchronously based on the nature of the chained functions, seamlessly transitioning between sync and async processing.

---

## API Specification

### Type Definitions

```typescript
// BasePipeline: Core functionality for both sync and async pipelines
abstract class BasePipeline<Args extends any[], Return, Func extends ExpectFuncion<Args, Return>> {
  protected _actions: ExpectFuncion<any[], any>[];

  constructor(initialAction: Func);
  pipe<TArgs extends [ReturnTypeOf<Func>], TReturn, TFunc extends ExpectFuncion<TArgs, TReturn>>(
    nextAction: TFunc,
  ): IsPromise<TFunc> extends true ? AsyncPipeline<TArgs, TReturn, TFunc> : this;
  protected executeInternal(args: Args[], index: number): any;
}

// AsyncPipeline: Extends BasePipeline to handle async operations
class AsyncPipeline<Args extends any[], Return, Func extends ExpectFuncion<Args, Return>> extends BasePipeline<
  Args,
  Return,
  Func
> {
  async execute(...args: Args): Promise<ReturnTypeOf<Func>>;
}

// Pipeline: Extends BasePipeline to handle sync operations
class Pipeline<Args extends any[], Return, Func extends ExpectFuncion<Args, Return>> extends BasePipeline<
  Args,
  Return,
  Func
> {
  execute(...args: Args): ReturnTypeOf<Func>;
}

// Helper function to create a pipeline
export function pipeline<F extends ExpectFuncion<any[], any>>(originalAction: F): Pipeline<any[], any, F>;
```

#### Methods

- **`pipe(nextAction)`**: Adds a function to the pipeline. Returns either a `Pipeline` or `AsyncPipeline` instance, depending on whether the function is synchronous or asynchronous.
- **`execute(...args)`**: Executes the pipeline with the provided arguments.

---

## Usage

### Example 1: Basic Synchronous Pipeline

```typescript
import { pipeline } from "trykit";

const add1 = (n: number) => n + 1;
const multiply2 = (n: number) => n * 2;
const toString = (n: number) => n.toString();

const p = pipeline(add1).pipe(multiply2).pipe(toString);

const result = p.execute(5);
console.log(result); // Output: "12"
```

---

### Example 2: Asynchronous Pipeline

```typescript
import { pipeline } from "trykit";

const add1 = (n: number) => n + 1;
const asyncDouble = async (n: number) => n * 2;
const toString = (n: number) => n.toString();

const p = pipeline(add1).pipe(asyncDouble).pipe(toString);

(async () => {
  const result = await p.execute(5);
  console.log(result); // Output: "12"
})();
```

---

### Example 3: Mixed Sync and Async Functions

```typescript
import { pipeline } from "trykit";

const add1 = (n: number) => n + 1;
const asyncDouble = async (n: number) => n * 2;
const subtract3 = (n: number) => n - 3;

const p = pipeline(add1).pipe(asyncDouble).pipe(subtract3).pipe(asyncDouble);

(async () => {
  const result = await p.execute(5);
  console.log(result); // Output: 18
})();
```

---

### Example 4: Using Multiple Arguments

```typescript
import { pipeline } from "trykit";

const sum = (a: number, b: number) => a + b;
const multiply2 = (n: number) => n * 2;

const p = pipeline(sum).pipe(multiply2);

const result = p.execute(3, 4);
console.log(result); // Output: 14
```

---

### Example 5: Handling Errors in Async Functions

```typescript
import { pipeline } from "trykit";

const asyncError = async () => {
  throw new Error("Async error");
};

const p = pipeline(asyncError);

(async () => {
  try {
    await p.execute();
  } catch (err) {
    console.error("Caught Error:", err.message); // Output: "Caught Error: Async error"
  }
})();
```

---

## Key Features

1. **Flexible Composition**: Chain multiple functions with `.pipe()`.
2. **Automatic Async Detection**: Seamlessly switch between `Pipeline` and `AsyncPipeline`.
3. **Mixed Sync & Async Support**: Combine synchronous and asynchronous operations in a single pipeline.
4. **Declarative Execution**: Simplifies complex workflows with a step-by-step approach.
5. **Multi-Argument Support**: Supports functions with multiple arguments.

---

## Best Practices

- Use pipelines for building modular and reusable workflows.
- Avoid deeply nested promises by chaining asynchronous operations with `pipe()`.
- Catch and handle errors from `execute()` in asynchronous pipelines to ensure robust error management.

---

## Installation

To install `trykit`, run:

```bash
npm install trykit
```
