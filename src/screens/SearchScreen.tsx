import AppInput from "@/forms/AppInput";
import type { ReactElement } from "react";

const SearchScreen = <Key extends string>({ JSONKey }: { JSONKey: Key }): ReactElement => {
  return (
    <>
      <AppInput label={"Image"} JSONKey={`${JSONKey}.image`} />
      <AppInput label={"Timer"} JSONKey={`${JSONKey}.timer`} type={"number"} />
    </>
  );
};

export default SearchScreen;
