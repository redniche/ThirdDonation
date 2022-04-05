import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import PanelLayout from '../../components/layout/PanelLayout';
import Pagination from '../../components/paging/Pagination';
import { Axios } from '../../core/axios';

// 증명서 이미지 행 hover 이벤트 방지 설정 (작동 안 됨 - 수정 필요)
/* .table-hover > tbody > tr.anti-hover:hover > td,
  .table-hover > tbody > tr.anti-hover:hover > th {
    background: white;
  } */

/**
 * 관리자가 예술가 등록 요청을 승인할 수 있는 페이지 컴포넌트
 * @returns
 */
const GrantArtist = () => {
  const [totalPage, setTotalPage] = useState([]);
  const [curPage, setCurPage] = useState(0);

  const [list, setList] = useState([]);
  const [detailsShown, setDetailsShown] = useState([]);

  const onEnableClick = (userId) => {
    confirm('예술가로 승인하시겠습니까?') &&
      Axios.patch(`/users/artists/enable?userId=${userId}`).then(({ data }) => {
        console.log(data);
        getList(curPage);
      });
  };

  const onDisableClick = (userId) => {
    confirm('일반 사용자로 승인하시겠습니까?') &&
      Axios.patch(`/users/artists/disable?userId=${userId}`).then(({ data }) => {
        console.log(data);
        getList(curPage);
      });
  };

  const getList = (page) => {
    Axios.get('/users/artists', {
      params: {
        page,
        sort: 'id',
      },
    })
      .then(({ data }) => data)
      .then(async ({ data }) => {
        setList(data.content);
        setCurPage(page);
        setTotalPage(data.totalPages);
      })
      .catch((err) => console.log(err));
  };

  const buttonStyle = {
    cursor: 'pointer',
  };

  useEffect(() => {
    getList(curPage);
  }, []);

  const toggleShown = (id) => {
    const shownState = detailsShown.slice();
    const index = shownState.indexOf(id);

    if (index >= 0) {
      shownState.splice(index, 1);
      setDetailsShown(shownState);
    } else {
      shownState.push(id);
      setDetailsShown(shownState);
    }
  };

  return (
    <PanelLayout title="예술가 관리">
      <section className="container">
        <div className="row">
          <div className="col-lg-12">
            <Table responsive hover>
              <thead>
                <tr>
                  <th>이용자 번호</th>
                  <th>이름</th>
                  <th>권한</th>
                  <th>장애인 등록번호</th>
                  <th>증명서</th>
                  <th>처리</th>
                </tr>
              </thead>
              <tbody>
                {list &&
                  list.map((item) => (
                    <React.Fragment key={item.id}>
                      <tr className="align-middle">
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.enabled ? '예술가' : '일반'}</td>
                        <td>{item.registerNumber}</td>
                        <td>
                          <span style={buttonStyle} onClick={() => toggleShown(item.id)}>
                            <i className="fa fa-file"></i>
                          </span>
                        </td>
                        <td>
                          {item.enabled ? (
                            <input
                              type="button"
                              className="btn-grey d-inline-block"
                              value="거절"
                              onClick={() => onDisableClick(item.id)}
                            />
                          ) : (
                            <input
                              type="button"
                              className="btn-main d-inline-block me-2"
                              value="승인"
                              onClick={() => onEnableClick(item.id)}
                            />
                          )}
                        </td>
                      </tr>
                      {detailsShown.includes(item.id) && (
                        <tr className="anti-hover">
                          <td colSpan={5}>증명서 이미지 여기다가 뿌린다 {item.filePath}</td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                {!list && (
                  <tr>
                    <td colSpan={5}>데이터가 없습니다.</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
          <div className="spacer-single"></div>
          <Pagination totalPage={totalPage} curPage={curPage} fetch={getList} />
          <div className="spacer-single"></div>
        </div>
      </section>
    </PanelLayout>
  );
};

export default GrantArtist;
