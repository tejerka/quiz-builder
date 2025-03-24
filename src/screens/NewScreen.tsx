import type { screenSchema } from "@/JSONSchema";
import { useJSONPartState } from "@/JSONStorage";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { type ReactElement, useCallback } from "react";
import type { z } from "zod";

const NewScreen = <Key extends string>({ JSONKey }: { JSONKey: Key }): ReactElement => {
  const [, setValue] = useJSONPartState<Key>(JSONKey);
  const onClickType = useCallback(
    (
      type: z.infer<typeof screenSchema>["type"],
      subType?: z.infer<typeof screenSchema>["subType"],
    ) => {
      setValue((prev) => {
        const copy = JSON.parse(JSON.stringify(prev));
        copy.type = type;
        copy.subType = subType;

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
          onClickType("qcm");
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
          onClickType("dragdrop", "image");
        }}
      >
        Drag and Drop (Image)
      </Button>
      <Button
        variant={"outline"}
        onClick={() => {
          onClickType("dragdrop", "text");
        }}
      >
        Drag and Drop (text)
      </Button>
      <Button
        variant={"outline"}
        onClick={() => {
          onClickType("classement", "image");
        }}
      >
        Classement (Image)
      </Button>
      <Button
        variant={"outline"}
        onClick={() => {
          onClickType("classement", "text");
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
