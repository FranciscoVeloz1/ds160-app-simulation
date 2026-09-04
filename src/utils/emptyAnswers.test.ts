import { describe, expect, it } from "vitest";
import { SECTIONS } from "../data/schema";
import { emptyAnswers } from "./emptyAnswers";
import { collectRepeatables, collectScalarFields } from "./schemaWalk";

describe("emptyAnswers", () => {
  it("gives empty strings and empty lists for the full schema", () => {
    const answers = emptyAnswers(SECTIONS);
    const fields = collectScalarFields(SECTIONS);
    const groups = collectRepeatables(SECTIONS);

    for (const field of fields) {
      expect(answers.values[field.id]).toBe("");
    }
    for (const group of groups) {
      expect(answers.lists[group.id]).toEqual([]);
    }
  });
});
