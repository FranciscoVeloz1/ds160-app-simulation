export type YesNo = "YES" | "NO" | "";

export type BilingualLabel = {
  en: string;
  es: string;
};

export type FieldKind =
  | "text"
  | "textarea"
  | "date"
  | "select"
  | "yesno"
  | "email"
  | "phone";

export type SelectOption = {
  value: string;
  label: BilingualLabel;
};

export type FieldDef = {
  id: string;
  label: BilingualLabel;
  kind: FieldKind;
  options?: readonly SelectOption[];
  doesNotApply?: boolean;
  doesNotApplyLabel?: BilingualLabel;
  doesNotApplyValue?: string;
  showWhen?: { id: string; equals: Exclude<YesNo, ""> };
};

export type RepeatableDef = {
  id: string;
  itemLabel: BilingualLabel;
  fields: readonly FieldDef[];
  showWhen?: { id: string; equals: Exclude<YesNo, ""> };
};

export type SectionDef = {
  id: string;
  title: BilingualLabel;
  fields: readonly FieldDef[];
  repeatables?: readonly RepeatableDef[];
};

export type Ds160Answers = {
  values: Record<string, string>;
  lists: Record<string, Array<Record<string, string>>>;
};

export type Ds160ExportFile = {
  app: "ds160-app-simulation";
  schemaVersion: 1;
  exportedAt: string;
  answers: Ds160Answers;
};

export const SCHEMA_VERSION = 1;

export const DEFAULT_DNA_LABEL: BilingualLabel = {
  en: "Does Not Apply",
  es: "No aplica",
};

export const DNA_VALUE = "DOES NOT APPLY";
