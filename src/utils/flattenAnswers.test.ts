import { describe, expect, it } from "vitest";
import type { SectionDef } from "../types/ds160";
import { flattenAnswers } from "./flattenAnswers";

const fixture: SectionDef[] = [
  {
    id: "contact",
    title: { en: "Contact", es: "Contacto" },
    fields: [
      {
        id: "additionalEmailsYesNo",
        kind: "yesno",
        label: {
          en: "Do you have any additional email addresses?",
          es: "¿Tiene alguna dirección de correo electrónico adicional?",
        },
      },
    ],
    repeatables: [
      {
        id: "additionalEmails",
        itemLabel: {
          en: "Additional Email Address",
          es: "Correo electrónico adicional",
        },
        showWhen: { id: "additionalEmailsYesNo", equals: "YES" },
        fields: [
          {
            id: "email",
            kind: "email",
            label: {
              en: "Additional Email Address",
              es: "Correo electrónico adicional",
            },
          },
        ],
      },
    ],
  },
];

describe("flattenAnswers", () => {
  it("numbers additional emails (1) and (2) in both languages", () => {
    const rows = flattenAnswers(fixture, {
      values: { additionalEmailsYesNo: "YES" },
      lists: {
        additionalEmails: [
          { email: "one@example.com" },
          { email: "two@example.com" },
        ],
      },
    });
    const emailRows = rows.filter((row) => {
      return row.labelEn.includes("Additional Email Address (");
    });
    expect(emailRows).toEqual([
      {
        labelEn: "Additional Email Address (1)",
        labelEs: "Correo electrónico adicional (1)",
        value: "one@example.com",
      },
      {
        labelEn: "Additional Email Address (2)",
        labelEs: "Correo electrónico adicional (2)",
        value: "two@example.com",
      },
    ]);
  });
});
