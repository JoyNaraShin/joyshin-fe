import { DocSection } from "./Section";

/**
 * 강점 — 요약 층. 주장 한 줄과 근거 한 줄만 두고, 자세한 것은 아래 사례가 진다.
 * 네 축은 미리 정해 둔 것이라 문구를 덧붙여 늘리지 않는다.
 */
const CARDS = [
  {
    label: "다양한 서비스 경험",
    claim: "한 서비스 안에서 성격이 다른 화면을 두루 맡았습니다.",
    proof:
      "3D 뷰어를 감싼 웹 레이어와 임베드, 서비스 전체 검색, 요금 정책과 어드민 콘솔, 디자인 시스템, 리뉴얼 때의 모노레포 초기 설계.",
    to: "#skill",
    cta: "맡은 것 보기",
  },
  {
    label: "협업",
    claim: "혼자 정할 수 있는 일은 거의 없었습니다.",
    proof:
      "목록 응답이 무거울 때는 백엔드와 어떤 필드가 실제로 쓰이는지 같이 확인해 줄였습니다. 동료 PR 리뷰는 상시로 했습니다.",
    to: "#case-loading",
    cta: "로딩 속도 개선",
  },
  {
    label: "합의",
    claim: "서로 의견이 다를 때 사용자 중심 관점에서 합의점을 찾아 제안합니다.",
    proof:
      "PO·디자이너와 직접 조율해 구현 제약을 반영하고 범위를 다시 잡았습니다. 영향 범위가 불확실한 설정 변경은 인프라 담당자와 단계적 검증으로 합의했습니다.",
    to: "#more",
    cta: "배포 구조 전환",
  },
  {
    label: "책임",
    claim: "수동적으로 주어진 일만 하는 것이 아니라 능동적, 적극적으로 서비스를 책임집니다.",
    proof:
      "예를 들어 요청은 검색 결과를 보여 주는 것이었지만, 결과 없음·오류·권한 없음을 갈라 각각 다른 화면으로 뒀습니다. SSR이 관습적으로 떠안고 있던 API 호출도 필요한 것만 남기고 줄였습니다.",
    to: "#case-search",
    cta: "서비스 전체 검색",
  },
];

export function StrengthSection() {
  return (
    <DocSection id="strength" title="강점" meta="네 가지로 정리했습니다">
      <ul className="scards">
        {CARDS.map((c) => (
          <li className="scard" key={c.label}>
            <p className="slabel">{c.label}</p>
            <p className="sclaim">{c.claim}</p>
            <p className="sproof">{c.proof}</p>
            <a className="sto" href={c.to}>
              {c.cta} <span aria-hidden="true">↓</span>
            </a>
          </li>
        ))}
      </ul>
    </DocSection>
  );
}
