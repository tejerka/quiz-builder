import type { screenSchema } from "@/JSONSchema";
import { useJSONPartState } from "@/JSONStorage";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AppInput from "@/forms/AppInput";
import DeleteButton from "@/forms/DeleteButton";
import Screen from "@/screens/Screen";
import { type ReactElement, useCallback } from "react";
import type z from "zod";

const screenTypeMap = {
  lancement: "Lancement",
  transition: "Transition",
  qcm: "QCM",
  image: "Image",
  dragdrop: "Drag and Drop",
  classement: "Classement",
  fin: "Fin",
  new: "Nouveau",
} as const;

const isScreen = (screen: unknown): screen is z.infer<typeof screenSchema> => {
  return (
    "object" === typeof screen &&
    null !== screen &&
    "type" in screen &&
    "string" === typeof screen.type &&
    Object.keys(screenTypeMap).includes(screen.type)
  );
};

const Screens = <Key extends string>({ JSONKey }: { JSONKey: Key }): ReactElement => {
  const [screens, setScreens] = useJSONPartState(`${JSONKey}.ecrans`);

  const onAddScreen = useCallback(
    (index: number) => {
      setScreens((prev) => {
        const newScreen = {
          id: `Screen_${prev?.length ?? 0}`,
          type: "new",
        };
        return (prev ?? []).length === 0 ? [newScreen] : prev?.toSpliced(index, 0, newScreen);
      });
    },
    [setScreens],
  );

  const onDeleteScreen = useCallback(
    (id: string) => {
      setScreens((prev) => {
        return (prev ?? []).filter((screen) => screen.id !== id);
      });
    },
    [setScreens],
  );

  return (
    <div className={"flex flex-col p-4 gap-4 justify-center items-center"}>
      {(screens ?? []).map((screen: unknown, index) => {
        if (!isScreen(screen)) {
          return null;
        }
        return (
          <>
            {index > 0 ? (
              <Button
                key={`add_screen_button_${screen.id}`}
                variant={"outline"}
                size={"sm"}
                onClick={() => onAddScreen(index)}
              >
                Ajouter un ecran
              </Button>
            ) : null}
            <Card key={`screen_${screen.id}`} className="w-full bg-[#f8f8f8]">
              <CardHeader>
                <CardTitle>
                  <h3>
                    Ecran type : {screenTypeMap[screen.type] ?? "Inconnu"}{" "}
                    {screen.subType == null ? "" : `(${screen.subType})`}
                  </h3>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className={"flex flex-col gap-2"}>
                  <AppInput label={"id"} JSONKey={`${JSONKey}.ecrans.${index}.id`} />
                  <AppInput
                    label={"Titre ecran"}
                    JSONKey={`${JSONKey}.ecrans.${index}.titreEcran.fr`}
                  />
                  <Screen
                    key={screen.id ?? index}
                    type={screen.type}
                    subType={screen.subType}
                    JSONKey={`${JSONKey}.ecrans.${index}`}
                  />
                  <DeleteButton
                    label={"Supprimer écran"}
                    confirmMessage={`Supprimer definitivement l'écran ${screen.id} ${screen.titreEcran?.fr ?? ""}`}
                    onDelete={() => {
                      onDeleteScreen(screen.id);
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          </>
        );
      })}
      <Button
        variant={"outline"}
        size={"sm"}
        onClick={() => onAddScreen((screens ?? []).findLastIndex(() => true) + 1)}
      >
        Ajouter un ecran
      </Button>
    </div>
  );
};

export default Screens;
