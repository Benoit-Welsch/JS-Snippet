import dts from "bun-plugin-dts";
import { Scanner } from "./src";
import path from 'path';
import fs from 'fs/promises';

await Bun.build({
  entrypoints: ["./src/index.ts"],
  outdir: "./dist",
  target: "bun",
  minify: true,
  plugins: [dts()],
});

Scanner
  .readFolder("./src")
  .folders
  .map(async (f) => {
    const name = path.basename(f.path)
    const entrypoints = [path.join("./src", name, "index.ts")]
    const outdir = path.join("./dist_standalone", name)

    await fs.mkdir(outdir, { recursive: true })

    await Bun.build({
      entrypoints,
      outdir,
      target: "bun",
      minify: true,
      plugins: [dts()],
    });

    const pkg = JSON.parse(await fs.readFile(path.join(f.path, "package.json"), { encoding: "utf-8" }))

    await fs.writeFile(path.join(outdir, "package.json"), JSON.stringify({
      ...pkg,
      name: `@lv00/toolkit.${name.toLowerCase()}`,
      description: `reduce toolkit including only ${name}`,
      module: "./index.js",
      type: "module",
      main: "./index.js",
      exports: {
        '.': {
          types: "./index.d.ts",
          default: "./index.js"
        }
      },
    })
    )
  }
  )


