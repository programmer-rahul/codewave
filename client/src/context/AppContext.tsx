import {
  useContext,
  createContext,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

interface ClientInterface {
  username: string;
  socketId: string;
}
export type TabType = "clients" | "files" | "chat" | "setting";

export interface MessageInterface {
  message: string;
  username: string;
  owner?: boolean;
}

type ContextTypes = {
  username: string;
  roomId: string;
  allClients: [ClientInterface] | [];
  selectedTab: TabType;

  // chat
  chatMessages: MessageInterface[] | [];
  unreadMessageCount: number;

  connectionStatus: boolean;

  setUsername: Dispatch<SetStateAction<string>>;
  setRoomId: Dispatch<SetStateAction<string>>;
  setAllClients: Dispatch<SetStateAction<[ClientInterface] | []>>;
  setSelectedTab: Dispatch<SetStateAction<TabType>>;
  setChatMessages: Dispatch<SetStateAction<MessageInterface[] | []>>;
  setUnreadMessageCount: Dispatch<SetStateAction<number>>;

  setConnectionStatus: Dispatch<SetStateAction<boolean>>;
};

export const AppContext = createContext<ContextTypes>({
  username: "",
  roomId: "",
  allClients: [],
  selectedTab: "clients",
  chatMessages: [],
  unreadMessageCount: 0,
  connectionStatus: false,

  setRoomId: () => {},
  setUsername: () => {},
  setAllClients: () => {},
  setSelectedTab: () => {},
  setChatMessages: () => {},
  setUnreadMessageCount: () => {},
  setConnectionStatus: () => {},
});

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [username, setUsername] = useState("");
  const [roomId, setRoomId] = useState("");
  const [allClients, setAllClients] = useState<[ClientInterface] | []>([]);

  const [selectedTab, setSelectedTab] = useState<TabType>("files");

  // chat
  const [chatMessages, setChatMessages] = useState<MessageInterface[] | []>([]);
  const [unreadMessageCount, setUnreadMessageCount] = useState(0);

  const [connectionStatus, setConnectionStatus] = useState(true);

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

        connectionStatus,
        setConnectionStatus,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
