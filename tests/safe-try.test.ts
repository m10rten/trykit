import { safetry } from "../src/safe-try";

describe("safe-try", () => {
  const RESPONSE = 123;
  const ERROR = "Test Error";
  const VALID_PROMISE = new Promise<number>((r) => r(RESPONSE));
  const FAILING_PROMISE = new Promise<number>((_, r) => r());
  const VALID_ASYNC = async () => new Promise<number>((r) => r(RESPONSE));
  const FAILING_ASYNC = async () => {
    throw new Error(ERROR);
  };

  it("should test if a valid promise is being handled", async () => {
    const result = await safetry(VALID_PROMISE);

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.data).toBe(RESPONSE);
    }
  });

  it("should test if the rejected promise has an error object if the success is false", async () => {
    const result = await safetry(FAILING_PROMISE);
    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error).toBeInstanceOf(Error);
    }
  });

  it("should have an error object if the success is false", async () => {
    const result = await safetry(FAILING_ASYNC);
    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error).toBeInstanceOf(Error);
      expect(result.error.message).toBe(ERROR);
    }
  });

  it("should test if a valid async function is being handled", async () => {
    const result = await safetry(VALID_ASYNC);

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.data).toBe(RESPONSE);
    }
  });
});
