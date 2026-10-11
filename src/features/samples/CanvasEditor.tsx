import { Canvas, Circle, FabricObject, PencilBrush, Rect } from "fabric";
import { useCallback, useEffect, useRef, useState } from "react";
import { useStore } from "zustand";
import { createStore } from "zustand/vanilla";
import { type History, commit, initialHistory, redo, undo } from "./history";
import { mockHost } from "./mockHost";

type Shape = FabricObject & { id?: string; label?: string };
type EditorState = { history: History<string>; selected: string | null; busy: boolean };
const EMPTY = JSON.stringify({ version: "7.4.0", objects: [] });
FabricObject.customProperties = ["id", "label"];
export default function CanvasEditor() {
  const [store] = useState(() =>
    createStore<EditorState>(() => ({
      history: initialHistory(EMPTY),
      selected: null,
      busy: false,
    })),
  );
  const { history, selected, busy } = useStore(store);
  const canvasElement = useRef<HTMLCanvasElement>(null);
  const container = useRef<HTMLDivElement>(null);
  const canvas = useRef<Canvas | null>(null);
  const [status, setStatus] = useState("사각형·원을 추가하거나 그리기 모드를 선택하세요.");
  const [drawing, setDrawing] = useState(false);
  const [zoom, setZoom] = useState(100);
  const zoomRef = useRef(1);
  const restoreVersion = useRef(0);
  const save = useCallback(() => {
    const c = canvas.current;
    if (!c || store.getState().busy) return;
    store.setState((s) => ({ history: commit(s.history, JSON.stringify(c.toJSON())) }));
    setStatus("편집 문서를 갱신했습니다.");
  }, [store]);
  useEffect(() => {
    if (!canvasElement.current || !container.current) return;
    const c = new Canvas(canvasElement.current, {
      width: 800,
      height: 450,
      backgroundColor: "#ffffff",
      preserveObjectStacking: true,
    });
    canvas.current = c;
    c.freeDrawingBrush = new PencilBrush(c);
    c.freeDrawingBrush.width = 4;
    c.freeDrawingBrush.color = "#004643";
    const syncSelection = () =>
      store.setState({ selected: (c.getActiveObject() as Shape | undefined)?.id ?? null });
    c.on("selection:created", syncSelection);
    c.on("selection:updated", syncSelection);
    c.on("selection:cleared", syncSelection);
    c.on("object:modified", save);
    c.on("path:created", ({ path }) => {
      Object.assign(path, { id: crypto.randomUUID(), label: "자유 선" });
      save();
    });
    const resize = () => {
      const width = Math.max(240, Math.min(800, container.current?.clientWidth ?? 800));
      c.setDimensions({ width, height: (width * 450) / 800 });
      const scale = (width / 800) * zoomRef.current;
      c.setViewportTransform([scale, 0, 0, scale, 0, 0]);
    };
    const observer = new ResizeObserver(resize);
    observer.observe(container.current);
    resize();
    return () => {
      restoreVersion.current++;
      observer.disconnect();
      canvas.current = null;
      void c.dispose();
    };
  }, [store, save]); // One engine instance per mounted editor.
  const restore = async (next: History<string>) => {
    const c = canvas.current;
    if (!c || store.getState().busy) return;
    const version = ++restoreVersion.current;
    const previous = store.getState().history;
    store.setState({ history: next, busy: true, selected: null });
    try {
      c.discardActiveObject();
      await c.loadFromJSON(next.present);
      if (version !== restoreVersion.current) return;
      c.requestRenderAll();
      setStatus("문서 상태를 복원했습니다.");
    } catch {
      if (version === restoreVersion.current) {
        store.setState({ history: previous });
        setStatus("문서를 복원하지 못했습니다. 다시 시도해 주세요.");
      }
    } finally {
      if (version === restoreVersion.current) store.setState({ busy: false });
    }
  };
  const add = (type: "rect" | "circle") => {
    const c = canvas.current;
    if (!c || busy) return;
    const item =
      type === "rect"
        ? new Rect({ width: 150, height: 100, fill: "#d8e9e5", stroke: "#004643", strokeWidth: 3 })
        : new Circle({ radius: 55, fill: "#f5d6a7", stroke: "#563c1d", strokeWidth: 3 });
    Object.assign(item, {
      id: crypto.randomUUID(),
      label: type === "rect" ? "사각형" : "원",
      left: 120 + c.getObjects().length * 14,
      top: 100 + c.getObjects().length * 10,
    });
    c.add(item);
    c.setActiveObject(item);
    c.requestRenderAll();
    save();
  };
  const editSelected = (action: "delete" | "front" | "back" | "left" | "right") => {
    const c = canvas.current;
    const item = c?.getActiveObject();
    if (!c || !item || busy) return;
    if (action === "delete") {
      c.remove(...c.getActiveObjects());
      c.discardActiveObject();
    }
    if (action === "front") c.bringObjectForward(item);
    if (action === "back") c.sendObjectBackwards(item);
    if (action === "left" || action === "right") {
      item.set("left", item.left + (action === "left" ? -10 : 10));
      item.setCoords();
    }
    c.requestRenderAll();
    save();
  };
  const setScale = (value: number) => {
    setZoom(value);
    zoomRef.current = value / 100;
    const c = canvas.current;
    if (!c) return;
    const scale = (c.getWidth() / 800) * zoomRef.current;
    c.setViewportTransform([scale, 0, 0, scale, 0, 0]);
  };
  const download = () => {
    const c = canvas.current;
    if (!c) return;
    c.svgViewportTransformation = false;
    const url = URL.createObjectURL(
      new Blob([c.toSVG({ viewBox: { x: 0, y: 0, width: 800, height: 450 } })], {
        type: "image/svg+xml",
      }),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = "canvas-document.svg";
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setStatus("SVG 파일을 내보냈습니다.");
  };
  const objects = JSON.parse(history.present).objects as Array<{ id: string; label: string }>;
  return (
    <section className="editor" aria-label="Canvas 편집기">
      <div className="editor-toolbar">
        <button type="button" disabled={busy} onClick={() => add("rect")}>
          사각형 추가
        </button>
        <button type="button" disabled={busy} onClick={() => add("circle")}>
          원 추가
        </button>
        <button
          type="button"
          disabled={busy}
          aria-pressed={drawing}
          onClick={() => {
            if (!canvas.current) return;
            canvas.current.isDrawingMode = !drawing;
            setDrawing(!drawing);
          }}
        >
          자유 그리기
        </button>
        <button
          type="button"
          disabled={busy || !history.past.length}
          onClick={() => void restore(undo(history))}
        >
          실행 취소
        </button>
        <button
          type="button"
          disabled={busy || !history.future.length}
          onClick={() => void restore(redo(history))}
        >
          다시 실행
        </button>
        <label>
          확대
          <select value={zoom} disabled={busy} onChange={(e) => setScale(Number(e.target.value))}>
            {[50, 75, 100, 125, 150].map((v) => (
              <option key={v} value={v}>
                {v}%
              </option>
            ))}
          </select>
        </label>
      </div>
      <div
        className="editor-stage"
        ref={container}
        style={{ pointerEvents: busy ? "none" : "auto" }}
      >
        <canvas
          ref={canvasElement}
          aria-label="도형을 선택해 드래그하거나 모서리 핸들로 크기와 회전을 변경하세요. 도형 선택과 이동은 아래 레이어 버튼으로도 가능합니다."
        />
      </div>
      <ul className="layer-list" aria-label="레이어 목록">
        {[...objects].reverse().map((o, i) => (
          <li key={o.id}>
            <button
              type="button"
              disabled={busy || drawing}
              aria-pressed={selected === o.id}
              onClick={() => {
                const c = canvas.current;
                const item = c?.getObjects().find((x) => (x as Shape).id === o.id);
                if (c && item) {
                  c.setActiveObject(item);
                  c.requestRenderAll();
                }
              }}
            >
              {objects.length - i}. {o.label}
            </button>
          </li>
        ))}
      </ul>
      <div className="editor-toolbar" style={{ marginTop: 16 }}>
        <button
          type="button"
          disabled={!selected || busy || drawing}
          onClick={() => editSelected("left")}
        >
          왼쪽 이동
        </button>
        <button
          type="button"
          disabled={!selected || busy || drawing}
          onClick={() => editSelected("right")}
        >
          오른쪽 이동
        </button>
        <button
          type="button"
          disabled={!selected || busy || drawing}
          onClick={() => editSelected("front")}
        >
          앞으로
        </button>
        <button
          type="button"
          disabled={!selected || busy || drawing}
          onClick={() => editSelected("back")}
        >
          뒤로
        </button>
        <button
          type="button"
          disabled={!selected || busy || drawing}
          onClick={() => editSelected("delete")}
        >
          삭제
        </button>
        <button
          type="button"
          disabled={busy}
          onClick={() =>
            void mockHost
              .loadDocument()
              .then((doc) => restore(commit(store.getState().history, doc.scene)))
          }
        >
          목 문서 불러오기
        </button>
        <button type="button" disabled={busy || !objects.length} onClick={download}>
          SVG 내보내기
        </button>
      </div>
      <output className="editor-status">
        {busy ? "문서를 복원하는 중…" : status} 객체 {objects.length}개 · 되돌릴 작업{" "}
        {history.past.length}개
      </output>
      <p className="demo-help">
        도형 추가 → 드래그·크기 조절 → 레이어 순서 변경 → 실행 취소로 결과를 비교하세요. 문서는
        메모리에서만 유지되며 새로고침하면 초기화됩니다. 최대 50개의 편집 이력을 보관합니다.
      </p>
    </section>
  );
}
