import { Pipeline, pipeline } from "../src/pipe.js";

// Reusable test functions
const add1 = (n: number) => n + 1;
const multiply2 = (n: number) => n * 2;
const toString = (n: number) => n.toString();
const asyncDouble = async (n: number) => n * 2;
const subtract3 = (n: number) => n - 3;
const sum = (a: number, b: number) => a + b;

describe("Pipeline", () => {
  it("should execute synchronous actions in order", () => {
    const p = pipeline(add1).pipe(multiply2).pipe(toString);
    const result = p.execute(5);
    expect(result).toBe("12");
  });

  it("should handle a single action", () => {
    const p = pipeline(multiply2);
    const result = p.execute(3);
    expect(result).toBe(6);
  });

  it("should pass multiple arguments to the initial function", () => {
    const p = pipeline(sum).pipe(multiply2);
    const result = p.execute(3, 4);
    expect(result).toBe(14);
  });

  it("should execute multiple synchronous actions", () => {
    const p = pipeline(add1).pipe(multiply2).pipe(subtract3);
    const result = p.execute(5);
    expect(result).toBe(9);
  });
});

describe("AsyncPipeline", () => {
  it("should execute asynchronous actions in order", async () => {
    const p = pipeline(add1).pipe(asyncDouble).pipe(toString);
    const result = await p.execute(5);
    expect(result).toBe("12");
  });

  it("should handle mixed sync and async actions", async () => {
    const p = pipeline(add1).pipe(asyncDouble).pipe(subtract3).pipe(asyncDouble);
    const result = await p.execute(5);
    expect(result).toBe(18);
  });

  it("should handle errors in async actions", async () => {
    const asyncError = async () => {
      throw new Error("Async error");
    };
    const p = pipeline(asyncError);
    await expect(p.execute()).rejects.toThrow("Async error");
  });
});

describe("pipeline helper function", () => {
  it("should create a Pipeline instance", () => {
    const p = pipeline(add1);
    expect(p).toBeInstanceOf(Pipeline);
  });

  it("should allow chaining with pipe method", () => {
    const p = pipeline(add1).pipe(multiply2);
    expect(p.execute(3)).toBe(8);
  });
});
