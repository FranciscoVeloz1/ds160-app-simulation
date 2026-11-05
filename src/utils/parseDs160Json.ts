import { z } from "zod";
import type { Ds160Answers, Ds160ExportFile } from "../types/ds160";

const answersSchema = z.object({
  values: z.record(z.string(), z.string()),
  lists: z.record(z.string(), z.array(z.record(z.string(), z.string()))),
});

function parseJson(raw: string): unknown {
  try {
    return JSON.parse(raw);
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Invalid JSON: ${error.message}`);
    }
    throw new Error("Invalid JSON.");
  }
}

export function parseAnswers(raw: string): Ds160Answers {
  const result = answersSchema.safeParse(parseJson(raw));
  if (!result.success) {
    throw new Error("Invalid answers shape.");
  }
  return result.data;
}

const fileSchema = z.object({
  app: z.literal("ds160-app-simulation"),
  schemaVersion: z.literal(1),
  exportedAt: z.string(),
  answers: answersSchema,
});

export function parseDs160Json(raw: string): Ds160ExportFile {
  const result = fileSchema.safeParse(parseJson(raw));
  if (!result.success) {
    throw new Error(
      "This file is not a DS-160 personal-copy export (wrong app, version, or shape). / Este archivo no es una exportación de copia personal DS-160.",
    );
  }
  return result.data;
}
