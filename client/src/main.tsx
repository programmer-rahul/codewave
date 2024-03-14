import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Toaster } from "react-hot-toast";
import { AppProvider } from "./context/AppContext.tsx";
import { SocketProvider } from "./context/SocketContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AppProvider>
    <SocketProvider>
      <Toaster />
      <App />
    </SocketProvider>
  </AppProvider>
);
