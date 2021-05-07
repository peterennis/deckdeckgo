interface StorageFile {
  fullPath: string;
  name: string;
  downloadUrl: string | undefined;
}

interface StorageFilesList {
  items: StorageFile[];
  nextPageToken: string | null;
}

interface StorageFolder {
  name: string;
}

interface StorageFoldersList {
  prefixes: StorageFolder[];
}
