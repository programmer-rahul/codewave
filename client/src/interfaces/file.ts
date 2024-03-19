export interface FileInterface {
  name: string;
  id: string;
  content?: string;
}

export interface FolderInterface {
  name: string;
  id: string;
  files?: FileInterface[];
  subFolders?: FolderInterface[];
}

export interface ResourceInterface {
  type: "folder" | "file";
  isCreating: boolean;
}
