import { safetry } from "@/safe-try";

describe("safe-try.ts", () => {
  const RESPONSE = 123;
  const ERROR = "Test Error";
  const VALID_PROMISE = new Promise<number>((r) => r(RESPONSE));
  const FAILING_PROMISE = new Promise<number>((_, r) => r());
  const VALID_ASYNC = async () => new Promise<number>((r) => r(RESPONSE));
  const FAILING_ASYNC = () => {
    throw new Error(ERROR);
  };
  function NO_ERROR_SYNC() {
    throw "not an error";
  }
  const VALID_SYNC = () => RESPONSE;
  const FAILING_SYNC = (): number => {
    throw new Error(ERROR);
  };

  it("should test if a valid promise is being handled", async () => {
    const result = await safetry(VALID_PROMISE);

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.data).toBe(RESPONSE);
    }
  });

  it("should throw TypeError if the error is not of type Error", async () => {
    const result = safetry(NO_ERROR_SYNC);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error).toBeInstanceOf(TypeError);
    }
  });

  it("should test if the rejected promise has an error object if the success is false", async () => {
    const result = await safetry(FAILING_PROMISE);
    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error).toBeInstanceOf(Error);
    }
  });

  it("should have an error object if the success is false with async functions", async () => {
    const result = await safetry(FAILING_ASYNC);
    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error).toBeInstanceOf(Error);
      expect(result.error.message).toBe(ERROR);
    }
  });

  it("should work for function class", async () => {
    const result = safetry(new Function());
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toBe(undefined);
    }
  });

  it("should test if a valid async function is being handled", async () => {
    const result = await safetry(VALID_ASYNC);

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.data).toBe(RESPONSE);
    }
  });

  it("should have an error object if the success is false with sync function", async () => {
    const result = safetry(FAILING_SYNC);
    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error).toBeInstanceOf(Error);
      expect(result.error.message).toBe(ERROR);
    }
  });

  it("should test if a valid sync function is being handled", async () => {
    const result = safetry(VALID_SYNC);

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.data).toBe(RESPONSE);
    }
  });
});
