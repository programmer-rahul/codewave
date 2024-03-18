import { useEffect, useRef, useState } from "react";
import { useFile } from "../../../context/FileContext";

const FileName = ({
  fileName,
  fileId,
}: {
  fileName: string;
  fileId: string;
}) => {
  const {
    setSelectedFile,
    selectedFile,
    resourceType,
    setResourceType,
    folderStructure,
    setFolderStructure,
  } = useFile();

  const inputRef = useRef<HTMLInputElement>(null);
  const [inputText, setInputText] = useState("");

  const fileClickHandler = () => {
    setSelectedFile(fileId);
  };

  useEffect(() => {
    if (resourceType.isCreating && fileId === selectedFile) {
      inputRef.current?.focus();
    }

    inputRef.current?.addEventListener("blur", () => {
      if (inputText.trim() !== "") {
      }
    });
    inputRef.current?.addEventListener("keydown", (event) => {
      if (event.key === "Enter" && inputText.trim() !== "") {
        const fileId = Math.random().toString();
        addFileToFolder({
          fileName: inputText,
          fileId: fileId,
        });
        setFolderStructure(folderStructure);
        setResourceType({ isCreating: false, type: "file" });
        setSelectedFile(fileId);
      }
    });
  }, [resourceType]);

  const addFileToFolder = ({
    fileName,
    fileId,
  }: {
    fileName: string;
    fileId: string;
  }) => {
    for (let folder of folderStructure) {
      folder.files.forEach((file) => {
        if (file.fileId === selectedFile) {
          folder.files.push({ fileName, fileId });
        }
      });

      if (folder.subFolders) {
        folder.subFolders.forEach((subFolder) => {
          subFolder.files.forEach((file) => {
            if (file.fileId === selectedFile) {
              subFolder.files.push({
                fileName,
                fileId,
              });
            }
          });
        });
      }
    }
  };

  return (
    <>
      <p
        className={` file ml-8 cursor-pointer rounded-sm border px-2 py-1 text-white ${fileId === selectedFile ? "bg-sky-400" : "bg-sky-800"}`}
        onClick={fileClickHandler}
      >
        {fileName}
      </p>
      {resourceType.isCreating && selectedFile === fileId && (
        <input
          type="text"
          className="file ml-8 w-full cursor-pointer rounded-sm border bg-transparent px-2 py-1 font-bold text-white"
          ref={inputRef}
          value={inputText}
          onChange={(e) => {
            setInputText(e.target.value);
          }}
        />
      )}
    </>
  );
};

export default FileName;
