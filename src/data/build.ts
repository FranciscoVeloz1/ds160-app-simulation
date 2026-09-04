import type {
  FieldDef,
  FieldKind,
  RepeatableDef,
  SelectOption,
} from "../types/ds160";

export function field(
  id: string,
  kind: FieldKind,
  en: string,
  es: string,
  extra: Partial<FieldDef> = {},
): FieldDef {
  return {
    id,
    kind,
    label: { en, es },
    ...extra,
  };
}

export function yesNo(
  id: string,
  en: string,
  es: string,
  extra: Partial<FieldDef> = {},
): FieldDef {
  return field(id, "yesno", en, es, extra);
}

export function whenYes(id: string): FieldDef["showWhen"] {
  return { id, equals: "YES" };
}

export function whenNo(id: string): FieldDef["showWhen"] {
  return { id, equals: "NO" };
}

export function dnaText(
  id: string,
  en: string,
  es: string,
  kind: FieldKind = "text",
): FieldDef {
  return field(id, kind, en, es, { doesNotApply: true });
}

export const SEX_OPTIONS: SelectOption[] = [
  { value: "MALE", label: { en: "MALE", es: "MASCULINO" } },
  { value: "FEMALE", label: { en: "FEMALE", es: "FEMENINO" } },
];

export const MARITAL_OPTIONS: SelectOption[] = [
  { value: "SINGLE", label: { en: "SINGLE", es: "SOLTERO/A" } },
  { value: "MARRIED", label: { en: "MARRIED", es: "CASADO/A" } },
  {
    value: "COMMON LAW MARRIAGE",
    label: { en: "COMMON LAW MARRIAGE", es: "UNIÓN DE HECHO" },
  },
  {
    value: "CIVIL UNION/DOMESTIC PARTNERSHIP",
    label: {
      en: "CIVIL UNION/DOMESTIC PARTNERSHIP",
      es: "UNIÓN CIVIL / PAREJA DE HECHO",
    },
  },
  { value: "WIDOWED", label: { en: "WIDOWED", es: "VIUDO/A" } },
  { value: "DIVORCED", label: { en: "DIVORCED", es: "DIVORCIADO/A" } },
  {
    value: "LEGALLY SEPARATED",
    label: { en: "LEGALLY SEPARATED", es: "SEPARADO/A LEGALMENTE" },
  },
  { value: "OTHER", label: { en: "OTHER", es: "OTRO" } },
];

export const PAYER_OPTIONS: SelectOption[] = [
  { value: "SELF", label: { en: "SELF", es: "YO MISMO/A" } },
  {
    value: "OTHER PERSON",
    label: { en: "OTHER PERSON", es: "OTRA PERSONA" },
  },
  {
    value: "PRESENT EMPLOYER",
    label: { en: "PRESENT EMPLOYER", es: "EMPLEADOR ACTUAL" },
  },
  {
    value: "EMPLOYER IN THE U.S.",
    label: { en: "EMPLOYER IN THE U.S.", es: "EMPLEADOR EN EE. UU." },
  },
  {
    value: "OTHER COMPANY/ORGANIZATION",
    label: {
      en: "OTHER COMPANY/ORGANIZATION",
      es: "OTRA EMPRESA/ORGANIZACIÓN",
    },
  },
  {
    value: "U.S. GOVERNMENT",
    label: { en: "U.S. GOVERNMENT", es: "GOBIERNO DE EE. UU." },
  },
];

export const STAY_UNIT_OPTIONS: SelectOption[] = [
  { value: "DAY(S)", label: { en: "DAY(S)", es: "DÍA(S)" } },
  { value: "WEEK(S)", label: { en: "WEEK(S)", es: "SEMANA(S)" } },
  { value: "MONTH(S)", label: { en: "MONTH(S)", es: "MES(ES)" } },
  { value: "YEAR(S)", label: { en: "YEAR(S)", es: "AÑO(S)" } },
];

export const SOCIAL_PLATFORM_OPTIONS: SelectOption[] = [
  { value: "Facebook", label: { en: "Facebook", es: "Facebook" } },
  { value: "Instagram", label: { en: "Instagram", es: "Instagram" } },
  { value: "LinkedIn", label: { en: "LinkedIn", es: "LinkedIn" } },
  { value: "Twitter/X", label: { en: "Twitter/X", es: "Twitter/X" } },
  { value: "YouTube", label: { en: "YouTube", es: "YouTube" } },
  { value: "Other", label: { en: "Other", es: "Otro" } },
];

export const PASSPORT_TYPE_OPTIONS: SelectOption[] = [
  { value: "REGULAR", label: { en: "REGULAR", es: "ORDINARIO" } },
  { value: "OFFICIAL", label: { en: "OFFICIAL", es: "OFICIAL" } },
  { value: "DIPLOMATIC", label: { en: "DIPLOMATIC", es: "DIPLOMÁTICO" } },
  { value: "OTHER", label: { en: "OTHER", es: "OTRO" } },
];

export const PURPOSE_OPTIONS: SelectOption[] = [
  {
    value: "TEMP. BUSINESS OR PLEASURE VISITOR (B)",
    label: {
      en: "TEMP. BUSINESS OR PLEASURE VISITOR (B)",
      es: "VISITANTE TEMPORAL DE NEGOCIOS O PLACER (B)",
    },
  },
];

export const SPECIFY_OPTIONS: SelectOption[] = [
  {
    value: "BUSINESS OR TOURISM (TEMPORARY VISITOR) (B1/B2)",
    label: {
      en: "BUSINESS OR TOURISM (TEMPORARY VISITOR) (B1/B2)",
      es: "NEGOCIOS O TURISMO (VISITANTE TEMPORAL) (B1/B2)",
    },
  },
];

export function addressFields(
  prefix: string,
  showWhen?: FieldDef["showWhen"],
): FieldDef[] {
  return [
    field(
      `${prefix}Street`,
      "textarea",
      "Address",
      "Dirección",
      showWhen ? { showWhen } : {},
    ),
    field(
      `${prefix}City`,
      "text",
      "City",
      "Ciudad",
      showWhen ? { showWhen } : {},
    ),
    field(
      `${prefix}State`,
      "text",
      "State/Province",
      "Estado/Provincia",
      showWhen ? { showWhen } : {},
    ),
    field(
      `${prefix}Postal`,
      "text",
      "Postal Zone/ZIP Code",
      "Zona postal / código ZIP",
      showWhen ? { showWhen } : {},
    ),
    field(
      `${prefix}Country`,
      "text",
      "Country/Region",
      "País/Región",
      showWhen ? { showWhen } : {},
    ),
  ];
}

export function repeatable(
  id: string,
  itemEn: string,
  itemEs: string,
  fields: FieldDef[],
  showWhen?: RepeatableDef["showWhen"],
): RepeatableDef {
  return {
    id,
    itemLabel: { en: itemEn, es: itemEs },
    fields,
    ...(showWhen ? { showWhen } : {}),
  };
}
