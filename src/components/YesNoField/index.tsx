import styles from "./YesNoField.module.css";

type YesNoFieldProps = {
  name: string;
  labelledBy: string;
  value: string;
  onChange: (value: string) => void;
};

export function YesNoField({
  name,
  labelledBy,
  value,
  onChange,
}: YesNoFieldProps) {
  return (
    <div className={styles.group} role="radiogroup" aria-labelledby={labelledBy}>
      <label className={styles.option}>
        <input
          type="radio"
          name={name}
          value="YES"
          checked={value === "YES"}
          onChange={() => {
            onChange("YES");
          }}
        />
        YES / SÍ
      </label>
      <label className={styles.option}>
        <input
          type="radio"
          name={name}
          value="NO"
          checked={value === "NO"}
          onChange={() => {
            onChange("NO");
          }}
        />
        NO / NO
      </label>
    </div>
  );
}
