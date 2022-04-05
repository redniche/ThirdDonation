// import React from 'react';

const AmountRecord = () => {
  return (
    <section className="container amountRecord">
      <div className="row sequence">
        <div className="col-lg-4 col-md-6 col-sm-12 sq-item wow">
          <div className="pricing-s1 mb30">
            <div className="top">
              <h2>전체 판매 금액</h2>
            </div>
            <div className="mid text-light bg-color">
              <p className="price">
                <span className="m opt-1">0</span>
                <span className="month">SSF</span>
              </p>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-12 sq-item wow">
          <div className="pricing-s1 mb30">
            <div className="top">
              <h2>오늘 판매 금액</h2>
            </div>
            <div className="mid text-light bg-color">
              <p className="price">
                <span className="m opt-1">0</span>
                <span className="month">SSF</span>
              </p>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-12 sq-item wow">
          <div className="pricing-s1 mb30">
            <div className="top">
              <h2>지갑 금액</h2>
            </div>
            <div className="mid text-light bg-color">
              <p className="price">
                <span className="m opt-1">0</span>
                <span className="month">SSF</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default AmountRecord;
