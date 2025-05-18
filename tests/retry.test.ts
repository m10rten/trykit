import { retry } from "../src/retry.js";

describe("retry.ts", () => {
  const NUM_RESPONSE = 123;
  it("should test a basic retry with default settings", async () => {
    const VALID_ASYNC = async () => new Promise<number>((r) => setTimeout(() => r(NUM_RESPONSE), 1));

    const result = await retry(VALID_ASYNC);

    expect(result.success).toBe(true);
    if (result.success) expect(result.data).toBe(NUM_RESPONSE);
  });

  it("should work for a promise that fails the first 2 times", async () => {
    let attempt = 0;
    const FAIL_FIRST_TWO = async () =>
      new Promise<number>((resolve, reject) => {
        attempt += 1;
        if (attempt < 2) return reject(new Error());
        return resolve(NUM_RESPONSE);
      });

    const result = await retry(FAIL_FIRST_TWO);

    expect(attempt).toBe(2);
    expect(result.success).toBe(true);
    if (result.success) expect(result.data).toBe(NUM_RESPONSE);
  });

  it("should throw the error when attempts run out", async () => {
    const message = "thrown";
    const FAIL_EVERY = async () => {
      throw new Error(message);
    };
    const result = await retry(FAIL_EVERY, { delay: 50, factor: 2 });
    expect(result.success).toBe(false);
    if (!result.success) expect(result.error).toBeInstanceOf(Error);
  });
});
