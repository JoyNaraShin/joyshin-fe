const SUGGESTIONS = ["클래식 코트", "클래식 데님", "클래식 셔츠"];

const KEYS = [
  { cap: "↑ ↓", what: "추천을 위아래로 옮깁니다" },
  { cap: "Enter", what: "고른 추천으로 검색합니다" },
  { cap: "Esc", what: "추천을 닫고 입력으로 돌아갑니다" },
];

/* 포커스를 목록으로 옮기지 않는 것이 이 그림의 요점이다 — 옮기면 이어서 타이핑할 수 없다. */
export function AutocompleteKeys() {
  return (
    <div className="frame ac">
      <div className="ac-cols">
        <div>
          <p className="k">추천을 고르는 동안</p>
          <div className="ac-input">
            클<span className="ac-caret" aria-hidden="true" />
            <span className="ac-focus">포커스는 여기</span>
          </div>
          <ul className="ac-list">
            {SUGGESTIONS.map((s, i) => (
              <li key={s} data-on={i === 1}>
                {s}
              </li>
            ))}
          </ul>
          <p className="no">
            목록으로 포커스를 옮겨 버리면 이어서 타이핑할 수가 없습니다. 포커스는 입력창에 두고 선택
            표시만 움직입니다.
          </p>
        </div>
        <div>
          <p className="k">키</p>
          <dl className="ac-keys">
            {KEYS.map((k) => (
              <div key={k.cap}>
                <dt>{k.cap}</dt>
                <dd>{k.what}</dd>
              </div>
            ))}
          </dl>
          <p className="k ac-second">한글은 한 글자가 여러 번에 걸쳐 들어옵니다</p>
          {/*
            앞의 셋과 마지막이 같은 '클'로 보이는 것이 이 그림의 요점이다.
            조합이 끝났는지는 글자 모양으로 구분되지 않는다 — 그래서 라벨을 붙인다.
          */}
          <div className="ac-ime">
            <div className="ac-ime-grp">
              <p>
                <span>ㅋ</span>
                <span>크</span>
                <span>클</span>
              </p>
              <span className="ac-ime-cap">조합 중</span>
            </div>
            <div className="ac-ime-grp">
              <p>
                <span className="ac-ime-done">클</span>
              </p>
              <span className="ac-ime-cap ac-ime-cap-done">완성</span>
            </div>
          </div>
          <p className="no">
            앞의 셋은 아직 조합 중인 글자입니다. 그대로 두면 완성되지 않은 글자로 추천을 부릅니다.
            조합이 끝났는지를 보고 마지막에만 보냅니다.
          </p>
        </div>
      </div>
    </div>
  );
}
