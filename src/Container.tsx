import AppSidebar from "@/AppSidebar";
import { useJSONPartState } from "@/JSONStorage";
import QuizCard from "@/QuizCard";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SidebarProvider } from "@/components/ui/sidebar";
import Screens from "@/screens/Screens";
import { type ReactElement, useCallback, useState } from "react";

const Container = (): ReactElement => {
  const [quizArray] = useJSONPartState("quiz");
  const [selectedQuizId, setSelectedQuizId] = useState<string | null>(null);

  const onSelect = useCallback((id: string) => setSelectedQuizId(id), []);

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
                      <Button key={`button_${quiz?.id ?? index}`} variant={"outline"}>
                        Ajouter un quiz
                      </Button>
                    ) : null}
                    <QuizCard
                      key={`quiz_${quiz?.id ?? index}`}
                      quiz={quiz}
                      selected={quiz?.id === selectedQuizId}
                      onSelect={onSelect}
                    />
                  </>
                );
              })}
              <Button variant={"outline"}>Ajouter un quiz</Button>
            </div>
          </ScrollArea>
        </div>
        <div className={"flex-col w-full"}>
          {selectedQuizId === null ? null : (
            <ScrollArea className={"h-screen w-full"}>
              <Screens quizId={selectedQuizId} />
            </ScrollArea>
          )}
        </div>
      </main>
    </SidebarProvider>
  );
};

export default Container;
