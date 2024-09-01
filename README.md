# trykit

🪄🪖 Simple magic-like utilities to ease your development experience.

# installation

```bash
npm install trykit
```

# functions

- `safetry` - call your function without wrapping it in a try-catch block, and check if it throws;
- `retry` - retry a function n-times;

## `safetry`

**`safetry<T>(callback: Promise<T> | (() => Promise<T>)): Promise<SafeTryResult<T>>`**

### parameters

- `callback` - promise like with infered `T`;

### returns

- `SafeTryResult<T>` - result object with `success` property to indicate if there is an error or you can get the data.

### example

```ts
import { safetry } from "trykit";

const result = await safetry(fetch("/hello"));
if (!result.success) console.error(result.error.message);
console.log(result.data);
```

## `retry`

**`retry<T>(callback: Promise<T> | (() => Promise<T>), config?: Partial<RetryConfig>): Promise<SafeTryResult<T>>`**

### parameters

- `callback: Promise<T> | (() => Promise<T>` - promise like with infered `T`;
- `config?: RetryConfig` - (optional) configuration for the retries of type `RetryConfig`;

**`RetryConfig`**:

- `attempts?: number` - (optional) number of times the callback can be called before returning the error;
- `delay?: number` - (optional) delay in milliseconds to wait for the next iteration;
- `factor?: number` - (optional) multiply the delay with a factor (default 2);

### returns

- `SafeTryResult<T>` - see the `safetry` function.

### example

```ts
const result = await retry(fetch("/unknown"), { attempts: 5, delay: 50, factor: 1 });

if (!result.success) console.error(result.error.message);
console.log(result.data);
```
