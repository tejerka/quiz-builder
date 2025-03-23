import { useJSONPartState } from "@/JSONStorage";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import AppInput from "@/forms/AppInput";
import DeleteButton from "@/forms/DeleteButton";
import { type ReactElement, useCallback } from "react";

const DragImageElements = <Key extends string>({ JSONKey }: { JSONKey: Key }): ReactElement => {
  const [value, setValue] = useJSONPartState<Key>(JSONKey);

  const onAdd = useCallback(() => {
    setValue((prev) => {
      const length = (prev ?? []).length;
      return length >= 10 ? prev : [...(prev ?? []), { id: length + 1 }];
    });
  }, [setValue]);

  const onDelete = useCallback(
    (index: number) => {
      setValue((prev) => {
        return (prev ?? []).filter((_, i) => i !== index);
      });
    },
    [setValue],
  );

  return (
    <div className={"flex flex-col gap-2"}>
      {(value ?? []).map((element, index) => (
        <Card key={index}>
          <CardContent className={"flex flex-col gap-2"}>
            <AppInput label={"Id"} JSONKey={`${JSONKey}.${index}.id`} type={"number"} />
            <AppInput label={"Image"} JSONKey={`${JSONKey}.${index}.image`} />
            <AppInput label={"Image miniature"} JSONKey={`${JSONKey}.${index}.image_miniature`} />
            <AppInput label={"Drop id"} JSONKey={`${JSONKey}.${index}.drop`} />
            <DeleteButton
              onDelete={() => {
                onDelete(index);
              }}
            />
          </CardContent>
        </Card>
      ))}
      {(value ?? []).length >= 10 ? null : (
        <Button disabled={(value ?? []).length >= 10} onClick={onAdd} variant={"outline"}>
          Ajouter drag element
        </Button>
      )}
    </div>
  );
};

export default DragImageElements;
