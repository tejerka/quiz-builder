import { Button } from "@/components/ui/button";
import { type ReactElement, useCallback } from "react";

const DeleteButton = ({
  onDelete,
  label,
  confirmMessage,
}: { onDelete: () => void; label?: string; confirmMessage?: string }): ReactElement => {
  const onCLick = useCallback(() => {
    if (confirm(confirmMessage ?? "Destroy this element")) {
      onDelete();
    }
  }, [onDelete]);
  return (
    <Button className="w-[150px] self-end" onClick={onCLick} variant={"destructive"}>
      {label ?? "Supprimer"}
    </Button>
  );
};

export default DeleteButton;
