import { COLUMN } from "@/features/portfolio/layout/DocSection";
import { useEffect, useReducer, useRef } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { Link } from "react-router-dom";

type Shape = {
  id: string;
  name: string;
  kind: "rect" | "circle";
  x: number;
  y: number;
  w: number;
  h: number;
  fill: string;
  hidden: boolean;
};
type Document = { shapes: Shape[]; selected: string | null };
type State = { past: Document[]; present: Document; future: Document[] };
type Action =
  | { type: "select"; id: string | null }
  | { type: "move"; id: string; x: number; y: number; commit?: boolean }
  | { type: "add" }
  | { type: "remove" }
  | { type: "order"; direction: -1 | 1 }
  | { type: "toggle" }
  | { type: "undo" }
  | { type: "redo" }
  | { type: "gesture"; original: Document };
const initial: Document = {
  selected: "card-2",
  shapes: [
    {
      id: "card-1",
      name: "배경 카드",
      kind: "rect",
      x: 48,
      y: 44,
      w: 390,
      h: 246,
      fill: "#e9dfca",
      hidden: false,
    },
    {
      id: "card-2",
      name: "강조 카드",
      kind: "rect",
      x: 125,
      y: 95,
      w: 210,
      h: 132,
      fill: "#08796d",
      hidden: false,
    },
    {
      id: "card-3",
      name: "원형 요소",
      kind: "circle",
      x: 292,
      y: 195,
      w: 104,
      h: 104,
      fill: "#e4ab53",
      hidden: false,
    },
  ],
};
let nextId = 4;
function snapshot(state: State, next: Document): State {
  if (next === state.present) return state;
  return { past: [...state.past.slice(-49), state.present], present: next, future: [] };
}
function reducer(state: State, action: Action): State {
  const doc = state.present;
  if (action.type === "gesture") {
    return { past: [...state.past.slice(-49), action.original], present: doc, future: [] };
  }
  if (action.type === "undo") {
    if (!state.past.length) return state;
    const prev = state.past[state.past.length - 1];
    return { past: state.past.slice(0, -1), present: prev, future: [doc, ...state.future] };
  }
  if (action.type === "redo") {
    if (!state.future.length) return state;
    return { past: [...state.past, doc], present: state.future[0], future: state.future.slice(1) };
  }
  if (action.type === "select") return { ...state, present: { ...doc, selected: action.id } };
  if (action.type === "move") {
    const current = doc.shapes.find((shape) => shape.id === action.id);
    if (!current || (current.x === action.x && current.y === action.y)) return state;
    const next = {
      ...doc,
      shapes: doc.shapes.map((s) => (s.id === action.id ? { ...s, x: action.x, y: action.y } : s)),
    };
    return action.commit === false ? { ...state, present: next } : snapshot(state, next);
  }
  if (action.type === "add") {
    const id = `shape-${nextId++}`;
    const shape: Shape = {
      id,
      name: `새 도형 ${id.split("-")[1]}`,
      kind: "rect",
      x: 90,
      y: 60,
      w: 145,
      h: 90,
      fill: "#9dbbba",
      hidden: false,
    };
    return snapshot(state, { shapes: [...doc.shapes, shape], selected: id });
  }
  const selected = doc.selected;
  if (!selected) return state;
  const index = doc.shapes.findIndex((s) => s.id === selected);
  if (index < 0) return state;
  if (action.type === "remove")
    return snapshot(state, { shapes: doc.shapes.filter((s) => s.id !== selected), selected: null });
  if (action.type === "toggle")
    return snapshot(state, {
      ...doc,
      shapes: doc.shapes.map((s) => (s.id === selected ? { ...s, hidden: !s.hidden } : s)),
    });
  if (action.type === "order") {
    const target = index + action.direction;
    if (target < 0 || target >= doc.shapes.length) return state;
    const shapes = [...doc.shapes];
    [shapes[index], shapes[target]] = [shapes[target], shapes[index]];
    return snapshot(state, { ...doc, shapes });
  }
  return state;
}
const initialState: State = { past: [], present: initial, future: [] };
function ActionButton({
  children,
  disabled,
  onClick,
}: { children: string; disabled?: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className="rounded-md border border-rule-2 px-3 py-2 text-t2 font-medium text-ink disabled:opacity-35 hover:border-mark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mark"
    >
      {children}
    </button>
  );
}
export function SvgEditorPage() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const drag = useRef<{
    id: string;
    pointerX: number;
    pointerY: number;
    x: number;
    y: number;
    original: Document;
  } | null>(null);
  const svg = useRef<SVGSVGElement>(null);
  const doc = state.present;
  const selected = doc.shapes.find((s) => s.id === doc.selected);
  // Document-level shortcuts apply only when an input is not active.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLElement && /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName))
        return;
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "z") {
        e.preventDefault();
        dispatch({ type: e.shiftKey ? "redo" : "undo" });
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "y") {
        e.preventDefault();
        dispatch({ type: "redo" });
      } else if ((e.key === "Delete" || e.key === "Backspace") && !e.metaKey && !e.ctrlKey) {
        if (doc.selected) {
          e.preventDefault();
          dispatch({ type: "remove" });
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [doc.selected]);
  const point = (event: ReactPointerEvent<SVGSVGElement>) => {
    const ctm = svg.current?.getScreenCTM();
    if (!ctm) return null;
    const xy = new DOMPoint(event.clientX, event.clientY).matrixTransform(ctm.inverse());
    return { x: xy.x, y: xy.y };
  };
  const onDown = (event: ReactPointerEvent<SVGSVGElement>, shape: Shape) => {
    if (shape.hidden || event.button !== 0) return;
    const p = point(event);
    if (!p) return;
    dispatch({ type: "select", id: shape.id });
    drag.current = {
      id: shape.id,
      pointerX: p.x,
      pointerY: p.y,
      x: shape.x,
      y: shape.y,
      original: state.present,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const onMove = (event: ReactPointerEvent<SVGSVGElement>) => {
    if (!drag.current) return;
    const p = point(event);
    if (!p) return;
    const d = drag.current;
    const movingShape = d.original.shapes.find((s) => s.id === d.id);
    if (!movingShape) return;
    const x = Math.round(Math.max(0, Math.min(520 - movingShape.w, d.x + p.x - d.pointerX)));
    const y = Math.round(Math.max(0, Math.min(360 - movingShape.h, d.y + p.y - d.pointerY)));
    dispatch({ type: "move", id: d.id, x, y, commit: false });
  };
  const onUp = (event: ReactPointerEvent<SVGSVGElement>) => {
    if (!drag.current) return;
    const d = drag.current;
    drag.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId))
      event.currentTarget.releasePointerCapture(event.pointerId);
    // One history entry per gesture, even if it triggered dozens of pointermove events.
    // The reducer's last uncommitted position is committed by a dedicated reconciliation action.
    dispatch({ type: "select", id: d.id });
    const shape = doc.shapes.find((s) => s.id === d.id);
    if (shape && (shape.x !== d.x || shape.y !== d.y)) {
      // Store the original document in history by invoking the reducer's gesture commit.
      dispatch({ type: "gesture", original: d.original });
    }
  };
  return (
    <main className={`${COLUMN} pt-14 pb-8`} id="main" tabIndex={-1}>
      <Link className="text-t2 text-mark underline underline-offset-4" to="/apply/orinu">
        ← 지원 포트폴리오
      </Link>
      <h1 className="mt-5 text-[clamp(28px,5vw,38px)] font-bold tracking-[-0.04em]">
        SVG 레이어 에디터 · 인터랙티브 데모
      </h1>
      <p className="mt-3 text-t3 leading-[1.8] text-ink-2">
        도형을 드래그해 위치를 옮기거나 오른쪽 패널에서 레이어를 선택하세요. 레이어 순서와 표시
        여부를 변경하고 Undo/Redo로 되돌릴 수 있습니다. <strong>개인 학습·지원용 데모</strong>이며,
        회사 실무 프로젝트가 아닙니다.
      </p>
      <div className="mt-6 flex flex-wrap gap-2">
        <ActionButton disabled={!state.past.length} onClick={() => dispatch({ type: "undo" })}>
          ↶ 실행 취소
        </ActionButton>
        <ActionButton disabled={!state.future.length} onClick={() => dispatch({ type: "redo" })}>
          ↷ 다시 실행
        </ActionButton>
        <ActionButton onClick={() => dispatch({ type: "add" })}>+ 도형 추가</ActionButton>
        <ActionButton disabled={!selected} onClick={() => dispatch({ type: "remove" })}>
          선택 도형 삭제
        </ActionButton>
      </div>
      <div className="mt-5 grid grid-cols-[minmax(0,1fr)_190px] gap-4 max-page:grid-cols-1">
        <div className="min-w-0 rounded-lg border border-rule bg-white p-2">
          <svg
            ref={svg}
            viewBox="0 0 520 360"
            className="block h-auto w-full touch-none select-none"
            aria-label="도형을 드래그해서 배치할 수 있는 SVG 편집 캔버스"
            onPointerMove={onMove}
            onPointerUp={onUp}
            onPointerCancel={onUp}
          >
            <title>인터랙티브 SVG 편집 영역</title>
            <rect
              x="0"
              y="0"
              width="520"
              height="360"
              fill="#f7f8f6"
              onPointerDown={() => dispatch({ type: "select", id: null })}
            />
            {doc.shapes.map((s) =>
              !s.hidden ? (
                <g
                  key={s.id}
                  onPointerDown={(e) => {
                    e.stopPropagation();
                    onDown(e, s);
                  }}
                  style={{ cursor: "grab" }}
                >
                  {s.kind === "rect" ? (
                    <rect x={s.x} y={s.y} width={s.w} height={s.h} rx="10" fill={s.fill} />
                  ) : (
                    <ellipse
                      cx={s.x + s.w / 2}
                      cy={s.y + s.h / 2}
                      rx={s.w / 2}
                      ry={s.h / 2}
                      fill={s.fill}
                    />
                  )}
                  {s.id === doc.selected ? (
                    <rect
                      x={s.x - 4}
                      y={s.y - 4}
                      width={s.w + 8}
                      height={s.h + 8}
                      rx="4"
                      fill="none"
                      stroke="#143c5b"
                      strokeWidth="2"
                      strokeDasharray="6 4"
                      pointerEvents="none"
                    />
                  ) : null}
                </g>
              ) : null,
            )}
          </svg>
        </div>
        <aside className="rounded-lg border border-rule p-4">
          <h2 className="font-bold">레이어</h2>
          <p className="mt-1 text-t2 text-mute">위쪽 항목이 앞에 표시됩니다.</p>
          <div className="mt-4 space-y-2">
            {[...doc.shapes].reverse().map((s) => (
              <button
                type="button"
                key={s.id}
                aria-pressed={s.id === doc.selected}
                onClick={() => dispatch({ type: "select", id: s.id })}
                className={`block w-full rounded-md border px-3 py-2 text-left text-t2 ${s.id === doc.selected ? "border-mark bg-[#e8f5f0]" : "border-rule"}`}
              >
                <span
                  className="mr-2 inline-block size-3 rounded-sm align-middle"
                  style={{ backgroundColor: s.fill }}
                />
                {s.name}
                {s.hidden ? " (숨김)" : ""}
              </button>
            ))}
          </div>
          <div className="mt-5 grid grid-cols-2 gap-2">
            <ActionButton
              disabled={!selected || doc.shapes[doc.shapes.length - 1]?.id === selected.id}
              onClick={() => dispatch({ type: "order", direction: 1 })}
            >
              앞으로
            </ActionButton>
            <ActionButton
              disabled={!selected || doc.shapes[0]?.id === selected.id}
              onClick={() => dispatch({ type: "order", direction: -1 })}
            >
              뒤로
            </ActionButton>
          </div>
          <div className="mt-2">
            <ActionButton disabled={!selected} onClick={() => dispatch({ type: "toggle" })}>
              {selected?.hidden ? "레이어 표시" : "표시/숨김"}
            </ActionButton>
          </div>
          {selected ? (
            <p className="mt-5 text-t2 text-mute tabular-nums">
              선택: {selected.name} · X {selected.x}, Y {selected.y}
            </p>
          ) : (
            <p className="mt-5 text-t2 text-mute">선택한 레이어가 없습니다.</p>
          )}
        </aside>
      </div>
      <section className="mt-9 border-t border-rule pt-6">
        <h2 className="text-t4 font-bold">설계 의도와 범위</h2>
        <p className="mt-3 text-t3 leading-[1.8] text-ink-2">
          도형 목록의 순서는 SVG 페인팅 순서이며 선택된 ID는 별도 보관합니다. 변경 가능한 문서
          상태의 히스토리를 분리해, 선택만 바꾸는 작업은 Undo 스택에 쌓지 않습니다. 입력 좌표는
          SVG의 getScreenCTM 역행렬로 변환하므로 반응형 크기 변화에도 드래그 동작이 유지됩니다.
        </p>
        <p className="mt-3 text-t3 leading-[1.8] text-ink-2">
          이 데모는 SVG 기반입니다. Fabric.js 사용 경험이나 복잡한 제작 도구 전체 구현을 증명하는
          것으로 소개하지 않습니다. 추후 확장할 지점은 크기 조절 핸들, 스냅·정렬 가이드, 문서
          직렬화, 키보드 접근성 강화, 자동화 테스트입니다.
        </p>
      </section>
    </main>
  );
}
