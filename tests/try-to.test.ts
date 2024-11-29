import { tryto } from "@/try-to";

describe("tryto", () => {
  // Test 1: Basic successful case with direct values
  it("returns input when it is a non-function value", () => {
    expect(tryto("hello", "fallback")).toBe("hello");
  });

  // Test 2: Basic fallback case with direct values
  it("returns fallback when input function throws", () => {
    expect(
      tryto(() => {
        throw new Error("Test error");
      }, "fallback"),
    ).toBe("fallback");
  });

  // Test 3: Successful case with input function
  it("returns result of input function when it succeeds", () => {
    expect(tryto(() => "success", "fallback")).toBe("success");
  });

  // Test 4: Fallback case with fallback function
  it("calls fallback function when input throws", () => {
    expect(
      tryto(
        () => {
          throw new Error("Test error");
        },
        () => "fallback result",
      ),
    ).toBe("fallback result");
  });

  // Test 5: Handling null input
  it("returns null input directly", () => {
    expect(tryto(null, "fallback")).toBeNull();
  });

  // Test 6: Handling undefined input
  it("returns undefined input directly", () => {
    expect(tryto(undefined, "fallback")).toBeUndefined();
  });

  // Test 7: Handling numeric input
  it("returns numeric input directly", () => {
    expect(tryto(42, "fallback")).toBe(42);
  });

  // Test 8: Handling boolean input
  it("returns boolean input directly", () => {
    expect(tryto(false, "fallback")).toBe(false);
  });

  // Test 9: Complex object as input
  it("returns complex object input directly", () => {
    const complexObject = { a: 1, b: "test" };
    expect(tryto(complexObject, "fallback")).toEqual(complexObject);
  });

  // Test 10: Async function as input (assuming tryto doesn't handle promises)
  it("returns promise from async function without resolving", () => {
    const result = tryto(async () => "async result", "fallback");
    expect(result).toBeInstanceOf(Promise);
  });
});
