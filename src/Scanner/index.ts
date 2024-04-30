import {
  readdirSync,
  statSync,
  existsSync,
  readFileSync,
  watch,
  WatchOptions,
} from 'fs';
import path from 'path';

export class File {
  path: string;
  name: string;
  parent: Folder;
  meta: any;

  constructor({
    path,
    name,
    parent,
    meta,
  }: {
    path: string;
    name: string;
    parent: Folder;
    meta: any;
  }) {
    this.path = path;
    this.name = name;
    this.parent = parent;
    this.meta = meta;
  }

  read() {
    return readFileSync(path.join(this.path, this.name), 'utf-8');
  }

  toJson() {
    return JSON.stringify(this, (key, value) => {
      if (value && typeof value === 'object' && key == 'parent')
        return undefined;
      return value;
    });
  }

  fqn() {
    return path.join(this.path, this.name);
  }

  watch(callback: (file: File) => void, options: WatchOptions = {}) {
    //use fs.watch
    watch(this.fqn(), { ...options, recursive: false }, (event, fileName: any | Error) => {
      if (fileName instanceof Error) {
        throw fileName;
      }

      if (event === 'rename' || event === 'change') {
        this.name = fileName || this.name;
      }
      if (event === 'change') {
        this.meta = statSync(this.fqn());
      }
      callback(this);
    });
  }
}

export class Folder {
  path: string;
  files: File[];
  folders: Folder[];
  parent: Folder | undefined;

  constructor({
    path,
    files,
    folders,
    parent,
  }: {
    path: string;
    files: File[];
    folders: Folder[];
    parent?: Folder;
  }) {
    this.path = path;
    this.files = files;
    this.folders = folders;
    this.parent = parent;
  }

  toJson() {
    delete this.parent;
    return JSON.stringify(this, (key, value) => {
      if (value && typeof value === 'object' && key == 'parent')
        return undefined;
      return value;
    });
  }

  flat() {
    let data: File[] = [];
    const mergerFolder = (folder: Folder) => {
      data = data.concat(folder.files);
      folder.folders.forEach((f) => {
        mergerFolder(f);
      });
    };
    mergerFolder(this);
    return data;
  }

  // watch(callback: (file: File) => void, options: WatchOptions = {}) {
  //   watch(this.path, { ...options, recursive: false }, (event, fileName) => {
  //     if (fileName instanceof Error) {
  //       throw fileName
  //     }

  //     if (event === 'rename' || event === 'change') {
  //       this.name = fileName || this.name;
  //     }
  //     if(event === 'change'){
  //       this.meta = statSync(this.fqn());
  //     }
  //     callback(this);
  //   });
  // }
}

const recursiveScan = (
  folderPath: string,
  parent: Folder | undefined = undefined,
) => {
  const all = readdirSync(folderPath, { withFileTypes: true });

  const folder = new Folder({
    path: folderPath,
    files: [],
    folders: [],
    parent,
  });

  const folders = all
    .filter((file) => file.isDirectory())
    .map((file) => {
      return recursiveScan(path.join(folderPath, file.name), folder);
    });

  const files = all
    .filter((file) => !file.isDirectory())
    .map((file) => {
      return new File({
        path: folderPath,
        name: file.name,
        parent: folder,
        meta: statSync(path.join(folderPath, file.name)),
      });
    });

  folder.files = files;
  folder.folders = folders;
  return folder;
};

export const readFolder = (path: string) => {
  try {
    existsSync(path);
    return recursiveScan(path, undefined);
  } catch (err) {
    throw err;
  }
};
