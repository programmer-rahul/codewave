import { FileInterface, FolderInterface } from "../interfaces/file";

const updateFileInProjectStructure = ({
  folder,
  folderId,
  newFile,
}: {
  folder: FolderInterface;
  folderId: string;
  newFile: FileInterface;
}) => {
  if (folder.id === folderId) {
    folder.files?.unshift(newFile);
    return folder;
  }

  if (folder.subFolders) {
    folder.subFolders.map((subFolder) => {
      const updatedSubFolder = updateFileInProjectStructure({
        folder: subFolder,
        folderId: folderId,
        newFile: newFile,
      });

      // Check if the file has been added to the target folder
      if (updatedSubFolder !== subFolder) {
        // If the file has been added to the target folder,
        // stop traversing other subfolders
        return;
      }
    });
  }

  return folder;
};

const updateFolderInProjectStructure = ({
  folder,
  folderId,
  newFolder,
}: {
  folder: FolderInterface;
  folderId: string;
  newFolder: FolderInterface;
}): FolderInterface => {
  if (folder.id === folderId) {
    folder.subFolders?.unshift(newFolder);
    return folder;
  }

  if (folder.subFolders) {
    folder.subFolders.forEach((subFolder) => {
      // Recursively update the subfolder
      const updatedSubFolder = updateFolderInProjectStructure({
        folder: subFolder,
        folderId: folderId,
        newFolder: newFolder,
      });

      // Check if the new folder has been added to the target folder
      if (updatedSubFolder !== subFolder) {
        // If the new folder has been added to the target folder,
        // stop traversing other subfolders
        return;
      }
    });
  }

  return folder;
};

export { updateFileInProjectStructure, updateFolderInProjectStructure };
