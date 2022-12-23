import { it } from "node:test";
import { strict as assert } from "node:assert";
import Scanner from "./Scanner.js";

it("should scan current folder", () => {
  const libFolder = Scanner("./lib/Scanner");

  assert.equal(libFolder.files.length, 2);
  assert.equal(libFolder.folders.length, 0);

  assert.equal(libFolder.files[0].name, "Scanner.js");
  assert.equal(libFolder.files[1].name, "Scanner.test.js");

  libFolder.files.forEach((file) => {
    assert.equal(file.parent, libFolder);
    assert.equal(file.path, libFolder.path);
  });

  assert.equal(
    libFolder.files.indexOf(
      (file) =>
        file.name === "package.json" ||
        file.name === "Readme.md" ||
        file.name === ".gitignore" ||
        file.name === ".npmignore"
    ),
    -1
  );
});