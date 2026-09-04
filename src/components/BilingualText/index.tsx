import type { BilingualLabel } from "../../types/ds160";
import styles from "./BilingualText.module.css";

type BilingualTextProps = {
  label: BilingualLabel;
  enId?: string;
  esId?: string;
};

export function BilingualText({ label, enId, esId }: BilingualTextProps) {
  return (
    <span className={styles.stack}>
      <span className={styles.en} id={enId}>
        {label.en}
      </span>
      <span className={styles.es} id={esId} lang="es">
        {label.es}
      </span>
    </span>
  );
}
