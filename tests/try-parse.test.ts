import { z } from "zod";

import { tryparse } from "@/try-parse";

describe("tryparse", () => {
  describe("zod", () => {
    const schema = z.object({
      hello: z.string(),
    });
    it("Should fail with a zod schema", () => {
      const result = tryparse(schema, "fails");

      expect(result.success).toBe(false);
    });

    it("should work with valid data object", () => {
      const result = tryparse(schema, { hello: "works" });

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.hello).toBe("works");
      }
    });
  });

  describe("JSON", () => {
    const jsonString =
      '{"name":"John Doe","age":30,"isEmployed":true,"address":{"street":"123 Main St","city":"Anytown","zipcode":"12345"},"skills":["JavaScript","TypeScript","Python"]}';
    const faultyJsonString =
      '{"name":"John Doe","age":30,"isEmployed":true,"address":{"street":"123 Main St","city":"Anytown","zipcode":"12345","skills":["JavaScript","TypeScript","Python"]}';

    it("should work with valid json string", () => {
      const result = tryparse(JSON, jsonString);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.name).toBe("John Doe");
      }
    });

    it("should error when parsing invalid string", () => {
      const result = tryparse(JSON, faultyJsonString);

      expect(result.success).toBe(false);

      if (!result.success) {
        expect(result.error).toBeDefined();
      }
    });
  });
});
