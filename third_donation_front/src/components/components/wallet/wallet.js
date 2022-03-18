import React from 'react';

/**
 * 지갑에 관한 정보를 표시하는 컴포넌트
 * @returns
 */
const balance = () => (
  <div className="">
    <span className="box-url2">
      <div className="d-flex mb-2 wallet-title">
        <p className="wallet-title-text">내 지갑</p>
      </div>
      <div>
        <div className="mb-2">
          <div className="content-title">잔액</div>
          <div className="mb-0">12.22 ETH</div>
        </div>
      </div>
      <div>
        <div className="d-wallet mb-0">
          <div className="content-title">주소</div>
          <span id="wallet" className="d-wallet-address">
            DdzFFzCqrhshMSxb9oW3mRo4MJrQkusV3fGFSTwaiu4wPBqMryA9DYVJCkW9n7twCffG5f5wX2sSkoDXGiZB1HPa7K7f865Kk4LqnrME
          </span>
          {/* 지갑 주소 카피 버튼 */}
          <button id="btn_copy" title="Copy Text">
            Copy
          </button>
        </div>
      </div>
    </span>
  </div>
);
export default balance;
