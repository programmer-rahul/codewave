import { useFile } from "../../../context/FileContext";

const FileControls = () => {
  const { setResourceType } = useFile();

  const newFile = () => {
    setResourceType({ isCreating: true, type: "file" });
  };

  const newFolder = () => {
    setResourceType({ isCreating: true, type: "folder" });
  };

  return (
    <div className="files-controls  flex items-center justify-between text-white">
      <p className="text-xl font-bold">Explorer</p>

      <div className="flex gap-6">
        <div>
          <img
            src="/new-file.svg"
            alt="new-file"
            width={25}
            className="cursor-pointer"
            onClick={newFile}
          />
        </div>
        <div>
          <img
            src="/new-folder.svg"
            alt="new-folder"
            width={25}
            className="cursor-pointer"
            onClick={newFolder}
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
  );
};
export default FileControls;
