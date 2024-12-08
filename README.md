[![NPM Version](https://img.shields.io/npm/v/trykit?style=flat-square?labelColor=black&color=navy)](https://npmjs.com/trykit/)
[![NPM Downloads](https://img.shields.io/npm/d18m/trykit?style=flat-square?labelColor=black&color=navy)](https://npmjs.com/trykit/)
[![NPM License](https://img.shields.io/npm/l/trykit?style=flat-square?labelColor=black&color=navy)](https://npmjs.com/trykit/)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/trykit?style=flat-square?labelColor=black&color=navy)](https://npmjs.com/trykit/)
[![NPM Type Definitions](https://img.shields.io/npm/types/trykit?style=flat-square?labelColor=black&color=navy)](https://npmjs.com/trykit/)

# trykit

🪄🪖 Magic-like utilities to simplify development.

## Installation

```bash
npm install trykit
```

---

## Documentation

For more in depth documentation about the features, check out [the full docs](https://github.com/m10rten/trykit/tree/main/docs).

---

## Features

### Functions and Classes

- **`safetry`**: Executes a function safely, avoiding try-catch blocks.
- **`tryparse`**: Parses data against a schema, returning errors safely.
- **`retry`**: Retries a function multiple times with optional delay.
- **`tryto`**: Evaluates an input with fallback for errors.
- **`TryWhen`**: Static methods for conditional value handling.
- **`merge`**: Combines objects or arrays.
- **`snag`**: Chainable error handling for Promises.
- **`pipeline`**: Chain and execute multiple functions.

---

## API Specifications and Examples

### `safetry`

Safely execute a function or Promise.

**Usage**:

```ts
import { safetry } from "trykit";

const result = await safetry(fetch("/hello"));
if (!result.success) console.error(result.error.message);
console.log(result.data);
```

---

### `tryparse`

Parses input data against a schema safely.

**Usage**:

```ts
import { tryparse } from "trykit";

const schema = z.object({ name: z.string() });
const result = tryparse(schema, { name: "John" });
```

---

### `retry`

Retries a function multiple times with configurable delay.

**Usage**:

```ts
import { retry } from "trykit";

const result = await retry(fetch("/data"), { attempts: 3, delay: 100 });
if (!result.success) console.error(result.error.message);
console.log(result.data);
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

### `tryto`

Attempts execution and provides fallback on error.

**Usage**:

```ts
import { tryto } from "trykit";

const result = tryto(() => JSON.parse('{"valid": "json"}'), "fallback");
console.log(result);
```

---

### `TryWhen`

Static methods for conditional handling.

**Usage**:

```ts
import { TryWhen } from "trykit";

const result = TryWhen.empty("", "fallback"); // 'fallback'
```

---

### `merge`

Combines objects or arrays.

**Usage**:

```ts
import { merge } from "trykit";

const combined = merge({ a: 1 }, { b: 2 }); // { a: 1, b: 2 }
```

---

### `snag`

Chainable error handling for Promises.

**Usage**:

```ts
import { snag } from "trykit";

const result = await snag(fetchData)
  .on(NetworkError, () => "Using cached data")
  .execute();
```
