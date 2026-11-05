import { useRef, useState, type ChangeEvent } from "react";
import { AppNav } from "./components/AppNav";
import { Banner } from "./components/Banner";
import { FormSection } from "./components/FormSection";
import {
  ImportStatus,
  type ImportStatusState,
} from "./components/ImportStatus";
import { SECTIONS } from "./data/schema";
import { useDs160Form } from "./hooks/useDs160Form";
import { emptyAnswers } from "./utils/emptyAnswers";
import { exportToExcel } from "./utils/exportToExcel";
import { exportToJson } from "./utils/exportToJson";
import { flattenAnswers } from "./utils/flattenAnswers";
import { parseDs160Json } from "./utils/parseDs160Json";

export default function App() {
  const form = useDs160Form(SECTIONS);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [importStatus, setImportStatus] = useState<ImportStatusState | null>(
    null,
  );

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    try {
      const raw = await file.text();
      const parsed = parseDs160Json(raw);
      form.replaceAnswers(parsed.answers);
      setImportStatus({
        kind: "ok",
        text: "Imported JSON. / JSON importado.",
      });
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "Failed to import file. / No se pudo importar el archivo.";
      setImportStatus({ kind: "error", text: message });
    }
    event.target.value = "";
  };

  const handleExportJson = () => {
    exportToJson(form.answers);
  };

  const handleExportExcel = () => {
    const rows = flattenAnswers(SECTIONS, form.answers);
    void exportToExcel(rows);
  };

  const handleClear = () => {
    if (
      !window.confirm(
        "Clear the form? Saved progress in this browser will be erased. / ¿Limpiar el formulario? Se borrará el progreso guardado en este navegador.",
      )
    ) {
      return;
    }
    form.replaceAnswers(emptyAnswers(SECTIONS));
  };

  return (
    <>
      <AppNav
        fileInputRef={fileInputRef}
        onImportClick={handleImportClick}
        onFileChange={handleFileChange}
        onExportJson={handleExportJson}
        onExportExcel={handleExportExcel}
        onClear={handleClear}
      />
      <Banner />
      <main className="page">
        <ImportStatus status={importStatus} />
        {SECTIONS.map((section) => {
          return (
            <FormSection
              key={section.id}
              section={section}
              answers={form.answers}
              visible={form.visible}
              onChange={form.setValue}
              onAddList={form.addListItem}
              onRemoveList={form.removeListItem}
              onChangeList={form.setListValue}
            />
          );
        })}
      </main>
    </>
  );
}
