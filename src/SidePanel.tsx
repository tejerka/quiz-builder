import { type ReactElement, useCallback } from "react";
import styled from "styled-components";
import JSONSchema from "./JSONSchema";
import useJSONStorage from "./JSONStorage";
import type { PropsWithClassName } from "./PropsWithClassName";

const SidePanel = styled(({ className }: PropsWithClassName): ReactElement => {
  const JSONStorage = useJSONStorage();
  const onImportClick = useCallback(() => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "application/JSON";
    input.multiple = false;
    input.onchange = (e) => {
      const file = e.target?.files[0];

      if (!(file instanceof Blob)) {
        throw new Error("Invalid file");
      }

      file.text().then((text) => {
        const JSONData = JSON.parse(text);
        JSONStorage.next(JSONSchema.parse(JSONData));
      });
    };
    input.click();
  }, [JSONStorage]);

  const onExportClick = useCallback(() => {
    const link = document.createElement("a");
    link.href = `data:text/plain;charset=utf-8,${encodeURIComponent(JSON.stringify(JSONStorage.value))}`;
    link.download = "new.json";
    link.target = "_blank";

    link.click();
  }, [JSONStorage]);

  return (
    <div className={className}>
      <button type={"button"} onClick={onImportClick}>
        import
      </button>
      <button type={"button"} onClick={onExportClick}>
        export
      </button>
    </div>
  );
})`
    display: flex;
    flex-direction: column;
    width: 15%;
    height: 100%;
    padding: 20px;
    gap: 10px;
`;

export default SidePanel;
