import AppSidebar from "@/AppSidebar";
import { useJSONPartState } from "@/JSONStorage";
import QuizCard from "@/QuizCard";
import { useSelectQuiz } from "@/SelectedQuizStorage";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SidebarProvider } from "@/components/ui/sidebar";
import Screens from "@/screens/Screens";
import { type ReactElement, useCallback, useMemo } from "react";

const Container = (): ReactElement => {
  const [quizArray, setQuizArray] = useJSONPartState("quiz");
  const [selectedQuizId, setSelectedQuizId] = useSelectQuiz();

  const onSelect = useCallback((id: string) => setSelectedQuizId(id), [setSelectedQuizId]);
  const onAddQuiz = useCallback(
    (index: number) => {
      setQuizArray((prev) => {
        const newQuiz = {
          id: `Quiz_${prev?.length ?? 0}`,
        };
        return (prev ?? []).length === 0 ? [newQuiz] : prev?.toSpliced(index, 0, newQuiz);
      });
    },
    [setQuizArray],
  );
  const quizIndex = useMemo(() => {
    const index = (quizArray ?? [])?.findIndex((q) => q?.id === selectedQuizId) ?? null;
    return index === -1 ? null : index;
  }, [quizArray, selectedQuizId]);

  const onDeleteScreen = useCallback(
    (id: string) => {
      setQuizArray((prev) => {
        return (prev ?? []).filter((quiz) => quiz?.id !== id);
      });
    },
    [setQuizArray],
  );

  return (
    <SidebarProvider open={true}>
      <AppSidebar />
      <main className={"flex h-screen w-full"}>
        <div className={"flex-col"}>
          <ScrollArea className={"h-screen w-full p-4"}>
            <div className={"flex flex-col gap-2"}>
              {(quizArray ?? []).map((quiz, index) => {
                if (quiz === undefined) {
                  return null;
                }
                return (
                  <>
                    {index > 0 ? (
                      <Button
                        key={`button_${quiz?.id ?? index}`}
                        variant={"outline"}
                        onClick={() => onAddQuiz(index)}
                      >
                        Ajouter un quiz
                      </Button>
                    ) : null}
                    <QuizCard
                      key={`quiz_${quiz?.id ?? index}`}
                      quiz={quiz}
                      selected={quiz?.id === selectedQuizId}
                      onSelect={onSelect}
                      JSONKey={`quiz.${index}`}
                      onDeleteQuiz={onDeleteScreen}
                    />
                  </>
                );
              })}
              <Button
                variant={"outline"}
                onClick={() => onAddQuiz((quizArray ?? []).findLastIndex(() => true) + 1)}
              >
                Ajouter un quiz
              </Button>
            </div>
          </ScrollArea>
        </div>
        <div className={"flex-col w-full"}>
          {quizIndex === null ? (
            <h2>Sélectionnez un quiz</h2>
          ) : (
            <ScrollArea className={"h-screen w-full"}>
              <Screens JSONKey={`quiz.${quizIndex}`} />
            </ScrollArea>
          )}
        </div>
      </main>
    </SidebarProvider>
  );
};

export default Container;
