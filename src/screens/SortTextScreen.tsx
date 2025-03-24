import { Label } from "@/components/ui/label";
import AppInput from "@/forms/AppInput";
import AppTextArea from "@/forms/AppTextArea";
import Sort from "@/forms/Sort";
import type { ReactElement } from "react";

const SortTextElement = <Key extends string>({ JSONKey }: { JSONKey: Key }): ReactElement => (
  <>
    <AppInput label={"Id"} JSONKey={`${JSONKey}.id`} />
    <AppTextArea label={"Texte"} JSONKey={`${JSONKey}.texte.fr`} />
    <AppInput label={"Place"} JSONKey={`${JSONKey}.place`} type={"number"} />
  </>
);

const SortTextScreen = <Key extends string>({ JSONKey }: { JSONKey: Key }): ReactElement => {
  return (
    <>
      <AppTextArea label={"consigne"} JSONKey={`${JSONKey}.consigne.fr`} />
      <AppInput label={"valider"} JSONKey={`${JSONKey}.valider.fr`} />
      <AppInput label={"retour"} JSONKey={`${JSONKey}.retour.fr`} />
      <AppTextArea label={"feedBack"} JSONKey={`${JSONKey}.feedback.fr`} />
      <div className={"flex flex-col gap-2"}>
        <Label>Elements (max 5)</Label>
        <Sort JSONKey={`${JSONKey}.classement`} ElementComponent={SortTextElement} />
      </div>
    </>
  );
};

export default SortTextScreen;
