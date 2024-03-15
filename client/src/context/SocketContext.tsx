import { createContext, ReactNode, useState } from "react";
import socketio from "socket.io-client";

type ContextTypes = {
  socket: ReturnType<typeof socketio> | null;
  connectSocket: () => void;
  disconnectSocket: () => void;
};

export const SocketContext = createContext<ContextTypes>({
  socket: null,
  connectSocket: () => {},
  disconnectSocket: () => {},
});

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const [socket, setSocket] = useState<ReturnType<typeof socketio> | null>(
    null
  );
  const connectSocket = () => setSocket(socketio("http://localhost:8000"));
  const disconnectSocket = () => setSocket(null);

  return (
    <SocketContext.Provider value={{ socket, disconnectSocket, connectSocket }}>
      {children}
    </SocketContext.Provider>
  );
};
