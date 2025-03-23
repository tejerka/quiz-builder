import JSONSchema from "@/JSONSchema";
import useJSONStorage from "@/JSONStorage";
import { Button } from "@/components/ui/button";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from "@/components/ui/sidebar";
import DeleteButton from "@/forms/DeleteButton";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

type State = "imported" | "empty";

const getStateFromJSONValue = (JSONValue: ReturnType<typeof useJSONStorage>["value"]): State => {
  if (JSONValue !== null) {
    return "imported";
  }

  return "empty";
};

const AppSidebar = () => {
  const JSONStorage = useJSONStorage();
  const [state, setState] = useState<State>(getStateFromJSONValue(JSONStorage.value));
  const onImportClick = useCallback(() => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "application/JSON";
    input.multiple = false;
    input.onchange = (e) => {
      const file = e.target?.files[0];

      if (!(file instanceof Blob)) {
        throw new Error("Invalid file");
      }

      file.text().then((text) => {
        let JSONData = {};
        try {
          JSONData = JSON.parse(text);
        } catch (e) {
          toast("JSON invalide");
          return;
        }
        JSONStorage.next(JSONData);
      });
    };
    input.click();
  }, [JSONStorage]);

  const onExportClick = useCallback(() => {
    const link = document.createElement("a");
    link.href = `data:text/plain;charset=utf-8,${encodeURIComponent(JSON.stringify(JSONStorage.value, null, 2))}`;
    link.download = "new.json";
    link.target = "_blank";

    link.click();
  }, [JSONStorage]);

  const onClearClick = useCallback(() => {
    JSONStorage.next(null);
  }, [JSONStorage]);

  useEffect(() => {
    const subscription = JSONStorage.subscribe((nextValue) => {
      setState(getStateFromJSONValue(nextValue));
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [JSONStorage]);

  const date = !Number.isInteger(import.meta.env.VITE_APP_BUILD_TIMESTAMP)
    ? "unknown"
    : new Date(import.meta.env.VITE_APP_BUILD_TIMESTAMP).toDateString();

  return (
    <Sidebar>
      <SidebarHeader>
        <h1 className={"p-2 text-xl font-semibold"}>Quiz Builder</h1>
      </SidebarHeader>
      <SidebarContent className={"p-4"}>
        <Button onClick={onImportClick}>import</Button>
        <Button disabled={state !== "imported"} onClick={onExportClick}>
          export
        </Button>
        <DeleteButton
          label={"Tout supprimer"}
          confirmMessage={"Tout supprimer definitivement ?"}
          onDelete={onClearClick}
        />
      </SidebarContent>
      <SidebarFooter>
        <div className={"flex flex-col gap-1 justify-center"}>
          <span className={"flex text-center"}>
            Version: {import.meta.env.VITE_APP_VERSION ?? "dev"}
          </span>
          <span>Date: {date}</span>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
