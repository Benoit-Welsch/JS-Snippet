import dts from 'bun-plugin-dts';

await Bun.build({
  entrypoints: ['./src/index.ts'],
  outdir: './dist/',
  target: 'bun',
  minify: true,
  plugins: [dts()],
})
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .then(() => {
    console.log('build done');
  });

// Scanner.readFolder("./src").folders.map(async (f) => {
//   const name = path.basename(f.path);
//   const entrypoints = [path.join("./src", name, "index.ts")];
//   const outDir = path.join("./dist_standalone", name);

//   await fs.mkdir(outDir, { recursive: true });

//   await Bun.build({
//     entrypoints,
//     outDir,
//     target: "bun",
//     minify: true,
//     plugins: [dts()],
//   });

//   await fs.copyFile(
//     path.join("./src", name, "Readme.md"),
//     path.join(outDir, "Readme.md"),
//   );

//   const pkg = JSON.parse(
//     await fs.readFile("package.json", { encoding: "utf-8" }),
//   );

//   await fs.writeFile(
//     path.join(outDir, "package.json"),
//     JSON.stringify({
//       ...pkg,
//       scripts: {},
//       name: `@lv00/toolkit.${name.toLowerCase()}`,
//       description: `reduce toolkit including only ${name}`,
//       module: "./index.js",
//       type: "module",
//       main: "./index.js",
//       exports: {
//         ".": {
//           types: "./index.d.ts",
//           default: "./index.js",
//         },
//       },
//     }),
//   );
// });
