/**
 * 실제 서비스 화면. 도판(SVG)과 달리 사진이라 얇은 테두리로 지면과 가른다 —
 * 흰 배경 캡처가 흰 지면에 그대로 앉으면 어디까지가 화면인지 보이지 않는다.
 *
 * 캡처는 전부 CLO-SET 헬프센터에 공개된 이미지다. 출처를 캡션에 붙인다.
 */
export function Shot({
  src,
  alt,
  caption,
  width,
  height,
  className = "",
}: {
  src: string;
  alt: string;
  caption?: string;
  width: number;
  height: number;
  className?: string;
}) {
  return (
    <figure className={`mt-10 ${className}`}>
      <img
        alt={alt}
        className="block h-auto w-full rounded-sm border border-rule bg-inset"
        decoding="async"
        height={height}
        loading="lazy"
        src={`${import.meta.env.BASE_URL}work/${src}`}
        width={width}
      />
      {caption ? (
        <figcaption className="mt-3 text-t1 leading-[1.65] text-mute">
          {caption}
          <span className="text-faint"> · 이미지 출처 CLO-SET 헬프센터</span>
        </figcaption>
      ) : null}
    </figure>
  );
}
