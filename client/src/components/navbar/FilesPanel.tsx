import { useApp } from "../../context/AppContext";

const FilesPanel = () => {
  const { folderStructure } = useApp();

  return (
    <div className="p-4">
      <div>
        <ul className="space-y-4">
          {folderStructure.map((folder) => {
            return (
              <div className="single-folder space-y-2" key={Math.random()}>
                {/* main folder name  */}
                <FolderName
                  folderName={folder.folderName}
                  key={Math.random()}
                />

                <div className="space-y-2">
                  {/* subfolders  */}
                  {folder?.subFolders?.map((subFolder) => {
                    return (
                      <SubFolder
                        folderName={subFolder.folderName}
                        files={subFolder.files}
                        key={Math.random()}
                      />
                    );
                  })}

                  {/* main folder files  */}
                  {folder.files?.map((fileName) => {
                    return <FileName fileName={fileName} key={Math.random()} />;
                  })}
                </div>
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
export default FilesPanel;

const SubFolder = ({
  folderName,
  files,
}: {
  folderName: string;
  files: string[];
}) => {
  return (
    <div className="ml-4 space-y-2">
      <FolderName folderName={folderName} key={Math.random()} />

      <div className="space-y-2">
        {files?.map((fileName) => {
          return <FileName fileName={fileName} key={Math.random()} />;
        })}
      </div>
    </div>
  );
};

const FolderName = ({ folderName }: { folderName: string }) => {
  const handleFolderClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    console.log("clicked", event.currentTarget.classList.contains("collapsed"));
    const isCollapsed = event.currentTarget.classList.contains("collapsed");

    if (!isCollapsed) {
      event.currentTarget.classList.add("collapsed");
      event.currentTarget.parentElement?.lastElementChild?.classList.add(
        "hidden",
      );
    } else {
      event.currentTarget.classList.remove("collapsed");
      event.currentTarget.parentElement?.lastElementChild?.classList.remove(
        "hidden",
      );
    }
  };
  return (
    <h2
      className="folder-name cursor-pointer rounded-sm bg-rose-600 px-2 py-1 text-xl font-semibold text-white"
      onClick={handleFolderClick}
    >
      {folderName}
    </h2>
  );
};

const FileName = ({ fileName }: { fileName: string }) => {
  return (
    <p className="file ml-8 cursor-pointer rounded-sm bg-sky-600 px-2 py-1 text-white">
      {fileName}
    </p>
  );
};
