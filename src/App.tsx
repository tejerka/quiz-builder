import type { ReactElement } from "react";
import Container from "./Container";
import { JSONStorageProvider } from "./JSONStorage";
import { SessionStorageProvider } from "./SessionStorage";

const App = (): ReactElement => {
  return (
    <SessionStorageProvider>
      <JSONStorageProvider>
        <Container />
      </JSONStorageProvider>
    </SessionStorageProvider>
  );
};

export default App;
