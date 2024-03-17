import {
  useContext,
  createContext,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

interface Client {
  username: string;
  socketId: string;
}
export type Tab = "clients" | "files" | "chat" | "setting";

export interface MessageType {
  message: string;
  username: string;
  owner?: boolean;
}

export interface Folder {
  folderName: string;
  files: string[];
  subFolders?: { folderName: string; files: string[] }[];
}

type ContextTypes = {
  username: string;
  roomId: string;
  allClients: [Client] | [];
  selectedTab: Tab;

  // chat
  chatMessages: MessageType[] | [];
  unreadMessageCount: number;

  connectionStatus: boolean;

  folderStructure: Folder[];

  setUsername: Dispatch<SetStateAction<string>>;
  setRoomId: Dispatch<SetStateAction<string>>;
  setAllClients: Dispatch<SetStateAction<[Client] | []>>;
  setSelectedTab: Dispatch<SetStateAction<Tab>>;
  setChatMessages: Dispatch<SetStateAction<MessageType[] | []>>;
  setUnreadMessageCount: Dispatch<SetStateAction<number>>;

  setConnectionStatus: Dispatch<SetStateAction<boolean>>;

  setFolderStructure: Dispatch<SetStateAction<Folder[]>>;
};

export const AppContext = createContext<ContextTypes>({
  username: "",
  roomId: "",
  allClients: [],
  selectedTab: "clients",
  chatMessages: [],
  unreadMessageCount: 0,
  connectionStatus: false,
  folderStructure: [],

  setRoomId: () => {},
  setUsername: () => {},
  setAllClients: () => {},
  setSelectedTab: () => {},
  setChatMessages: () => {},
  setUnreadMessageCount: () => {},
  setConnectionStatus: () => {},
  setFolderStructure: () => {},
});

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [username, setUsername] = useState("");
  const [roomId, setRoomId] = useState("");
  const [allClients, setAllClients] = useState<[Client] | []>([]);

  const [selectedTab, setSelectedTab] = useState<Tab>("files");

  // chat
  const [chatMessages, setChatMessages] = useState<MessageType[] | []>([]);
  const [unreadMessageCount, setUnreadMessageCount] = useState(0);

  const [connectionStatus, setConnectionStatus] = useState(false);

  const [folderStructure, setFolderStructure] = useState([
    {
      folderName: "Untitled",
      files: ["index.js"],
    },
  ]);

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

        folderStructure,
        setFolderStructure,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
