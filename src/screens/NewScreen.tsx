import type { screenSchema } from "@/JSONSchema";
import { useJSONPartState } from "@/JSONStorage";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { type ReactElement, useCallback } from "react";
import type { z } from "zod";

const feedbackBase = {
  feedback: {
    fr: "",
  },
};

const NewScreen = <Key extends string>({ JSONKey }: { JSONKey: Key }): ReactElement => {
  const [, setValue] = useJSONPartState<Key>(JSONKey);
  const onClickType = useCallback(
    (
      type: z.infer<typeof screenSchema>["type"],
      subType?: z.infer<typeof screenSchema>["subType"],
      additionalData?: object,
    ) => {
      setValue((prev) => {
        const copy = {
          ...JSON.parse(JSON.stringify(prev)),
          ...(additionalData == null ? {} : additionalData),
        };
        copy.type = type;
        if (subType != null) {
          copy.subType = subType;
        }

        return copy;
      });
    },
    [setValue],
  );

  return (
    <div className={"flex flex-col items-center gap-2 bg-amber-200"}>
      <Label>Choisir un type d'écran:</Label>
      <Button
        variant={"outline"}
        onClick={() => {
          onClickType("lancement");
        }}
      >
        Lancement
      </Button>
      <Button
        variant={"outline"}
        onClick={() => {
          onClickType("transition");
        }}
      >
        Transition
      </Button>
      <Button
        variant={"outline"}
        onClick={() => {
          onClickType("qcm", undefined, feedbackBase);
        }}
      >
        QCM
      </Button>
      <Button
        variant={"outline"}
        onClick={() => {
          onClickType("image");
        }}
      >
        Image
      </Button>
      <Button
        variant={"outline"}
        onClick={() => {
          onClickType("dragdrop", "image", feedbackBase);
        }}
      >
        Drag and Drop (Image)
      </Button>
      <Button
        variant={"outline"}
        onClick={() => {
          onClickType("dragdrop", "text", feedbackBase);
        }}
      >
        Drag and Drop (text)
      </Button>
      <Button
        variant={"outline"}
        onClick={() => {
          onClickType("classement", "image", feedbackBase);
        }}
      >
        Classement (Image)
      </Button>
      <Button
        variant={"outline"}
        onClick={() => {
          onClickType("classement", "text", feedbackBase);
        }}
      >
        Classement (text)
      </Button>
      <Button
        variant={"outline"}
        onClick={() => {
          onClickType("fin");
        }}
      >
        Fin
      </Button>
    </div>
  );
};

export default NewScreen;
