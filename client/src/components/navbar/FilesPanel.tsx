import FileControls from "./file/FileControls";
import Folder from "./file/Folder";
import { useFile } from "../../context/FileContext";

const FilesPanel = () => {
  const { projectStructure } = useFile();

  return (
    <div className="p-4">
      <div className=" space-y-4">
        <FileControls />

        <ul className="space-y-4">
          {projectStructure.map((folder) => {
            const { name, id, files, subFolders } = folder;
            return (
              <Folder
                name={name}
                id={id}
                files={files}
                subFolders={subFolders}
                key={id}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
};
export default FilesPanel;
