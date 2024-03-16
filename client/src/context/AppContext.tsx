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
  isSeen?: boolean;
};

type ContextTypes = {
  username: string;
  roomId: string;
  allClients: [Client] | [];
  selectedTab: Tab;

  // chat
  chatMessages: MessageType[] | [];
  unreadMessageCount: number;

  setUsername: Dispatch<SetStateAction<string>>;
  setRoomId: Dispatch<SetStateAction<string>>;
  setAllClients: Dispatch<SetStateAction<[Client] | []>>;
  setSelectedTab: Dispatch<SetStateAction<Tab>>;
  setChatMessages: Dispatch<SetStateAction<MessageType[] | []>>;
  setUnreadMessageCount: Dispatch<SetStateAction<number>>;
};

export const AppContext = createContext<ContextTypes>({
  username: "",
  roomId: "",
  allClients: [],
  selectedTab: "clients",
  chatMessages: [],
  unreadMessageCount: 0,

  setRoomId: () => {},
  setUsername: () => {},
  setAllClients: () => {},
  setSelectedTab: () => {},
  setChatMessages: () => {},
  setUnreadMessageCount: () => {},
});

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [username, setUsername] = useState("");
  const [roomId, setRoomId] = useState("");
  const [allClients, setAllClients] = useState<[Client] | []>([]);

  const [selectedTab, setSelectedTab] = useState<Tab>("clients");

  // chat
  const [chatMessages, setChatMessages] = useState<MessageType[] | []>([]);
  const [unreadMessageCount, setUnreadMessageCount] = useState(0);

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
        unreadMessageCount,
        setUnreadMessageCount,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
