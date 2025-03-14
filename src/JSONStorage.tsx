import get from "lodash.get";
import isEqual from "lodash.isequal";
import set from "lodash.set";
import {
  type PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { JSONType } from "./JSONSchema";
import ObservableValue from "./ObservableValue";
import useSessionStorage from "./SessionStorage";

type GetPart<Obj extends object, Path extends string> = Path extends `${infer Head}.${infer Tail}`
  ? Head extends keyof Obj
    ? Obj[Head] extends object
      ? GetPart<Obj[Head], Tail>
      : never
    : never
  : Path extends keyof Obj
    ? Obj[Path]
    : never;

const JSONStorageContext = createContext<ObservableValue<JSONType | null> | undefined>(undefined);

const prepareValue = (rawValue: string | null): JSONType | null => {
  return rawValue === null ? null : JSON.parse(rawValue);
};

const exportValue = (rawValue: JSONType | null): string | null => {
  return rawValue === null ? null : JSON.stringify(rawValue);
};

export const JSONStorageProvider = ({ children }: PropsWithChildren) => {
  const { getObservableItem } = useSessionStorage();
  const sessionJSONObservable = getObservableItem("working-JSON");
  const JSONObservable = useRef<ObservableValue<JSONType | null>>(
    new ObservableValue<JSONType | null>(prepareValue(sessionJSONObservable.value)),
  );

  useEffect(() => {
    const subscription = sessionJSONObservable.subscribe((nextValue) => {
      const preparedNextValue = prepareValue(nextValue);

      if (!isEqual(JSONObservable.current.value, preparedNextValue)) {
        JSONObservable.current.next(preparedNextValue);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [sessionJSONObservable]);

  useEffect(() => {
    const subscription = JSONObservable.current.subscribe((nextValue) => {
      const preparedNextValue = exportValue(nextValue);

      if (!isEqual(sessionJSONObservable.value, preparedNextValue)) {
        sessionJSONObservable.next(preparedNextValue);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [sessionJSONObservable]);

  return (
    <JSONStorageContext.Provider value={JSONObservable.current}>
      {children}
    </JSONStorageContext.Provider>
  );
};

const useJSONStorage = () => {
  const context = useContext(JSONStorageContext);

  if (context === undefined) {
    throw new Error("JSON Context must be set");
  }

  return context;
};

const getJsonPart = <Key extends string>(
  json: JSONType | null,
  key: Key,
): GetPart<JSONType, Key> | null => {
  if (json === null) {
    return null;
  }
  return (get(json, key) ?? null) as GetPart<JSONType, Key> | null;
};

export const useJSONPartState = <Key extends string>(
  key: Key,
): [
  GetPart<JSONType, Key> | null,
  (
    newValue:
      | (GetPart<JSONType, Key> | null)
      | ((prev: GetPart<JSONType, Key> | null) => GetPart<JSONType, Key> | null),
  ) => void,
] => {
  const JSONStorage = useJSONStorage();
  const [subjectState, setSubjectState] = useState<GetPart<JSONType, Key> | null>(
    getJsonPart<Key>(JSONStorage.value, key),
  );

  useEffect(() => {
    const subscription = JSONStorage.subscribe((nextValue) => {
      const partValue = getJsonPart<Key>(nextValue, key);
      setSubjectState((prevState) => (!isEqual(prevState, partValue) ? partValue : prevState));
    });
    return () => {
      subscription?.unsubscribe();
    };
  }, [key, JSONStorage]);

  const setSubjectValue = useCallback(
    (
      valueFromParam:
        | (GetPart<JSONType, Key> | null)
        | ((prev: GetPart<JSONType, Key> | null) => GetPart<JSONType, Key> | null),
    ) => {
      const partValue = getJsonPart<Key>(JSONStorage.value, key);
      const newValue =
        "function" === typeof valueFromParam ? valueFromParam(partValue) : valueFromParam;

      if (!isEqual(partValue, newValue)) {
        const JSONCopy = JSON.parse(JSON.stringify(JSONStorage.value)) ?? {};
        JSONStorage.next(set(JSONCopy, key, newValue));
      }
    },
    [key, JSONStorage],
  );

  return useMemo(() => [subjectState, setSubjectValue], [setSubjectValue, subjectState]);
};

export default useJSONStorage;
