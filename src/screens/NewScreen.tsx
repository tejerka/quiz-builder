import { useJSONPartState } from "@/JSONStorage";
import type { ReactElement } from "react";

const NewScreen = <Key extends string>({ JSONKey }: { JSONKey: Key }): ReactElement => {
  const [value, setValue] = useJSONPartState<Key>(JSONKey);
  return <></>;
};

export default NewScreen;
