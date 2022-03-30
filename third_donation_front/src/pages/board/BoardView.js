import { useEffect, useState } from 'react';
import { getPostByNo } from './Data';
import PanelLayout from '../../components/layout/PanelLayout';
import '../../components/board/Board.css';
import { useParams } from '@reach/router';
import { useSelector } from 'react-redux';
import * as selectors from '../../store/selectors';
import { Link } from '@reach/router';
import ReactMarkdown from 'react-markdown';

function Delete() {
  window.location.href = '/notice';
  // 삭제 기능 호출하는 것 추가해야함
}

// const BoardView = ({ history, match }) => {
const BoardView = () => {
  const [data, setData] = useState({});
  const { data: wallet } = useSelector(selectors.accountState);

  const no = useParams().no;

  console.log(no);

  useEffect(() => {
    setData(getPostByNo(no));
  }, []);

  return (
    <PanelLayout title="상세정보">
      <section className="container">
        <div className="post-view-wrapper">
          {data ? (
            <div>
              <div className="post-view-row">
                <label>게시글 번호</label>
                <label>{data.no}</label>
              </div>
              <div className="post-view-row">
                <label>제목</label>
                <label>{data.title}</label>
              </div>
              <div className="post-view-row">
                <label>작성일</label>
                <label>{data.createDate}</label>
              </div>
              <div className="post-view-row">
                <label>조회수</label>
                <label>{data.readCount}</label>
              </div>
              <section className="containerWrap">
                <section>
                  {/* ReactMarkdown code */}
                  <ReactMarkdown>{data.content}</ReactMarkdown>
                </section>
              </section>
            </div>
          ) : (
            '해당 게시글을 찾을 수 없습니다.'
          )}
          <Link to="/notice">
            <button className="post-view-go-list-btn">목록으로 돌아가기</button>
          </Link>

          {/* 관리자인지 확인하는 구문 */}
          {wallet != null && wallet.authority == 'ADMIN' && (
            <button className="post-view-delete-btn" onClick={() => Delete()}>
              삭제하기
            </button>
          )}
        </div>
      </section>
    </PanelLayout>
  );
};

export default BoardView;
