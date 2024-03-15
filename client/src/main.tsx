import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Toaster } from "react-hot-toast";
import { AppProvider } from "./context/AppContext.tsx";
import { SocketProvider } from "./context/SocketContext.tsx";
import { FileProvider } from "./context/FileContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AppProvider>
    <SocketProvider>
      <FileProvider>
        <Toaster />
        <App />
      </FileProvider>
    </SocketProvider>
  </AppProvider>
);
