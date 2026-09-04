import styles from "./Banner.module.css";

export function Banner() {
  return (
    <div className={styles.banner} role="note">
      <p className={styles.en}>
        Your Personal Copy -- Do Not Bring to Interview
      </p>
      <p className={styles.es} lang="es">
        Su copia personal -- No la lleve a la entrevista
      </p>
      <p className={styles.note}>
        Not CEAC. Does not submit to the U.S. Department of State. / No es
        CEAC. No envía datos al Department of State.
      </p>
    </div>
  );
}
