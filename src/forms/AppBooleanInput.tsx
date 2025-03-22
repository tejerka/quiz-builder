import { useJSONPartState } from "@/JSONStorage";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { type ComponentProps, type ReactElement, useCallback } from "react";

const AppBooleanInput = <Key extends string>({
  label,
  JSONKey,
}: { label: string; JSONKey: Key }): ReactElement => {
  const [value, setValue] = useJSONPartState<Key>(JSONKey);
  const onChange = useCallback<Required<ComponentProps<typeof Checkbox>>["onCheckedChange"]>(
    (checked) => {
      const newValue = checked as unknown as typeof value;
      setValue(newValue);
    },
    [setValue],
  );

  return (
    <div className={"flex gap-2"}>
      <Label>{label}:</Label>
      <Checkbox checked={value ?? false} onCheckedChange={onChange} />
    </div>
  );
};

export default AppBooleanInput;
