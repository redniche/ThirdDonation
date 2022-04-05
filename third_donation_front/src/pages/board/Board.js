import { useState, useEffect } from 'react';
import { Link } from '@reach/router';
import { useSelector } from 'react-redux';
import * as selectors from '../../store/selectors';
import { Axios } from '../../core/axios';
import Pagination from '../../components/paging/Pagination';
import PanelLayout from '../../components/layout/PanelLayout';

const Board = () => {
  // 글 리스트
  const [list, setList] = useState([]);
  // 총 페이지
  const [totalPage, setTotalPage] = useState([]);
  // 현재 페이지 번호
  const [curPage, setCurPage] = useState(0);

  const { data: account } = useSelector(selectors.accountState);

  const getList = (pageNumber) => {
    Axios.get('/board/article', {
      params: {
        categoryName: '공지사항',
        page: pageNumber,
      },
    })
      .then(({ data }) => data)
      .then(async ({ data }) => {
        setList(data.content);
        setCurPage(pageNumber);
        setTotalPage(data.totalPages);
      })
      .catch((err) => {
        console.log('에러 발생' + err);
      });
  };

  const titleStyle = {
    width: '50%',
  };

  useEffect(() => {
    getList(curPage);
  }, []);

  return (
    <PanelLayout title="공지사항">
      <section className="container">
        <div className="row">
          <div className="col-lg-12">
            <table className="table de-table table-rank table-hover">
              <thead>
                <tr className="text-center">
                  <th scope="col">글번호</th>
                  <th style={titleStyle} scope="col">
                    제목
                  </th>
                  <th scope="col">등록일</th>
                  <th scope="col">작성자</th>
                  <th scope="col">조회수</th>
                </tr>
                <tr></tr>
              </thead>
              <tbody>
                {list &&
                  list.map((item) => (
                    <tr key={item.id}>
                      <td className="text-center">{item.id}</td>
                      <td>
                        <Link to={`/noticeView/${item.id}`}>{item.title}</Link>
                      </td>
                      <td className="text-center">{item.dateCreated.substr(0, 10)}</td>
                      <td className="text-center">{item.user.username}</td>
                      <td className="text-center">{item.views}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <div className="spacer-single"></div>
            <Pagination totalPage={totalPage} curPage={curPage} fetch={getList} />
            <div className="spacer-single"></div>
            {account != null && account.authority == 'ADMIN' && (
              <div className="float-end">
                <Link to="/noticeWrite">
                  <button className="btn-main">작성하기</button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
    </PanelLayout>
  );
};

export default Board;
