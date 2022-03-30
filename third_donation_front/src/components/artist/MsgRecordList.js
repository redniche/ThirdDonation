import { useEffect, useState } from 'react';
import { msgList } from './MsgData';
import MsgRecordListRow from './MsgRecordListRow';
import Pagination from '../paging/Pagination';

const MsgRecord = () => {
  const [messages, setMsg] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(2);

  useEffect(() => {
    setMsg(msgList);
    console.log(msgList);
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indeoxOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = messages.slice(indeoxOfFirstPost, indexOfLastPost);

  // 클릭한 페이지로 이동
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  // 이전 페이지로 이동
  const prevPaginate = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  // 다음 페이지로 이동
  const nextPaginate = () => {
    const totalPosts = messages.length;
    const totalLength = Math.ceil(totalPosts / postsPerPage);
    if (currentPage < totalLength) setCurrentPage(currentPage + 1);
  };

  return (
    <section className="container msgRecord">
      <div className="row sequence d-flex justify-content-center">
        <div className="col-lg-10 col-md-10 col-sm-10 sq-item wow">
          <div className="pricing-s1">
            <div className="top">
              <h2>후원 메세지</h2>
            </div>
            <table className="msgBody">
              <thead>
                <tr>
                  <th className="name">후원자</th>
                  <th className="content">메세지</th>
                  <th className="nftName">NFT명</th>
                  <th className="price">금액</th>
                </tr>
              </thead>
              <MsgRecordListRow messages={currentPosts} />
            </table>
            <Pagination
              postsPerPage={postsPerPage}
              totalPosts={messages.length}
              paginate={paginate}
              prevPaginate={prevPaginate}
              nextPaginate={nextPaginate}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
export default MsgRecord;
