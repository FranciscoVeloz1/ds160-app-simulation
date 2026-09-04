import { describe, expect, it } from "vitest";
import { parseDs160Json } from "./parseDs160Json";

const valid = {
  app: "ds160-app-simulation",
  schemaVersion: 1,
  exportedAt: "2026-09-04T00:00:00.000Z",
  answers: {
    values: { email: "a@example.com" },
    lists: { additionalEmails: [{ email: "b@example.com" }] },
  },
};

describe("parseDs160Json", () => {
  it("round-trips a valid envelope", () => {
    const parsed = parseDs160Json(JSON.stringify(valid));
    expect(parsed).toEqual(valid);
  });

  it("throws on garbage JSON", () => {
    expect(() => {
      parseDs160Json("{not json");
    }).toThrow(/Invalid JSON/);
  });

  it("throws on the wrong app", () => {
    expect(() => {
      parseDs160Json(
        JSON.stringify({ ...valid, app: "groceries-app" }),
      );
    }).toThrow(/not a DS-160/);
  });
});
