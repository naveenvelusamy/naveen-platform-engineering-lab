import { copyFile, mkdir } from "node:fs/promises";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const root = dirname(dirname(fileURLToPath(import.meta.url)));
const packageDirectory = dirname(require.resolve("pyodide/package.json"));
const destination = join(root, "public", "pyodide");

const runtimeFiles = [
  "pyodide.asm.mjs",
  "pyodide.asm.wasm",
  "pyodide-lock.json",
  "pyodide.mjs",
  "python_stdlib.zip",
];

await mkdir(destination, { recursive: true });
await Promise.all(
  runtimeFiles.map((file) =>
    copyFile(join(packageDirectory, file), join(destination, file)),
  ),
);

console.log(`Prepared Pyodide runtime assets in ${destination}`);
