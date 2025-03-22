import { useJSONPartState } from "@/JSONStorage";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import AppInput from "@/forms/AppInput";
import { type ReactElement, useCallback } from "react";

const DragTextElements = <Key extends string>({ JSONKey }: { JSONKey: Key }): ReactElement => {
  const [value, setValue] = useJSONPartState<Key>(JSONKey);

  const onAdd = useCallback(() => {
    setValue((prev) => {
      const length = (prev ?? []).length;
      return length >= 5 ? prev : [...(prev ?? []), { id: `drag_text_${length + 1}` }];
    });
  }, [setValue]);

  return (
    <div className={"flex flex-col gap-2"}>
      {(value ?? []).map((element, index) => (
        <Card key={index} className="w-[350px]">
          <CardContent>
            <AppInput label={"Id"} JSONKey={`${JSONKey}.${index}.id`} type={"number"} />
            <AppInput label={"Texte"} JSONKey={`${JSONKey}.${index}.texte.fr`} />
            <AppInput label={"Drop id"} JSONKey={`${JSONKey}.${index}.drop`} />
          </CardContent>
        </Card>
      ))}
      {(value ?? []).length >= 5 ? null : (
        <Button disabled={(value ?? []).length >= 5} onClick={onAdd}>
          Add
        </Button>
      )}
    </div>
  );
};

export default DragTextElements;
