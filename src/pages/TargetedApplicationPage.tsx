import { COLUMN } from "@/features/portfolio/layout/DocSection";
import { Link, useParams } from "react-router-dom";

type Evidence = {
  number: string;
  heading: string;
  body: string;
  note: string;
  href?: string;
  image?: string;
};
type Target = {
  eyebrow: string;
  headline: string;
  intro: string;
  tags: string[];
  points: Evidence[];
  supporting: string[];
};

const TARGETS: Record<string, Target> = {
  clipy: {
    eyebrow: "CJ ENM CLIPy · Vue.js 서비스 고도화 지원 포트폴리오",
    headline: "Vue 기반 서비스 개발부터 운영 중인 제품의 구조 개선까지",
    intro:
      "Vue 3로 신규 기능과 다국어 화면을 개발했고, Java/Spring 기반 SI 현장과 글로벌 B2B 제품 조직을 모두 경험했습니다. 기존 코드와 운영 제약을 먼저 파악하고, 단계적으로 개선하는 프론트엔드 개발자 신나라입니다.",
    tags: [
      "Vue 3 / Vuex / vue-i18n",
      "TypeScript",
      "SI 및 고객사 개발",
      "기존 서비스 개선",
      "API·백엔드 협업",
    ],
    points: [
      {
        number: "01",
        heading: "실무 Vue 개발 — Pivo · Beamo · HMS",
        body: "쓰리아이에서 Pivo 미디어 클라우드 및 3D 도면 투어의 신규 기능, 다국어 대응과 유지보수를 담당했습니다. Beamo에서는 3D 공간 스팟 배치 기능을 개발했고, 노스스타컨설팅에서는 Vue.js로 직원 성과 관리 화면을 개발해 출시 후 유지보수했습니다.",
        note: "쓰리아이 2021.07–2022.04 · 노스스타컨설팅 2019.05–2021.05",
      },
      {
        number: "02",
        heading: "고객사 SI와 제품 개발 방식 모두 경험",
        body: "KT·로레알 고객사 프로젝트에서 Java/Spring 기반 풀스택 개발과 UI 구현을 수행했습니다. 이후 CLO-SET에서는 기획·디자인·백엔드·인프라 담당자와 협의하며 글로벌 B2B 서비스를 개선했습니다.",
        note: "요구사항 분석 → 기능 구현 → 출시 및 운영",
        href: "/career",
      },
      {
        number: "03",
        heading: "운영 중인 서비스의 변경 리스크 줄이기",
        body: "MobX 싱글턴 스토어의 의존성을 정리하고 서버 데이터는 TanStack Query, 화면 상태는 별도 atom으로 나눴습니다. 모노레포 구성과 공통 API 클라이언트 패키지화로 앱 사이의 결합도도 낮췄습니다.",
        note: "실제 서비스 1차 리뉴얼 · 설계 참여",
        href: "/work/renewal",
        image: "thumb-renewal.webp",
      },
      {
        number: "04",
        heading: "원인을 계측한 뒤 개선한 성능",
        body: "워크룸 초기 로딩에서 불필요한 초기화·이미지 원본 전송·응답 필드를 찾아 개선했습니다. 계측 기준 LCP 2.91초 → 1.64초(44% 단축), DOMContentLoaded 2.47초 → 1.33초(46% 단축)를 확인했습니다.",
        note: "Performance 패널·Lighthouse 계측",
        href: "/work/loading",
        image: "thumb-loading.webp",
      },
    ],
    supporting: [
      "기획·디자인·백엔드 협업 및 API 스키마 논의",
      "Vue 3, Vuex, vue-i18n 기반 다국어 서비스 경험",
      "출시된 서비스의 유지보수와 레거시 단계적 개선",
    ],
  },
  orinu: {
    eyebrow: "오리누 · React / Canvas·SVG 에디터 개발 지원 포트폴리오",
    headline: "복잡한 시각적 편집 UI를 데이터 구조부터 설계합니다",
    intro:
      "3D 공간의 콘텐츠를 배치·선택·편집하는 쇼룸을 프론트엔드 단독으로 개발했고, 문서 단위 API를 클라이언트 엔티티 모델로 정규화했습니다. 이 경험을 바탕으로 별도의 인터랙티브 SVG 에디터 데모를 구현했습니다.",
    tags: [
      "React 19 / TypeScript",
      "인터랙티브 SVG 데모",
      "편집 상태와 데이터 모델",
      "3D 뷰어 연동",
      "레이어·Undo / Redo 데모",
    ],
    points: [
      {
        number: "01",
        heading: "직접 조작할 수 있는 SVG 에디터 데모",
        body: "도형 선택·이동, 레이어 위아래 이동 및 표시 여부, 추가·삭제, 문서 변경 이력 기반 실행 취소/다시 실행을 직접 구현했습니다. 실제 업무 제품이 아닌, 이 포지션의 핵심 요구사항을 보여주기 위해 별도로 제작한 기술 데모입니다.",
        note: "React 19 · TypeScript · SVG · useReducer · 독립형 데모",
        href: "/apply/orinu/editor",
      },
      {
        number: "02",
        heading: "실무 경험 — 공간·콘텐츠 편집과 저장 모델",
        body: "버추얼 쇼룸의 공간/스팟 엔티티를 클라이언트 상태로 나누고, 저장할 때 서버가 받는 JSON 문서로 직렬화했습니다. 패널 상태와 실제 편집 데이터를 분리하고 액션 함수로 복수 엔티티의 갱신을 처리했습니다.",
        note: "CLO-SET 버추얼 쇼룸 · 프론트엔드 단독 담당",
        href: "/work/showroom",
        image: "thumb-showroom.webp",
      },
      {
        number: "03",
        heading: "뷰어 엔진과 React 사이의 책임 분리",
        body: "3D 엔진의 초기화, canvas 연결, 파일 로드와 크기 맞춤을 훅으로 캡슐화했습니다. 3D·2D·렌더 뷰어는 별도 컴포넌트와 오류 경계로 나눠 콘텐츠별 차이를 격리했습니다. 이 이력은 Fabric.js 편집기 실무 경험과는 구분됩니다.",
        note: "CLO-SET 1차 서비스 리뉴얼",
        href: "/work/renewal",
        image: "thumb-renewal.webp",
      },
      {
        number: "04",
        heading: "성능·확장성을 고려한 공통 구조",
        body: "TanStack Virtual 기반 행 단위 가상화 훅을 만들고 다수의 자산 목록에 적용했습니다. 변경 범위를 좁히는 상태 경계와 공통 인터페이스를 우선하며, 기존 서비스에 점진적으로 도입했습니다.",
        note: "수만 건 에셋 목록 · 적용 후 성능 관련 사용자 리포트 감소",
        href: "/work/list-rendering",
        image: "thumb-list-rendering.webp",
      },
    ],
    supporting: [
      "문서 모델 정규화와 변경 내역(히스토리) 모델의 분리",
      "3D 공간의 포인트 배치·선택·편집 UI 실무 경험",
      "기술 명세를 읽고 독립형 데모로 검증 가능한 구현",
    ],
  },
};

