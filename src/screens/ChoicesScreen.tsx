import { Label } from "@/components/ui/label";
import AppInput from "@/forms/AppInput";
import AppTextArea from "@/forms/AppTextArea";
import Choices from "@/forms/Choices";
import type { ReactElement } from "react";

const ChoicesScreen = <Key extends string>({ JSONKey }: { JSONKey: Key }): ReactElement => {
  return (
    <>
      <AppInput label={"image"} JSONKey={`${JSONKey}.image`} />
      <AppTextArea label={"consigne"} JSONKey={`${JSONKey}.consigne.fr`} />
      <AppInput label={"valider"} JSONKey={`${JSONKey}.valider.fr`} />
      <AppTextArea label={"feedBack"} JSONKey={`${JSONKey}.feedBack.fr`} />
      <div className={"flex flex-col flex-1/2 gap-2"}>
        <Label>Choix (max 5):</Label>
        <Choices JSONKey={`${JSONKey}.choix`} />
      </div>
    </>
  );
};

export default ChoicesScreen;
