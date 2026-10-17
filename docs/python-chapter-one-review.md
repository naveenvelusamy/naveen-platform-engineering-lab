# Chapter 1 review

Route: `/topics/python-setup`. Scope: Python Fundamentals only.

## Audit

The original page embedded eight short explanations, runnable examples, a pre-solved
service summary task, and a single dependency quiz directly in the client component.
It lacked per-lesson outcomes, independent exercises, progressive hints, and quiz
feedback explaining each choice. Task completion accepted any successful execution,
which did not establish that the task requirements were met.

## Implementation

`app/topics/python-setup/content/chapter-one.ts` holds typed lesson data, separate
from rendering. Eight lessons progress through output, runtime/setup, variables,
collections, control flow, functions/errors, JSON, and an integrated service report.
Each includes two exercises, nested hints, expected results, outcomes, and a
multiple-choice quiz with an explanation for every option.

The editor accepts an example or an intentionally unfinished exercise starter.
Loading a starter explicitly replaces the current workspace; navigating preserves
each lesson's current workspace. Completion requires the lesson quiz and both
self-reported exercise reviews. Exercises are not automatically graded. State is
session-only and resets on page reload. No later chapters are included.

## Verification

Run `npm test` with Node 22.18+ (native TypeScript stripping), `npm run lint`, and
`npm run build`. The tests check curriculum completeness and execute every example
and starter using the installed Pyodide runtime, checking example output in fresh
namespaces. Exercise expected outputs are learner review criteria, not automated
solution checks.

Manual review: visit the route, run and edit an example, load both exercises,
open hints sequentially, compare output, submit wrong and right quiz answers,
confirm completion gating, navigate away and back, and check the final chapter
completion message. Also inspect narrow screens and both themes.

## Results for this change

- `npm test`: passed (2 tests; every lesson example and all 16 starters executed).
- `npm run lint`: passed.
- `npx tsc --noEmit`: passed.
- `npm run build`: prebuild completed; Turbopack stalled during compilation without
  diagnostics and was interrupted.
- `npx next build --webpack`: passed, including static generation of the lesson route.
- `git diff --check`: passed.
- Browser interaction and visual QA have not been run; the manual steps above
  remain for review. No merge or deployment was performed.
