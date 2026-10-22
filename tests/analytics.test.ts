import assert from "node:assert/strict";
import test from "node:test";
import { createAnalytics } from "../src/lib/analytics.ts";

function fixture(
  id: string | undefined = "G-TEST123",
  enabled = true,
  hostname = "portfolio.test",
) {
  const scripts: { src?: string; async?: boolean }[] = [];
  const win = {
    location: { href: `https://${hostname}/joyshin-fe/?utm_source=wishket`, hostname },
    dataLayer: [] as IArguments[],
  };
  const doc = {
    title: "홈",
    referrer: "https://wishket.com/",
    head: { appendChild: (script: { src?: string; async?: boolean }) => scripts.push(script) },
    createElement: () => ({}),
  };
  const analytics = createAnalytics(
    win as unknown as Window,
    doc as unknown as Document,
    id,
    enabled,
  );
  const commands = () => win.dataLayer.map((args) => Array.from(args));
  const views = () => commands().filter((args) => args[0] === "event");
  return { analytics, win, doc, scripts, commands, views };
}

test("missing/invalid ID, development, and localhost never load the tag or queue data", () => {
  for (const [id, enabled, host] of [
    ["", true, "portfolio.test"],
    ["UA-123", true, "portfolio.test"],
    ["G-TEST123", false, "portfolio.test"],
    ["G-TEST123", true, "localhost"],
    ["G-TEST123", true, "127.0.0.1"],
    ["G-TEST123", true, "[::1]"],
  ] as const) {
    const f = fixture(id, enabled, host);
    f.analytics.pageView();
    assert.equal(f.scripts.length, 0);
    assert.equal(f.commands().length, 0);
  }
});

test("initial view queues gtag config and one manual view with attribution", () => {
  const f = fixture(" G-TEST123 ");
  f.analytics.pageView();
  assert.equal(f.scripts.length, 1);
  assert.equal(f.scripts[0].async, true);
  assert.equal(f.scripts[0].src, "https://www.googletagmanager.com/gtag/js?id=G-TEST123");
  assert.equal(Object.prototype.toString.call(f.win.dataLayer[0]), "[object Arguments]");
  assert.deepEqual(f.commands()[1], [
    "config",
    "G-TEST123",
    {
      send_page_view: false,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
    },
  ]);
  assert.deepEqual(f.views()[0], [
    "event",
    "page_view",
    {
      send_to: "G-TEST123",
      page_location: f.win.location.href,
      page_title: "홈",
      page_referrer: "https://wishket.com/",
    },
  ]);
});

test("rerenders and hash changes do not duplicate views; navigation and back do", () => {
  const f = fixture();
  const first = f.win.location.href;
  f.analytics.pageView();
  f.analytics.pageView();
  f.win.location.href += "#contact";
  f.analytics.pageView();
  assert.equal(f.views().length, 1);

  f.win.location.href = "https://portfolio.test/joyshin-fe/work/showroom";
  f.doc.title = "Virtual Showroom — 신나라";
  f.analytics.pageView();
  assert.deepEqual(f.views()[1][2], {
    send_to: "G-TEST123",
    page_location: f.win.location.href,
    page_title: f.doc.title,
    page_referrer: first,
  });

  const detail = f.win.location.href;
  f.win.location.href = first;
  f.analytics.pageView();
  assert.equal(f.views().length, 3);
  assert.equal((f.views()[2][2] as { page_referrer: string }).page_referrer, detail);
  assert.equal(f.scripts.length, 1);
});

test("standalone application paths and query navigation are tracked", () => {
  const f = fixture();
  f.win.location.href = "https://portfolio.test/joyshin-fe/apply/clipy";
  f.analytics.pageView();
  f.win.location.href += "?utm_source=application";
  f.analytics.pageView();
  f.win.location.href = "https://portfolio.test/joyshin-fe/apply/clipy/demo";
  f.analytics.pageView();
  assert.equal(f.views().length, 3);
});

test("a new document (refresh) records another view", () => {
  const first = fixture();
  const refresh = fixture();
  first.analytics.pageView();
  refresh.analytics.pageView();
  assert.equal(first.views().length + refresh.views().length, 2);
});
