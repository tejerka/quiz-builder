import type { quizSchema } from "@/JSONSchema";
import type { DeepPartial } from "@/JSONStorage";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import AppInput from "@/forms/AppInput";
import AppTextArea from "@/forms/AppTextArea";
import DeleteButton from "@/forms/DeleteButton";
import { type ReactElement, useCallback } from "react";
import type z from "zod";

const QuizCard = <Key extends string>({
  quiz,
  selected,
  onSelect,
  JSONKey,
  onDeleteQuiz,
  setSelectedQuizId,
}: {
  quiz: DeepPartial<z.infer<typeof quizSchema>>;
  selected: boolean;
  onSelect?: (id: string) => void;
  onDeleteQuiz: (id: string) => void;
  setSelectedQuizId: (id: string) => void;
  JSONKey: Key;
}): ReactElement => {
  const onCLick = useCallback(() => {
    if (quiz?.id == null) {
      return;
    }
    onSelect?.(quiz?.id);
  }, [onSelect, quiz.id]);
  const onIdChange = useCallback(
    (id: string) => {
      if (!selected) {
        return;
      }
      setSelectedQuizId(id);
    },
    [setSelectedQuizId],
  );

  const background = selected ? "bg-blue-300" : "bg-accent";

  return (
    <Card className={`w-[350px] ${background}`}>
      <CardHeader>
        <CardTitle>
          <AppInput label={"id"} JSONKey={`${JSONKey}.id`} onChange={onIdChange} />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className={"flex flex-col gap-2"}>
          <Label>Choix</Label>
          <AppInput label={"Titre"} JSONKey={`${JSONKey}.choix.titre.fr`} />
          <AppInput label={"Visuel"} JSONKey={`${JSONKey}.choix.visuel`} />
          <AppTextArea label={"Texte"} JSONKey={`${JSONKey}.choix.texte.fr`} />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <div className="w-full flex justify-between">
          <Button variant="outline" onClick={onCLick}>
            Editer les écrans
          </Button>
          <span>nombres ecrans: {quiz.ecrans?.length ?? 0}</span>
        </div>
        <DeleteButton
          label={"Supprimer quiz"}
          confirmMessage={`Supprimer definitivement le quiz ${quiz.id}`}
          onDelete={() => {
            if (quiz?.id == null) {
              return;
            }
            onDeleteQuiz(quiz.id);
          }}
        />
      </CardFooter>
    </Card>
  );
};

export default QuizCard;
