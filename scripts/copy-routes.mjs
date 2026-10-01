// GitHub Pages 는 SPA 폴백이 없어, 없는 경로는 404.html 로 열리면서 HTTP 404 를 돌려준다.
// 링크 미리보기 크롤러는 404 응답을 버리므로 케이스 페이지마다 index.html 사본을 둔다.
// 슬러그는 content/projects.ts 한 곳에서 읽는다.
import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";

const src = readFileSync("src/features/portfolio/content/projects.ts", "utf8");
const slugs = [...src.matchAll(/slug: "([^"]+)"/g)].map((m) => m[1]);
// 케이스마다 링크 미리보기 제목을 글 제목으로 쓴다. 각 프로젝트의 slug 바로 뒤에 title 이 온다.
const titles = Object.fromEntries(
  [...src.matchAll(/slug: "([^"]+)",\s*title: "([^"]+)"/g)].map((m) => [m[1], m[2]]),
);
const ORIGIN = "https://joynarashin.github.io/joyshin-fe/";
const html = readFileSync("dist/index.html", "utf8");
// 사본마다 canonical 과 og:url 을 그 경로로 바꾼다. 그대로 두면 검색엔진이 하위 페이지를 홈의 중복으로 본다.
// 치환이 하나라도 빗나가면 빌드를 멈춘다. HTML 형식이 바뀌어 조용히 홈 값으로 남는 것을 막는다.
const swap = (text, from, to) => {
  if (!text.includes(from)) throw new Error(`copy-routes: "${from}" 를 index.html 에서 찾지 못함`);
  return text.replace(from, to);
};
const OG_TITLE = /<meta property="og:title" content="[^"]+" \/>/;
const emit = (route, title) => {
  mkdirSync(`dist/${route}`, { recursive: true });
  const url = `${ORIGIN}${route}/`;
  let out = swap(
    html,
    `<link rel="canonical" href="${ORIGIN}" />`,
    `<link rel="canonical" href="${url}" />`,
  );
  out = swap(
    out,
    `<meta property="og:url" content="${ORIGIN}" />`,
    `<meta property="og:url" content="${url}" />`,
  );
  if (!OG_TITLE.test(out)) throw new Error("copy-routes: og:title 을 찾지 못함");
  out = out.replace(OG_TITLE, `<meta property="og:title" content="${title} — 신나라" />`);
  writeFileSync(`dist/${route}/index.html`, out);
};
for (const slug of slugs) {
  if (!titles[slug]) throw new Error(`copy-routes: ${slug} 의 title 을 찾지 못함`);
  emit(`work/${slug}`, titles[slug]);
}
emit("work", "작업");
emit("career", "경력");
copyFileSync("dist/index.html", "dist/404.html");
console.log(`routes: ${slugs.join(", ")}`);
