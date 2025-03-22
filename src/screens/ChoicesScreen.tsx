import { Label } from "@/components/ui/label";
import AppInput from "@/forms/AppInput";
import Choices from "@/forms/Choices";
import type { ReactElement } from "react";

const ChoicesScreen = <Key extends string>({ JSONKey }: { JSONKey: Key }): ReactElement => {
  return (
    <>
      <AppInput label={"image"} JSONKey={`${JSONKey}.image`} />
      <AppInput label={"consigne"} JSONKey={`${JSONKey}.consigne.fr`} />
      <AppInput label={"valider"} JSONKey={`${JSONKey}.valider.fr`} />
      <AppInput label={"feedBack"} JSONKey={`${JSONKey}.feedBack.fr`} />
      <div className={"flex flex-col"}>
        <Label>Choix</Label>
        <Choices JSONKey={`${JSONKey}.choix`} />
      </div>
    </>
  );
};

export default ChoicesScreen;
