import {
  useContext,
  createContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import socketio from "socket.io-client";
import { LocalStorage } from "../utils";

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
    const user = LocalStorage.get("codesync-user");

    const newUser = {
      userId: "",
      username: "",
      room: null,
    };

    if (!user) {
      newUser.userId = String(Math.floor(Math.random() * 200));
      LocalStorage.set("codesync-user", newUser);
    }

    setSocket(
      socketio("http://localhost:8000", {
        auth: {
          user: user ? user : newUser,
        },
      })
    );
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
