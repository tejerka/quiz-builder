import AppInput from "@/forms/AppInput";
import type { ReactElement } from "react";

const TransitionScreen = <Key extends string>({ JSONKey }: { JSONKey: Key }): ReactElement => {
  return (
    <>
      <AppInput label={"Image"} JSONKey={`${JSONKey}.image`} />
      <AppInput label={"Bouton suivant"} JSONKey={`${JSONKey}.bouton_suivant.fr`} />
    </>
  );
};

export default TransitionScreen;
