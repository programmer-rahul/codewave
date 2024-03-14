import {
  useContext,
  createContext,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

type ContextTypes = {
  username: string;
  roomId: string;

  setUsername: Dispatch<SetStateAction<string>>;
  setRoomId: Dispatch<SetStateAction<string>>;
};

export const AppContext = createContext<ContextTypes>({
  username: "",
  roomId: "",
  setRoomId: () => {},
  setUsername: () => {},
});

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [username, setUsername] = useState("");
  const [roomId, setRoomId] = useState("");

  return (
    <AppContext.Provider value={{ roomId, setRoomId, username, setUsername }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
