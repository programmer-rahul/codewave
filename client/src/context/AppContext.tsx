import {
  useContext,
  createContext,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

type Client = {
  username: string;
  socketId: string;
};
export type Tab = "clients" | "files" | "chat" | "setting";

export type MessageType = {
  message: string;
  username: string;
  owner?: boolean;
};

type ContextTypes = {
  username: string;
  roomId: string;
  allClients: [Client] | [];
  selectedTab: Tab;

  // chat
  chatMessages: MessageType[] | [];

  setUsername: Dispatch<SetStateAction<string>>;
  setRoomId: Dispatch<SetStateAction<string>>;
  setAllClients: Dispatch<SetStateAction<[Client] | []>>;
  setSelectedTab: Dispatch<SetStateAction<Tab>>;
  setChatMessages: Dispatch<SetStateAction<MessageType[] | []>>;
};

export const AppContext = createContext<ContextTypes>({
  username: "",
  roomId: "",
  allClients: [],
  selectedTab: "clients",
  chatMessages: [],

  setRoomId: () => {},
  setUsername: () => {},
  setAllClients: () => {},
  setSelectedTab: () => {},
  setChatMessages: () => {},
});

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [username, setUsername] = useState("");
  const [roomId, setRoomId] = useState("");
  const [allClients, setAllClients] = useState<[Client] | []>([]);

  const [selectedTab, setSelectedTab] = useState<Tab>("clients");

  // chat
  const [chatMessages, setChatMessages] = useState<MessageType[] | []>([]);

  return (
    <AppContext.Provider
      value={{
        roomId,
        setRoomId,
        username,
        setUsername,
        allClients,
        setAllClients,
        selectedTab,
        setSelectedTab,

        // chat
        chatMessages,
        setChatMessages,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
