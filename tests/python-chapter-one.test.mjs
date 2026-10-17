import test from "node:test";
import assert from "node:assert/strict";
import { loadPyodide } from "pyodide";
import { lessons } from "../app/topics/python-setup/content/chapter-one.ts";
import { buildBeginnerPath } from "../app/topics/python-setup/content/beginner-path.ts";
import { legacyLessons } from "../app/topics/python-setup/content/legacy-lessons.ts";
import { executePython } from "../public/python-runner.mjs";

const beginnerPath = buildBeginnerPath(lessons);
const runtime = loadPyodide();

test("Twelve progressive lessons include teaching, practice, and explained quizzes", () => {
  assert.equal(lessons.length, 12);
  const allIds = [...lessons, ...legacyLessons].map((lesson) => lesson.id);
  assert.equal(new Set(allIds).size, allIds.length);
  assert.deepEqual(beginnerPath.map((entry) => entry.id), lessons.map((lesson) => lesson.id));
  for (const lesson of lessons) {
    assert.ok(lesson.teaching, lesson.id);
    for (const field of ["what", "why", "expected", "prediction", "recap"]) {
      assert.ok(lesson.teaching[field].trim(), `${lesson.id}: missing ${field}`);
    }
    assert.ok(lesson.teaching.syntax.length && lesson.teaching.mistakes.length);
    assert.ok(lesson.outcomes.length >= 2);
    assert.equal(lesson.exercises.length, 2);
    for (const exercise of lesson.exercises) {
      assert.ok(exercise.prompt && exercise.expected);
      assert.ok(exercise.hints.length >= 2);
    }
    assert.ok(lesson.quiz.answer >= 0 && lesson.quiz.answer < lesson.quiz.options.length);
    assert.ok(lesson.quiz.options.every((option) => option.text && option.explanation));
  }
  assert.equal(lessons[0].example, 'print("Hello, World!")');
  assert.ok(lessons[0].exercises.every((exercise) => !exercise.starter.trim()));
});

test("Existing topic identities remain accessible without crediting unrelated new lessons", () => {
  for (const id of ["why-python", "python-basics", "collections", "conditions-loops", "functions", "service-summary"]) {
    assert.ok(lessons.some((lesson) => lesson.id === id));
  }
  assert.deepEqual(legacyLessons.map((lesson) => lesson.id), ["python-and-pip", "devops-json"]);
  assert.ok(!lessons.some((lesson) => lesson.id === "python-and-pip"));
});

test("Every main and follow-on example runs with the documented output", async () => {
  const pyodide = await runtime;
  for (const lesson of lessons) {
    const result = await executePython(pyodide, lesson.example, lesson.stdin);
    assert.equal(result.ok, true, `${lesson.id}: ${result.output}`);
    assert.equal(result.output, lesson.teaching.expected, lesson.id);
    for (const extra of lesson.teaching.extras ?? []) {
      const result = await executePython(pyodide, extra.code);
      assert.equal(result.ok, true, extra.title);
      assert.equal(result.output, extra.expected, extra.title);
    }
    for (const exercise of lesson.exercises) {
      const result = await executePython(pyodide, exercise.starter, exercise.stdin);
      assert.equal(result.ok, true, `${lesson.id} starter: ${result.output}`);
    }
  }
});

test("Queued input supports multiple lines, text conversion, EOF, and fresh runs", async () => {
  const pyodide = await runtime;
  assert.deepEqual(await executePython(pyodide, 'first = input()\nsecond = input()\nprint(first + " " + second)', "Maya\nRavi"), { ok: true, output: "Maya Ravi" });
  assert.deepEqual(await executePython(pyodide, 'print(int(input()) + 2)', "3"), { ok: true, output: "5" });
  const eof = await executePython(pyodide, "input()", "");
  assert.equal(eof.ok, false);
  assert.match(eof.output, /EOFError/);
  assert.deepEqual(await executePython(pyodide, 'print(input())', "fresh"), { ok: true, output: "fresh" });
  assert.deepEqual(await executePython(pyodide, 'print(input())', "\n"), { ok: true, output: "" });
});

test("Debugging starts with fresh names and reports real errors", async () => {
  const pyodide = await runtime;
  assert.equal((await executePython(pyodide, 'old_name = "leftover"')).ok, true);
  const missingName = await executePython(pyodide, "print(old_name)");
  assert.equal(missingName.ok, false);
  assert.match(missingName.output, /NameError/);
  const invalidSyntax = await executePython(pyodide, 'print("Hi"');
  assert.equal(invalidSyntax.ok, false);
  assert.match(invalidSyntax.output, /SyntaxError/);
  const conversion = await executePython(pyodide, 'int("three")');
  assert.equal(conversion.ok, false);
  assert.match(conversion.output, /ValueError/);
  assert.deepEqual(await executePython(pyodide, 'print("Recovered")'), { ok: true, output: "Recovered" });
});


test("Optional earlier material still executes with its existing examples", async () => {
  const pyodide = await runtime;
  for (const lesson of legacyLessons) {
    const result = await executePython(pyodide, lesson.example);
    assert.equal(result.ok, true, `${lesson.id}: ${result.output}`);
  }
});

test("The mini-project requirements work for mixed, empty, and unhealthy snapshots", async () => {
  const pyodide = await runtime;
  // Reviewer reference only: this is never loaded into the learner's editor.
  const report = `def report_services(services):
    healthy = 0
    for service in services:
        print(service["name"])
        if service["healthy"]:
            healthy = healthy + 1
            print("OK")
        else:
            print("CHECK")
    print("Healthy:")
    print(healthy)
    print("Total:")
    print(len(services))
`;
  for (const [inventory, expected] of [
    ['[{"name": "api", "healthy": True}, {"name": "worker", "healthy": False}]', "api\nOK\nworker\nCHECK\nHealthy:\n1\nTotal:\n2"],
    ["[]", "Healthy:\n0\nTotal:\n0"],
    ['[{"name": "worker", "healthy": False}]', "worker\nCHECK\nHealthy:\n0\nTotal:\n1"],
  ]) {
    assert.deepEqual(await executePython(pyodide, report + `report_services(${inventory})`), { ok: true, output: expected });
  }
});
