import {
  useContext,
  createContext,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { Socket } from "socket.io-client";

type ContextTypes = {
  username: string;
  roomId: string;
  socket: Socket<DefaultEventsMap, DefaultEventsMap> | null;

  setUsername: Dispatch<SetStateAction<string>>;
  setRoomId: Dispatch<SetStateAction<string>>;
  setSocket: Dispatch<
    SetStateAction<Socket<DefaultEventsMap, DefaultEventsMap> | null>
  >;
};

export const AppContext = createContext<ContextTypes>({
  username: "",
  roomId: "",
  socket: null,

  setRoomId: () => {},
  setUsername: () => {},
  setSocket: () => {},
});

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [username, setUsername] = useState("");
  const [roomId, setRoomId] = useState("");
  const [socket, setSocket] = useState<Socket<
    DefaultEventsMap,
    DefaultEventsMap
  > | null>(null);

  return (
    <AppContext.Provider
      value={{ roomId, setRoomId, username, setUsername, socket, setSocket }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
