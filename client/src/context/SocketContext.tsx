import {
  useContext,
  createContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import socketio from "socket.io-client";

type ContextTypes = {
  socket: ReturnType<typeof socketio> | null;
};

export const SocketContext = createContext<ContextTypes>({
  socket: null,
});

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const [socket, setSocket] = useState<ReturnType<typeof socketio> | null>(
    null
  );

  useEffect(() => {
    setSocket(socketio("http://localhost:8000"));
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
