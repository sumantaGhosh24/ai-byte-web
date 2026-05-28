import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import * as Sentry from "@sentry/react";
import { BrowserRouter } from "react-router-dom";

import "./global.css";

import App from "./App.tsx";
import { ThemeProvider } from "./components/global/theme-provider.tsx";
import AppClerkProvider from "./providers/clerk-provider.tsx";
import AppQueryProvider from "./providers/query-provider";
import { Toaster } from "./components/ui/sonner";

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  sendDefaultPii: true,
  integrations: [
    Sentry.browserTracingIntegration(),
    // Sentry.replayIntegration({
    //   maskAllText: false,
    //   maskAllInputs: false,
    //   blockAllMedia: false,
    // }),
  ],
  tracesSampleRate: 1.0,
  // replaysSessionSampleRate: 1.0,
  // replaysOnErrorSampleRate: 1.0,
  enableLogs: true,
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <AppClerkProvider>
          <AppQueryProvider>
            <App />
            <Toaster richColors position="top-right" />
          </AppQueryProvider>
        </AppClerkProvider>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
);
