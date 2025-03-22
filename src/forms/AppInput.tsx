import { useJSONPartState } from "@/JSONStorage";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { type ComponentProps, type ReactElement, useCallback } from "react";

const AppInput = <Key extends string>({
  label,
  JSONKey,
  type,
}: { label: string; JSONKey: Key; type?: ComponentProps<typeof Input>["type"] }): ReactElement => {
  const [value, setValue] = useJSONPartState<Key>(JSONKey);
  const onChange = useCallback<Required<ComponentProps<typeof Input>>["onChange"]>(
    (event) => {
      const newValue = event.target.value as unknown as typeof value;

      if (newValue === "") {
        newValue = null;
      }

      if (type === "number") {
        newValue = +newValue;
      }

      setValue(newValue);
    },
    [setValue, type],
  );

  return (
    <div className={"flex gap-2"}>
      <Label>{label}:</Label>
      <Input type={type} value={value} onChange={onChange} />
    </div>
  );
};

export default AppInput;
