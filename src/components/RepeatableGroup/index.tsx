import type { RepeatableDef } from "../../types/ds160";
import { BilingualText } from "../BilingualText";
import { FormField } from "../FormField";
import styles from "./RepeatableGroup.module.css";

type RepeatableGroupProps = {
  group: RepeatableDef;
  rows: Array<Record<string, string>>;
  onAdd: () => void;
  onRemove: (index: number) => void;
  onChange: (index: number, fieldId: string, value: string) => void;
};

export function RepeatableGroup({
  group,
  rows,
  onAdd,
  onRemove,
  onChange,
}: RepeatableGroupProps) {
  const addLabel = `Add ${group.itemLabel.en} / Agregar ${group.itemLabel.es}`;

  return (
    <div className={styles.wrap}>
      <div className={styles.head}>
        <BilingualText label={group.itemLabel} />
        <button
          type="button"
          className={styles.btn}
          onClick={onAdd}
          aria-label={addLabel}
        >
          +
        </button>
      </div>
      {rows.map((row, index) => {
        return (
          <div className={styles.item} key={`${group.id}-${index}`}>
            <div className={styles.itemHead}>
              <span>
                {group.itemLabel.en} ({index + 1})
              </span>
              <button
                type="button"
                className={`${styles.btn} ${styles.remove}`}
                onClick={() => {
                  onRemove(index);
                }}
                aria-label={`Remove ${group.itemLabel.en} ${index + 1} / Quitar ${group.itemLabel.es} ${index + 1}`}
              >
                −
              </button>
            </div>
            {group.fields.map((field) => {
              return (
                <FormField
                  key={field.id}
                  field={field}
                  value={row[field.id] ?? ""}
                  onChange={(value) => {
                    onChange(index, field.id, value);
                  }}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
