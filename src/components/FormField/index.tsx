import type { FieldDef } from "../../types/ds160";
import { DEFAULT_DNA_LABEL, DNA_VALUE } from "../../types/ds160";
import { BilingualText } from "../BilingualText";
import { YesNoField } from "../YesNoField";
import styles from "./FormField.module.css";

type FormFieldProps = {
  field: FieldDef;
  value: string;
  onChange: (value: string) => void;
};

export function FormField({ field, value, onChange }: FormFieldProps) {
  const inputId = `field-${field.id}`;
  const enId = `${inputId}-en`;
  const esId = `${inputId}-es`;
  const dnaLabel = field.doesNotApplyLabel ?? DEFAULT_DNA_LABEL;
  const dnaValue = field.doesNotApplyValue ?? DNA_VALUE;
  const isDna = value === dnaValue;

  const handleDna = (checked: boolean) => {
    if (checked) {
      onChange(dnaValue);
    } else {
      onChange("");
    }
  };

  let control = null;

  if (field.kind === "yesno") {
    control = (
      <YesNoField
        name={field.id}
        labelledBy={`${enId} ${esId}`}
        value={value}
        onChange={onChange}
      />
    );
  } else if (field.kind === "textarea") {
    control = (
      <textarea
        id={inputId}
        className={styles.textarea}
        value={isDna ? "" : value}
        disabled={isDna}
        onChange={(event) => {
          onChange(event.target.value);
        }}
        aria-labelledby={`${enId} ${esId}`}
      />
    );
  } else if (field.kind === "select") {
    control = (
      <select
        id={inputId}
        className={styles.select}
        value={isDna ? "" : value}
        disabled={isDna}
        onChange={(event) => {
          onChange(event.target.value);
        }}
        aria-labelledby={`${enId} ${esId}`}
      >
        <option value="">—</option>
        {(field.options ?? []).map((option) => {
          return (
            <option key={option.value} value={option.value}>
              {option.label.en} / {option.label.es}
            </option>
          );
        })}
      </select>
    );
  } else {
    const inputType =
      field.kind === "date"
        ? "date"
        : field.kind === "email"
          ? "email"
          : field.kind === "phone"
            ? "tel"
            : "text";
    control = (
      <input
        id={inputId}
        className={styles.input}
        type={inputType}
        value={isDna ? "" : value}
        disabled={isDna}
        onChange={(event) => {
          onChange(event.target.value);
        }}
        aria-labelledby={`${enId} ${esId}`}
      />
    );
  }

  return (
    <div className={styles.row}>
      <div className={styles.label}>
        {field.kind === "yesno" ? (
          <BilingualText label={field.label} enId={enId} esId={esId} />
        ) : (
          <label htmlFor={inputId}>
            <BilingualText label={field.label} enId={enId} esId={esId} />
          </label>
        )}
      </div>
      <div className={styles.control}>
        {control}
        {field.doesNotApply ? (
          <label className={styles.dna}>
            <input
              type="checkbox"
              checked={isDna}
              onChange={(event) => {
                handleDna(event.target.checked);
              }}
            />
            <BilingualText label={dnaLabel} />
          </label>
        ) : null}
      </div>
    </div>
  );
}
