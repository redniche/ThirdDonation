// import { Component, useState } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import * as selectors from '../../store/selectors';
import {
  // GetWeb3,
  // getSsafyNftContract,
  // getSaleNftContract,
  // saleArtTokenContracts,
  SALE_NFT_CONTRACT_ADDRESS,
  // SSAFY_NFT_CONTRACT_ADDRESS,
  getSsafyNftContract2,
  getSaleNftContract,
} from '../../contracts';
// import Web3 from 'web3';
// import ABI from '../../common/ABI';
import { detectCurrentProvider } from '../../core/ethereum';

// import { API_URL, Axios } from './../../core/axios';
import Spinner from 'react-bootstrap/Spinner';

import Clock from '../../components/nfts/Clock';
import PanelLayout from '../../components/layout/PanelLayout';

/**
 * 판매등록을 할 수 있는 함수형 페이지 컴포넌트
 */
const Sell = () => {
  const { data: account } = useSelector(selectors.accountState);
  console.log(account.id);

  // const privateKey = '0x94fa80f5c0885863488f5e0975929faa53b83a5791b098b85d0b7326f174a38e';
  // const walletAccount = web3.eth.accounts.privateKeyToAccount(privateKey);

  // const [artPrice, setArtPrice] = useState('');
  // const [account, setAccount] = useState('');
  const [sellPrice, setSellPrice] = useState('');
  const [loading, setLoading] = useState(false);

  const onChangeSellPrice = (e) => {
    setSellPrice(e.target.value);
  };

  const handleShow = () => {
    document.getElementById('tab_opt_1').classList.add('show');
    document.getElementById('tab_opt_1').classList.remove('hide');
    document.getElementById('tab_opt_2').classList.remove('show');
    document.getElementById('btn1').classList.add('active');
    document.getElementById('btn2').classList.remove('active');
  };

  const handleShow1 = () => {
    document.getElementById('tab_opt_1').classList.add('hide');
    document.getElementById('tab_opt_1').classList.remove('show');
    document.getElementById('tab_opt_2').classList.add('show');
    document.getElementById('btn1').classList.remove('active');
    document.getElementById('btn2').classList.add('active');
  };

  // 판매 등록을 승인하는 함수
  const approveToggle = async (artNftContract, currentWallet) => {
    try {
      console.log(artNftContract.methods);
      console.log(currentWallet);

      const response = artNftContract.methods
        .setApprovalForAll(SALE_NFT_CONTRACT_ADDRESS, true)
        .send({ from: currentWallet });
      console.log(response);
    } catch (error) {
      console.log(error);
      setLoading(false);
      alert('판매 등록 에러 발생!');
    }
  };

  const saleRegist = async () => {
    try {
      if (!account) {
        alert('지갑을 연결해주세요.');
        return;
      }
      if (sellPrice === '') {
        alert('가격을 입력해주세요.');
        return;
      }
      setLoading(true);

      // console.log(saleArtTokenContracts.methods);
      const currentProvider = detectCurrentProvider();
      if (!currentProvider) return;

      const accounts = await currentProvider.request({ method: 'eth_requestAccounts' });
      const currentWallet = accounts[0];
      console.log(currentWallet);

      // const web3 = new Web3(currentProvider);
      // const {
      //   CONTRACT_ABI: { SALE_ABI, NFT_ABI },
      // } = ABI;

      // const saleArtContract = new web3.eth.Contract(SALE_ABI, SALE_NFT_CONTRACT_ADDRESS);
      // const artNftContract = new web3.eth.Contract(NFT_ABI, SSAFY_NFT_CONTRACT_ADDRESS);
      const saleArtContract = getSaleNftContract(currentProvider);
      const artNftContract = getSsafyNftContract2(currentProvider);

      const saleAuth = await artNftContract.methods
        .isApprovedForAll(currentWallet, SALE_NFT_CONTRACT_ADDRESS)
        .call();
      console.log(saleAuth);
      if (!saleAuth) await approveToggle(artNftContract, currentWallet);

      const response = await saleArtContract.methods
        .setForSaleArtToken(1, sellPrice)
        .send({ from: currentWallet });
      // .then( async () => {
      //   await saveSaleNFT();
      // });
      console.log(response);

      // 해당 주소 토큰 개수 확인
      const balance = await artNftContract.methods.balanceOf(currentWallet).call();
      console.log(balance);

      // 해당 tokenId에 해당하는 토큰 가격 확인
      const price = await saleArtContract.methods.getArtTokenPrice(1).call();
      console.log(price);

      setLoading(false);
      alert('NFT 판매 등록이 완료되었습니다.');
    } catch (error) {
      console.log(error);
      setLoading(false);
      alert('판매 등록 에러 발생!');
    }
  };

  // 백엔드에 판매 정보 등록하는 함수
  // const saveSaleNFT = () => {
  //   Axios.post(
  //     `${API_URL}/nfts/sales`,
  //     {
  //       basePrice: sellPrice,
  //       contractAddress: SALE_NFT_CONTRACT_ADDRESS,
  //       saleType: 'AUCTION',
  //       sellerId: account.id,
  //       tokenId: 0,
  //     },
  //     {
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       withCredentials: true,
  //     },
  //   )
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((err) => {
  //       console.log(`err: ${err}`);
  //       // 만약 NFT생성은 완료 되었는데 서버전송에서 오류날 경우따로 DB저장 처리 가능한 함수 필요
  //     });
  // };

  return (
    <PanelLayout title="작품 판매">
      <section className="container">
        <div className="row justify-content-center">
          <div className="col-lg-7 offset-lg-1 mb-5">
            <form id="form-create-item" className="form-border" action="#">
              <div className="field-set">
                <div className="spacer-single"></div>

                <h5>판매 방식 선택</h5>
                <div className="de_tab tab_methods">
                  <ul className="de_nav">
                    <li id="btn1" className="active" onClick={handleShow}>
                      <span>
                        <i className="fa fa-tag"></i>일반 판매
                      </span>
                    </li>
                    <li id="btn2" onClick={handleShow1}>
                      <span>
                        <i className="fa fa-hourglass-1"></i>경매
                      </span>
                    </li>
                    {/* <li id="btn3" onClick={this.handleShow2}>
                        <span>
                          <i className="fa fa-users"></i>Open for bids
                        </span>
                      </li> */}
                  </ul>

                  <div className="de_tab_content pt-3">
                    <div id="tab_opt_1">
                      <h5>가격</h5>
                      <input
                        type="number"
                        name="item_price"
                        id="item_price"
                        className="form-control"
                        placeholder="작품의 가격을 입력해주세요. (ETH)"
                        value={sellPrice}
                        onChange={onChangeSellPrice}
                      />
                    </div>

                    <div id="tab_opt_2" className="hide">
                      <h5>경매 시작가</h5>
                      <input
                        type="text"
                        name="item_price_bid"
                        id="item_price_bid"
                        className="form-control"
                        placeholder="가격을 입력해주세요."
                      />

                      <div className="spacer-20"></div>

                      <div className="row">
                        <div className="col-md-6">
                          <h5>시작일</h5>
                          <input
                            type="date"
                            name="bid_starting_date"
                            id="bid_starting_date"
                            className="form-control"
                            min="1997-01-01"
                          />
                        </div>
                        <div className="col-md-6">
                          <h5>종료일</h5>
                          <input
                            type="date"
                            name="bid_expiration_date"
                            id="bid_expiration_date"
                            className="form-control"
                          />
                        </div>
                      </div>
                    </div>

                    <div id="tab_opt_3"></div>
                  </div>
                </div>

                <div className="spacer-20"></div>

                <div className="spacer-10"></div>

                {/* <h5>Royalties</h5>
                  <input
                    type="text"
                    name="item_royalties"
                    id="item_royalties"
                    className="form-control"
                    placeholder="suggested: 0, 10%, 20%, 30%. Maximum is 70%"
                  /> */}

                <div className="spacer-10"></div>

                {loading ? (
                  <div className="m-4 d-flex justify-content-center">
                    <Spinner animation="border" />
                    <span className="m-1">판매 등록 중입니다.</span>
                  </div>
                ) : (
                  <input
                    type="button"
                    id="submit"
                    className="btn-main"
                    value="판매 등록"
                    onClick={saleRegist}
                  />
                )}
              </div>
            </form>
          </div>

          <div className="col-lg-3 col-sm-6 col-xs-12">
            <h5>Preview item</h5>
            <div className="nft__item m-0">
              <div className="de_countdown">
                <Clock deadline="December, 30, 2021" />
              </div>
              <div className="author_list_pp">
                <span>
                  <img className="lazy" src="./img/author/author-1.jpg" alt="" />
                  <i className="fa fa-check"></i>
                </span>
              </div>
              <div className="nft__item_wrap">
                <span>
                  <img
                    src="./img/collections/coll-item-3.jpg"
                    id="get_file_2"
                    className="lazy nft__item_preview"
                    alt=""
                  />
                </span>
              </div>
              <div className="nft__item_info">
                <span>
                  <h4>Pinky Ocean</h4>
                </span>
                <div className="nft__item_price">
                  0.08 ETH
                  {/* <span>1/20</span> */}
                </div>
                {/* <div className="nft__item_action">
                    <span>Place a bid</span>
                  </div> */}
                <div className="nft__item_like">
                  <i className="fa fa-heart"></i>
                  <span>50</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PanelLayout>
  );
};
export default Sell;
