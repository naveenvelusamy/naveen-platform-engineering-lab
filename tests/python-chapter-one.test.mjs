import test from "node:test";
import assert from "node:assert/strict";
import { loadPyodide } from "pyodide";
import { beginnerPath, firstProgram } from "../app/topics/python-setup/content/beginner-path.ts";
import { lessons } from "../app/topics/python-setup/content/chapter-one.ts";

const expectedExamples = [
  "Hello, World!",
  null, // Interpreter version varies with the installed runtime.
  "api: 1.5 CPU; enabled=True",
  "api 3\n3",
  "api OK\nworker CHECK\nHealthy: 1",
  "1.5\nInvalid configuration: replicas must be nonnegative",
  'api True\n{"enabled": true, "replicas": 4, "service": "api"}',
  "1/2 services healthy",
];

test("Chapter 1 has complete, uniquely identified learning units", () => {
  assert.equal(lessons.length, 8);
  assert.equal(new Set(lessons.map((lesson) => lesson.id)).size, lessons.length);
  for (const lesson of lessons) {
    for (const field of ["title", "explanation", "example", "walkthrough", "useCase"]) {
      assert.ok(lesson[field].trim(), `${lesson.id}: missing ${field}`);
    }
    assert.ok(lesson.outcomes.length >= 2);
    assert.equal(lesson.exercises.length, 2);
    for (const exercise of lesson.exercises) {
      assert.ok(exercise.prompt && exercise.starter && exercise.expected);
      assert.ok(exercise.hints.length >= 2);
    }
    assert.ok(lesson.quiz.answer >= 0 && lesson.quiz.answer < lesson.quiz.options.length);
    assert.ok(lesson.quiz.options.every((option) => option.text && option.explanation));
  }
});

test("All examples and exercise starters execute in the installed browser Python runtime", async () => {
  const pyodide = await loadPyodide();
  for (const [index, lesson] of lessons.entries()) {
    let output = [];
    pyodide.setStdout({ batched: (line) => output.push(line) });
    // Fresh globals ensure a lesson never depends on an earlier lesson's execution.
    const globals = pyodide.toPy({});
    try {
      await pyodide.runPythonAsync(lesson.example, { globals });
      if (expectedExamples[index] !== null) {
        assert.equal(output.join("\n"), expectedExamples[index], lesson.id);
      } else {
        assert.match(output[0], /^3\./);
        assert.equal(output[1], "Standard library available");
      }
    } finally {
      globals.destroy();
    }
    for (const exercise of lesson.exercises) {
      output = [];
      const exerciseGlobals = pyodide.toPy({});
      try {
        await pyodide.runPythonAsync(exercise.starter, { globals: exerciseGlobals });
      } finally {
        exerciseGlobals.destroy();
      }
    }
  }
});


test("The first lesson teaches one instruction and keeps future topics in a proposal", () => {
  const first = lessons[0];
  assert.equal(first.id, "why-python", "Keep the existing completion identity");
  assert.equal(first.example, 'print("Hello, World!")');
  assert.equal(first.example.split("\n").length, 1);
  assert.equal(firstProgram.expected, expectedExamples[0]);
  assert.deepEqual(firstProgram.syntax.map((part) => part.code), ["print", "()", '\"Hello, World!\"']);
  assert.ok(first.exercises.every((exercise) => !exercise.starter.trim()), "Independent practice starts empty");
  assert.equal(first.quiz.options[first.quiz.answer].text, firstProgram.expected);
  assert.equal(beginnerPath.length, 12);
  assert.ok(beginnerPath.every((entry) => !Object.hasOwn(entry, "id")), "Proposed topics must not become completion IDs");
});
