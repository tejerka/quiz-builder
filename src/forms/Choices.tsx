import { useJSONPartState } from "@/JSONStorage";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import AppBooleanInput from "@/forms/AppBooleanInput";
import AppInput from "@/forms/AppInput";
import DeleteButton from "@/forms/DeleteButton";
import { type ReactElement, useCallback } from "react";

const Choices = <Key extends string>({ JSONKey }: { JSONKey: Key }): ReactElement => {
  const [value, setValue] = useJSONPartState<Key>(JSONKey);

  const onAdd = useCallback(() => {
    setValue((prev) => {
      const length = (prev ?? []).length;
      return length >= 5 ? prev : [...(prev ?? []), { id: length + 1, reponse: false }];
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
        <Card key={index} className="w-[350px]">
          <CardContent className={"flex flex-col gap-2"}>
            <AppInput label={"Id"} JSONKey={`${JSONKey}.${index}.id`} type={"number"} />
            <AppInput label={"Image"} JSONKey={`${JSONKey}.${index}.image`} />
            <AppInput label={"Texte"} JSONKey={`${JSONKey}.${index}.texte.fr`} />
            <AppBooleanInput label={"Reponse"} JSONKey={`${JSONKey}.${index}.reponse`} />
            <DeleteButton
              onDelete={() => {
                onDelete(index);
              }}
            />
          </CardContent>
        </Card>
      ))}
      {(value ?? []).length >= 5 ? null : (
        <Button
          className="w-[350px]"
          disabled={(value ?? []).length >= 5}
          onClick={onAdd}
          variant={"outline"}
        >
          Ajouter element
        </Button>
      )}
    </div>
  );
};

export default Choices;
