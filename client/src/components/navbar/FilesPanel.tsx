import { useFile } from "../../context/FileContext";
import { v4 as uuidv4 } from "uuid";
import Folder from "./file/Folder";

const FilesPanel = () => {
  const { folderStructure, setResourceType } = useFile();

  const createNewFileHandler = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    console.log(event.target);
    setResourceType({
      isCreating: true,
      type: "file",
    });
  };

  return (
    <div className="p-4">
      <div className=" space-y-4">
        <div className="files-controls  flex items-center justify-between text-white">
          <p className="text-xl font-bold">Explorer</p>

          <div className="flex gap-6">
            <div>
              <img
                src="/new-file.svg"
                alt="new-file"
                width={25}
                className="cursor-pointer"
                onClick={createNewFileHandler}
              />
            </div>
            <div>
              <img
                src="/new-folder.svg"
                alt="new-folder"
                width={25}
                className="cursor-pointer"
              />
            </div>
            <div>
              <img
                src="/dots-3.svg"
                alt="dots-3"
                width={25}
                className="cursor-pointer"
              />
            </div>
          </div>
        </div>

        <ul className="space-y-4">
          {folderStructure.map((folder) => {
            return (
              <Folder
                folderName={folder.folderName}
                folderId={folder.folderId}
                subFolders={folder.subFolders}
                files={folder.files}
                key={uuidv4()}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
};
export default FilesPanel;
