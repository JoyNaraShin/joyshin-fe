import { Frame } from "../layout/Frame";

/*
 * 배포 구조 전과 제안한 구조. 세로 파선이 둘을 가른다(StateBoundary 와 같은 규약).
 * 오른쪽 라벨은 「제안한 구조」다 — 전환은 최종 반영까지 가지 않았으므로 완료로 적지 않는다.
 *
 * 왼쪽이 말하는 것은 하나다. 번들 청크는 이미 클라우드에 있는데 index.html 하나가 Next
 * 프로젝트의 public/ 에 있어 그 서버 이미지 안에서 함께 나간다 — 그래서 상자 안에 상자를
 * 그리고, 청크는 상자 밖 한 줄로 따로 적는다.
 */
/** 좁은 폭에서 이 도식 대신 읽히는 문단. `Figure` 의 `fallback` 으로 넘긴다. */
export const deployTopologyFallback =
  "기존에는 번들 청크만 스토리지에 올리고 index.html은 Next.js 서버의 Docker 이미지에 포함해 배포. 제안한 구조에서는 GitHub Actions가 청크를 스토리지에 버전별로 올리고 index.html만 Cloudflare Pages로 배포하며, Next.js 서버는 별도 배포.";

export function DeployTopology() {
  return (
    <Frame className="[&_svg]:mx-auto [&_svg]:block [&_svg]:h-auto [&_svg]:w-full">
      <svg
        viewBox="0 0 620 180"
        role="img"
        aria-label="기존에는 번들 청크만 스토리지에 올리고 index.html은 Next.js 서버의 Docker 이미지에 포함해 배포. 제안한 구조에서는 GitHub Actions가 청크를 스토리지에 버전별로 올리고 index.html만 Cloudflare Pages로 배포하며, Next.js 서버는 별도 배포."
      >
        <defs>
          <marker
            id="dt-arrow"
            markerHeight={7}
            markerWidth={7}
            orient="auto"
            refX={6}
            refY={4}
            viewBox="0 0 8 8"
          >
            <path className="stroke-rule-2" d="M0,1 L7,4 L0,7" fill="none" strokeWidth={1} />
          </marker>
        </defs>

        <line
          className="stroke-rule-2 [stroke-dasharray:3_4] [stroke-width:1]"
          x1={296}
          y1={10}
          x2={296}
          y2={170}
        />
        <text className="fill-mute text-t1" x={16} y={20}>
          기존
        </text>
        <text className="fill-mark text-t1" x={304} y={20}>
          제안한 구조
        </text>

        {/* 전 — 상자 안의 상자 */}
        <rect
          className="fill-none stroke-rule-2 [stroke-width:1]"
          height={104}
          rx={3}
          width={244}
          x={16}
          y={46}
        />
        <text className="fill-mute text-t1" x={30} y={66}>
          Next.js 서버 Docker 이미지
        </text>
        <rect
          className="fill-none stroke-rule-2 [stroke-width:1.2]"
          height={44}
          rx={3}
          width={168}
          x={30}
          y={88}
        />
        <text className="fill-ink text-t2 font-medium" x={44} y={107}>
          index.html
        </text>
        <text className="fill-mute text-t1" x={44} y={122}>
          서버 이미지에 포함
        </text>
        <text className="fill-mute text-t1" x={16} y={170}>
          번들 청크는 스토리지에 따로 업로드
        </text>

        {/* 제안한 구조 — 정적 배포 한 줄, Next 는 따로 */}
        <rect
          className="fill-none stroke-mark [stroke-width:1.2]"
          height={40}
          rx={3}
          width={128}
          x={312}
          y={48}
        />
        <text className="fill-ink font-mono text-t1 font-medium" x={326} y={72}>
          GitHub Actions
        </text>
        <line
          className="stroke-rule-2 [stroke-width:1]"
          markerEnd="url(#dt-arrow)"
          x1={442}
          y1={68}
          x2={468}
          y2={68}
        />
        <rect
          className="fill-none stroke-mark [stroke-width:1.2]"
          height={40}
          rx={3}
          width={136}
          x={470}
          y={48}
        />
        <text className="fill-ink font-mono text-t1 font-medium" x={484} y={65}>
          Cloudflare Pages
        </text>
        <text className="fill-mark text-t1" x={484} y={80}>
          index.html만 배포
        </text>

        <rect
          className="fill-none stroke-rule-2 [stroke-width:1]"
          height={40}
          rx={3}
          width={186}
          x={312}
          y={110}
        />
        <text className="fill-mute text-t2" x={326} y={127}>
          Next.js 서버
        </text>
        <text className="fill-mute text-t1" x={326} y={142}>
          별도 배포
        </text>
      </svg>
    </Frame>
  );
}
