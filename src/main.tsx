import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import { ChatWidget } from "./app/components/ChatWidget";
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(
  <>
    <App />
    <ChatWidget />
  </>,
);
