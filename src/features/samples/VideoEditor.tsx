import { useEffect, useRef } from "react";
import { computed, createApp, defineComponent, h, onBeforeUnmount, ref, shallowRef } from "vue";
import { commit, initialHistory, redo, undo } from "./history";
import { type Clip, length, locate, reorder, split, trim } from "./timeline";

const VideoTool = defineComponent({
  setup() {
    const video = ref<HTMLVideoElement>();
    const history = shallowRef(initialHistory<Clip[]>([]));
    const clips = computed(() => history.value.present);
    const duration = ref(0);
    const time = ref(0);
    const selected = ref("");
    const source = ref(`${import.meta.env.BASE_URL}samples/test-pattern.mp4`);
    const status = ref("테스트 영상을 불러오는 중…");
    const playing = ref(false);
    const assetName = ref("12초 테스트 패턴 영상");
    let objectUrl: string | null = null;
    let index = 0;
    let animation = 0;
    const total = computed(() => length(clips.value));
    const active = computed(() => clips.value.find((c) => c.id === selected.value));
    const caption = computed(() => {
      const pos = locate(clips.value, time.value);
      return pos ? clips.value[pos.index].caption : "";
    });
    const seek = (value: number) => {
      const pos = locate(clips.value, value);
      if (!pos || !video.value) return;
      index = pos.index;
      time.value = Math.max(0, Math.min(value, total.value));
      video.value.currentTime = pos.source;
    };
    const apply = (next: typeof history.value) => {
      video.value?.pause();
      history.value = next;
      if (!clips.value.some((c) => c.id === selected.value))
        selected.value = clips.value[0]?.id ?? "";
      seek(Math.min(time.value, Math.max(0, total.value - 0.01)));
    };
    const tick = () => {
      const v = video.value;
      const clip = clips.value[index];
      if (v && clip && !v.paused) {
        const offset = clips.value.slice(0, index).reduce((sum, c) => sum + c.end - c.start, 0);
        if (v.currentTime >= clip.end - 0.025) {
          if (index + 1 < clips.value.length) {
            index++;
            v.currentTime = clips.value[index].start;
            time.value = offset + clip.end - clip.start;
          } else {
            v.pause();
            time.value = total.value;
          }
        } else time.value = offset + Math.max(0, v.currentTime - clip.start);
      }
      animation = requestAnimationFrame(tick);
    };
    animation = requestAnimationFrame(tick);
    onBeforeUnmount(() => {
      cancelAnimationFrame(animation);
      video.value?.pause();
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    });
    const metadata = () => {
      const value = video.value?.duration ?? 0;
      if (!Number.isFinite(value) || value <= 0.1) {
        status.value = "유효한 길이의 영상을 선택해 주세요.";
        return;
      }
      duration.value = value;
      selected.value = crypto.randomUUID();
      history.value = initialHistory([
        { id: selected.value, start: 0, end: value, caption: "자막을 편집해 보세요" },
      ]);
      index = 0;
      time.value = 0;
      status.value = "영상 준비 완료. 타임라인에서 구간을 선택하세요.";
    };
    const upload = (event: Event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (!file) return;
      if (!file.type.startsWith("video/")) {
        status.value = "브라우저에서 재생 가능한 영상 파일을 선택해 주세요.";
        return;
      }
      video.value?.pause();
      if (objectUrl) URL.revokeObjectURL(objectUrl);
      objectUrl = URL.createObjectURL(file);
      source.value = objectUrl;
      duration.value = 0;
      history.value = initialHistory<Clip[]>([]);
      assetName.value = file.name;
      status.value = "로컬 영상을 읽는 중…";
    };
    const button = (text: string, fn: () => void, disabled = false) =>
      h("button", { type: "button", onClick: fn, disabled }, text);
    const numberInput = (label: string, field: "start" | "end", type = "number") =>
      h("label", [
        label,
        h("input", {
          type,
          step: 0.1,
          min: 0,
          max: duration.value,
          value: active.value?.[field].toFixed(2),
          onChange: (e: Event) => {
            const clip = active.value;
            if (!clip) return;
            const value = Number((e.target as HTMLInputElement).value);
            const next = trim(
              clips.value,
              clip.id,
              field === "start" ? value : clip.start,
              field === "end" ? value : clip.end,
              duration.value,
            );
            if (next === clips.value) {
              status.value = "시작·끝은 원본 영상 범위 안에서 최소 0.1초 간격이어야 합니다.";
              (e.target as HTMLInputElement).value = clip[field].toFixed(2);
              return;
            }
            apply(commit(history.value, next));
            status.value = "구간을 수정했습니다.";
          },
        }),
      ]);
    const exportFrame = () => {
      const v = video.value;
      if (!v || v.readyState < 2) return;
      const canvas = document.createElement("canvas");
      canvas.width = v.videoWidth;
      canvas.height = v.videoHeight;
      const context = canvas.getContext("2d");
      if (!context) return;
      context.drawImage(v, 0, 0);
      canvas.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "source-frame.png";
        a.click();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
        status.value = "원본 프레임을 Canvas API로 PNG에 저장했습니다. 자막은 포함하지 않습니다.";
      }, "image/png");
    };
    const exportDocument = () => {
      const url = URL.createObjectURL(
        new Blob(
          [
            JSON.stringify(
              { schemaVersion: 1, sourceName: assetName.value, clips: clips.value },
              null,
              2,
            ),
          ],
          { type: "application/json" },
        ),
      );
      const a = document.createElement("a");
      a.href = url;
      a.download = "video-edit-document.json";
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      status.value = "편집 문서를 저장했습니다. 영상 파일 자체는 내보내지 않습니다.";
    };
    return () =>
      h("section", { class: "editor", "aria-label": "Vue 영상 편집기" }, [
        h("div", { class: "editor-toolbar" }, [
          h("label", [
            "로컬 영상 선택",
            h("input", { type: "file", accept: "video/*", onChange: upload }),
          ]),
          button("실행 취소", () => apply(undo(history.value)), !history.value.past.length),
          button("다시 실행", () => apply(redo(history.value)), !history.value.future.length),
        ]),
        h("div", { class: "video-stage" }, [
          h("video", {
            ref: video,
            src: source.value,
            playsinline: true,
            preload: "metadata",
            onLoadedmetadata: metadata,
            onPlay: () => {
              playing.value = true;
            },
            onPause: () => {
              playing.value = false;
            },
            onError: () => {
              status.value = "영상을 읽지 못했습니다. 다른 MP4 또는 WebM 파일을 선택해 주세요.";
            },
            "aria-label": "편집 구간 미리보기",
          }),
          caption.value
            ? h("div", { class: "video-caption", "aria-hidden": "true" }, caption.value)
            : null,
        ]),
        h("div", { class: "editor-toolbar", style: { marginTop: "16px" } }, [
          button(
            playing.value ? "일시정지" : "재생",
            () => {
              const v = video.value;
              if (!v) return;
              if (v.paused) {
                if (time.value >= total.value - 0.05) seek(0);
                void v.play().catch(() => {
                  status.value = "재생을 시작하지 못했습니다. 다시 눌러 주세요.";
                });
              } else v.pause();
            },
            !duration.value,
          ),
          h("span", `${time.value.toFixed(2)} / ${total.value.toFixed(2)}초`),
          button(
            "현재 위치에서 분할",
            () => {
              const next = split(clips.value, time.value, crypto.randomUUID());
              if (next === clips.value) {
                status.value = "구간 경계에서 0.1초 이상 떨어진 위치를 선택하세요.";
                return;
              }
              apply(commit(history.value, next));
              status.value = "구간을 분할했습니다.";
            },
            !duration.value,
          ),
          button("편집 문서 저장", exportDocument, !duration.value),
          button("현재 원본 프레임 PNG", exportFrame, !duration.value),
        ]),
        h("label", [
          h("span", { class: "sr-only" }, "타임라인 재생 위치"),
          h("input", {
            type: "range",
            min: 0,
            max: total.value || 1,
            step: 0.01,
            value: time.value,
            disabled: !duration.value,
            onInput: (e: Event) => {
              video.value?.pause();
              seek(Number((e.target as HTMLInputElement).value));
            },
          }),
        ]),
        h(
          "div",
          { class: "timeline", "aria-label": "편집 구간" },
          clips.value.map((c, i) =>
            h(
              "button",
              {
                type: "button",
                key: c.id,
                draggable: true,
                onDragstart: (e: DragEvent) => {
                  e.dataTransfer?.setData("text/plain", c.id);
                  video.value?.pause();
                },
                onDragover: (e: DragEvent) => e.preventDefault(),
                onDrop: (e: DragEvent) => {
                  e.preventDefault();
                  const id = e.dataTransfer?.getData("text/plain");
                  if (id) apply(commit(history.value, reorder(clips.value, id, c.id)));
                },
                "aria-pressed": selected.value === c.id,
                style: { flex: c.end - c.start },
                onClick: () => {
                  selected.value = c.id;
                  video.value?.pause();
                  seek(length(clips.value.slice(0, i)));
                },
              },
              `${i + 1} · ${(c.end - c.start).toFixed(1)}초`,
            ),
          ),
        ),
        active.value
          ? h("div", { class: "trim-controls" }, [
              numberInput("원본 시작(초)", "start"),
              numberInput("원본 끝(초)", "end"),
              numberInput("시작점 드래그", "start", "range"),
              numberInput("끝점 드래그", "end", "range"),
              button(
                "선택 구간 앞으로",
                () => {
                  const i = clips.value.findIndex((c) => c.id === selected.value);
                  if (i > 0)
                    apply(
                      commit(
                        history.value,
                        reorder(clips.value, selected.value, clips.value[i - 1].id),
                      ),
                    );
                },
                clips.value[0]?.id === selected.value,
              ),
              h("label", [
                "구간 자막",
                h("input", {
                  key: selected.value,
                  type: "text",
                  value: active.value.caption,
                  maxLength: 120,
                  onChange: (e: Event) => {
                    const value = (e.target as HTMLInputElement).value;
                    apply(
                      commit(
                        history.value,
                        clips.value.map((c) =>
                          c.id === selected.value ? { ...c, caption: value } : c,
                        ),
                      ),
                    );
                  },
                }),
              ]),
              button(
                "선택 구간 삭제",
                () => {
                  apply(
                    commit(
                      history.value,
                      clips.value.filter((c) => c.id !== selected.value),
                    ),
                  );
                },
                clips.value.length <= 1,
              ),
            ])
          : null,
        h("p", { role: "status", class: "editor-status" }, status.value),
        h(
          "p",
          { class: "demo-help" },
          "파일은 서버로 전송되지 않습니다. 범위 슬라이더로 탐색하고 구간을 선택해 시작·끝 시간과 자막을 수정하세요. 자막은 입력 후 포커스를 옮기면 반영됩니다. 클립은 드래그로 순서를 바꾸거나 ‘선택 구간 앞으로’ 버튼으로 이동할 수 있습니다. 영상 인코딩은 포함하지 않은 샘플입니다.",
        ),
      ]);
  },
});
export default function VideoEditor() {
  const host = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!host.current) return;
    const app = createApp(VideoTool);
    app.mount(host.current);
    return () => app.unmount();
  }, []);
  return <div ref={host} />;
}
