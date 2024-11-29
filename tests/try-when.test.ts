import { TryWhen } from "@/try-when";

describe("TryWhen", () => {
  describe("empty", () => {
    it("should return fallback for null input", () => {
      expect(TryWhen.empty(null, "fallback")).toBe("fallback");
    });
    it("should return fallback for empty string input", () => {
      expect(TryWhen.empty("", "fallback")).toBe("fallback");
    });
    it("should return input for non-empty string", () => {
      expect(TryWhen.empty("not empty", "fallback")).toBe("not empty");
    });
  });

  describe("falsy", () => {
    it("should return fallback for false", () => {
      expect(TryWhen.falsy(false, "fallback")).toBe("fallback");
    });
    it("should return fallback for 0", () => {
      expect(TryWhen.falsy(0, "fallback")).toBe("fallback");
    });
    it("should return input for truthy value", () => {
      expect(TryWhen.falsy(1, "fallback")).toBe(1);
    });
  });

  describe("truthy", () => {
    it("should return input for truthy value", () => {
      expect(TryWhen.truthy("hello", "fallback")).toBe("hello");
    });
    it("should return fallback for false", () => {
      expect(TryWhen.truthy(false, "fallback")).toBe("fallback");
    });
    it("should return fallback for empty string", () => {
      expect(TryWhen.truthy("", "fallback")).toBe("fallback");
    });
  });

  describe("nullish", () => {
    it("should return fallback for null", () => {
      expect(TryWhen.nullish(null, "fallback")).toBe("fallback");
    });
    it("should return fallback for undefined", () => {
      expect(TryWhen.nullish(undefined, "fallback")).toBe("fallback");
    });
    it("should return input for non-nullish value", () => {
      expect(TryWhen.nullish(0, "fallback")).toBe(0);
    });
  });

  describe("negative", () => {
    it("should return fallback for negative number", () => {
      expect(TryWhen.negative(-5, "fallback")).toBe("fallback");
    });
    it("should return input for positive number", () => {
      expect(TryWhen.negative(5, "fallback")).toBe(5);
    });
    it("should return input for zero", () => {
      expect(TryWhen.negative(0, "fallback")).toBe(0);
    });
  });

  describe("zero", () => {
    it("should return fallback for zero", () => {
      expect(TryWhen.zero(0, "fallback")).toBe("fallback");
    });
    it("should return input for positive number", () => {
      expect(TryWhen.zero(5, "fallback")).toBe(5);
    });
    it("should return input for negative number", () => {
      expect(TryWhen.zero(-5, "fallback")).toBe(-5);
    });
  });

  describe("array", () => {
    it("should return input for array", () => {
      expect(TryWhen.array([1, 2, 3], "fallback")).toEqual([1, 2, 3]);
    });
    it("should return fallback for object", () => {
      expect(TryWhen.array({}, "fallback")).toBe("fallback");
    });
    it("should return fallback for null", () => {
      expect(TryWhen.array(null, "fallback")).toBe("fallback");
    });
  });

  describe("positive", () => {
    it("should return input for positive number", () => {
      expect(TryWhen.positive(5, "fallback")).toBe(5);
    });
    it("should return fallback for negative number", () => {
      expect(TryWhen.positive(-5, "fallback")).toBe("fallback");
    });
    it("should return fallback for zero", () => {
      expect(TryWhen.positive(0, "fallback")).toBe("fallback");
    });
  });

  describe("function", () => {
    it("should return input for function", () => {
      const fn = () => {};
      expect(TryWhen.function(fn, "fallback")).toBe(fn);
    });
    it("should return fallback for object", () => {
      expect(TryWhen.function({}, "fallback")).toBe("fallback");
    });
    it("should return fallback for null", () => {
      expect(TryWhen.function(null, "fallback")).toBe("fallback");
    });
  });

  describe("object", () => {
    it("should return input for object", () => {
      const obj = { key: "value" };
      expect(TryWhen.object(obj, "fallback")).toBe(obj);
    });
    it("should return fallback for null", () => {
      expect(TryWhen.object(null, "fallback")).toBe("fallback");
    });
    it("should return fallback for string", () => {
      expect(TryWhen.object("string", "fallback")).toBe("fallback");
    });
  });
});
