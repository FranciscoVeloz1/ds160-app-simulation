import type { ChangeEvent, RefObject } from "react";
import styles from "./AppNav.module.css";

type AppNavProps = {
  fileInputRef: RefObject<HTMLInputElement | null>;
  onImportClick: () => void;
  onFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onExportJson: () => void;
  onExportExcel: () => void;
  onClear: () => void;
};

export function AppNav({
  fileInputRef,
  onImportClick,
  onFileChange,
  onExportJson,
  onExportExcel,
  onClear,
}: AppNavProps) {
  return (
    <header className={styles.nav}>
      <div className={styles.inner}>
        <h1 className={styles.title}>
          DS-160 Personal Copy
          <br />
          Copia personal
        </h1>
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.btn}
            onClick={onImportClick}
            aria-label="Import JSON / Importar JSON"
          >
            Import / Importar
          </button>
          <input
            ref={fileInputRef}
            className={styles.hiddenFile}
            type="file"
            accept="application/json,.json"
            onChange={onFileChange}
          />
          <button
            type="button"
            className={styles.btn}
            onClick={onExportJson}
            aria-label="Export JSON / Exportar JSON"
          >
            Export JSON / Exportar JSON
          </button>
          <button
            type="button"
            className={styles.btn}
            onClick={onExportExcel}
            aria-label="Export Excel / Exportar Excel"
          >
            Export Excel / Exportar Excel
          </button>
          <button
            type="button"
            className={styles.btn}
            onClick={onClear}
            aria-label="Clear form / Limpiar formulario"
          >
            Clear / Limpiar
          </button>
        </div>
      </div>
    </header>
  );
}
