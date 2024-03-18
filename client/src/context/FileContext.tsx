import {
  useContext,
  createContext,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { v4 as uuidv4 } from "uuid";

export interface FolderInterface {
  folderName: string;
  folderId: string;
  files: FileInterface[];
  subFolders?: {
    folderName: string;
    folderId: string;
    files: FileInterface[];
  }[];
}

export interface FileInterface {
  fileName: string;
  fileId: string;
}

interface ResourceInterface {
  type: "folder" | "file";
  isCreating: boolean;
}

type ContextTypes = {
  fileCode: string;
  folderStructure: FolderInterface[];
  selectedFile: string;
  selectedFolder: string;
  resourceType: ResourceInterface;

  setFileCode: Dispatch<SetStateAction<string>>;
  setSelectedFile: Dispatch<SetStateAction<string>>;
  setSelectedFolder: Dispatch<SetStateAction<string>>;
  setFolderStructure: Dispatch<SetStateAction<FolderInterface[]>>;
  setResourceType: Dispatch<SetStateAction<ResourceInterface>>;
};

export const FileContext = createContext<ContextTypes>({
  fileCode: "",
  folderStructure: [],
  selectedFile: "",
  selectedFolder: "",
  resourceType: {
    isCreating: false,
    type: "file",
  },

  setFileCode: () => {},
  setFolderStructure: () => {},
  setSelectedFile: () => {},
  setResourceType: () => {},
  setSelectedFolder: () => {},
});

export const FileProvider = ({ children }: { children: ReactNode }) => {
  const [fileCode, setFileCode] = useState("");

  const defaultFileId = uuidv4();
  const defaultFolderId = uuidv4();

  const [folderStructure, setFolderStructure] = useState<FolderInterface[]>([
    {
      folderName: "Untitled",
      folderId: defaultFolderId,
      files: [
        {
          fileName: "index.js",
          fileId: uuidv4(),
        },
      ],
      subFolders: [
        {
          folderName: "app",
          folderId: uuidv4(),
          files: [
            {
              fileName: "index.js",
              fileId: defaultFileId,
            },
          ],
        },
      ],
    },
    {
      folderName: "dead",
      folderId: uuidv4(),
      files: [
        {
          fileName: "style.css",
          fileId: uuidv4(),
        },
        {
          fileName: "main.css",
          fileId: uuidv4(),
        },
      ],
    },
  ]);
  const [selectedFile, setSelectedFile] = useState(defaultFileId);
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
        folderStructure,
        setFolderStructure,
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
