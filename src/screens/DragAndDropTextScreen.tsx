import { Label } from "@/components/ui/label";
import AppInput from "@/forms/AppInput";
import AppTextArea from "@/forms/AppTextArea";
import DragTextElements from "@/forms/DragTextElements";
import DropElements from "@/forms/DropElements";
import type { ReactElement } from "react";

const DragAndDropTextScreen = <Key extends string>({ JSONKey }: { JSONKey: Key }): ReactElement => {
  return (
    <>
      <AppTextArea label={"consigne"} JSONKey={`${JSONKey}.consigne.fr`} />
      <AppInput label={"valider"} JSONKey={`${JSONKey}.valider.fr`} />
      <AppTextArea label={"feedBack"} JSONKey={`${JSONKey}.feedback.fr`} />
      <div className={"flex gap-4"}>
        <div className={"flex flex-col flex-1/2 gap-2"}>
          <Label>Drop Elements (max 5):</Label>
          <DropElements JSONKey={`${JSONKey}.drop`} />
        </div>
        <div className={"flex flex-col flex-1/2 gap-2"}>
          <Label>Drag Elements (max 5):</Label>
          <DragTextElements JSONKey={`${JSONKey}.drag`} />
        </div>
      </div>
    </>
  );
};

export default DragAndDropTextScreen;
