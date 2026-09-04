import { describe, expect, it } from "vitest";
import { SECTIONS } from "./schema";
import { collectRepeatables, collectScalarFields } from "../utils/schemaWalk";

function walkLabels(
  sections: typeof SECTIONS,
): Array<{ en: string; es: string; allowSame: boolean }> {
  const labels: Array<{ en: string; es: string; allowSame: boolean }> = [];
  for (const section of sections) {
    labels.push({ ...section.title, allowSame: false });
    for (const field of section.fields) {
      labels.push({ ...field.label, allowSame: false });
      for (const option of field.options ?? []) {
        const allowSame = option.label.en === option.label.es;
        labels.push({ ...option.label, allowSame });
      }
    }
    for (const group of section.repeatables ?? []) {
      labels.push({ ...group.itemLabel, allowSame: false });
      for (const field of group.fields) {
        labels.push({ ...field.label, allowSame: false });
        for (const option of field.options ?? []) {
          const allowSame = option.label.en === option.label.es;
          labels.push({ ...option.label, allowSame });
        }
      }
    }
  }
  return labels;
}

describe("SECTIONS schema", () => {
  it("has unique scalar field ids and repeatable ids", () => {
    const scalarIds = collectScalarFields(SECTIONS).map((field) => {
      return field.id;
    });
    const groupIds = collectRepeatables(SECTIONS).map((group) => {
      return group.id;
    });
    expect(new Set(scalarIds).size).toBe(scalarIds.length);
    expect(new Set(groupIds).size).toBe(groupIds.length);
  });

  it("references existing fields in showWhen", () => {
    const scalarIds = new Set(
      collectScalarFields(SECTIONS).map((field) => {
        return field.id;
      }),
    );
    for (const field of collectScalarFields(SECTIONS)) {
      if (field.showWhen) {
        expect(scalarIds.has(field.showWhen.id)).toBe(true);
      }
    }
    for (const group of collectRepeatables(SECTIONS)) {
      if (group.showWhen) {
        expect(scalarIds.has(group.showWhen.id)).toBe(true);
      }
    }
  });

  it("has non-empty bilingual labels", () => {
    for (const label of walkLabels(SECTIONS)) {
      expect(label.en.trim().length).toBeGreaterThan(0);
      expect(label.es.trim().length).toBeGreaterThan(0);
      if (!label.allowSame) {
        expect(label.en).not.toBe(label.es);
      }
    }
  });
});
