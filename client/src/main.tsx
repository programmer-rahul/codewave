import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { SocketProvider } from "./context/SocketContext.tsx";
import { Toaster } from "react-hot-toast";
import { AppProvider } from "./context/AppContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AppProvider>
    <SocketProvider>
      <Toaster />
      <App />
    </SocketProvider>
  </AppProvider>
);
