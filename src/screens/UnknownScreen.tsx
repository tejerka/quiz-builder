import type { ReactElement } from "react";

const UnknownScreen = <Key extends string>({ JSONKey }: { JSONKey: Key }): ReactElement => {
  return <span>Type d'ecran non supporté "{JSONKey}" </span>;
};

export default UnknownScreen;
