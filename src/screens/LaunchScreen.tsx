import AppInput from "@/forms/AppInput";
import AppTextArea from "@/forms/AppTextArea";
import type { ReactElement } from "react";

const LaunchScreen = <Key extends string>({ JSONKey }: { JSONKey: Key }): ReactElement => {
  return (
    <>
      <AppInput label={"Titre"} JSONKey={`${JSONKey}.titre.fr`} />
      <AppTextArea label={"Text"} JSONKey={`${JSONKey}.texte.fr`} />
      <AppInput label={"Bouton suivant"} JSONKey={`${JSONKey}.bouton_suivant.fr`} />
    </>
  );
};

export default LaunchScreen;
