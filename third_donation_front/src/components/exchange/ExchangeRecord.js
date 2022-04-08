import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import Collapse from 'react-bootstrap/Collapse';
import { Axios } from '../../core/axios';
import './exchangeRecord.scss';

const ExchangeRecord = ({ nftId }) => {
  const [open, setOpen] = useState(false);

  const [record, setRecord] = useState(null);

  const getExchangeRecord = async () => {
    await Axios.get(`/nfts/exchange/sales/history/${nftId}`)
      .then((data) => {
        const records = data.data.data.content;
        setRecord(records);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getExchangeRecord();
  }, []);

  return (
    <div>
      <button
        className="btn-main lead mb-2 mr15"
        onClick={() => setOpen(!open)}
        aria-controls="example-collapse-text"
        aria-expanded={open}>
        거래 기록
      </button>
      <Collapse in={open} className="m-0">
        {/* <div id="example-collapse-text">
          Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad
          squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt
          sapiente ea proident.
              </div> */}
        {/* <div id="example-collapse-text"> */}
        <div id="example-collapse-text">
          {record && record.length != 0 ? (
            <div id="table-wrap">
              <Table id="exchange-record-table">
                <thead>
                  <tr>
                    <th>가격</th>
                    <th>판매자</th>
                    <th>소유자</th>
                    <th>거래일시</th>
                  </tr>
                </thead>
                <tbody>
                  {record &&
                    record.map((list) => (
                      <tr key={list.id}>
                        <td>{list.basePrice} SSF</td>
                        <td>{list.seller.username}</td>
                        <td>{list.buyer.username}</td>
                        <td>
                          {list.exchangeDate.slice(0, 10)}
                          <span className="exchange-time">{list.exchangeDate.slice(11, 19)}</span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </div>
          ) : (
            <div>거래 기록이 없습니다.</div>
          )}
        </div>
      </Collapse>
    </div>
  );
};
export default ExchangeRecord;
