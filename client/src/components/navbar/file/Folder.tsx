import { useEffect, useRef, useState } from "react";
import { FileInterface, FolderInterface } from "../../../interfaces/file";
import { useFile } from "../../../context/FileContext";
import {
  updateFileInProjectStructure,
  updateFolderInProjectStructure,
} from "../../../utils/helper";

import { v4 as uuidv4 } from "uuid";

const Folder = ({ name, id, files, subFolders }: FolderInterface) => {
  // states
  const {
    selectedFile,
    setSelectedFile,
    selectedFolder,
    setSelectedFolder,
    resourceType,
    setResourceType,
    projectStructure,
    setProjectStructure,
  } = useFile();
  const [isCollapsed, setIsCollapsed] = useState(id === ":root" ? true : false);
  const newResourceRef = useRef<HTMLInputElement>(null);

  const inputFileCondition =
    resourceType.isCreating &&
    resourceType.type === "file" &&
    selectedFolder === id;

  const inputFolderCondition =
    resourceType.isCreating &&
    resourceType.type === "folder" &&
    selectedFolder === id;

  // on folder click
  const folderClick = () => {
    setIsCollapsed(!isCollapsed);
    setSelectedFolder(id);
  };

  // for creating new file and storing it in project structure
  const createNewFile = (fileName: string) => {
    if (fileName.trim() === "") return;

    const newFile: FileInterface = {
      id: uuidv4(),
      name: fileName,
    };

    let updatedProjectStructure = projectStructure.map((folder) => {
      return updateFileInProjectStructure({
        folder,
        folderId: selectedFolder,
        newFile: newFile,
      });
    });
    setProjectStructure(updatedProjectStructure);

    // close input
    setResourceType({ isCreating: false, type: "file" });
    setSelectedFile(newFile.id);
  };

  // for creating new folder and stroing it in project structure
  const createNewFolder = (folderName: string) => {
    if (folderName.trim() === "") return;

    const newFolder: FolderInterface = {
      id: uuidv4(),
      name: folderName,
      files: [],
      subFolders: [],
    };
    console.log("new folder :-", newFolder);

    let updatedProjectStructure = projectStructure.map((folder) => {
      return updateFolderInProjectStructure({
        folder,
        folderId: selectedFolder,
        newFolder: newFolder,
      });
    });

    console.log("updated folder :-", updatedProjectStructure);

    setProjectStructure(updatedProjectStructure);

    // close input
    setResourceType({ isCreating: false, type: "folder" });
    setSelectedFile(newFolder.id);
  };

  // when key press in input field
  const onInputKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    let inputElement = event.target as HTMLInputElement;
    if (event.key === "Enter") {
      inputFileCondition && createNewFile(inputElement.value);
      inputFolderCondition && createNewFolder(inputElement.value);
    }
    if (event.key === "Escape") {
      setResourceType({ isCreating: false, type: "file" });
    }
  };

  // when user unfocus from input field
  const onInputBlur = (event: React.FocusEvent<HTMLInputElement, Element>) => {
    let inputElement = event.target;
    inputFileCondition && createNewFile(inputElement.value);
    inputFolderCondition && createNewFolder(inputElement.value);

    setResourceType({ isCreating: false, type: "file" });
  };

  useEffect(() => {
    if (inputFileCondition || inputFolderCondition) {
      setIsCollapsed(true);
    }
  }, [resourceType]);

  return (
    <div className={`folder select-none space-y-2`}>
      <div
        className={`relative ${id === ":root" && "hidden"} rounded-md bg-rose-600 px-2 py-1`}
        onClick={folderClick}
      >
        <h1 className="folder-name cursor-pointer space-y-2 text-xl font-semibold text-white">
          {name}
        </h1>
        <div className="absolute right-2 top-1/2 -translate-y-1/2">
          <img
            src="/collapse.svg"
            alt="collapse"
            width={25}
            className={`cursor-pointer ${isCollapsed ? "rotate-90" : "rotate-180"}`}
          />
        </div>
      </div>

      {/* for new file input  */}
      {(inputFileCondition || inputFolderCondition) && (
        // <div className="ml-4">
        <input
          className="file w-full cursor-pointer rounded-md border bg-transparent px-2 py-1 font-bold text-white"
          ref={newResourceRef}
          autoFocus
          onKeyDown={onInputKeyPress}
          onBlur={onInputBlur}
        />
        // </div>
      )}

      {isCollapsed && (
        // sub folders renders
        <div className={`space-y-2`}>
          {subFolders &&
            subFolders.map((subFolder) => {
              const { name, id, files, subFolders } = subFolder;

              return (
                <Folder
                  name={name}
                  id={id}
                  files={files}
                  key={id}
                  subFolders={subFolders}
                />
              );
            })}

          <div className="files space-y-2">
            {/* render all files  */}
            {files &&
              files.map((file) => {
                const { id, name } = file;
                return (
                  <p
                    className={` file ml-4 cursor-pointer rounded-md px-2 py-1  text-white ${id === selectedFile ? "bg-sky-400" : "bg-sky-800"}`}
                    key={id}
                  >
                    {name}
                  </p>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
};
export default Folder;
