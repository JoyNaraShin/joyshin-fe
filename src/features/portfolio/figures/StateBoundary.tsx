export function StateBoundary() {
  return (
    <div className="frame">
      <div className="split">
        <div>
          <p className="k">서버에서 온 값</p>
          <div className="box">
            <b>TanStack Query</b>서버 데이터는 여기에만 둡니다
          </div>
          <p className="no">전역 상태로 복사하지 않습니다.</p>
        </div>
        <div>
          <p className="k">화면이 들고 있는 값</p>
          <div className="box">
            <b>뷰어</b>자기 상태를 따로 보관
          </div>
          <div className="box">
            <b>사이드 패널</b>자기 상태를 따로 보관
          </div>
          <p className="no">관심사가 다른 상태를 한 스토어에 모으지 않습니다.</p>
        </div>
      </div>
    </div>
  );
}
