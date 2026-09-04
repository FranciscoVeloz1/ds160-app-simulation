import type { Ds160Answers, Ds160ExportFile } from "../types/ds160";
import { SCHEMA_VERSION } from "../types/ds160";

function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

export function exportToJson(answers: Ds160Answers): void {
  const payload: Ds160ExportFile = {
    app: "ds160-app-simulation",
    schemaVersion: SCHEMA_VERSION,
    exportedAt: new Date().toISOString(),
    answers,
  };
  const blob = new Blob([`${JSON.stringify(payload, null, 2)}\n`], {
    type: "application/json",
  });
  downloadBlob(blob, "ds160-personal-copy.json");
}
