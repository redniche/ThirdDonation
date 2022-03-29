import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import Table from '../../components/board/Table';
import Col from '../../components/board/Col';
import Row from '../../components/board/Row';
import { postList } from './Data';
// import { Link } from '@reach/router';

function NoticeWrite() {
  window.location.href = '/noticeWrite';
}

const BoardList = () => {
  const [data, setDataList] = useState([]);

  useEffect(() => {
    setDataList(postList);
  }, []);

  return (
    <div>
      <Table headersName={['글번호', '제목', '등록일', '조회수']}>
        {data &&
          data.map((item, index) => {
            return (
              <Row key={index}>
                <Col>{item.no}</Col>
                <Col>
                  <a href={`/noticeView/${item.no}`}>{item.title}</a>
                </Col>
                <Col>{item.createDate}</Col>
                <Col>{item.readCount}</Col>
              </Row>
            );
          })}
      </Table>

      <button className="post-view-go-list-btn" onClick={() => NoticeWrite()}>
        작성하기
      </button>
    </div>
  );
};

export default BoardList;
