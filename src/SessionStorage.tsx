import isEqual from "lodash.isequal";
import {
  type PropsWithChildren,
  type ReactElement,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from "react";
import ObservableValue from "./ObservableValue.jsx";

export interface SessionStorageContextInterface {
  clear: () => void;
  setItem: (storageKey: string, item: string) => void;
  getItem: (storageKey: string, defaultValue?: string | null) => string | null;
  removeItem: (storageKey: string) => void;
  getObservableItem: (storageKey: string) => ObservableValue<string | null>;
}

const SessionStorageContext = createContext<SessionStorageContextInterface | undefined>(undefined);

const triggerStorageEventOnLocalWindow = ({
  key,
  newValue,
  oldValue,
}: {
  key: string;
  newValue: string | null;
  oldValue: string | null;
}): void => {
  window.dispatchEvent(
    new StorageEvent("storage", { storageArea: window.sessionStorage, newValue, oldValue, key }),
  );
};

export const SessionStorageProvider = ({ children }: PropsWithChildren): ReactElement => {
  const itemsSubjects = useRef<Record<string, ObservableValue<string | null>>>({});

  const removeItem = useCallback<SessionStorageContextInterface["removeItem"]>((storageKey) => {
    const oldValue = sessionStorage.getItem(storageKey) ?? null;
    sessionStorage.removeItem(storageKey);
    triggerStorageEventOnLocalWindow({ key: storageKey, newValue: null, oldValue });
  }, []);

  const clear = useCallback<SessionStorageContextInterface["clear"]>(() => {
    itemsSubjects.current = {};
    for (const key of Object.keys(sessionStorage)) {
      removeItem(key);
    }
  }, [removeItem]);

  const setItem = useCallback<SessionStorageContextInterface["setItem"]>((storageKey, item) => {
    const oldValue = sessionStorage.getItem(storageKey) ?? null;
    sessionStorage.setItem(storageKey, item);
    triggerStorageEventOnLocalWindow({ key: storageKey, newValue: item, oldValue });
  }, []);

  const getItem = useCallback<SessionStorageContextInterface["getItem"]>(
    (storageKey, defaultValue = null) => {
      return sessionStorage.getItem(storageKey) ?? defaultValue;
    },
    [],
  );

  const getObservableItem = useCallback<SessionStorageContextInterface["getObservableItem"]>(
    (storageKey) => {
      if (itemsSubjects.current[storageKey] === undefined) {
        itemsSubjects.current[storageKey] = new ObservableValue(getItem(storageKey));
        itemsSubjects.current[storageKey].subscribe((nextValue) => {
          if (getItem(storageKey) !== nextValue) {
            nextValue === null ? removeItem(storageKey) : setItem(storageKey, nextValue);
          }
        });
      }
      return itemsSubjects.current[storageKey];
    },
    [getItem, removeItem, setItem],
  );

  const watchItemHandler = useCallback(({ key, newValue, oldValue, storageArea }: StorageEvent) => {
    if (key === null || storageArea !== sessionStorage) {
      return;
    }

    if (itemsSubjects.current[key] !== undefined && !isEqual(newValue, oldValue)) {
      itemsSubjects.current[key].next(newValue);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("storage", watchItemHandler);
    return () => {
      window.removeEventListener("storage", watchItemHandler);
    };
  }, [watchItemHandler]);

  const value = useMemo(
    () => ({
      clear,
      setItem,
      getItem,
      removeItem,
      getObservableItem,
    }),
    [clear, getItem, removeItem, setItem, getObservableItem],
  );

  return <SessionStorageContext.Provider value={value}>{children}</SessionStorageContext.Provider>;
};

const useSessionStorage = () => {
  const context = useContext(SessionStorageContext);

  if (context === undefined) {
    throw new Error("Context must be set");
  }

  return context;
};

export default useSessionStorage;
