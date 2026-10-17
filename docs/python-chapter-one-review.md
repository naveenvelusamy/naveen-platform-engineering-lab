# Python Fundamentals review

Route: `/topics/python-setup`. Branch: `feat/python-fundamentals-chapter-1`.
Scope: all twelve beginner lessons in Chapter 1. No later chapters were generated.

## Learning experience

The earlier material moved from first output directly to modules and environments.
The rewritten path builds one main idea at a time, using everyday examples before
applying it to a supplied automation scenario. Each lesson includes:

- What the concept is, why it helps, and explanations of new syntax.
- A small example, a prediction field, an optional output reveal, and Run/observe guidance.
- Two independent exercises with optional nested hints and expected-result comparisons.
- Common mistakes, an explained quiz, a recap, and learning outcomes.

Practice starts empty except where the task needs supplied data or intentionally
incorrect code to debug. Exercise solutions are not automatically loaded. Follow-on
examples for dictionaries, function inputs/results, and specific error handling
are explained separately before the exercises that need them. They have their own
Try example buttons and optional output comparisons.

| Lesson | Main topic |
| --- | --- |
| 01 | What is Python? Your first program |
| 02 | Understanding `print()` and comments |
| 03 | Variables and storing information |
| 04 | Strings, numbers, and booleans |
| 05 | Basic operators and calculations |
| 06 | Getting input and displaying output |
| 07 | Making decisions with `if` |
| 08 | Repeating instructions with loops |
| 09 | Lists and dictionaries |
| 10 | Functions and reusable code |
| 11 | Errors and debugging |
| 12 | Your first mini-project |

The final project requires planning and implementing a service snapshot report,
then checking mixed health, empty input, and all-unhealthy input. It uses no APIs,
cloud access, package installation, or real infrastructure changes.

References/mutability, scope, argument styles, modules, virtual environments,
files, JSON, APIs, testing, and DevOps automation remain subjects for subsequent
deeper lessons. Existing modules/environment and JSON material remains accessible
as optional earlier-edition content; it is not part of the beginner prerequisite path.

## Maintainability and execution

- `content/chapter-one.ts`: typed teaching, examples, exercises, quizzes, and outcomes.
- `content/beginner-path.ts`: derives the displayed path from the implemented lessons.
- `content/legacy-lessons.ts`: retains the two optional earlier topics and their IDs.
- `public/python-runner.mjs`: shared execution behavior for the worker and runtime tests.
- `public/python.worker.js`: loads Pyodide and forwards execution results.

The Program input box appears from Lesson 6 onward. Answers are supplied before
Run, one per line; they are consumed by `input()` in order without terminal echo.
An empty box supplies no lines; a newline can supply a blank answer. Missing lines
produce EOFError rather than waiting. Prompts appear in output. Reset example also
restores its sample input; loading an exercise supplies its sample input when given.
Input text remains only in page-session state.

Every run uses fresh Python globals. Variables from a previous run cannot hide
an undefined-name error or make a partial solution appear complete. This still
uses one worker/runtime with the existing stop and timeout controls. It is a
script editor, so learners use print for output rather than relying on notebook
expression display.

## Progress compatibility

All eight earlier lesson IDs remain accessible. Six are reused for the same topic
areas: first output, variables, collections, loops, functions, and the final report.
The modules/environment and JSON IDs remain on their optional lessons. Existing
exercise review keys and passed-quiz records are retained. Already completed
lessons can continue without repeating the rewritten requirements.

The beginner progress denominator is now twelve lessons, with twenty-four exercise
reviews. Optional-topic completion badges remain visible but do not count toward
beginner chapter completion. Newly introduced topics are not automatically credited
from unrelated older lessons. A smaller percentage after expansion reflects more
material, not deleted completion records.

Progress remains session-only, matching the existing implementation; there was no
persisted history to migrate across reloads. Navigating retains per-lesson code and
queued input. Loading practice or an example replaces the current workspace, with
an explanation shown before the action. Exercise reviews remain self-reported,
not automatic grading. Completion advances through the beginner sequence and stops
at the final project instead of advancing into optional topics.

## Validation

- `npm test`: passed, seven tests covering content completeness, stable topic IDs,
  all twelve main examples, three follow-on examples, all twenty-four starters,
  both optional examples, queued input/EOF/conversion, fresh globals, Python errors,
  recovery after errors, and a reference report for three inventory cases.
- `npm run lint`: passed.
- `npx tsc --noEmit`: passed.
- `npm run build -- --webpack`: passed, including static route generation.
  Webpack was selected because the earlier Turbopack build stalled.
- `git diff --check`: passed.
- Local production server: HTTP 200 for the lesson route and shared runner module.
  HTML smoke checks passed for the greeting source, prediction field, hidden input
  in Lesson 1, collapsed hints, beginner navigation, and optional-topic labels.
- Browser interaction, visual layout, narrow screens, and themes remain unverified:
  the Browser connection reports no available browser. Runtime tests do not prove
  click behavior or layout.
- No merge or deployment performed.

Manual review: navigate all twelve lessons, predict before revealing output, run
and modify each example, load independent practice, open hints progressively,
check wrong/right quiz answers, and confirm completion advances to the next lesson.
From Lesson 6, change Program input and test missing/blank answers. Confirm previous
code names are unavailable on a fresh run, and Stop/timeout still restart Python.
Check optional topics, completion badges, the final project, both themes, and narrow
screens. Page reload resets session progress as before.
