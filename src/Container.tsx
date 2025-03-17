import AppSidebar from "@/AppSidebar";
import type { quizSchema } from "@/JSONSchema";
import { type DeepPartial, useJSONPartState } from "@/JSONStorage";
import QuizCard from "@/QuizCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SidebarProvider } from "@/components/ui/sidebar";
import { type ReactElement, useState } from "react";
import type { z } from "zod";

const Container = (): ReactElement => {
  const [quizArray] = useJSONPartState("quiz");
  const [selectedQuiz, setSelectedQuiz] = useState<DeepPartial<z.infer<typeof quizSchema>> | null>(
    null,
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
                return <QuizCard key={quiz?.id ?? index} quiz={quiz} />;
              })}
            </div>
          </ScrollArea>
        </div>
        <div className={"flex-col w-full"}>
          {selectedQuiz === null ? null : (
            <ScrollArea className={"h-screen w-full"}>toto</ScrollArea>
          )}
        </div>
      </main>
    </SidebarProvider>
  );
};

export default Container;
