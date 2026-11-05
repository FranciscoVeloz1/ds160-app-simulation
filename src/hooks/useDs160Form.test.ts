import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import type { SectionDef } from "../types/ds160";
import { useDs160Form } from "./useDs160Form";

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
      {
        id: "extraNote",
        kind: "text",
        label: { en: "Note", es: "Nota" },
        showWhen: { id: "additionalEmailsYesNo", equals: "YES" },
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
              es: "Dirección de correo electrónico adicional",
            },
          },
        ],
      },
    ],
  },
];

const STORAGE_KEY = "ds160-answers:v1";

describe("useDs160Form", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("hides follow-ups until the parent is YES", () => {
    const { result } = renderHook(() => {
      return useDs160Form(fixture);
    });
    expect(
      result.current.visible({ id: "additionalEmailsYesNo", equals: "YES" }),
    ).toBe(false);

    act(() => {
      result.current.setValue("additionalEmailsYesNo", "YES");
    });
    expect(
      result.current.visible({ id: "additionalEmailsYesNo", equals: "YES" }),
    ).toBe(true);
  });

  it("adds additional email rows", () => {
    const { result } = renderHook(() => {
      return useDs160Form(fixture);
    });
    act(() => {
      result.current.addListItem("additionalEmails");
    });
    expect(result.current.answers.lists.additionalEmails).toHaveLength(1);
    expect(result.current.answers.lists.additionalEmails[0]?.email).toBe("");
  });

  it("restores a saved blob on mount", () => {
    const saved = {
      values: { additionalEmailsYesNo: "YES", extraNote: "hi" },
      lists: { additionalEmails: [{ email: "a@b.c" }] },
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
    const { result } = renderHook(() => {
      return useDs160Form(fixture);
    });
    expect(result.current.answers).toEqual(saved);
  });

  it("writes answers after setValue", () => {
    const { result } = renderHook(() => {
      return useDs160Form(fixture);
    });
    act(() => {
      result.current.setValue("extraNote", "saved");
    });
    const raw = localStorage.getItem(STORAGE_KEY);
    expect(raw).not.toBeNull();
    expect(JSON.parse(raw ?? "").values.extraNote).toBe("saved");
  });

  it("falls back to empty answers when storage is garbage", () => {
    localStorage.setItem(STORAGE_KEY, "{nope");
    const { result } = renderHook(() => {
      return useDs160Form(fixture);
    });
    expect(result.current.answers.values.extraNote).toBe("");
    expect(result.current.answers.lists.additionalEmails).toEqual([]);
  });
});
