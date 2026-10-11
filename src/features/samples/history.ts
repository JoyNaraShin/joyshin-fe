/** Serializable document snapshots; selection/viewport/playhead are deliberately excluded. */
export type History<T> = { past: T[]; present: T; future: T[] };
export const initialHistory = <T>(present: T): History<T> => ({ past: [], present, future: [] });
export function commit<T>(state: History<T>, next: T): History<T> {
  if (JSON.stringify(state.present) === JSON.stringify(next)) return state;
  return { past: [...state.past.slice(-49), state.present], present: next, future: [] };
}
export function undo<T>(state: History<T>): History<T> {
  if (!state.past.length) return state;
  return {
    past: state.past.slice(0, -1),
    present: state.past[state.past.length - 1],
    future: [state.present, ...state.future],
  };
}
export function redo<T>(state: History<T>): History<T> {
  if (!state.future.length) return state;
  return {
    past: [...state.past, state.present],
    present: state.future[0],
    future: state.future.slice(1),
  };
}
