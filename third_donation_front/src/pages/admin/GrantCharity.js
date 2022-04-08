import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import PanelLayout from '../../components/layout/PanelLayout';
import { Axios } from '../../core/axios';
import { getSsafyNftContract } from '../../contracts';
import { detectCurrentProvider } from '../../core/ethereum';
import Pagination from '../../components/paging/Pagination';

/**
 * 관리자가 예술가 등록 요청을 승인할 수 있는 페이지 컴포넌트
 * @returns
 */
const GrantArtist = () => {
  const [totalPage, setTotalPage] = useState([]);
  const [curPage, setCurPage] = useState(0);

  const [list, setList] = useState([]);

  const getList = (page) => {
    Axios.get('/charities/admin', {
      params: {
        page,
      },
    })
      .then(({ data }) => data)
      .then(async ({ data }) => {
        setList(data.content);
        setCurPage(page);
        setTotalPage(data.totalPages);
      })
      .catch((err) => {
        console.log('에러 발생' + err);
      });
  };

  async function acceptCharity(walletAddress) {
    try {
      const currentProvider = detectCurrentProvider();
      if (!currentProvider) return;

      const accounts = await currentProvider.request({ method: 'eth_requestAccounts' });
      const currentWallet = accounts[0];

      const artNftContract = getSsafyNftContract(currentProvider);

      await artNftContract.methods
        .addCharityAddress(walletAddress)
        .send({ from: currentWallet })
        .then(() => {
          saveAceeptCharity(walletAddress);
        });

      alert('자선 단체 승인 성공');
    } catch (error) {
      console.log(error);
      alert('자선 단체 승인 실패');
    }
  }

  function saveAceeptCharity(walletAddress) {
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
        getList(curPage);
      })
      .catch((err) => {
        console.log('에러 발생' + err);
      });
  }

  function declineCharity(walletAddress) {
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
        getList(curPage);
      })
      .catch((err) => {
        console.log('에러 발생' + err);
      });
  }

  useEffect(() => {
    getList(0);
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
                          {item.enabled ? (
                            <button
                              className="btn-main d-inline-block"
                              onClick={declineCharity(item.walletAddress)}>
                              허용 안함
                            </button>
                          ) : (
                            <button
                              className="btn-main d-inline-block"
                              onClick={acceptCharity(item.walletAddress)}>
                              허용
                            </button>
                          )}
                        </td>
                        <td></td>
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
          <div className="spacer-single"></div>
          <Pagination totalPage={totalPage} curPage={curPage} fetch={getList} />
          <div className="spacer-single"></div>
        </div>
      </section>
    </PanelLayout>
  );
};
export default GrantArtist;
