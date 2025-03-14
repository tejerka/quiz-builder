import { type ReactElement, useCallback, useEffect } from "react";
import { useJSONPartState } from "./JSONStorage";

const Container = (): ReactElement => {
  const [state, setState] = useJSONPartState("deep.counter");
  const toto = useCallback(() => {
    setState((prev) => (prev ?? 0) + 1);
  }, [setState]);

  useEffect(() => {
    const interval = setInterval(toto, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [toto]);

  return (
    <>
      <p>{JSON.stringify(state)}</p>
      <p>{import.meta.env.VITE_APP_VERSION ?? "dev"}</p>
      <p>{import.meta.env.VITE_APP_BUILD_TIMESTAMP ?? "unknown"}</p>
    </>
  );
};

export default Container;
