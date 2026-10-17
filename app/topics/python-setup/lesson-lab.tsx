"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
import ThemeToggle from "../../theme-toggle";
import styles from "./lesson-lab.module.css";

type StepKind = "lesson" | "task" | "quiz";
type Step = { id: string; kind: StepKind; title: string };
type WorkerStatus = "loading" | "ready" | "running" | "error";
type WorkerResponse =
  | { type: "ready"; pythonVersion: string }
  | { type: "result"; id: number; ok: boolean; output: string }
  | { type: "error"; message: string };
const steps: Step[] = [
  { id: "why-python", kind: "lesson", title: "Why Python for DevOps" },
  { id: "python-and-pip", kind: "lesson", title: "Python and packages" },
  { id: "virtual-environments", kind: "lesson", title: "Virtual environments" },
  { id: "python-basics", kind: "lesson", title: "Your first Python program" },
  { id: "collections", kind: "lesson", title: "Lists and dictionaries" },
  { id: "conditions-loops", kind: "lesson", title: "Conditions and loops" },
  { id: "functions", kind: "lesson", title: "Functions and errors" },
  { id: "devops-json", kind: "lesson", title: "Working with JSON" },
  { id: "setup-project", kind: "task", title: "Task: summarize services" },
  { id: "installing-library", kind: "quiz", title: "Quiz: isolate dependencies" },
];

const starterCode: Record<string, string> = {
  "why-python": `# Python helps automate repeatable platform tasks.
print("Hello, platform engineering!")
print("Let's write a small program.")`,
  "python-and-pip": `# This is real Python running in your browser.
import sys

print("Python version:", sys.version.split()[0])
print("The standard library is ready to use.")`,
  "virtual-environments": `# A regular Python project can use a venv to isolate packages.
# This browser runner uses WebAssembly, not a shell or a project venv.
project = "service-health-check"
dependencies = ["requests", "pyyaml"]

print("Project:", project)
print("Dependencies to isolate:", ", ".join(dependencies))`,
  "python-basics": `# Store values in variables and print a useful message.
engineer = "Naveen"
years_in_platform = 13

print(f"{engineer} has {years_in_platform}+ years in infrastructure.")`,
  collections: `# Lists keep an ordered group of values.
services = ["api", "worker", "database"]

# Dictionaries describe a value with named fields.
deployment = {"environment": "production", "replicas": 3}

print("Services:", services)
print("Environment:", deployment["environment"])
print("Replica count:", deployment["replicas"])`,
  "conditions-loops": `services = [
    {"name": "api", "healthy": True},
    {"name": "worker", "healthy": False},
    {"name": "database", "healthy": True},
]

for service in services:
    status = "healthy" if service["healthy"] else "needs attention"
    print(f'{service["name"]}: {status}')`,
  functions: `def check_service(name, is_healthy):
    """Return a short status message for a service."""
    if not name:
        raise ValueError("Service name cannot be empty")
    status = "healthy" if is_healthy else "needs attention"
    return f"{name}: {status}"

for name, health in [("api", True), ("worker", False)]:
    print(check_service(name, health))`,
  "devops-json": `import json

config_text = '{"service": "checkout", "replicas": 3, "enabled": true}'
config = json.loads(config_text)

print("Service:", config["service"])
print("Replicas:", config["replicas"])
print("Enabled:", config["enabled"])`,
  "setup-project": `services = [
    {"name": "api", "healthy": True},
    {"name": "worker", "healthy": False},
    {"name": "database", "healthy": True},
]

healthy_count = 0
for service in services:
    if service["healthy"]:
        healthy_count += 1
        result = "OK"
    else:
        result = "CHECK"
    print(f'{service["name"]}: {result}')

print(f"{healthy_count}/{len(services)} services healthy")`,
  "installing-library": `# For a regular Python project, install dependencies in a venv.
project_dependencies = ["requests", "pyyaml"]

for package in project_dependencies:
    print("Would install in the project environment:", package)`,
};

