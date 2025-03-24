import { useJSONPartState } from "@/JSONStorage";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import AppInput from "@/forms/AppInput";
import AppTextArea from "@/forms/AppTextArea";
import DeleteButton from "@/forms/DeleteButton";
import { type ReactElement, useCallback } from "react";

const Sort = <Key extends string>({
  JSONKey,
  ElementComponent,
}: { JSONKey: Key; ElementComponent: (props: { JSONKey: Key }) => ReactElement }): ReactElement => {
  const [value, setValue] = useJSONPartState<Key>(JSONKey);

  const onAdd = useCallback(() => {
    setValue((prev) => {
      const length = (prev ?? []).length;
      return length >= 5 ? prev : [...(prev ?? []), { id: `classement_${length + 1}` }];
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
            <ElementComponent JSONKey={`${JSONKey}.${index}`} />
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

export default Sort;
