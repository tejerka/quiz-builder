import { useJSONPartState } from "@/JSONStorage";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import AppInput from "@/forms/AppInput";
import { type ReactElement, useCallback } from "react";

const DropElements = <Key extends string>({ JSONKey }: { JSONKey: Key }): ReactElement => {
  const [value, setValue] = useJSONPartState<Key>(JSONKey);

  const onAdd = useCallback(() => {
    setValue((prev) => {
      const length = (prev ?? []).length;
      return length >= 5 ? prev : [...(prev ?? []), { id: `drop_${length + 1}` }];
    });
  }, [setValue]);

  return (
    <div className={"flex flex-col gap-2"}>
      {(value ?? []).map((element, index) => (
        <Card key={index}>
          <CardContent className={"flex flex-col gap-2"}>
            <AppInput label={"Id"} JSONKey={`${JSONKey}.${index}.id`} />
            <AppInput label={"Image"} JSONKey={`${JSONKey}.${index}.image`} />
          </CardContent>
        </Card>
      ))}
      {(value ?? []).length >= 5 ? null : (
        <Button disabled={(value ?? []).length >= 5} onClick={onAdd} variant={"outline"}>
          Ajouter drop element
        </Button>
      )}
    </div>
  );
};

export default DropElements;
