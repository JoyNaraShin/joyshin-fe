/**
 * 실제 서비스 화면. 흰 배경 캡처가 흰 지면과 섞이지 않도록 얇은 테두리를 두른다.
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
    <figure className={`mt-8 ${className}`}>
      <img
        alt={alt}
        className="block h-auto w-full rounded-md border border-rule"
        decoding="async"
        height={height}
        loading="lazy"
        src={`${import.meta.env.BASE_URL}work/${src}`}
        width={width}
      />
      {caption ? (
        <figcaption className="mt-3 text-t1 leading-[1.65] text-mute">
          {caption}
          <span className="text-faint"> · 출처 CLO-SET 헬프센터</span>
        </figcaption>
      ) : null}
    </figure>
  );
}
