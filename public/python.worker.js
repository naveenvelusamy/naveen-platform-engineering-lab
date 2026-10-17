import { loadPyodide } from "/pyodide/pyodide.mjs";

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
    let output = "";
    pyodide.setStdout({ batched: (text) => { output += `${text}\n`; } });
    pyodide.setStderr({ batched: (text) => { output += `${text}\n`; } });

    try {
      const result = await pyodide.runPythonAsync(code, {
        filename: "lesson.py",
      });
      if (result !== undefined && result !== null) {
        output += `${String(result)}\n`;
        if (typeof result === "object" && "destroy" in result && typeof result.destroy === "function") {
          result.destroy();
        }
      }
      self.postMessage({
        type: "result",
        id,
        ok: true,
        output: output.trimEnd(),
      });
    } catch (error) {
      output += error instanceof Error ? error.message : String(error);
      self.postMessage({
        type: "result",
        id,
        ok: false,
        output: output.trimEnd(),
      });
    }
  } catch (error) {
    self.postMessage({
      type: "error",
      message: `Python execution failed: ${error instanceof Error ? error.message : String(error)}`,
    });
  }
};
