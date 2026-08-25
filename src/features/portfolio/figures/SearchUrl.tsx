/** 그림 5 — 검색어·필터·정렬·페이지를 전부 URL 에 둔다. */
export function SearchUrl() {
  return (
    <div className="frame">
      <p className="k">검색 화면의 조건은 전부 URL 에</p>
      <p className="url">
        /search?<em>q</em>=…&amp;<em>filter</em>=…&amp;<em>sort</em>=…&amp;<em>page</em>=…
      </p>
      <p className="no url-no">
        네 가지가 서로 얽혀 있어서 하나만 화면 상태로 들고 있으면 나머지와 어긋납니다. 전부 URL 에
        두면 새로고침을 하거나 링크를 공유해도 같은 화면이 나옵니다.
      </p>
    </div>
  );
}
