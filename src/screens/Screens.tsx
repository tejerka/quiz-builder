import type { screenSchema } from "@/JSONSchema";
import useJSONStorage, { type DeepPartial } from "@/JSONStorage";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AppInput from "@/forms/AppInput";
import Screen from "@/screens/Screen";
import isEqual from "lodash.isequal";
import { type ReactElement, useEffect, useMemo, useState } from "react";
import type z from "zod";

const Screens = ({ quizId }: { quizId: string }): ReactElement => {
  const JSONStorage = useJSONStorage();
  const quizIndex = useMemo(
    () => (JSONStorage.value?.quiz ?? null)?.findIndex((q) => q?.id === quizId) ?? null,
    [JSONStorage, quizId],
  );
  const [screens, setScreens] = useState<DeepPartial<Array<z.infer<typeof screenSchema>>>>(
    JSONStorage.value?.quiz?.[quizIndex ?? -1]?.ecrans ?? [],
  );

  useEffect(() => {
    const subscription = JSONStorage.subscribe((nextValue) => {
      const nextState = JSONStorage.value?.quiz?.[quizIndex ?? -1]?.ecrans ?? [];
      setScreens((prevState) => (!isEqual(prevState, nextState) ? nextState : prevState));
    });
    return () => {
      subscription?.unsubscribe();
    };
  }, [quizIndex, JSONStorage]);

  if (quizIndex === null) {
    return <span>Error</span>;
  }

  return (
    <div className={"flex flex-col p-4 gap-4 justify-center items-center"}>
      {screens.map((screen, index) => {
        if (screen == null) {
          return null;
        }
        return (
          <Card key={screen.id} className="w-full">
            <CardHeader>
              <CardTitle>
                <div className={"flex flex-col gap-2"}>
                  <AppInput label={"id"} JSONKey={`quiz.${quizIndex}.ecrans.${index}.id`} />
                  <AppInput
                    label={"Titre ecran"}
                    JSONKey={`quiz.${quizIndex}.ecrans.${index}.titreEcran.fr`}
                  />
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={"flex flex-col gap-2"}>
                <Screen
                  key={screen.id ?? index}
                  type={screen.type}
                  subType={screen.subType}
                  JSONKey={`quiz.${quizIndex}.ecrans.${index}`}
                />
              </div>
            </CardContent>
          </Card>
        );
      })}
      <div className={"w-[100px]"}>
        <Button variant={"outline"} size={"sm"}>
          Ajouter un ecran
        </Button>
      </div>
    </div>
  );
};

export default Screens;
