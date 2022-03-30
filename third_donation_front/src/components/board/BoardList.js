import { useState, useEffect } from 'react';
import Table from './Table';
import Col from './Col';
import Row from './Row';
import { postList } from '../../pages/board/Data';
import { Link } from '@reach/router';
import { useSelector } from 'react-redux';
import * as selectors from '../../store/selectors';

const BoardList = () => {
  const [data, setDataList] = useState([]);
  const { data: wallet } = useSelector(selectors.accountState);

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
                  <Link to={`/noticeView/${item.no}`}>{item.title}</Link>
                </Col>
                <Col>{item.createDate}</Col>
                <Col>{item.readCount}</Col>
              </Row>
            );
          })}
      </Table>

      {wallet != null && wallet.authority == 'ADMIN' && (
        <Link to="/noticeWrite">
          <button className="post-view-go-list-btn">작성하기</button>
        </Link>
      )}
    </div>
  );
};

export default BoardList;
