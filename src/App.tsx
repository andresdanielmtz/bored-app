
import Main from "./views/main/main.tsx";
import Settings from "./views/settings/settings.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path = "/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
      
    </>
  );
}
