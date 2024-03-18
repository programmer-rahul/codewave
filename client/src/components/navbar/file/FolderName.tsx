import { useFile } from "../../../context/FileContext";

const FolderName = ({
  folderName,
  folderId,
}: {
  folderName: string;
  folderId: string;
}) => {
  const { setSelectedFolder } = useFile();

  const handleFolderClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    const currentTarget = event.currentTarget;
    const fileTarget = currentTarget.parentElement?.lastElementChild;
    const imageTarget = currentTarget.lastElementChild;

    const isCollapsed = currentTarget.classList.contains("collapsed");

    if (!isCollapsed) {
      currentTarget.classList.add("collapsed");
      fileTarget?.classList.add("hidden");
      imageTarget?.classList.add("rotate-180");
    } else {
      currentTarget.classList.remove("collapsed");
      fileTarget?.classList.remove("hidden");
      imageTarget?.classList.remove("rotate-180");
    }

    setSelectedFolder(folderId);
  };

  return (
    <div
      className="relative"
      onClick={(e) => {
        handleFolderClick(e);
      }}
    >
      <h2 className="folder-name cursor-pointer rounded-sm bg-rose-600 px-2  py-1 text-xl font-semibold text-white">
        {folderName}
      </h2>
      <div className="absolute right-2 top-1/2 -translate-y-1/2">
        <img
          src="/collapse.svg"
          alt="collapse"
          width={25}
          className="cursor-pointer"
        />
      </div>
    </div>
  );
};

export default FolderName;
