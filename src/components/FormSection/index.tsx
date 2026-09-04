import type { Ds160Answers, SectionDef } from "../../types/ds160";
import { FormField } from "../FormField";
import { RepeatableGroup } from "../RepeatableGroup";
import styles from "./FormSection.module.css";

type FormSectionProps = {
  section: SectionDef;
  answers: Ds160Answers;
  visible: (showWhen: SectionDef["fields"][number]["showWhen"]) => boolean;
  onChange: (id: string, value: string) => void;
  onAddList: (listId: string) => void;
  onRemoveList: (listId: string, index: number) => void;
  onChangeList: (
    listId: string,
    index: number,
    fieldId: string,
    value: string,
  ) => void;
};

export function FormSection({
  section,
  answers,
  visible,
  onChange,
  onAddList,
  onRemoveList,
  onChangeList,
}: FormSectionProps) {
  return (
    <section className={styles.section} aria-labelledby={`section-${section.id}`}>
      <h2 className={styles.title} id={`section-${section.id}`}>
        {section.title.en}
        <span className={styles.titleEs} lang="es">
          {section.title.es}
        </span>
      </h2>
      {section.fields.map((field) => {
        if (!visible(field.showWhen)) {
          return null;
        }
        return (
          <FormField
            key={field.id}
            field={field}
            value={answers.values[field.id] ?? ""}
            onChange={(value) => {
              onChange(field.id, value);
            }}
          />
        );
      })}
      {(section.repeatables ?? []).map((group) => {
        if (!visible(group.showWhen)) {
          return null;
        }
        return (
          <RepeatableGroup
            key={group.id}
            group={group}
            rows={answers.lists[group.id] ?? []}
            onAdd={() => {
              onAddList(group.id);
            }}
            onRemove={(index) => {
              onRemoveList(group.id, index);
            }}
            onChange={(index, fieldId, value) => {
              onChangeList(group.id, index, fieldId, value);
            }}
          />
        );
      })}
    </section>
  );
}
