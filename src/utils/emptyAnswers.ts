import type { Ds160Answers, SectionDef } from "../types/ds160";
import { collectRepeatables, collectScalarFields } from "./schemaWalk";

export function emptyAnswers(sections: readonly SectionDef[]): Ds160Answers {
  const values: Record<string, string> = {};
  const lists: Record<string, Array<Record<string, string>>> = {};

  for (const field of collectScalarFields(sections)) {
    values[field.id] = "";
  }

  for (const group of collectRepeatables(sections)) {
    lists[group.id] = [];
  }

  return { values, lists };
}
