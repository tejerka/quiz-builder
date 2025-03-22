import { Label } from "@/components/ui/label";
import AppInput from "@/forms/AppInput";
import Sort from "@/forms/Sort";
import type { ReactElement } from "react";

const SortScreen = <Key extends string>({ JSONKey }: { JSONKey: Key }): ReactElement => {
  return (
    <>
      <AppInput label={"consigne"} JSONKey={`${JSONKey}.consigne.fr`} />
      <AppInput label={"valider"} JSONKey={`${JSONKey}.valider.fr`} />
      <AppInput label={"retour"} JSONKey={`${JSONKey}.retour.fr`} />
      <AppInput label={"feedBack"} JSONKey={`${JSONKey}.feedBack.fr`} />
      <div className={"flex flex-col"}>
        <Label>Classement</Label>
        <Sort JSONKey={`${JSONKey}.classement`} />
      </div>
    </>
  );
};

export default SortScreen;
