import { loadPyodide } from "/pyodide/pyodide.mjs";

import { executePython } from "/python-runner.mjs";

const pyodidePromise = loadPyodide({
  indexURL: new URL("/pyodide/", self.location.origin).href,
});

pyodidePromise
  .then((pyodide) => {
    const pythonVersion = String(
      pyodide.runPython("import sys; sys.version.split()[0]"),
    );
    self.postMessage({ type: "ready", pythonVersion });
  })
  .catch((error) => {
    self.postMessage({
      type: "error",
      message: `Could not load Python: ${error instanceof Error ? error.message : String(error)}`,
    });
  });

self.onmessage = async ({ data }) => {
  const { id, code } = data;
  try {
    const pyodide = await pyodidePromise;
    const result = await executePython(pyodide, code, data.stdin ?? "");
    self.postMessage({ type: "result", id, ...result });
  } catch (error) {
    self.postMessage({
      type: "error",
      message: `Python execution failed: ${error instanceof Error ? error.message : String(error)}`,
    });
  }
};
