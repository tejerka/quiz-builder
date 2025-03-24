import AppInput from "@/forms/AppInput";
import type { ReactElement } from "react";

const EndScreen = <Key extends string>({ JSONKey }: { JSONKey: Key }): ReactElement => {
  return (
    <>
      <AppInput label={"Image"} JSONKey={`${JSONKey}.image`} />
      <AppInput label={"Bouton suivant"} JSONKey={`${JSONKey}.bouton_suivant.fr`} />
      <AppInput label={"Texte"} JSONKey={`${JSONKey}.texte.fr`} />
    </>
  );
};

export default EndScreen;
