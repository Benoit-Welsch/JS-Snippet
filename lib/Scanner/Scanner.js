import fs from "fs";
import path from "path";

function toJson() {
  delete this.parent;
  return JSON.stringify(this, (key, value) => {
    if (value && typeof value === "object" && key == "parent") return undefined;
    return value;
  });
}

function flat() {
  let data = [];
  const mergerFolder = (folder) => {
    data = data.concat(
      folder.files.map((data) => {
        delete data.parent;
        return data;
      })
    );
    folder.folders.forEach((f) => {
      mergerFolder(f);
    });
  };
  mergerFolder(this);
  return data;
}

/**
 * @param  {string} folderPath
 * @param  {string} parent=null
 */
const recursiveScan = (folderPath, parent = null, option) => {
  const all = fs.readdirSync(folderPath, { withFileTypes: true });

  const folder = {
    path: folderPath,
    files: [],
    folders: [],
    parent,
    toJson,
    flat,
  };

  const folders = all
    .filter((file) => file.isDirectory())
    .map((file) => {
      return recursiveScan(path.join(folderPath, file.name), folder, option);
    });

  const files = all
    .filter((file) => !file.isDirectory())
    .map((file) => {
      return {
        path: folderPath,
        name: file.name,
        parent: folder,
        meta: fs.statSync(path.join(folderPath, file.name)),
      };
    });

  folder.files = files;
  folder.folders = folders;
  return folder;
};

/**
 * @param  {string} path
 */
const scan = (path, option) => {
  try {
    fs.existsSync(path);
    return recursiveScan(path, null, option);
  } catch (err) {
    throw err;
  }
};

export default scan;
