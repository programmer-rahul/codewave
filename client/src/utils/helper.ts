import { FolderInterface } from "../context/AppContext";

export const getParentFolderNameByFileId = ({
  fileId,
  folders,
}: {
  fileId: string;
  folders: FolderInterface[];
}): string | null => {
  for (const folder of folders) {
    if (folder.files) {
      const file = folder.files.find((file) => file.fileId === fileId);
      if (file) return folder.folderName;
    }
    if (folder.subFolders) {
      const parentFolderName = getParentFolderNameByFileId({
        fileId,
        folders: folder.subFolders,
      });
      if (parentFolderName) return parentFolderName;
    }
  }
  return null;
};
