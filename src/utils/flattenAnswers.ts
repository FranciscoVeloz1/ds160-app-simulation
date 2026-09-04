import type { Ds160Answers, SectionDef } from "../types/ds160";
import { isShown } from "./isShown";

export type FlattenedRow = {
  labelEn: string;
  labelEs: string;
  value: string;
};

export function flattenAnswers(
  sections: readonly SectionDef[],
  answers: Ds160Answers,
): FlattenedRow[] {
  const rows: FlattenedRow[] = [];

  for (const section of sections) {
    for (const field of section.fields) {
      if (!isShown(field.showWhen, answers.values)) {
        continue;
      }
      rows.push({
        labelEn: field.label.en,
        labelEs: field.label.es,
        value: answers.values[field.id] ?? "",
      });
    }

    for (const group of section.repeatables ?? []) {
      if (!isShown(group.showWhen, answers.values)) {
        continue;
      }
      const list = answers.lists[group.id] ?? [];
      list.forEach((item, index) => {
        const n = index + 1;
        for (const field of group.fields) {
          rows.push({
            labelEn: `${field.label.en} (${n})`,
            labelEs: `${field.label.es} (${n})`,
            value: item[field.id] ?? "",
          });
        }
      });
    }
  }

  return rows;
}
