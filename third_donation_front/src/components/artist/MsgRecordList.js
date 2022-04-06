import { useEffect, useState } from 'react';
// import { msgList } from './MsgData';
import MsgRecordListRow from './MsgRecordListRow';
import Pagination from '../paging/Pagination';
import { Axios } from '../../core/axios';
import { useSelector } from 'react-redux';
import * as selectors from '../../store/selectors';

const MsgRecord = () => {
  // 글 리스트
  const [list, setList] = useState([]);
  // 총 페이지
  const [totalPage, setTotalPage] = useState([]);
  // 현재 페이지 번호
  const [curPage, setCurPage] = useState(0);

  const { data: account } = useSelector(selectors.accountState);

  const getList = (pageNumber) => {
    Axios.get(`/nfts/exchange/sales/messages/${account.id}`, {
      params: {
        // artistId: account.id,
        pageNumber: pageNumber,
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

  useEffect(() => {
    getList(curPage);
    // setMsg(msgList);
    // console.log(msgList);
  }, []);

  return (
    <section className="container msgRecord">
      <div className="row sequence d-flex justify-content-center">
        <div className="col-lg-10 col-md-10 col-sm-10 sq-item wow">
          <div className="pricing-s1">
            <table className="msgBody">
              <thead>
                <tr>
                  <th className="name">ID</th>
                  <th className="price">후원자 이름</th>
                  <th className="content">메세지</th>
                  <th className="nftName">NFT명</th>
                  <th className="price">일자</th>
                </tr>
              </thead>
              <MsgRecordListRow messages={list} />
            </table>
            <Pagination totalPage={totalPage} curPage={curPage} fetch={getList} />
          </div>
        </div>
      </div>
    </section>
  );
};
export default MsgRecord;
