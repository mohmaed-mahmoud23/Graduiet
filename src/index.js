import { StrictMode } from "react"; // لتفعيل التحذيرات والتنبيهات في React
import { createRoot } from "react-dom/client"; // طريقة العرض الجديدة في React 18
import "./index.css";
import App from "./App";

// ✅ استيراد DndProvider و HTML5Backend
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

// ✅ استيراد AuthProvider
import { AuthProvider } from "./context/AuthContext"; // تأكد من المسار حسب مكان الملف

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <DndProvider backend={HTML5Backend}>
        <App />
      </DndProvider>
    </AuthProvider>
  </StrictMode>
);
