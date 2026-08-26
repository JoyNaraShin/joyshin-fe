import { MODES, type ModeId } from "./modes";

/** 서로 배타적인 세 방식의 토글. 폼이 아니라 그룹이라 fieldset을 쓰지 않는다. */
export function ModeSwitch({
  mode,
  onChange,
  disabled,
}: {
  mode: ModeId;
  onChange: (m: ModeId) => void;
  disabled: boolean;
}) {
  return (
    // biome-ignore lint/a11y/useSemanticElements: fieldset 은 폼 의미와 legend 를 끌고 온다. 여기는 폼이 아니라 서로 배타적인 토글 묶음이라 role="group" 이 맞다.
    <div className="demo-modes" role="group" aria-label="렌더링 방식">
      {MODES.map((m) => (
        <button
          key={m.id}
          type="button"
          data-on={m.id === mode}
          aria-pressed={m.id === mode}
          disabled={disabled}
          onClick={() => onChange(m.id)}
        >
          <span className="demo-step">{m.step}</span>
          {m.label}
        </button>
      ))}
    </div>
  );
}
