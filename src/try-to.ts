export function tryto<T, D>(input: (() => T) | T, fallback: D | (() => D)): T | D {
  try {
    if (typeof input === "function") {
      return (input as () => T)();
    }
    return input;
  } catch {
    if (typeof fallback === "function") {
      return (fallback as () => D)();
    }
    return fallback;
  }
}
