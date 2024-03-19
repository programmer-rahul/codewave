import {
  useContext,
  createContext,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { FolderInterface, ResourceInterface } from "../interfaces/file";
import { v4 as uuidv4 } from "uuid";

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

console.log(uuidv4())
console.log(uuidv4())

const defaultFolders: FolderInterface[] = [
  {
    name: ":root",
    id: ":root",
    files: [
      // {
      //   name: "html.js",
      //   id: uuidv4(),
      // },
      // {
      //   name: "style.css",
      //   id: uuidv4(),
      // },
    ],
    subFolders: [
      // {
      //   name: "what",
      //   id: uuidv4(),
      //   files: [
      //     {
      //       name: "script.js",
      //       id: uuidv4(),
      //     },
      //   ],
      // },
    ],
  },
];

export const FileProvider = ({ children }: { children: ReactNode }) => {
  const [fileCode, setFileCode] = useState("");

  const [projectStructure, setProjectStructure] =
    useState<FolderInterface[]>(defaultFolders);
  const [selectedFile, setSelectedFile] = useState("");
  const [selectedFolder, setSelectedFolder] = useState(":root");
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
