[![NPM Version](https://img.shields.io/npm/v/trykit?style=flat-square?labelColor=black&color=navy)](https://npmjs.com/trykit/)
[![NPM Downloads](https://img.shields.io/npm/d18m/trykit?style=flat-square?labelColor=black&color=navy)](https://npmjs.com/trykit/)
[![NPM License](https://img.shields.io/npm/l/trykit?style=flat-square?labelColor=black&color=navy)](https://npmjs.com/trykit/)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/trykit?style=flat-square?labelColor=black&color=navy)](https://npmjs.com/trykit/)
[![NPM Type Definitions](https://img.shields.io/npm/types/trykit?style=flat-square?labelColor=black&color=navy)](https://npmjs.com/trykit/)

# trykit

🪄🪖 Simple magic-like utilities to ease your development experience.

# installation

```bash
npm install trykit
```

# functions

- `safetry` - call your function without wrapping it in a try-catch block, and check if it throws;
- `tryparse` - parse data in a schema, without it erroring.
- `retry` - retry a function n-times;

## `safetry`

**`safetry<T>(callback: Promise<T> | (() => Promise<T>) | (() => T)): Promise<SafeTryResult<T>> | SafeTryResult<T>`**

### parameters

- `callback: Promise<T> | (() => Promise<T> | () => T` - function or promise returntype like with infered `T`;

### returns

- `SafeTryResult<T>` - result object with `success` property to indicate if there is an error or you can get the data;

### example

```ts
import { safetry } from "trykit";

const result = await safetry(fetch("/hello"));
if (!result.success) console.error(result.error.message);
console.log(result.data);
```

## `tryparse`

**`tryparse<T>(schema: TryParseSchema<T>, input: unknown, ...args: unknown[]): SafeTryResult<T>`**

### parameters

- `schema: TryParseSchema<T>` - schema with a `parse` function in it that returns type `T`;
- `input: unknown` - first argument passed to the `schema.parse` function, use `args` for rest parameters;

### returns

- `SafeTryResult<T>` - see the `safetry` function;

### example

```ts
import { tryparse } from "trykit";

const zodSchema = z.object({
  hello: z.string(),
});

const zodResult = tryparse(zodSchema, { bye: "good day" });
const jsonResult = tryparse(JSON, jsonString);
```

## `retry`

**`retry<T>(callback: Promise<T> | (() => Promise<T>), config?: Partial<RetryConfig>): Promise<SafeTryResult<T>>`**

### parameters

- `callback: Promise<T> | (() => Promise<T> | () => T` - function or promise returntype like with infered `T`;
- `config?: RetryConfig` - (optional) configuration for the retries of type `RetryConfig`;

**`RetryConfig`**:

- `attempts?: number` - (optional) number of times the callback can be called before returning the error;
- `delay?: number` - (optional) delay in milliseconds to wait for the next iteration;
- `factor?: number` - (optional) multiply the delay with a factor (default 2);

### returns

- `SafeTryResult<T>` - see the `safetry` function;

### example

```ts
const result = await retry(fetch("/unknown"), { attempts: 5, delay: 50, factor: 1 });

if (!result.success) console.error(result.error.message);
console.log(result.data);
```
