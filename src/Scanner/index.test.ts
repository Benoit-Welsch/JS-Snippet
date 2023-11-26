import { it, expect } from 'bun:test';
import Scanner from '.';

it('should scan current folder', () => {
  const libFolder = Scanner('./src/Scanner');

  expect(libFolder.path).toBe('./src/Scanner');
  expect(libFolder.parent).toBeUndefined();
  expect(libFolder.files.length).toBe(2);
  expect(libFolder.folders.length).toBe(0);

  expect(libFolder.files[0].name).toBe('index.test.ts');
  expect(libFolder.files[1].name).toBe('index.ts');

  libFolder.files.forEach((file) => {
    expect(file.parent).toBe(libFolder);
    expect(file.path).toBe(libFolder.path);
  });

  expect(libFolder.files).not.toContain(['package.json', 'Readme.md']);
});

it('should scan parent folder', () => {
  const libFolder = Scanner('./src/');

  expect(libFolder.path).toBe('./src/');
  expect(libFolder.parent).toBeUndefined();

  expect(libFolder.files.map((f) => f.name)).toContain('index.ts');

  libFolder.files.forEach((file) => {
    expect(file.parent).toBe(libFolder);
    expect(file.path).toBe(libFolder.path);
  });

  expect(libFolder.files).not.toContain(['package.json', 'Readme.md']);

  //expect to find Scanner folder
  expect(libFolder.folders.find((f) => f.path === 'src/Scanner')).toBeDefined();
});
