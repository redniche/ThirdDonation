import { useEffect, useState } from 'react';
import { getPostByNo } from './Data';
import PanelLayout from '../../components/layout/PanelLayout';
import '../../components/board/Board.css';
import { useParams } from '@reach/router';

function Notice() {
  window.location.href = '/notice';
}

// const BoardView = ({ history, match }) => {
const BoardView = () => {
  const [data, setData] = useState({});

  const no = useParams().no;

  console.log(no);

  useEffect(() => {
    setData(getPostByNo(no));
  }, []);

  console.log(data);

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
              <div className="post-view-row">
                <label>내용</label>
                <div>{data.content}</div>
              </div>
            </div>
          ) : (
            '해당 게시글을 찾을 수 없습니다.'
          )}
          <button className="post-view-go-list-btn" onClick={() => Notice()}>
            목록으로 돌아가기
          </button>
        </div>
      </section>
    </PanelLayout>
  );
};

export default BoardView;
