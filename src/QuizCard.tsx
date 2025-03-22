import type { quizSchema } from "@/JSONSchema";
import type { DeepPartial } from "@/JSONStorage";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { type ReactElement, useCallback } from "react";
import type z from "zod";

const QuizCard = ({
  quiz,
  selected,
  onSelect,
}: {
  quiz: DeepPartial<z.infer<typeof quizSchema>>;
  selected: boolean;
  onSelect?: (id: string) => void;
}): ReactElement => {
  const onCLick = useCallback(() => {
    if (quiz?.id == null) {
      return;
    }
    onSelect?.(quiz?.id);
  }, [onSelect, quiz.id]);

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>{quiz.id}</CardTitle>
      </CardHeader>
      <CardContent>
        <span>nombres ecrans: {quiz.ecrans?.length}</span>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onCLick}>
          Editer les écrans
        </Button>
      </CardFooter>
    </Card>
  );
};

export default QuizCard;
