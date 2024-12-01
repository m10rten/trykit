import { snag } from "@/snag"; // Replace with the actual file name

describe("SnagQuery", () => {
  // Test successful promise execution
  it("should resolve with the correct value", async () => {
    const query = snag(() => Promise.resolve("success"));
    const result = await query.execute();
    expect(result).toBe("success");
  });

  // Test error handling with registered handler
  it("should handle specific error types", async () => {
    const customError = new Error("Custom error");
    const query = snag(() => Promise.reject(customError)).on(Error, (err) => `Caught: ${err.message}`);

    const result = await query.execute();
    expect(result).toBe("Caught: Custom error");
  });

  // Test error re-throwing when no handler matches
  it("should re-throw unhandled errors", async () => {
    const customError = new Error("Unhandled error");
    const query = snag(() => Promise.reject(customError));

    await expect(query.execute()).rejects.toThrow("Unhandled error");
  });

  // Test multiple error handlers
  it("should use the correct handler for different error types", async () => {
    class CustomError extends Error {}
    const query = snag(() => Promise.reject(new CustomError("Custom")))
      .on(CustomError, () => "Custom Error")
      .on(Error, () => "Generic Error");

    const result = await query.execute();
    expect(result).toBe("Custom Error");
  });

  // Test aliases (run and go)
  it("should work with run and go aliases", async () => {
    const query = snag(() => Promise.resolve("success"));
    expect(await query.run()).toBe("success");
    expect(await query.go()).toBe("success");
  });

  // Test with synchronous function
  it("should work with synchronous functions", async () => {
    const query = snag(() => "sync result");
    const result = await query.execute();
    expect(result).toBe("sync result");
  });

  // Test with function arguments
  it("should pass arguments correctly", async () => {
    const query = snag((a: number, b: number) => Promise.resolve(a + b));
    const result = await query.execute(2, 3);
    expect(result).toBe(5);
  });

  // Test chaining multiple handlers
  it("should allow chaining multiple handlers", async () => {
    class Error1 extends Error {}
    class Error2 extends Error {}

    const query = snag(() => Promise.reject(new Error2()))
      .on(Error1, () => "Error1")
      .on(Error2, () => "Error2");

    const result = await query.execute();
    expect(result).toBe("Error2");
  });

  // Test error in handler
  it("should propagate errors from handlers", async () => {
    const query = snag(() => Promise.reject(new Error("Original"))).on(Error, () => {
      throw new Error("Handler error");
    });

    await expect(query.execute()).rejects.toThrow("Handler error");
  });
});
