import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

const render = (): void => {
  const container = document.getElementById("root");
  if (container != null) {
    const root = createRoot(container);
    root.render(
      <StrictMode>
        <App />
      </StrictMode>,
    );
  } else {
    console.error("Root element not found");
  }
};

render();
