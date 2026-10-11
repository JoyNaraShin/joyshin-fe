import assert from "node:assert/strict";
import { test } from "node:test";
import { commit, initialHistory, redo, undo } from "../src/features/samples/history.ts";
import { length, locate, reorder, split, trim } from "../src/features/samples/timeline.ts";
const doc = [{ id: "a", start: 2, end: 8, caption: "첫 구간" }];
test("split preserves source continuity and edited duration", () => {
  const result = split(doc, 3, "b");
  assert.equal(length(result), 6);
  assert.equal(result[0].end, 5);
  assert.equal(result[1].start, 5);
  assert.deepEqual(locate(result, 3), { index: 1, source: 5, offset: 3 });
});
test("trimmed timeline maps to source time across disjoint segments", () => {
  const list = [
    { ...doc[0], end: 4 },
    { id: "b", start: 7, end: 10, caption: "" },
  ];
  assert.deepEqual(locate(list, 2.5), { index: 1, source: 7.5, offset: 2 });
  assert.equal(locate(list, 100)?.source, 10);
  assert.equal(locate(list, -1)?.source, 2);
});
test("invalid trim and edge splits preserve the original document", () => {
  assert.equal(trim(doc, "a", 9, 3, 10), doc);
  assert.equal(trim(doc, "a", -1, 8, 10), doc);
  assert.equal(trim(doc, "a", 2, 11, 10), doc);
  assert.equal(trim(doc, "a", Number.NaN, 8, 10), doc);
  assert.equal(split(doc, 0, "b"), doc);
  assert.equal(split(doc, 6, "b"), doc);
});
test("undo and redo restore all document fields together", () => {
  const next = split(doc, 3, "b");
  const state = commit(initialHistory(doc), next);
  assert.deepEqual(undo(state).present, doc);
  assert.deepEqual(redo(undo(state)).present, next);
});
test("editing after undo discards stale redo history", () => {
  const state = commit(commit(initialHistory(0), 1), 2);
  const changed = commit(undo(state), 3);
  assert.deepEqual(changed.future, []);
  assert.equal(redo(changed).present, 3);
});
test("no-op changes do not create history and memory is bounded", () => {
  let state = initialHistory(0);
  assert.equal(commit(state, 0), state);
  for (let i = 1; i <= 100; i++) state = commit(state, i);
  assert.equal(state.past.length, 50);
  assert.equal(undo(initialHistory(0)).present, 0);
});
test("Canvas snapshots restore object order, geometry and deletion", () => {
  const a = JSON.stringify({
    objects: [
      { id: "r", left: 10 },
      { id: "c", left: 30 },
    ],
  });
  const b = JSON.stringify({
    objects: [
      { id: "c", left: 30 },
      { id: "r", left: 60 },
    ],
  });
  const c = JSON.stringify({ objects: [{ id: "r", left: 60 }] });
  const history = commit(commit(initialHistory(a), b), c);
  assert.equal(undo(history).present, b);
  assert.equal(undo(undo(history)).present, a);
});

test("reordering preserves every clip and its source range", () => {
  const list = split(doc, 3, "b");
  const moved = reorder(list, "a", "b");
  assert.deepEqual(
    moved.map((c) => c.id),
    ["b", "a"],
  );
  assert.equal(length(moved), length(list));
  assert.equal(reorder(list, "missing", "b"), list);
});
