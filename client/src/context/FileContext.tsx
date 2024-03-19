import {
  useContext,
  createContext,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { FolderInterface, ResourceInterface } from "../interfaces/file";

type ContextTypes = {
  fileCode: string;
  projectStructure: FolderInterface[];
  selectedFile: string;
  selectedFolder: string;
  resourceType: ResourceInterface;

  setFileCode: Dispatch<SetStateAction<string>>;
  setSelectedFile: Dispatch<SetStateAction<string>>;
  setSelectedFolder: Dispatch<SetStateAction<string>>;
  setProjectStructure: Dispatch<SetStateAction<FolderInterface[]>>;
  setResourceType: Dispatch<SetStateAction<ResourceInterface>>;
};

export const FileContext = createContext<ContextTypes>({
  fileCode: "",
  projectStructure: [],
  selectedFile: "",
  selectedFolder: "",
  resourceType: {
    isCreating: false,
    type: "file",
  },

  setFileCode: () => {},
  setProjectStructure: () => {},
  setSelectedFile: () => {},
  setResourceType: () => {},
  setSelectedFolder: () => {},
});

const defaultFolders: FolderInterface[] = [
  {
    name: "folder1",
    id: Math.random().toString(36),
    files: [
      {
        name: "file1",
        id: Math.random().toString(36),
        content: "something here",
      },
    ],
    subFolders: [],
  },
  {
    name: "folder2",
    id: Math.random().toString(36),
    files: [
      {
        name: "file22",
        id: Math.random().toString(36),
        content: "something here",
      },
    ],
    subFolders: [
      {
        name: "subFolder",
        id: Math.random().toString(36),
        files: [
          {
            name: "subFile1",
            id: Math.random().toString(36),

            content: "something here",
          },
        ],
      },
    ],
  },
];

export const FileProvider = ({ children }: { children: ReactNode }) => {
  const [fileCode, setFileCode] = useState("");

  const [projectStructure, setProjectStructure] =
    useState<FolderInterface[]>(defaultFolders);
  const [selectedFile, setSelectedFile] = useState("");
  const [selectedFolder, setSelectedFolder] = useState("");
  const [resourceType, setResourceType] = useState<ResourceInterface>({
    isCreating: false,
    type: "file",
  });

  return (
    <FileContext.Provider
      value={{
        fileCode,
        setFileCode,
        projectStructure,
        setProjectStructure,
        selectedFile,
        setSelectedFile,
        selectedFolder,
        setSelectedFolder,
        resourceType,
        setResourceType,
      }}
    >
      {children}
    </FileContext.Provider>
  );
};

export const useFile = () => useContext(FileContext);
