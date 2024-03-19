import { useEffect, useRef, useState } from "react";
import { FileInterface, FolderInterface } from "../../../interfaces/file";
import { useFile } from "../../../context/FileContext";

const Folder = ({ name, id, files, subFolders }: FolderInterface) => {
  // states
  const {
    selectedFolder,
    setSelectedFolder,
    resourceType,
    setResourceType,
    projectStructure,
    setProjectStructure,
  } = useFile();
  const [isCollapsed, setIsCollapsed] = useState(true);
  const newResourceRef = useRef<HTMLInputElement>(null);

  const inputFileCondition =
    resourceType.isCreating &&
    resourceType.type === "file" &&
    selectedFolder === id;

  const folderClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    console.log("e", event);
    setIsCollapsed(!isCollapsed);
    setSelectedFolder(id);
  };

  const createNewFile = (fileName: string) => {
    if (fileName.trim() === "") return;

    const newFile: FileInterface = {
      id: Math.random().toString(36),
      name: fileName,
    };

    console.log(selectedFolder);
    console.log(newFile);

    let updatedProjectStructure = projectStructure.map((folder) => {
      return updateFileInFolders({
        folder,
        folderId: selectedFolder,
        newFile: newFile,
      });
    });

    // console.log("projecStructure", updatedProjectStructure);
    setProjectStructure(updatedProjectStructure);

    // close input
    setResourceType({ isCreating: false, type: "file" });
  };

  const updateFileInFolders = ({
    folder,
    folderId,
    newFile,
  }: {
    folder: FolderInterface;
    folderId: string;
    newFile: FileInterface;
  }) => {
    console.log("folder.id", folder.id);
    console.log("folderId", folderId);

    if (folder.id === folderId) {
      folder.files?.push(newFile);
      return folder;
    }
    if (folder.subFolders) {
      folder.subFolders.map((subFolder) =>
        updateFileInFolders({
          folder: subFolder,
          folderId: subFolder.id,
          newFile,
        }),
      );
    }

    return folder;
  };

  const onInputKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      console.log("created");
      createNewFile(event.target.value);
    }
    if (event.key === "Escape") {
      console.log("exited");
      // close input
      setResourceType({ isCreating: false, type: "file" });
    }
  };

  const onInputBlue = (event: React.FocusEvent<HTMLInputElement, Element>) => {
    console.log("blurred");
    createNewFile(event.target.value);
  };

  useEffect(() => {
    console.log("rendered");
    if (inputFileCondition) {
      setIsCollapsed(true);
    }
  }, [resourceType]);

  return (
    <div className="folder select-none space-y-2">
      <h1
        className="folder-name cursor-pointer space-y-2 bg-rose-600"
        onClick={folderClick}
      >
        {name}
      </h1>

      {isCollapsed && (
        <div className="space-y-2">
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

          <div className="files">
            {/* for new file input  */}
            {inputFileCondition && (
              <input
                className=""
                ref={newResourceRef}
                autoFocus
                onKeyDown={onInputKeyPress}
                onBlur={onInputBlue}
              />
            )}

            {/* render all files  */}
            {files &&
              files.map((file) => {
                return (
                  <p className="file ml-8 text-sky-600" key={id}>
                    {file.name}
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
