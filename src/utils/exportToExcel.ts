import type { FlattenedRow } from "./flattenAnswers";

export async function exportToExcel(rows: FlattenedRow[]): Promise<void> {
  const XLSX = await import("xlsx");
  const sheetRows = rows.map((row) => {
    return {
      "Label (EN)": row.labelEn,
      "Etiqueta (ES)": row.labelEs,
      Value: row.value,
    };
  });
  const sheet = XLSX.utils.json_to_sheet(sheetRows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, sheet, "DS-160");
  XLSX.writeFile(workbook, "ds160-personal-copy.xlsx");
}
