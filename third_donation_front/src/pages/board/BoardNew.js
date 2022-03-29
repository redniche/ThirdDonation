import PanelLayout from '../../components/layout/PanelLayout';

function Notice() {
  window.location.href = '/notice';
}

/**
 * NFT 민팅을 할 수 있는 페이지 컴포넌트
 * @returns
 */
const WrtieNotice = () => {
  return (
    <PanelLayout title="공지사항 작성">
      <section className="container">
        <div className="Notice">
          <div>
            <h2>제목</h2>
            <input className="form-control" type="text" placeholder="제목을 입력해주세요." />
            <h2>내용</h2>
            <textarea className="form-control" type="text" placeholder="내용을 입력해주세요." />
            <br />
            <br />
            <button type="button" id="writeButton" className="btn-main" onClick={() => Notice()}>
              작품 등록
            </button>
            <br />
          </div>
        </div>
      </section>
    </PanelLayout>
  );
};

export default WrtieNotice;
