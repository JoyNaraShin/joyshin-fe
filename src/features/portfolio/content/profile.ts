/**
 * 신원·연락 정보. 헤더와 연락처 섹션이 같은 값을 쓰므로 컴포넌트 파일이 아니라 여기 둔다.
 */
export const MAIL = "joyshin.dev@gmail.com";

export const LINKS = [
  { href: "https://github.com/JoyNaraShin", label: "GitHub", desc: "github.com/JoyNaraShin" },
  {
    href: "https://www.linkedin.com/in/joynarashin/",
    label: "LinkedIn",
    desc: "linkedin.com/in/joynarashin",
  },
  {
    href: "https://joyshin-proto-lab.vercel.app/",
    label: "프로토타입 모음",
    desc: "AI 워크플로로 만든 웹앱 프로토타입 모음",
  },
] as const;
