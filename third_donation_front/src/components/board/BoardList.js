import { useState, useEffect } from 'react';
import Table from './Table';
import Col from './Col';
import Row from './Row';
import { Link } from '@reach/router';
import { useSelector } from 'react-redux';
import * as selectors from '../../store/selectors';
import { Axios } from '../../core/axios';

const BoardList = () => {
  const [data, setDataList] = useState([]);
  const { data: wallet } = useSelector(selectors.accountState);

  function getList() {
    Axios.get('/board/article', {
      params: {
        categoryName: '공지사항',
      },
    })
      .then((data) => data)
      .then(async (res) => {
        setDataList(res.data.data);
      })
      .catch((err) => {
        console.log('에러 발생' + err);
      });
  }

  useEffect(() => {
    getList();
  }, []);

  return (
    <div>
      <Table headersName={['글번호', '제목', '등록일', '조회수']}>
        {data &&
          data.map((item, index) => {
            return (
              <Row key={index}>
                <Col>{index + 1}</Col>
                <Col>
                  <Link to={`/noticeView/${item.id}`}>{item.title}</Link>
                </Col>
                <Col>{item.dateCreated.substr(0, 10)}</Col>
                <Col>{item.views}</Col>
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
