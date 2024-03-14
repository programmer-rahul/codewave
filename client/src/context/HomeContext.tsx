import {
  useContext,
  createContext,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

type ContextTypes = {
  userInputs: { username: string; roomId: string };
  roomId: string;

  setRoomId: Dispatch<SetStateAction<string>>;
  setUserInputs: Dispatch<SetStateAction<{ username: string; roomId: string }>>;
};

export const HomeContext = createContext<ContextTypes>({
  userInputs: { username: "", roomId: "" },
  roomId: "",
  setRoomId: () => {},
  setUserInputs: () => {},
});

export const HomeProvider = ({ children }: { children: ReactNode }) => {
  const [userInputs, setUserInputs] = useState({
    username: "",
    roomId: "",
  });
  const [roomId, setRoomId] = useState("");

  return (
    <HomeContext.Provider
      value={{ roomId, setRoomId, userInputs, setUserInputs }}
    >
      {children}
    </HomeContext.Provider>
  );
};

export const useHome = () => useContext(HomeContext);
