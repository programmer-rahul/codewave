import {
  useContext,
  createContext,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

type ContextTypes = {
  fileCode: string;
  setFileCode: Dispatch<SetStateAction<string>>;
};

export const FileContext = createContext<ContextTypes>({
  fileCode: "",
  setFileCode: () => {},
});

export const FileProvider = ({ children }: { children: ReactNode }) => {
  const [fileCode, setFileCode] = useState("");

  return (
    <FileContext.Provider value={{ fileCode, setFileCode }}>
      {children}
    </FileContext.Provider>
  );
};

export const useFile = () => useContext(FileContext);
