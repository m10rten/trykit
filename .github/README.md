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

# functions & classes

- `safetry` - call your function without wrapping it in a try-catch block, and check if it throws;
- `tryparse` - parse data in a schema, without it erroring;
- `retry` - retry a function n-times;
- `tryto` - attempt to evaluate an input and return a fallback value if an error occurs;
- `TryWhen` - a class with static methods for conditional value handling;
- `merge` - function to merge arrays or objects;

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

## `tryto`

**`tryto<T, D>(input: (() => T) | T, fallback: D | (() => D)): T | D`**

### parameters

- `input: (() => T) | T` - A value or a function that returns a value of type T.
- `fallback: D | (() => D)` - A fallback value or a function that returns a fallback value of type D.

### returns

- `T | D` - The result of evaluating the input or the fallback value if an error occurs.

### example

```ts
import { tryto } from "trykit";

const result1 = tryto(() => JSON.parse('{"valid": "json"}'), "fallback");
console.log(result1); // { valid: 'json' }

const result2 = tryto(() => JSON.parse("invalid json"), "fallback");
console.log(result2); // 'fallback'

const result3 = tryto(
  () => {
    throw new Error("Oops");
  },
  () => "Error occurred",
);
console.log(result3); // 'Error occurred'
```

## `TryWhen`

The `TryWhen` class provides static methods for conditional value handling.

### Methods

- **`empty<T, D>(input: T, fallback: D): Condition<T, Empty<T>, D>`**
  - Returns fallback if input is null, undefined, or an empty string.
- **`falsy<T, D>(input: T, fallback: D): Condition<T, Falsy<T>, D>`**
  - Returns fallback if input is falsy.
- **`truthy<T, D>(input: T, fallback: D): Condition<T, Truthy<T>, D>`**
  - Returns fallback if input is not truthy.
- **`nullish<T, D>(input: T, fallback: D): Condition<T, Nullish<T>, D>`**
  - Returns fallback if input is null or undefined.
- **`negative<T, D>(input: T, fallback: D): Condition<T, Negative<T>, D>`**
  - Returns fallback if input is a negative number.
- **`zero<T, D>(input: T, fallback: D): Condition<T, Zero<T>, D>`**
  - Returns fallback if input is zero.
- **`array<T, D>(input: T, fallback: D): Condition<T, Array<T>, D>`**
  - Returns fallback if input is not an array.
- **`positive<T, D>(input: T, fallback: D): Condition<T, Positive<T>, D>`**
  - Returns fallback if input is not a positive number.
- **`function<T, D>(input: T, fallback: D): Condition<T, Function, D>`**
  - Returns fallback if input is not a function.
- **`object<T, D>(input: T, fallback: D): Condition<T, Object<T>, D>`**
  - Returns fallback if input is not an object or is null.

### Example

```ts
import { TryWhen } from "trykit";

const result1 = TryWhen.empty("", "fallback"); // 'fallback'
const result2 = TryWhen.positive(-5, 10); // 10
const result3 = TryWhen.array([1, 2], "not an array"); // [1, 2]
```

## `merge`

Merge objects or arrays with a simple call.

### parameters

- `...entities: T[]` - T being a typed array or object, first argument is used to determine return type.

### returns

- `T` - merged from the entities, the later in the list of entities, the higher priority it has.

### example

```ts
import { merge } from "trykit";

const object = merge({ a: 1 }, { b: 2 }); // {a: 1, b: 2};
const overwrite = merge({ a: 1, b: 2 }, { a: 4 }); // {a: 4, b: 2};

const array = merge([2], [1]); // [2, 1];
```
