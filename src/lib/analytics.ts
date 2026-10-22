type Gtag = (...args: unknown[]) => void;

type AnalyticsWindow = Window & {
  dataLayer?: unknown[];
  gtag?: Gtag;
};

/** One tracker per document. GA4 owns visitor cookies, sessions and engagement time. */
export function createAnalytics(
  win: AnalyticsWindow,
  doc: Document,
  measurementId: string | undefined,
  enabled: boolean,
) {
  const id = measurementId?.trim() ?? "";
  const isLocal = ["localhost", "127.0.0.1", "[::1]"].includes(win.location.hostname);
  let initialized = false;
  let previousLocation = "";

  return {
    pageView() {
      if (!enabled || isLocal || !/^G-[A-Z0-9]+$/.test(id)) return;

      const location = new URL(win.location.href);
      location.hash = "";
      const pageLocation = location.href;
      // Also protects against React StrictMode and layout remounts.
      if (pageLocation === previousLocation) return;

      if (!initialized) {
        win.dataLayer ??= [];
        function enqueue() {
          // gtag.js expects an Arguments object, not an array.
          // biome-ignore lint/style/noArguments: Google tag queue format
          win.dataLayer?.push(arguments);
        }
        win.gtag ??= enqueue;
        win.gtag("js", new Date());
        win.gtag("config", id, {
          send_page_view: false,
          allow_google_signals: false,
          allow_ad_personalization_signals: false,
        });

        const script = doc.createElement("script");
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
        doc.head.appendChild(script);
        initialized = true;
      }

      win.gtag?.("event", "page_view", {
        send_to: id,
        page_location: pageLocation,
        page_title: doc.title,
        page_referrer: previousLocation || doc.referrer,
      });
      previousLocation = pageLocation;
    },
  };
}
