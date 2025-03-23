import useSessionStorage from "@/SessionStorage";
import { useCallback, useEffect, useMemo, useState } from "react";

export const useSelectQuiz = (): [
  string | null,
  (newValue: (string | null) | ((prev: string | null) => string | null)) => void,
] => {
  const { getObservableItem } = useSessionStorage();
  const selectQuizObservable = getObservableItem("selected-quiz");
  const [selectQuizState, setSelectQuizState] = useState<string | null>(selectQuizObservable.value);

  useEffect(() => {
    const subscription = selectQuizObservable.subscribe(setSelectQuizState);
    return () => {
      subscription?.unsubscribe();
    };
  }, [selectQuizObservable]);

  const setSelectedQuiz = useCallback(
    (valueFromParam: (string | null) | ((prev: string | null) => string | null)) => {
      const partValue = selectQuizObservable.value;
      selectQuizObservable.next(
        "function" === typeof valueFromParam ? valueFromParam(partValue) : valueFromParam,
      );
    },
    [selectQuizObservable],
  );

  return useMemo(() => [selectQuizState, setSelectedQuiz], [setSelectedQuiz, selectQuizState]);
};
