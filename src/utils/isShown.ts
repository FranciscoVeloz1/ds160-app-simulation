import type { Ds160Answers, FieldDef, RepeatableDef } from "../types/ds160";

export function isShown(
  showWhen: FieldDef["showWhen"] | RepeatableDef["showWhen"],
  values: Ds160Answers["values"],
): boolean {
  if (!showWhen) {
    return true;
  }
  return values[showWhen.id] === showWhen.equals;
}
