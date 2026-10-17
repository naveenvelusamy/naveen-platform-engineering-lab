// Shared by the browser worker and runtime tests. Each run gets fresh Python names.
export async function executePython(pyodide, code, inputText = "") {
  let output = "";
  const lines = inputText === "" ? [] : inputText.split(/\r?\n/);
  let nextLine = 0;
  pyodide.setStdin({ stdin: () => nextLine < lines.length ? lines[nextLine++] : null });
  pyodide.setStdout({ batched: (text) => { output += `${text}\n`; } });
  pyodide.setStderr({ batched: (text) => { output += `${text}\n`; } });
  const globals = pyodide.toPy({});
  try {
    const result = await pyodide.runPythonAsync(code, { filename: "lesson.py", globals });
    // Source is executed as a script: print controls displayed output.
    if (result && typeof result === "object" && typeof result.destroy === "function") result.destroy();
    return { ok: true, output: output.trimEnd() };
  } catch (error) {
    output += error instanceof Error ? error.message : String(error);
    return { ok: false, output: output.trimEnd() };
  } finally {
    globals.destroy();
  }
}
