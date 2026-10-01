import { type ReactNode, useLayoutEffect, useRef } from "react";
import { prefersReducedMotion, useReveal } from "../hooks/useReveal";

/**
 * 화면에 들어올 때 한 번 아래에서 떠오르며 나타난다. `delay` 로 같은 줄의 카드에 순서를 준다.
 * JS 가 없거나 모션을 끈 사람에게는 처음부터 그대로 보인다(js:, motion-safe: 변형).
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useReveal(ref);
  return (
    <div
      className={`js:motion-safe:opacity-0 revealed:motion-safe:animate-rise-in ${className}`}
      ref={ref}
      style={delay ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}

/**
 * 숫자가 0 에서 목표값까지 올라간다. "약 80%" 처럼 앞뒤 글자가 붙은 값도 숫자만 센다.
 * 숫자가 없는 값은 그대로 둔다. 화면에는 처음부터 최종값이 렌더되고, 모션이 허용될 때만
 * 페인트 전에 0 으로 바꿨다가 올린다 — JS 없이 뜬 화면이나 캡처에서도 값이 맞게 보인다.
 */
export function CountUp({ value, duration = 1000 }: { value: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const m = value.match(/^(\D*)(\d+(?:\.\d+)?)(.*)$/);

  useLayoutEffect(() => {
    const p = value.match(/^(\D*)(\d+(?:\.\d+)?)(.*)$/);
    if (p && ref.current && !prefersReducedMotion()) ref.current.textContent = `${p[1]}0${p[3]}`;
  }, [value]);

  useReveal(ref, () => {
    const el = ref.current;
    if (!m || !el) return;
    if (prefersReducedMotion()) {
      el.textContent = value;
      return;
    }
    const target = Number(m[2]);
    const start = performance.now();
    const tick = (now: number) => {
      const k = Math.min(1, (now - start) / duration);
      const eased = 1 - (1 - k) ** 3;
      el.textContent = `${m[1]}${Math.round(target * eased)}${m[3]}`;
      if (k < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });

  return (
    <span aria-label={value} ref={ref}>
      {value}
    </span>
  );
}
