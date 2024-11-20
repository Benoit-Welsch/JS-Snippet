import { it, expect, describe } from 'bun:test';
import { readFolder } from '.';

describe('Scanner', () => {
  it('should scan current folder', () => {
    const libFolder = readFolder('./src/Scanner');

    expect(libFolder.path).toBe('./src/Scanner');
    expect(libFolder.parent).toBeUndefined();
    expect(libFolder.files.length).toBe(3);
    expect(libFolder.folders.length).toBe(0);

    expect(libFolder.files).toBeArrayOfSize(3);

    const fileNames = libFolder.files.map((f) => f.name);

    expect(fileNames).toContain('index.ts');
    expect(fileNames).toContain('Readme.md');
    expect(fileNames).toContain('index.test.ts');

    libFolder.files.forEach((file) => {
      expect(file.parent).toBe(libFolder);
      expect(file.path).toBe(libFolder.path);
    });

    expect(libFolder.files).not.toContain(['package.json', 'Readme.md']);
  });

  it('should scan parent folder', () => {
    const libFolder = readFolder('./src/');

    expect(libFolder.path).toBe('./src/');
    expect(libFolder.parent).toBeUndefined();

    expect(libFolder.files.map((f) => f.name)).toContain('index.ts');

    libFolder.files.forEach((file) => {
      expect(file.parent).toBe(libFolder);
      expect(file.path).toBe(libFolder.path);
    });

    expect(libFolder.files).not.toContain(['package.json', 'Readme.md']);

    //expect to find Scanner folder
    expect(
      libFolder.folders.find((f) => f.path === 'src/Scanner'),
    ).toBeDefined();
  });

  it('should scan parent folder and get only files', () => {
    const libFolder = readFolder('./src/');
    const files = libFolder.flat();

    const nbOfIndexFiles = libFolder.folders.length + 1;

    //expect nbOfIndexFiles of index.ts in files
    expect(files.filter((f) => f.name === 'index.ts')).toBeArrayOfSize(
      nbOfIndexFiles,
    );
  });
  it('should get a json file structure', () => {
    const libFolder = readFolder('./src/Scanner');

    expect(JSON.parse(libFolder.toJson())).toMatchObject({
      name: 'Scanner',
      path: './src/Scanner',
      files: [
        {
          name: 'Readme.md',
          meta: {},
          path: './src/Scanner',
        },
        {
          name: 'index.test.ts',
          meta: {},
          path: './src/Scanner',
        },
        {
          name: 'index.ts',
          meta: {},
          path: './src/Scanner',
        },
      ],
      folders: [],
    });

    expect(JSON.parse(libFolder.files[0].toJson())).toMatchObject({
      name: 'Readme.md',
      meta: {},
      path: './src/Scanner',
    });
  });
});
