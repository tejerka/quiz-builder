import { Label } from "@/components/ui/label";
import AppInput from "@/forms/AppInput";
import DragTextElements from "@/forms/DragTextElements";
import DropElements from "@/forms/DropElements";
import type { ReactElement } from "react";

const DragAndDropTextScreen = <Key extends string>({ JSONKey }: { JSONKey: Key }): ReactElement => {
  return (
    <>
      <AppInput label={"consigne"} JSONKey={`${JSONKey}.consigne.fr`} />
      <AppInput label={"valider"} JSONKey={`${JSONKey}.valider.fr`} />
      <AppInput label={"feedBack"} JSONKey={`${JSONKey}.feedBack.fr`} />
      <div className={"flex flex-col"}>
        <Label>Drop</Label>
        <DropElements JSONKey={`${JSONKey}.drop`} />
      </div>
      <div className={"flex flex-col"}>
        <Label>Drag</Label>
        <DragTextElements JSONKey={`${JSONKey}.drag`} />
      </div>
    </>
  );
};

export default DragAndDropTextScreen;
