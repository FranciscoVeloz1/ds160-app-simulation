import type { FieldDef, RepeatableDef, SectionDef } from "../types/ds160";

export function collectScalarFields(sections: readonly SectionDef[]): FieldDef[] {
  const fields: FieldDef[] = [];
  for (const section of sections) {
    for (const field of section.fields) {
      fields.push(field);
    }
  }
  return fields;
}

export function collectRepeatables(
  sections: readonly SectionDef[],
): RepeatableDef[] {
  const groups: RepeatableDef[] = [];
  for (const section of sections) {
    if (!section.repeatables) {
      continue;
    }
    for (const group of section.repeatables) {
      groups.push(group);
    }
  }
  return groups;
}

export function emptyListRow(
  group: RepeatableDef,
): Record<string, string> {
  const row: Record<string, string> = {};
  for (const field of group.fields) {
    row[field.id] = "";
  }
  return row;
}
