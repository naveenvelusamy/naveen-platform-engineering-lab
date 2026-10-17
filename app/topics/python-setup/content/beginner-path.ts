// Derive the path from implemented content so navigation cannot drift from lessons.
export function buildBeginnerPath(lessons: readonly { id: string; title: string; outcomes: string[] }[]) {
  return lessons.map((lesson) => ({
    id: lesson.id,
    topic: lesson.title,
    focus: lesson.outcomes[0],
  }));
}
