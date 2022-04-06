import BasicLayout from '../../components/layout/BasicLayout';
import { Axios } from '../../core/axios';
import { useState } from 'react';

const CharityRegistration = () => {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [walletAdd, setWalletAdd] = useState('');

  const onChangeName = (e) => {
    setName(e.target.value);
  };

  const onChangeUrl = (e) => {
    setUrl(e.target.value);
  };

  const onChangeWalletAdd = (e) => {
    setWalletAdd(e.target.value);
  };

  function charityRegist() {
    Axios.post(
      '/charities',
      {
        name: name,
        url: url,
        walletAddress: walletAdd,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      },
    )
      .then(() => {
        window.alert(name + '은 자선단체 등록을 성공하였습니다. 지갑 : ' + walletAdd);
      })
      .catch((err) => {
        console.log('에러발생' + err);
        window.alert('자선단체 등록을 실패하였습니다.');
      });
  }

  return (
    <BasicLayout>
      <div style={{ height: 130 }}></div>
      <section id="section-main" aria-label="section">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-4 ">
              <h1>
                <i className="fa fa-user"></i> 자선단체 등록
              </h1>
              <p>NFT작품의 수익 2%는 자선단체들 중 구매자가 원하는 곳으로 기부됩니다</p>
              <p>등록 후 따로 승인을 해주세요.</p>

              <div className="spacer-10"></div>

              <form name="contactForm" id="contact_form" className="form-border" action="#">
                <div className="">
                  <div className="col-md-6">
                    <div className="field-set">
                      <label>자선단체 명 :</label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        className="form-control"
                        onChange={onChangeName}
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="field-set">
                      <label>자선단체 홈페이지 주소 :</label>
                      <input
                        type="text"
                        name="email"
                        id="email"
                        className="form-control"
                        onChange={onChangeUrl}
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="field-set">
                      <label>자선단체 계좌 주소 :</label>
                      <input
                        type="text"
                        name="walletAdd"
                        id="walletAdd"
                        className="form-control"
                        onChange={onChangeWalletAdd}
                      />
                    </div>
                  </div>

                  <div className="spacer-20"></div>

                  <div className="col-md-12">
                    <div id="submit" className="pull-left">
                      <button
                        id="send_message"
                        className="btn btn-main color-2"
                        onClick={() => charityRegist()}>
                        등록하기
                      </button>
                    </div>
                    <div style={{ height: 70 }}></div>
                    <div className="clearfix"></div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </BasicLayout>
  );
};
export default CharityRegistration;
