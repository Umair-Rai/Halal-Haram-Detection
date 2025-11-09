import { Routes, Route } from "react-router-dom";

import { AppLayout } from "./layouts/AppLayout.jsx";
import { HomePage } from "./pages/Home.jsx";
import { UploadPage } from "./pages/Upload.jsx";
import { ChatbotPage } from "./pages/Chatbot.jsx";
import { GuidePage } from "./pages/Guide.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/chatbot" element={<ChatbotPage />} />
        <Route path="/guide" element={<GuidePage />} />
      </Route>
    </Routes>
  );
}