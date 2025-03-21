import { dragAndDropTextScreenSchema, type screenSchema } from "@/JSONSchema";
import type { DeepPartial } from "@/JSONStorage";
import ChoicesScreen from "@/screens/ChoicesScreen";
import DragAndDropImageScreen from "@/screens/DragAndDropImageScreen";
import DragAndDropTextScreen from "@/screens/DragAndDropTextScreen";
import EndScreen from "@/screens/EndScreen";
import LaunchScreen from "@/screens/LaunchScreen";
import SearchScreen from "@/screens/SearchScreen";
import SortScreen from "@/screens/SortScreen";
import TransitionScreen from "@/screens/TransitionScreen";
import UnknownScreen from "@/screens/UnknownScreen";
import type { ReactElement } from "react";
import type z from "zod";

const Screen = <Key extends string>({
  type,
  subType,
  JSONKey,
}: {
  type: DeepPartial<z.infer<typeof screenSchema>>["type"];
  subType?: DeepPartial<z.infer<typeof screenSchema>>["subType"];
  JSONKey: Key;
}): ReactElement => {
  switch (type) {
    case "lancement":
      return <LaunchScreen JSONKey={JSONKey} />;
    case "qcm":
      return <ChoicesScreen JSONKey={JSONKey} />;
    case "image":
      return <SearchScreen JSONKey={JSONKey} />;
    case "classement":
      return <SortScreen JSONKey={JSONKey} />;
    case "dragdrop": {
      let effectiveSubType = subType;
      console.log(effectiveSubType);

      if (effectiveSubType == null) {
        const { success: isDragAndDropText } = dragAndDropTextScreenSchema.safeParse(screen);
        console.log(isDragAndDropText);
        effectiveSubType = isDragAndDropText ? "text" : "image";
      }
      console.log(effectiveSubType);

      switch (effectiveSubType) {
        case "image":
          console.log("ici");
          return <DragAndDropImageScreen JSONKey={JSONKey} />;
        case "text":
          return <DragAndDropTextScreen JSONKey={JSONKey} />;
        default:
          return <UnknownScreen JSONKey={JSONKey} />;
      }
    }
    case "transition":
      return <TransitionScreen JSONKey={JSONKey} />;
    case "fin":
      return <EndScreen JSONKey={JSONKey} />;
    default:
      return <UnknownScreen JSONKey={JSONKey} />;
  }
};

export default Screen;
