import { useJSONPartState } from "@/JSONStorage";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { type ComponentProps, type ReactElement, useCallback } from "react";

const AppTextArea = <Key extends string>({
  label,
  JSONKey,
}: { label: string; JSONKey: Key }): ReactElement => {
  const [value, setValue] = useJSONPartState<Key>(JSONKey);
  const onChange = useCallback<Required<ComponentProps<typeof Textarea>>["onChange"]>(
    (event) => {
      let newValue = event.target.value as unknown as typeof value;

      if (newValue === "") {
        newValue = null;
      }

      setValue(newValue);
    },
    [setValue],
  );

  return (
    <div className={"flex gap-2"}>
      <Label>{label}:</Label>
      <Textarea value={value} onChange={onChange} className={"bg-white"} />
    </div>
  );
};

export default AppTextArea;
