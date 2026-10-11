export type Clip = { id: string; start: number; end: number; caption: string };
export const length = (clips: Clip[]) => clips.reduce((sum, c) => sum + c.end - c.start, 0);
export function locate(clips: Clip[], time: number) {
  const bounded = Math.max(0, Math.min(time, length(clips)));
  let offset = 0;
  for (let index = 0; index < clips.length; index++) {
    const c = clips[index];
    const duration = c.end - c.start;
    if (bounded < offset + duration || index === clips.length - 1)
      return { index, source: c.start + Math.min(duration, bounded - offset), offset };
    offset += duration;
  }
  return null;
}
export function split(clips: Clip[], time: number, id: string): Clip[] {
  const position = locate(clips, time);
  if (!position) return clips;
  const { index, source } = position;
  const clip = clips[index];
  if (source - clip.start < 0.1 || clip.end - source < 0.1) return clips;
  return [
    ...clips.slice(0, index),
    { ...clip, end: source },
    { ...clip, id, start: source },
    ...clips.slice(index + 1),
  ];
}
export function trim(clips: Clip[], id: string, start: number, end: number, duration: number) {
  if (
    ![start, end, duration].every(Number.isFinite) ||
    start < 0 ||
    end > duration ||
    end - start < 0.1
  )
    return clips;
  return clips.map((c) => (c.id === id ? { ...c, start, end } : c));
}

export function reorder(clips: Clip[], from: string, to: string) {
  const source = clips.findIndex((c) => c.id === from);
  const target = clips.findIndex((c) => c.id === to);
  if (source < 0 || target < 0 || source === target) return clips;
  const next = [...clips];
  const [item] = next.splice(source, 1);
  next.splice(target, 0, item);
  return next;
}
