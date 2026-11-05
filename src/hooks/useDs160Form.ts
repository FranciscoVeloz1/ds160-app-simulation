import { useCallback, useEffect, useState } from "react";
import type { Ds160Answers, SectionDef } from "../types/ds160";
import { emptyAnswers } from "../utils/emptyAnswers";
import { parseAnswers } from "../utils/parseDs160Json";
import { collectRepeatables } from "../utils/schemaWalk";
import { emptyListRow } from "../utils/schemaWalk";
import { isShown } from "../utils/isShown";

const STORAGE_KEY = "ds160-answers:v1";

function readStored(sections: readonly SectionDef[]): Ds160Answers {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return emptyAnswers(sections);
    }
    return parseAnswers(raw);
  } catch {
    return emptyAnswers(sections);
  }
}

function writeStored(answers: Ds160Answers): void {
  try {
    // ponytail: write every change, debounce if typing janks
    localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
  } catch {
    // private mode or quota
  }
}

export function useDs160Form(sections: readonly SectionDef[]) {
  const [answers, setAnswers] = useState<Ds160Answers>(() => {
    return readStored(sections);
  });

  useEffect(() => {
    writeStored(answers);
  }, [answers]);

  const setValue = useCallback((id: string, value: string) => {
    setAnswers((current) => {
      return {
        ...current,
        values: {
          ...current.values,
          [id]: value,
        },
      };
    });
  }, []);

  const addListItem = useCallback(
    (listId: string) => {
      setAnswers((current) => {
        const groups = collectRepeatables(sections);
        const group = groups.find((item) => {
          return item.id === listId;
        });
        if (!group) {
          return current;
        }
        const existing = current.lists[listId] ?? [];
        return {
          ...current,
          lists: {
            ...current.lists,
            [listId]: [...existing, emptyListRow(group)],
          },
        };
      });
    },
    [sections],
  );

  const removeListItem = useCallback((listId: string, index: number) => {
    setAnswers((current) => {
      const existing = current.lists[listId] ?? [];
      return {
        ...current,
        lists: {
          ...current.lists,
          [listId]: existing.filter((_, itemIndex) => {
            return itemIndex !== index;
          }),
        },
      };
    });
  }, []);

  const setListValue = useCallback(
    (listId: string, index: number, fieldId: string, value: string) => {
      setAnswers((current) => {
        const existing = current.lists[listId] ?? [];
        const nextRows = existing.map((row, itemIndex) => {
          if (itemIndex !== index) {
            return row;
          }
          return {
            ...row,
            [fieldId]: value,
          };
        });
        return {
          ...current,
          lists: {
            ...current.lists,
            [listId]: nextRows,
          },
        };
      });
    },
    [],
  );

  const replaceAnswers = useCallback((next: Ds160Answers) => {
    setAnswers(next);
  }, []);

  const visible = useCallback(
    (showWhen: { id: string; equals: "YES" | "NO" } | undefined) => {
      return isShown(showWhen, answers.values);
    },
    [answers.values],
  );

  return {
    answers,
    setValue,
    addListItem,
    removeListItem,
    setListValue,
    replaceAnswers,
    visible,
  };
}
