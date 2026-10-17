"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import ThemeToggle from "../../theme-toggle";
import styles from "./lesson-lab.module.css";

import { lessons as steps } from "./content/chapter-one";

type WorkerStatus = "loading" | "ready" | "running" | "error";
type WorkerResponse =
  | { type: "ready"; pythonVersion: string }
  | { type: "result"; id: number; ok: boolean; output: string }
  | { type: "error"; message: string };
const starterCode = Object.fromEntries(steps.map((lesson) => [lesson.id, lesson.example]));

export default function LessonLab() {
  const [activeStepId, setActiveStepId] = useState(steps[0].id);
  const [completed, setCompleted] = useState<Set<string>>(() => new Set());
  const [quizChoice, setQuizChoice] = useState<number | null>(null);
  const [quizMessage, setQuizMessage] = useState("");
  const [codeByStep, setCodeByStep] = useState<Record<string, string>>(starterCode);
  const [output, setOutput] = useState("Your program output will appear here.");
  const [runnerStatus, setRunnerStatus] = useState<WorkerStatus>("loading");
  const [pythonVersion, setPythonVersion] = useState("");
  const [quizPassed, setQuizPassed] = useState<Set<string>>(() => new Set());
  const [attemptedExercises, setAttemptedExercises] = useState<Set<string>>(() => new Set());
  const [editorTask, setEditorTask] = useState("Example");
  const workerRef = useRef<Worker | null>(null);
  const requestIdRef = useRef(0);
  const timeoutRef = useRef<number | null>(null);
  const editorRef = useRef<HTMLTextAreaElement>(null);

  const activeStep = steps.find((step) => step.id === activeStepId) ?? steps[0];
  const activeCode = codeByStep[activeStep.id] ?? "";
  const progress = Math.round((completed.size / steps.length) * 100);
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
    if (nextStep) selectStep(nextStep.id);
  }

  function selectStep(stepId: string) {
    setActiveStepId(stepId);
    setOutput("Run the example or edit it to try your own Python.");
    setQuizMessage("");
    setQuizChoice(null);
    setEditorTask("Saved workspace");
  }

  function editCode(value: string) {
    setCodeByStep((previous) => ({ ...previous, [activeStep.id]: value }));
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
    setRunnerStatus("running");
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
    if (quizChoice === null) return;
    const correct = quizChoice === activeStep.quiz.answer;
    setQuizMessage(`${correct ? "Correct. " : "Try again. "}${activeStep.quiz.options[quizChoice].explanation}`);
    if (correct) setQuizPassed((previous) => new Set(previous).add(activeStep.id));
  }

  function loadExercise(index: number) {
    editCode(activeStep.exercises[index].starter);
    setEditorTask(activeStep.exercises[index].title);
    setOutput("Exercise loaded. Predict the result, write your code, then run and compare with the expected result.");
    editorRef.current?.focus();
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
          <h2>01 — Python Fundamentals</h2>
        </div>
        <div className={styles.progressBlock}>
          <div className={styles.progressHeading}><span>Lab progress</span><strong>{progress}%</strong></div>
          <div className={styles.progressTrack} role="progressbar" aria-label="Lab progress" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
            <span style={{ width: `${progress}%` }} />
          </div>
          <div className={styles.stats}>
            <div><strong>{completed.size}</strong><span>Done</span></div>
            <div><strong>{quizPassed.size}/{steps.length}</strong><span>Quizzes</span></div>
            <div><strong>{attemptedExercises.size}/{steps.length * 2}</strong><span>Practiced</span></div>
          </div>
        </div>
        <nav className={styles.stepNav} aria-label="Lab steps">
          <p className={styles.navLabel}>YOUR LEARNING PATH</p>
          {steps.map((step, index) => {
            return (
              <button
                className={`${styles.stepButton} ${activeStep.id === step.id ? styles.stepActive : ""}`}
                type="button"
                key={step.id}
                disabled={runnerStatus === "running"}
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
          <p className={styles.lead}>{activeStep.explanation}</p>
          <h2>Learning outcomes</h2>
          <ul>{activeStep.outcomes.map((outcome) => <li key={outcome}>{outcome}</li>)}</ul>
          <h2>Syntax in action</h2>
          <pre><code>{activeStep.example}</code></pre>
          <p>{activeStep.walkthrough}</p>
          <div className={styles.callout}><strong>DevOps use case</strong><p>{activeStep.useCase}</p></div>
          <h2>Practice independently</h2>
          <p>Use “Load exercise” to replace the current editor text with a starter. Copy any work you want to keep first. Hints open one at a time. Compare your output yourself; practice checkboxes record your own review, not automatic grading. Progress lasts for this page session.</p>
          {activeStep.exercises.map((exercise, index) => {
            const exerciseId = `${activeStep.id}-${index}`;
            return (
              <section key={exerciseId} className={styles.callout} aria-label={exercise.title}>
                <h3>{exercise.title}</h3>
                <p>{exercise.prompt}</p>
                <button type="button" className={styles.primaryButton} disabled={runnerStatus === "running"} onClick={() => loadExercise(index)}>Load exercise in editor</button>
                <details><summary>Hint 1: getting started</summary><p>{exercise.hints[0]}</p>
                  <details><summary>Hint 2: next step</summary><p>{exercise.hints[1]}</p>
                    {exercise.hints[2] ? <details><summary>Hint 3: bring it together</summary><p>{exercise.hints[2]}</p></details> : null}
                  </details>
                </details>
                <details><summary>Expected result (compare after trying)</summary><pre>{exercise.expected}</pre></details>
                <label><input type="checkbox" checked={attemptedExercises.has(exerciseId)} onChange={(event) => {
                  setAttemptedExercises((previous) => {
                    const next = new Set(previous);
                    if (event.target.checked) next.add(exerciseId); else next.delete(exerciseId);
                    return next;
                  });
                }} /> I ran my code and compared the result.</label>
              </section>
            );
          })}
          <h2>Knowledge check</h2>
          <fieldset className={styles.quizOptions}>
            <legend>{activeStep.quiz.question}</legend>
            {activeStep.quiz.options.map((option, index) => (
              <label className={`${styles.quizOption} ${quizChoice === index ? styles.quizSelected : ""}`} key={option.text}>
                <input type="radio" name={`quiz-${activeStep.id}`} checked={quizChoice === index} onChange={() => { setQuizChoice(index); setQuizMessage(""); }} />
                <span className={styles.radioMark} /><span>{option.text}</span>
              </label>
            ))}
          </fieldset>
          <button className={styles.primaryButton} type="button" disabled={quizChoice === null} onClick={submitQuiz}>Check answer</button>
          {quizMessage ? <p className={styles.quizFeedback} role="status">{quizMessage}</p> : null}
          <p>Complete both practice reviews and pass this lesson’s quiz to mark it complete.</p>
          <button className={styles.primaryButton} type="button" disabled={runnerStatus === "running" || !quizPassed.has(activeStep.id) || !activeStep.exercises.every((_, index) => attemptedExercises.has(`${activeStep.id}-${index}`))} onClick={completeAndContinue}>
            {completed.has(activeStep.id) ? "Lesson complete — continue →" : "Mark lesson complete →"}
          </button>
          {completed.size === steps.length ? <p className={styles.finishNote}>Chapter 1 complete. Revisit any lesson to practice again.</p> : null}
        </article>

        <section className={styles.runner} aria-label="Python code editor and output">
          <div className={styles.runnerHeader}>
            <div className={styles.runnerTitle}><span className={styles.terminalDot} /> Python editor · {editorTask} <span className={styles.runtimeTag}>{runnerStatus === "ready" ? `PYTHON ${pythonVersion}` : runnerStatus.toUpperCase()}</span></div>
            <div className={styles.runnerActions}>
              <button className={styles.clearButton} type="button" onClick={() => { editCode(starterCode[activeStep.id]); setEditorTask("Example"); }} disabled={runnerStatus === "running"}>Reset example</button>
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
