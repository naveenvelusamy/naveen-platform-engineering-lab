# Python Fundamentals review

Route: `/topics/python-setup`. Branch: `feat/python-fundamentals-chapter-1`.
Scope of this revision: implement the revised first lesson and propose the beginner
path. The seven other existing lessons remain available as the earlier edition;
they have not been rewritten or presented as the revised lessons 2–12.

## Findings and changes

The first edition introduced execution order, comments, strings, function calls,
arguments, multiple print arguments, and syntax errors in one lesson. The next
lesson jumped to modules and virtual environments. That sequence assumed too much
for a learner writing their first independent program.

Lesson 1 now starts with “What is Python?” and one instruction:
`print("Hello, World!")`. It explains `print`, parentheses, and quoted text in plain
language without requiring knowledge of functions or arguments. The flow is:

1. What Python is and why instructions are needed.
2. One example and an explanation of its parts.
3. A written output prediction, followed by an optional expected-output reveal.
4. Run and observe in the existing editor.
5. An independent everyday message, then a small automation message using the same syntax.
6. Optional nested hints and expected-result comparisons.
7. Common mistakes with quotes, parentheses, and lowercase `print`.
8. An explained quiz, recap, outcomes, and completion.

Practice starts with an empty editor. No exercise solution is loaded automatically.
The automation exercise only displays text; it does not perform infrastructure work.
Completion stays on the recap rather than advancing into the earlier edition's
modules/environment lesson.

## Content and progress

`app/topics/python-setup/content/chapter-one.ts` retains the existing lesson records.
`app/topics/python-setup/content/beginner-path.ts` holds first-lesson teaching detail
and the proposed path separately from presentation. Proposed topics have no
completion IDs and do not increase the existing progress denominator.

All existing lesson IDs, exercise IDs, and quiz-completion keys remain unchanged.
Already completed lessons are not forced through the new completion requirements.
The existing progress model is session-only: it did not store progress across page
reloads, so there is no persisted history to migrate. This revision keeps that
behavior and explicitly explains it. Exercise reviews remain self-reported,
not automatic grading. Navigation preserves each lesson's editor workspace during
the session; loading an exercise or resetting an example replaces that workspace.

## Proposed beginner curriculum

| Lesson | Topic | Main step |
| --- | --- | --- |
| 01 | What is Python? Your first program | Display one message. Implemented in this revision. |
| 02 | Understanding `print()` and comments | Practise output, then explain an instruction with a comment. |
| 03 | Variables and storing information | Name a value and use it again. |
| 04 | Strings, numbers, and booleans | Choose the appropriate kind of value. |
| 05 | Basic operators and calculations | Calculate and explain a result. |
| 06 | Getting input and displaying output | Ask for information and respond. |
| 07 | Making decisions with `if` | Choose what to do based on a condition. |
| 08 | Repeating instructions with loops | Trace a repeated action. |
| 09 | Lists and dictionaries | Learn ordered groups first, then named fields. |
| 10 | Functions and reusable code | Name an action, then explore inputs and results gradually. |
| 11 | Errors and debugging | Read a message, isolate a mistake, verify a correction. |
| 12 | Your first mini-project | Plan, write, and check a program independently. |

Each lesson should follow explain → show → predict → practise → understand → progress.
Everyday examples come before infrastructure scenarios. References and mutability
should build on variables and collections; scope, arguments, and return values
should deepen the function lessons after the first reusable action is understood.
These are depth milestones, not material to compress into Lesson 1.

After fundamentals: modules, virtual environments, files, JSON, APIs, testing, and
DevOps automation, progressing toward Platform Engineering, AWS, Azure, Kubernetes,
and API development. These stages are proposed, not generated. Lesson 6 will need
a deliberate browser input flow: the existing worker has no interactive input UI.

## Validation for this revision

- `npm test`: passed (3 tests, including all eight examples and sixteen starters in Pyodide).
- `npm run lint`: passed.
- `npx tsc --noEmit`: passed.
- `npm run build -- --webpack`: passed, including static generation of the lesson route.
  Webpack was selected because the default Turbopack build stalled in the earlier review.
- Built HTML smoke check: passed for section order, single editor instruction,
  prediction field, collapsed hints, and hidden expected output on initial render.
- `git diff --check`: passed.
- Interactive browser and visual checks remain unverified; no browser was connected
  during the local testing session. Static rendering checks do not establish click behavior.
- No merge or deployment performed.

Manual review: predict before revealing output, run the greeting, write a new
message from an empty editor, open hints progressively, compare output, try a
missing quote and repair it, submit wrong/right quiz answers, complete both practice
reviews, and mark Lesson 1 complete. Confirm it stays on the recap, navigating away
and back retains completion and workspace, and earlier lessons remain accessible.
Check narrow screens and both themes.
