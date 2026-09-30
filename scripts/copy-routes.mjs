// GitHub Pages 는 SPA 폴백이 없어, 없는 경로는 404.html 로 열리면서 HTTP 404 를 돌려준다.
// 링크 미리보기 크롤러는 404 응답을 버리므로 케이스 페이지마다 index.html 사본을 둔다.
// 슬러그는 content/projects.ts 한 곳에서 읽는다.
import { copyFileSync, mkdirSync, readFileSync } from "node:fs";

const src = readFileSync("src/features/portfolio/content/projects.ts", "utf8");
const slugs = [...src.matchAll(/slug: "([^"]+)"/g)].map((m) => m[1]);
for (const slug of slugs) {
  mkdirSync(`dist/work/${slug}`, { recursive: true });
  copyFileSync("dist/index.html", `dist/work/${slug}/index.html`);
}
copyFileSync("dist/index.html", "dist/work/index.html");
copyFileSync("dist/index.html", "dist/404.html");
console.log(`routes: ${slugs.join(", ")}`);
