import HomePage from "./pages/HomePage";
import CodePage from "./pages/CodePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/code/:roomId" element={<CodePage />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
