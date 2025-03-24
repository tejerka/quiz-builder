import { Label } from "@/components/ui/label";
import AppInput from "@/forms/AppInput";
import AppTextArea from "@/forms/AppTextArea";
import Sort from "@/forms/Sort";
import type { ReactElement } from "react";

const SortImageElement = <Key extends string>({ JSONKey }: { JSONKey: Key }): ReactElement => (
  <>
    <AppInput label={"Id"} JSONKey={`${JSONKey}.id`} />
    <AppInput label={"Image"} JSONKey={`${JSONKey}.image`} />
    <AppInput label={"Place"} JSONKey={`${JSONKey}.place`} type={"number"} />
  </>
);

const SortImageScreen = <Key extends string>({ JSONKey }: { JSONKey: Key }): ReactElement => {
  return (
    <>
      <AppTextArea label={"consigne"} JSONKey={`${JSONKey}.consigne.fr`} />
      <AppInput label={"valider"} JSONKey={`${JSONKey}.valider.fr`} />
      <AppInput label={"retour"} JSONKey={`${JSONKey}.retour.fr`} />
      <AppTextArea label={"feedBack"} JSONKey={`${JSONKey}.feedback.fr`} />
      <div className={"flex flex-col gap-2"}>
        <Label>Elements (max 5)</Label>
        <Sort JSONKey={`${JSONKey}.classement`} ElementComponent={SortImageElement} />
      </div>
    </>
  );
};

export default SortImageScreen;
