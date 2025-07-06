import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { startMSW } from "./lib/msw/browser";

// Start MSW for API mocking
startMSW()
  .then(() => {
    createRoot(document.getElementById("root")!).render(<App />);
  })
  .catch((error) => {
    console.warn('Failed to start MSW, proceeding without mocking:', error);
    createRoot(document.getElementById("root")!).render(<App />);
  });