const quizOptions = [
  "Install every project package into system Python",
  "Use a project virtual environment and record dependencies",
  "Copy package source files into each project manually",
];

export default function LessonLab() {
  const [activeStepId, setActiveStepId] = useState(steps[0].id);
  const [completed, setCompleted] = useState<Set<string>>(() => new Set());
  const [quizChoice, setQuizChoice] = useState<number | null>(null);
  const [quizMessage, setQuizMessage] = useState("");
  const [codeByStep, setCodeByStep] = useState<Record<string, string>>(starterCode);
  const [output, setOutput] = useState("Your program output will appear here.");
  const [runnerStatus, setRunnerStatus] = useState<WorkerStatus>("loading");
  const [pythonVersion, setPythonVersion] = useState("");
  const [lastRunSucceeded, setLastRunSucceeded] = useState(false);
  const workerRef = useRef<Worker | null>(null);
  const requestIdRef = useRef(0);
  const runStepIdRef = useRef("");
  const activeStepIdRef = useRef(activeStepId);
  const timeoutRef = useRef<number | null>(null);
  const editorRef = useRef<HTMLTextAreaElement>(null);

  const activeStep = steps.find((step) => step.id === activeStepId) ?? steps[0];
  const activeCode = codeByStep[activeStep.id] ?? "";
  const progress = Math.round((completed.size / steps.length) * 100);
  const counts = useMemo(
    () => ({
      done: completed.size,
      quizzes: `${Number(completed.has("installing-library"))}/1`,
      tasks: `${Number(completed.has("setup-project"))}/1`,
    }),
    [completed],
  );

  const createWorker = useCallback(() => {
    workerRef.current?.terminate();
    const worker = new Worker("/python.worker.js", {
      type: "module",
    });
    workerRef.current = worker;

    worker.onmessage = (event: MessageEvent<WorkerResponse>) => {
      const { data } = event;
      if (workerRef.current !== worker) return;
      if (data.type === "ready") {
        setPythonVersion(data.pythonVersion);
        setRunnerStatus("ready");
      } else if (data.type === "result") {
        if (timeoutRef.current !== null) window.clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
        if (data.id !== requestIdRef.current) return;
        setOutput(data.output || "(Program finished without producing output.)");
        setLastRunSucceeded(
          data.ok &&
            runStepIdRef.current === "setup-project" &&
            activeStepIdRef.current === "setup-project",
        );
        setRunnerStatus("ready");
      } else {
        setOutput(data.message);
        setRunnerStatus("error");
      }
    };

    worker.onerror = (event) => {
      if (workerRef.current !== worker) return;
      setOutput(`Python worker failed to load: ${event.message || "Unknown worker error"}`);
      setRunnerStatus("error");
      worker.terminate();
      workerRef.current = null;
    };
  }, []);

  useEffect(() => {
    createWorker();
    return () => {
      if (timeoutRef.current !== null) window.clearTimeout(timeoutRef.current);
      workerRef.current?.terminate();
      workerRef.current = null;
    };
  }, [createWorker]);

  function completeAndContinue() {
    setCompleted((previous) => new Set(previous).add(activeStep.id));
    const nextStep = steps[steps.findIndex((step) => step.id === activeStep.id) + 1];
    if (nextStep) setActiveStepId(nextStep.id);
  }

  function selectStep(stepId: string) {
    activeStepIdRef.current = stepId;
    setActiveStepId(stepId);
    setOutput("Run the example or edit it to try your own Python.");
    setLastRunSucceeded(false);
    setQuizMessage("");
  }

  function editCode(value: string) {
    setCodeByStep((previous) => ({ ...previous, [activeStep.id]: value }));
    setLastRunSucceeded(false);
  }

  function handleEditorKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Tab") {
      event.preventDefault();
      const editor = event.currentTarget;
      const cursor = editor.selectionStart;
      const nextCode = `${activeCode.slice(0, cursor)}    ${activeCode.slice(editor.selectionEnd)}`;
      editCode(nextCode);
      requestAnimationFrame(() => editorRef.current?.setSelectionRange(cursor + 4, cursor + 4));
    } else if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
      event.preventDefault();
      runCode();
    }
  }

  function runCode() {
    if (runnerStatus !== "ready" || !workerRef.current || !activeCode.trim()) return;
    const id = ++requestIdRef.current;
    runStepIdRef.current = activeStep.id;
    setRunnerStatus("running");
    setLastRunSucceeded(false);
    setOutput("Running your Python program…");
    workerRef.current.postMessage({ type: "run", id, code: activeCode });
    timeoutRef.current = window.setTimeout(() => {
      const worker = workerRef.current;
      if (!worker || id !== requestIdRef.current) return;
      worker.terminate();
      workerRef.current = null;
      timeoutRef.current = null;
      setOutput("Execution stopped after 8 seconds. Check for an infinite loop, then try again.");
      setRunnerStatus("loading");
      createWorker();
    }, 8000);
  }

  function stopCode() {
    requestIdRef.current += 1;
    if (timeoutRef.current !== null) window.clearTimeout(timeoutRef.current);
    timeoutRef.current = null;
    setOutput("Execution stopped. Restarting the Python runtime…");
    setRunnerStatus("loading");
    createWorker();
  }

  function submitQuiz() {
    if (quizChoice === 1) {
      setQuizMessage("Correct. A project venv keeps dependencies isolated and makes setup repeatable.");
      setCompleted((previous) => new Set(previous).add("installing-library"));
    } else {
      setQuizMessage("Not quite. Use a project virtual environment so dependencies stay isolated.");
    }
  }

  return (
    <main className={styles.lab}>
      <aside className={styles.sidebar} aria-label="Python learning lab">
        <Link className={styles.backLink} href="/#about">← <span>Back to portfolio</span></Link>
        <Link className={styles.brand} href="/" aria-label="Naveen Velusamy home">
          <span className={styles.brandMark}>N</span>
          <span>Learning Lab</span>
        </Link>
        <div className={styles.courseTitle}>
          <span>PYTHON FOR DEVOPS</span>
          <h2>01 — Python foundations</h2>
        </div>
        <div className={styles.progressBlock}>
          <div className={styles.progressHeading}><span>Lab progress</span><strong>{progress}%</strong></div>
          <div className={styles.progressTrack} role="progressbar" aria-label="Lab progress" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
            <span style={{ width: `${progress}%` }} />
          </div>
          <div className={styles.stats}>
            <div><strong>{counts.done}</strong><span>Done</span></div>
            <div><strong>{counts.quizzes}</strong><span>Quizzes</span></div>
            <div><strong>{counts.tasks}</strong><span>Tasks</span></div>
          </div>
        </div>
        <nav className={styles.stepNav} aria-label="Lab steps">
          <p className={styles.navLabel}>YOUR LEARNING PATH</p>
          {steps.map((step, index) => {
            const isLocked = step.kind === "quiz" && !completed.has("setup-project");
            return (
              <button
                className={`${styles.stepButton} ${activeStep.id === step.id ? styles.stepActive : ""}`}
                type="button"
                key={step.id}
                disabled={isLocked}
                onClick={() => selectStep(step.id)}
                aria-current={activeStep.id === step.id ? "step" : undefined}
              >
                <span className={`${styles.stepIcon} ${completed.has(step.id) ? styles.stepDone : ""}`}>
                  {completed.has(step.id) ? "✓" : String(index + 1).padStart(2, "0")}
                </span>
                <span className={styles.stepText}>
                  <small>{step.kind}</small>
                  <span>{step.title}</span>
                </span>
                {isLocked ? <span className={styles.lockIcon} aria-label="Complete the task to unlock">⌑</span> : null}
              </button>
            );
          })}
        </nav>
        <div className={styles.sidebarFooter}>
          <ThemeToggle />
          <span>Theme</span>
          <Link href="/engineering-work">Engineering work ↗</Link>
        </div>
      </aside>

      <section className={styles.workspace}>
        <header className={styles.lessonHeader}>
          <div>
            <p className={styles.kicker}>{activeStep.kind.toUpperCase()} <span>·</span> {steps.findIndex((step) => step.id === activeStep.id) + 1} OF {steps.length}</p>
            <h1>{activeStep.title}</h1>
          </div>
          <div className={styles.headerBadge}><span /> {runnerStatus === "ready" ? `Python ${pythonVersion} ready` : runnerStatus === "running" ? "Program running" : runnerStatus === "error" ? "Runtime error" : "Loading Python runtime"}</div>
        </header>
        <article className={styles.lessonContent} key={activeStep.id}>
          {activeStep.id === "why-python" ? (
            <>
              <p className={styles.lead}>Bash is great for connecting commands. When work needs structured data, API calls, retries, or logic that should stay readable, Python is a useful next tool.</p>
              <h2>Where Python helps in platform work</h2>
              <p>Python is widely available and has libraries for common infrastructure tasks.</p>
              <ul>
                <li>Read JSON, YAML, and CSV configuration.</li>
                <li>Call REST APIs to check services or trigger deployment workflows.</li>
                <li>Parse logs, summarize events, and automate repetitive checks.</li>
                <li>Use cloud provider SDKs such as AWS boto3 to manage resources.</li>
              </ul>
              <div className={styles.callout}><strong>Use the right tool for the job</strong><p>Keep a one-line shell pipeline in Bash. Use Python when the script needs data structures, clear error handling, or maintainable branching logic.</p></div>
              <p>Edit the starter program below and run it. Python runs locally in your browser using WebAssembly; your code is not sent to an execution server.</p>
            </>
          ) : null}
          {activeStep.id === "python-and-pip" ? (
            <>
              <p className={styles.lead}>Python comes with a standard library for many everyday tasks. Third-party packages add capabilities, but should be managed per project.</p>
              <h2>Standard library versus packages</h2>
              <p>Modules such as <code>json</code>, <code>pathlib</code>, and <code>csv</code> ship with Python. On a normal machine, <code>pip</code> installs additional packages. This browser lesson includes the Python standard library but does not provide a shell or package installation.</p>
              <pre><code>{`import sys\nprint("Python:", sys.version.split()[0])`}</code></pre>
              <div className={styles.callout}><strong>Try it in the editor</strong><p>Change the code, click Run, and inspect the output below. Import standard-library modules such as <code>json</code> and <code>statistics</code>.</p></div>
            </>
          ) : null}
          {activeStep.id === "virtual-environments" ? (
            <>
              <p className={styles.lead}>A virtual environment gives each regular Python project its own package directory, separate from system Python and other projects.</p>
              <h2>Why isolate dependencies?</h2>
              <ul>
                <li>Projects can depend on different versions of the same library.</li>
                <li>Installing packages does not modify system-managed Python.</li>
                <li>A fresh environment makes setup easier to repeat and troubleshoot.</li>
              </ul>
              <h2>The usual project workflow</h2>
              <pre><code>{`python3 -m venv .venv\nsource .venv/bin/activate\npython -m pip install requests`}</code></pre>
              <p>This browser runner is a WebAssembly Python runtime, not a Linux shell. The commands above are for your own local project; they do not run in this page.</p>
              <div className={styles.callout}><strong>Keep it reproducible</strong><p>Record dependencies in a project file such as <code>requirements.txt</code>, and leave the generated <code>.venv</code> directory out of version control.</p></div>
            </>
          ) : null}
          {activeStep.id === "python-basics" ? (
            <>
              <p className={styles.lead}>A Python program is a sequence of readable instructions. Start with values, variables, and output.</p>
              <h2>Variables and formatted strings</h2>
              <p>Assign a value with <code>=</code>. Use <code>print()</code> to display it. An f-string inserts values inside braces.</p>
              <pre><code>{`engineer = "Naveen"\nyears_in_platform = 13\nprint(f"{engineer} has {years_in_platform}+ years of experience")`}</code></pre>
              <div className={styles.callout}><strong>Try changing the values</strong><p>Edit the name or years in the code editor, run it again, and compare the output.</p></div>
            </>
          ) : null}
          {activeStep.id === "collections" ? (
            <>
              <p className={styles.lead}>Automation often starts with a collection of resources and a little structured configuration.</p>
              <h2>Lists and dictionaries</h2>
              <p>A list stores an ordered sequence. A dictionary maps named keys to values. Combine them to represent a set of services or infrastructure settings.</p>
              <pre><code>{`services = ["api", "worker", "database"]\nconfig = {"environment": "production", "replicas": 3}\nprint(services[0])\nprint(config["replicas"])`}</code></pre>
              <p>Try adding a service to the list or changing the replica count.</p>
            </>
          ) : null}
          {activeStep.id === "conditions-loops" ? (
            <>
              <p className={styles.lead}>Conditions choose what to do; loops repeat an action for each item. Together, they can summarize a fleet of service checks.</p>
              <h2>Check each service</h2>
              <p>The starter code loops over service dictionaries and prints a different status depending on each health check.</p>
              <pre><code>{`for service in services:\n    if service["healthy"]:\n        print(service["name"], "OK")\n    else:\n        print(service["name"], "CHECK")`}</code></pre>
              <div className={styles.callout}><strong>Indentation matters</strong><p>Python uses indentation to mark the body of a loop or condition. Keep statements in the same block aligned.</p></div>
            </>
          ) : null}
          {activeStep.id === "functions" ? (
            <>
              <p className={styles.lead}>Functions name a useful piece of logic so it can be reused and tested. Exceptions help report invalid input instead of quietly producing a wrong result.</p>
              <h2>Define, call, and validate</h2>
              <p>The example defines a service-check function, rejects a missing name, and calls the function for two services.</p>
              <pre><code>{`def check_service(name, is_healthy):\n    if not name:\n        raise ValueError("Service name cannot be empty")\n    return f"{name}: {'healthy' if is_healthy else 'needs attention'}"`}</code></pre>
              <p>Try passing an empty name and observe the Python traceback in the output panel.</p>
            </>
          ) : null}
          {activeStep.id === "devops-json" ? (
            <>
              <p className={styles.lead}>JSON is a common format for API responses, deployment settings, and service configuration. Python’s standard library can parse it without installing a package.</p>
              <h2>Parse configuration</h2>
              <p><code>json.loads()</code> turns a JSON string into Python dictionaries, lists, and scalar values.</p>
              <pre><code>{`import json\nconfig = json.loads('{"service": "checkout", "replicas": 3}')\nprint(config["service"])\nprint(config["replicas"])`}</code></pre>
              <div className={styles.callout}><strong>Practical extension</strong><p>Try adding a field to the JSON string, then access it from the parsed dictionary.</p></div>
            </>
          ) : null}
          {activeStep.id === "setup-project" ? (
            <>
              <p className={styles.lead}>Write a small status summary for several services. The starter program counts healthy services and flags the ones that need attention.</p>
              <h2>Your task</h2>
              <ul>
                <li>Add another service to the <code>services</code> list.</li>
                <li>Change a service health value and run the program.</li>
                <li>Make sure the printed total matches the healthy services.</li>
              </ul>
              <div className={styles.callout}><strong>Completion</strong><p>Run your program successfully, then mark the task complete to unlock the final quiz.</p></div>
              <button className={styles.primaryButton} type="button" disabled={!lastRunSucceeded} onClick={completeAndContinue}>
                {completed.has("setup-project") ? "Task complete ✓" : "Mark task complete and unlock quiz →"}
              </button>
              {!lastRunSucceeded ? <span className={styles.buttonHint}>Run the Python program successfully first.</span> : null}
            </>
          ) : null}
          {activeStep.id === "installing-library" ? (
            <>
              <p className={styles.lead}>A new automation project needs a third-party HTTP library. What is the best way to keep its dependencies safe and reproducible?</p>
              <fieldset className={styles.quizOptions}>
                <legend>Choose one answer</legend>
                {quizOptions.map((option, index) => (
                  <label className={`${styles.quizOption} ${quizChoice === index ? styles.quizSelected : ""}`} key={option}>
                    <input type="radio" name="python-quiz" value={index} checked={quizChoice === index} onChange={() => { setQuizChoice(index); setQuizMessage(""); }} />
                    <span className={styles.radioMark} />
                    <span>{option}</span>
                  </label>
                ))}
              </fieldset>
              <button className={styles.primaryButton} type="button" disabled={quizChoice === null} onClick={submitQuiz}>Check answer</button>
              {quizMessage ? <p className={`${styles.quizFeedback} ${completed.has("installing-library") ? styles.feedbackCorrect : ""}`} role="status">{quizMessage}</p> : null}
              {completed.has("installing-library") ? <p className={styles.finishNote}>Foundations complete. You can revisit any lesson from the sidebar.</p> : null}
            </>
          ) : null}
          {activeStep.kind === "lesson" ? (
            <button className={styles.primaryButton} type="button" onClick={completeAndContinue}>
              {completed.has(activeStep.id) ? "Continue →" : "Mark lesson complete →"}
            </button>
          ) : null}
        </article>

        <section className={styles.runner} aria-label="Python code editor and output">
          <div className={styles.runnerHeader}>
            <div className={styles.runnerTitle}><span className={styles.terminalDot} /> Python editor <span className={styles.runtimeTag}>{runnerStatus === "ready" ? `PYTHON ${pythonVersion}` : runnerStatus.toUpperCase()}</span></div>
            <div className={styles.runnerActions}>
              <button className={styles.clearButton} type="button" onClick={() => editCode(starterCode[activeStep.id])} disabled={runnerStatus === "running"}>Reset example</button>
              {runnerStatus === "running" ? (
                <button className={styles.stopButton} type="button" onClick={stopCode}>Stop</button>
              ) : runnerStatus === "error" ? (
                <button className={styles.runButton} type="button" onClick={() => { setRunnerStatus("loading"); createWorker(); }}>Retry Python</button>
              ) : (
                <button className={styles.runButton} type="button" onClick={runCode} disabled={runnerStatus !== "ready" || !activeCode.trim()}>
                  {runnerStatus === "loading" ? "Loading Python…" : "▶ Run"}
                </button>
              )}
            </div>
          </div>
          <label className={styles.editorLabel} htmlFor="python-code">Python source code</label>
          <textarea
            id="python-code"
            ref={editorRef}
            className={styles.codeEditor}
            spellCheck={false}
            autoCapitalize="off"
            autoComplete="off"
            value={activeCode}
            onChange={(event) => editCode(event.target.value)}
            onKeyDown={handleEditorKeyDown}
            aria-label="Edit Python program"
          />
          <div className={styles.outputHeader}><span>OUTPUT</span><button className={styles.clearButton} type="button" onClick={() => setOutput("")}>Clear output</button></div>
          <pre className={styles.programOutput} aria-live="polite" aria-label="Program output">{output}</pre>
          <p className={styles.runnerDisclaimer}>Real Python runs locally in your browser using WebAssembly. Code is not sent to a server. This is not a Linux shell; third-party package installs and OS commands are unavailable.</p>
        </section>
      </section>
    </main>
  );
}
