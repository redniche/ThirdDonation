import { useState, useEffect } from 'react';
import Table from './Table';
import Col from './Col';
import Row from './Row';
import { Link } from '@reach/router';
import { useSelector } from 'react-redux';
import * as selectors from '../../store/selectors';
import { Axios } from '../../core/axios';

// import Pagination from '../paging/Pagination';

const BoardList = () => {
  // 글 리스트
  const [list, setList] = useState([]);
  // 총 페이지
  const [page, setPage] = useState([]);
  // 현재 페이지 번호
  const [pageNumber, setPageNumber] = useState(0);

  const { data: wallet } = useSelector(selectors.accountState);

  // 페이지 아래에 찍어주기
  const pageNumbers = [];
  for (let i = 1; i <= page; i++) {
    pageNumbers.push(i);
  }

  // 해당 페이지로 이동
  function paginate(pageNumber) {
    getList(pageNumber - 1);
  }

  // 다음 페이지로 이동
  function next() {
    if (pageNumber < page - 1) getList(pageNumber + 1);
  }

  // 이전 페이지로 이동
  function prev() {
    if (pageNumber > 0) getList(pageNumber - 1);
  }

  // 마지막 페이지로 이동
  function lastPage() {
    getList(page - 1);
  }

  // 첫 페이지로 이동
  function firstPage() {
    getList(0);
  }

  function getList(pageNumber) {
    Axios.get('/board/article', {
      params: {
        categoryName: '공지사항',
        page: pageNumber,
      },
    })
      .then((data) => data)
      .then(async (res) => {
        setList(res.data.data.content);
        setPageNumber(pageNumber);
        setPage(res.data.data.totalPages);
      })
      .catch((err) => {
        console.log('에러 발생' + err);
      });
  }

  useEffect(() => {
    getList(pageNumber);
  }, []);
  return (
    <div>
      <div>
        <Table headersName={['글번호', '제목', '등록일', '조회수']}>
          {list &&
            list.map((item, index) => {
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
      </div>
      <div className="d-flex justify-content-center pagination">
        <ul className="pagination">
          <li onClick={firstPage} className="page-link">
            &laquo;
          </li>
          <li onClick={prev} className="page-link">
            &lt;
          </li>
          {pageNumbers.map((number) => (
            <li key={number} onClick={() => paginate(number)} className="page-item page-link">
              {number}
            </li>
          ))}
          <li onClick={next} className="page-link">
            &gt;
          </li>
          <li onClick={lastPage} className="page-link">
            &raquo;
          </li>
        </ul>
      </div>

      {wallet != null && wallet.authority == 'ADMIN' && (
        <Link to="/noticeWrite">
          <button className="post-view-go-list-btn">작성하기</button>
        </Link>
      )}
    </div>
  );
};

export default BoardList;
