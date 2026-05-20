import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import * as Sentry from "@sentry/react";

import "./global.css";

import App from "./App.tsx";
import { ThemeProvider } from "./components/global/theme-provider.tsx";
import SentryErrorFallback from "./components/global/sentry-error-fallback.tsx";

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  sendDefaultPii: true,
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration({
      maskAllText: false,
      maskAllInputs: false,
      blockAllMedia: false,
    }),
  ],
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 1.0,
  replaysOnErrorSampleRate: 1.0,
  enableLogs: true,
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Sentry.ErrorBoundary fallback={<SentryErrorFallback />}>
        <App />
      </Sentry.ErrorBoundary>
    </ThemeProvider>
  </StrictMode>,
);
