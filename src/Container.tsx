import { type ReactElement, useCallback, useEffect } from "react";
import styled from "styled-components";
import { useJSONPartState } from "./JSONStorage";
import type { PropsWithClassName } from "./PropsWithClassName";
import SidePanel from "./SidePanel";

const Container = styled(({ className }: PropsWithClassName): ReactElement => {
  const [state, setState] = useJSONPartState("deep.counter");
  const toto = useCallback(() => {
    setState((prev) => (prev ?? 0) + 1);
  }, [setState]);

  useEffect(() => {
    const interval = setInterval(toto, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [toto]);

  return (
    <div className={className}>
      <SidePanel />
      <p>{JSON.stringify(state)}</p>
      <p>{import.meta.env.VITE_APP_VERSION ?? "dev"}</p>
      <p>{import.meta.env.VITE_APP_BUILD_TIMESTAMP ?? "unknown"}</p>
    </div>
  );
})`
    display: flex;
    width: 100%;
    height: 100%;
`;

export default Container;
