import { FolderInterface } from "../../../context/FileContext";
import FileName from "./FileName";
import FolderName from "./FolderName";
import { v4 as uuidv4 } from "uuid";

const Folder = ({
  folderName,
  folderId,
  files,
  subFolders,
}: FolderInterface) => {
  return (
    <div className="single-folder ml-4 select-none space-y-2">
      <FolderName folderName={folderName} key={uuidv4()} folderId={folderId} />

      <div className="folder-files space-y-2">
        {subFolders?.map((subFolder) => (
          <Folder
            folderName={subFolder.folderName}
            folderId={subFolder.folderId}
            files={subFolder.files}
            key={uuidv4()}
          />
        ))}
        {files?.map((file) => {
          return (
            <FileName
              fileName={file.fileName}
              fileId={file.fileId}
              key={file.fileId}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Folder;
