[![NPM Version](https://img.shields.io/npm/v/trykit?style=flat-square?labelColor=black&color=navy)](https://npmjs.com/trykit/)
[![NPM Downloads](https://img.shields.io/npm/d18m/trykit?style=flat-square?labelColor=black&color=navy)](https://npmjs.com/trykit/)
[![NPM License](https://img.shields.io/npm/l/trykit?style=flat-square?labelColor=black&color=navy)](https://npmjs.com/trykit/)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/trykit?style=flat-square&labelColor=black&color=navy)](https://npmjs.com/trykit/)
[![Type Definitions](https://img.shields.io/npm/types/trykit?style=flat-square&labelColor=black&color=navy)](https://npmjs.com/trykit/)

# trykit 🪄🪖

Simple magic-like utilities to ease your development experience.

## Installation

```bash
npm install trykit
```

---

## Functions & Classes

- **`safetry`**: Call a function without wrapping in `try-catch`. Detects and handles errors.
- **`tryparse`**: Parse data with a schema without throwing.
- **`retry`**: Retry a function up to `n` times.
- **`tryto`**: Evaluate input with fallback on error.
- **`TryWhen`**: Conditional value handling class.
- **`merge`**: Merge arrays or objects.
- **`snag`**: Chainable error-handling for promises.
- **`pipeline`**: Chain and execute multiple functions.

---

### `safetry`

**`safetry<T>(callback: Promise<T> | (() => Promise<T>) | (() => T)): SafeTryResult<T>`**

- **Parameters**:
  - `callback`: Function or promise to execute.
- **Returns**:
  - `SafeTryResult<T>` with `success` flag and result or error.

**Example**:

```ts
import { safetry } from "trykit";

const result = await safetry(fetch("/hello"));
if (!result.success) console.error(result.error.message);
console.log(result.data);
```

---

### `tryparse`

**`tryparse<T>(schema: TryParseSchema<T>, input: unknown, ...args: unknown[]): SafeTryResult<T>`**

- **Parameters**:
  - `schema`: Schema with a `parse` method.
  - `input`: Data to parse.
- **Returns**:
  - `SafeTryResult<T>` with parsed data or error.

**Example**:

```ts
import { tryparse } from "trykit";

const zodSchema = z.object({ hello: z.string() });
const zodResult = tryparse(zodSchema, { bye: "good day" });
```

---

### `retry`

**`retry<T>(callback: Promise<T> | (() => Promise<T>), config?: RetryConfig): SafeTryResult<T>`**

- **Parameters**:
  - `callback`: Function or promise to retry.
  - `config`: Retry settings (`attempts`, `delay`, `factor`).
- **Returns**:
  - `SafeTryResult<T>` with final result or error.

**Example**:

```ts
const result = await retry(fetch("/unknown"), { attempts: 5, delay: 50 });
if (!result.success) console.error(result.error.message);
console.log(result.data);
```

---

### `tryto`

**`tryto<T, D>(input: (() => T) | T, fallback: D | (() => D)): T | D`**

- **Parameters**:
  - `input`: Value or function to evaluate.
  - `fallback`: Fallback value or function.
- **Returns**:
  - `T | D` (result or fallback).

**Example**:

```ts
import { tryto } from "trykit";

const result = tryto(() => JSON.parse("invalid json"), "fallback");
console.log(result); // 'fallback'
```

---

### `TryWhen`

Static class for conditional value handling.

**Methods**:

- **`empty`**: Fallback if `input` is empty (`null`, `undefined`, or `""`).
- **`positive`**: Fallback if `input` is not a positive number.
- **`array`**: Fallback if `input` is not an array.

**Example**:

```ts
import { TryWhen } from "trykit";

const result = TryWhen.positive(-5, 10); // 10
```

---

### `merge`

Merge objects or arrays.

**Parameters**:

- `...entities`: Multiple arrays or objects to combine.

**Returns**:

- Merged object or array.

**Example**:

```ts
import { merge } from "trykit";

const object = merge({ a: 1 }, { b: 2 }); // {a: 1, b: 2};
```

---

### `pipeline`

Chain multiple synchronous or asynchronous functions.

- **Methods**:
  - `.pipe`: Add functions to the chain.
  - `.execute`: Run the chain.

**Example**:

```ts
import { pipeline } from "trykit";

const result = pipeline((n) => n + 1)
  .pipe((n) => n * 2)
  .execute(5);
console.log(result); // 12
```

---

### `snag`

Chainable error handling utility.

- **Parameters**:
  - `promise`: Operation to execute.
  - `errorType`: Specific error class to catch.
  - `handler`: Function to handle the error.

**Example**:

```ts
import { snag } from "trykit";

class DatabaseError extends Error {}
const result = await snag(fetchData)
  .on(DatabaseError, (err) => "Cached Data")
  .execute("some-id");
```
