import { merge } from "@/merge"; // Adjust the import path as needed

describe("merge function", () => {
  // Tests for merging objects
  describe("merging objects", () => {
    it("should merge two simple objects", () => {
      const obj1 = { a: 1, b: 2 } as const;
      const obj2 = { c: 3, d: 4 };
      const result = merge(obj1, obj2);
      expect(result).toEqual({ a: 1, b: 2, c: 3, d: 4 });
    });

    it("should override properties in the first object with those from the second", () => {
      const obj1 = { a: 1, b: 2 };
      const obj2 = { b: 3, c: 4 };
      expect(merge(obj1, obj2)).toEqual({ a: 1, b: 3, c: 4 });
    });

    it("should merge multiple objects", () => {
      const obj1 = { a: 1 };
      const obj2 = { b: 2 };
      const obj3 = { c: 3 };
      expect(merge(obj1, obj2, obj3)).toEqual({ a: 1, b: 2, c: 3 });
    });

    it("should perform shallow merge for nested objects", () => {
      const obj1 = { a: { x: 1 }, b: 2 };
      const obj2 = { a: { y: 2 }, c: 3 };
      expect(merge(obj1, obj2)).toEqual({ a: { y: 2 }, b: 2, c: 3 });
    });

    it("should handle empty objects", () => {
      const obj1 = { a: 1 };
      const obj2 = {};
      expect(merge(obj1, obj2)).toEqual({ a: 1 });
      expect(merge(obj2, obj1)).toEqual({ a: 1 });
    });
  });

  // Tests for concatenating arrays
  describe("concatenating arrays", () => {
    it("should concatenate two arrays", () => {
      const arr1 = [1, 2, 3];
      const arr2 = [4, 5, 6];
      expect(merge(arr1, arr2)).toEqual([1, 2, 3, 4, 5, 6]);
    });

    it("should concatenate multiple arrays", () => {
      const arr1 = [1, 2];
      const arr2 = [3, 4];
      const arr3 = [5, 6];
      expect(merge(arr1, arr2, arr3)).toEqual([1, 2, 3, 4, 5, 6]);
      expect(merge(arr3, arr1, arr2)).toEqual([5, 6, 1, 2, 3, 4]);
    });

    it("should handle empty arrays", () => {
      const arr1 = [1, 2, 3];
      const arr2: number[] = [];
      expect(merge(arr1, arr2)).toEqual([1, 2, 3]);
      expect(merge(arr2, arr1)).toEqual([1, 2, 3]);
    });

    it("should concatenate arrays of different types altough TS shouldn't let you.", () => {
      const arr1 = [1, 2, 3];
      const arr2 = ["a", "b", "c"];
      expect(merge(arr1, arr2 as never)).toEqual([1, 2, 3, "a", "b", "c"]);
    });
  });

  // Edge cases and type checks
  describe("edge cases and type checks", () => {
    it("should return an empty object when no arguments are provided", () => {
      expect(merge()).toEqual({});
    });

    it("should return an empty array when merging empty arrays", () => {
      expect(merge([], [])).toEqual([]);
    });

    it("should maintain the correct types", () => {
      const result1 = merge({ a: 1 }, { b: 2 });
      const result2 = merge([1, 2], [3, 4]);

      // Runtime type checks
      expect(typeof result1).toBe("object");
      expect(Array.isArray(result1)).toBe(false);
      expect(Array.isArray(result2)).toBe(true);
    });
  });
});
