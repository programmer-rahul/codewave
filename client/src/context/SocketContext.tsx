import {
  useContext,
  createContext,
  ReactNode,
  useState,
  Dispatch,
} from "react";
import socketio from "socket.io-client";

type ContextTypes = {
  socket: ReturnType<typeof socketio> | null;
  setSocket: Dispatch<ReturnType<typeof socketio> | null>;
  initSocket: () => void;
};

export const SocketContext = createContext<ContextTypes>({
  socket: null,
  setSocket: () => {},
  initSocket: () => {},
});

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const [socket, setSocket] = useState<ReturnType<typeof socketio> | null>(
    null
  );
  const initSocket = () => {
    setSocket(socketio("http://localhost:8000"));
  };

  return (
    <SocketContext.Provider value={{ socket, setSocket, initSocket }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
