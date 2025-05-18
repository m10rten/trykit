import { safetry } from "./safe-try.js";

export type RetryConfig = {
  attempts?: number;
  delay?: number;
  factor?: number;
};

const defaultConfig = {
  attempts: 3,
  delay: 1000,
  factor: 2,
} satisfies RetryConfig;

export async function retry<T>(callback: Promise<T> | (() => Promise<T>), config?: Partial<RetryConfig>) {
  let current: number = 0;
  const _config = { ...defaultConfig, ...config };
  let result = await safetry(callback);
  if (result.success) return result;
  current += 1;
  do {
    const _delay = current === 1 ? _config.delay : _config.delay * current * _config.factor;
    await new Promise((r) => setTimeout(r, _delay));
    result = await safetry(callback);
    if (result.success) break;
    current += 1;
    if (current >= _config.attempts) {
      break;
    }
  } while (current < _config.attempts);
  return result;
}
