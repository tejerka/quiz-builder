import type { quizSchema } from "@/JSONSchema";
import type { DeepPartial } from "@/JSONStorage";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { ReactElement } from "react";
import type z from "zod";

const QuizCard = ({ quiz }: { quiz: DeepPartial<z.infer<typeof quizSchema>> }): ReactElement => {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>{quiz.id}</CardTitle>
      </CardHeader>
      <CardContent>{quiz.id}</CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
  );
};

export default QuizCard;
