import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import PanelLayout from '../../components/layout/PanelLayout';
import { Axios } from '../../core/axios';

// 증명서 이미지 행 hover 이벤트 방지 설정 (작동 안 됨 - 수정 필요)
/* .table-hover > tbody > tr.anti-hover:hover > td,
  .table-hover > tbody > tr.anti-hover:hover > th {
    background: white;
  } */

///api/charities

/**
 * 관리자가 예술가 등록 요청을 승인할 수 있는 페이지 컴포넌트
 * @returns
 */
const GrantArtist = () => {
  const [list, setDataList] = useState([]);

  function getList() {
    Axios.get('/charities/all')
      .then((data) => data)
      .then(async (res) => {
        setDataList(res.data.data.content);
      })
      .catch((err) => {
        console.log('에러 발생' + err);
      });
  }

  function aceeptCharity(walletAddress) {
    Axios.patch(
      '/charities',
      {},
      {
        params: {
          charityWallet: walletAddress,
          enabled: true,
        },
      },
    )
      .then(async () => {
        window.location.href = '/admin/grantCharity';
      })
      .catch((err) => {
        console.log('에러 발생' + err);
      });
  }

  function disaceeptCharity(walletAddress) {
    Axios.patch(
      '/charities',
      {},
      {
        params: {
          charityWallet: walletAddress,
          enabled: false,
        },
      },
    )
      .then(async () => {
        window.location.href = '/admin/grantCharity';
      })
      .catch((err) => {
        console.log('에러 발생' + err);
      });
  }

  useEffect(() => {
    getList();
  }, []);

  return (
    <PanelLayout title="자선단체 관리">
      <section className="container">
        <div className="row">
          <div className="col-lg-12">
            <Table responsive hover>
              <thead>
                <tr>
                  <th></th>
                  <th>자선단체 계좌</th>
                  <th>자선단체 이름</th>
                  <th>홈페이지 주소</th>
                  <th>허가상태</th>
                  <th colSpan={2}>관리</th>
                </tr>
              </thead>
              <tbody>
                {list &&
                  list.map((item, index) => (
                    <React.Fragment key={index}>
                      <tr className="align-middle">
                        <td>{index + 1}</td>
                        <td>{item.walletAddress}</td>
                        <td>{item.name}</td>
                        <td>{item.url}</td>
                        {item.enabled ? <td>허용됨</td> : <td>허용 안됨</td>}
                        <td>
                          <button
                            className="btn-main d-inline-block"
                            onClick={(e) => aceeptCharity(item.walletAddress, e)}>
                            승인
                          </button>
                        </td>
                        <td>
                          <button
                            className="btn-main d-inline-block"
                            onClick={(e) => disaceeptCharity(item.walletAddress, e)}>
                            거절
                          </button>
                        </td>
                      </tr>
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
        </div>
      </section>
    </PanelLayout>
  );
};
export default GrantArtist;
