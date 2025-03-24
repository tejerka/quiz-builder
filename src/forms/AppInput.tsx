import { useJSONPartState } from "@/JSONStorage";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { type ComponentProps, type ReactElement, useCallback } from "react";

const AppInput = <Key extends string>({
  label,
  JSONKey,
  type,
  onChange: onChangeFromProps,
}: {
  label: string;
  JSONKey: Key;
  type?: ComponentProps<typeof Input>["type"];
  onChange?: (id: string) => void;
}): ReactElement => {
  const [value, setValue] = useJSONPartState<Key>(JSONKey);
  const onChange = useCallback<Required<ComponentProps<typeof Input>>["onChange"]>(
    (event) => {
      let newValue = event.target.value as unknown as typeof value;

      if (newValue === "" || newValue == null) {
        newValue = null;
      }

      if (type === "number" && newValue !== null) {
        newValue = +newValue;
      }

      onChangeFromProps?.(newValue);
      setValue(newValue);
    },
    [setValue, type, onChangeFromProps],
  );

  return (
    <div className={"flex gap-2"}>
      <Label>{label}:</Label>
      <Input type={type} value={value ?? ""} onChange={onChange} className={"bg-white"} />
    </div>
  );
};

export default AppInput;