export function TargetedApplicationPage() {
  const { target } = useParams<{ target: string }>();
  const data = target ? TARGETS[target] : undefined;
  if (!data) {
    return (
      <main className={`${COLUMN} pt-20`} id="main">
        <h1>페이지를 찾을 수 없습니다.</h1>
        <Link to="/">전체 포트폴리오</Link>
      </main>
    );
  }
  return (
    <main id="main" tabIndex={-1} className="pb-8">
      <section className={`${COLUMN} pt-16 max-page:pt-10`}>
        <p className="text-t2 font-semibold tracking-wide text-mark">{data.eyebrow}</p>
        <h1 className="mt-3 text-[clamp(29px,5vw,40px)] font-bold leading-tight tracking-[-0.04em]">
          {data.headline}
        </h1>
        <p className="mt-5 text-t3 leading-[1.85] text-ink-2">{data.intro}</p>
        <p className="mt-5 text-t2 text-mute">신나라 · 프론트엔드 개발자 · 총 경력 6년 11개월</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {data.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-rule px-3 py-1.5 text-t2 text-ink-2"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-4 text-t3">
          {target === "orinu" ? (
            <Link
              className="font-semibold text-mark underline underline-offset-4"
              to="/apply/orinu/editor"
            >
              인터랙티브 데모 직접 사용 →
            </Link>
          ) : null}
          <Link className="text-mark underline underline-offset-4" to="/career">
            전체 경력 보기 →
          </Link>
          <Link className="text-mark underline underline-offset-4" to="/work">
            기존 작업 전체 →
          </Link>
        </div>
      </section>
      <section className={`${COLUMN} pt-16`} aria-labelledby="evidence">
        <h2 className="text-t5 font-bold tracking-[-0.03em]" id="evidence">
          관련 경험과 검증 가능한 사례
        </h2>
        <div className="mt-6 border-t border-ink">
          {data.points.map((point) => (
            <article
              className="grid grid-cols-[42px_minmax(0,1fr)] gap-4 border-b border-rule py-7 max-card:grid-cols-1"
              key={point.number}
            >
              <span className="text-t2 font-medium text-mark tabular-nums">{point.number}</span>
              <div>
                <h3 className="text-t4 font-bold tracking-[-0.02em]">{point.heading}</h3>
                <p className="mt-2 text-t3 leading-[1.8] text-ink-2">{point.body}</p>
                {point.image ? (
                  <img
                    className="mt-5 aspect-[16/9] w-full rounded-md border border-rule object-cover"
                    alt=""
                    loading="lazy"
                    src={`${import.meta.env.BASE_URL}work/${point.image}`}
                  />
                ) : null}
                <p className="mt-3 text-t2 text-mute">{point.note}</p>
                {point.href ? (
                  <Link
                    className="mt-3 inline-block text-t3 font-medium text-mark underline underline-offset-4"
                    to={point.href}
                  >
                    사례 자세히 보기 →
                  </Link>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className={`${COLUMN} pt-14`}>
        <h2 className="text-t5 font-bold">이 역할에 연결되는 역량</h2>
        <ul className="mt-5 space-y-3 text-t3 leading-[1.7] text-ink-2">
          {data.supporting.map((text) => (
            <li className="border-l-2 border-rule-3 pl-4" key={text}>
              {text}
            </li>
          ))}
        </ul>
        <p className="mt-10 text-t3 text-ink-2">
          다른 경험이나 기술의 근거가 필요하다면{" "}
          <a className="text-mark underline" href="mailto:joyshin.dev@gmail.com">
            joyshin.dev@gmail.com
          </a>
          으로 연락 부탁드립니다.
        </p>
      </section>
    </main>
  );
}
