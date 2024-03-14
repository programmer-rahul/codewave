import HomePage from "./pages/HomePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CodePageLayout from "./components/CodePageLayout";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/code/:roomId" element={<CodePageLayout />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
