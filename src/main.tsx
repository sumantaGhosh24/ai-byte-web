import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./global.css";

import App from "./App.tsx";
import { ThemeProvider } from "./components/global/theme-provider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <App />
    </ThemeProvider>
  </StrictMode>,
);
