// import { Component, useState } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import * as selectors from '../../store/selectors';
import {
  web3,
  ssafyNftContract,
  saleArtTokenContracts,
  SALE_NFT_CONTRACT_ADDRESS,
  SSAFY_NFT_CONTRACT_ADDRESS,
} from '../../contracts';

import Clock from '../../components/nfts/Clock';
import PanelLayout from '../../components/layout/PanelLayout';

/**
 * 판매등록을 할 수 있는 함수형 페이지 컴포넌트
 */
const Sell = () => {
  const { data: account } = useSelector(selectors.accountState);
  // console.log(account.walletAddress);
  console.log(ssafyNftContract.methods);

  const privateKey = '0x94fa80f5c0885863488f5e0975929faa53b83a5791b098b85d0b7326f174a38e';
  const walletAccount = web3.eth.accounts.privateKeyToAccount(privateKey);

  // const [artPrice, setArtPrice] = useState('');
  const [sellPrice, setSellPrice] = useState('');

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

  // const getIsApprovedForAll = async () => {
  //   try {
  //     const response = await ssafyNftContract.methods
  //       .isApprovedForAll(account.walletAddress, SALE_NFT_CONTRACT_ADDRESS)
  //       .call();
  //     console.log(response);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // 판매 등록을 승인하는 함수
  const approveToggle = async () => {
    try {
      if (!account) return;
      const nowWalletAddress = account.walletAddress;
      // 해당 주소의 판매 컨트랙트를 승인
      const contractMethod = ssafyNftContract.methods.setApprovalForAll(
        SALE_NFT_CONTRACT_ADDRESS,
        true,
      );

      const gasEstimate = await contractMethod.estimateGas({ from: nowWalletAddress });

      const tx = {
        from: nowWalletAddress,
        to: SSAFY_NFT_CONTRACT_ADDRESS,
        gas: gasEstimate,
        data: contractMethod.encodeABI(),
      };

      await walletAccount
        .signTransaction(tx)
        .then(async (signedTx) => {
          await web3.eth.sendSignedTransaction(signedTx.rawTransaction).on('receipt', console.log);
        })
        .then((res) => {
          console.log(res);
          // alert('NFT 판매 등록이 완료되었습니다.');
        })
        .catch((err) => {
          console.log(err);
          alert('판매 등록 승인 에러 발생!');
        });
    } catch (error) {
      console.log(error);
    }
  };

  const saleRegist = async () => {
    try {
      if (!account) return;
      console.log('😀😀😀');

      const nowWalletAddress = account.walletAddress;
      // 해당 tokenId에 해당하는 토큰에 입력한 가격으로 판매 등록
      const contractMethod = saleArtTokenContracts.methods.setForSaleArtToken(2, sellPrice);
      console.log(saleArtTokenContracts.methods);

      // 해당 주소 토큰 개수 확인
      // const balance = await ssafyNftContract.methods.balanceOf(nowWalletAddress).call();
      // console.log(balance);

      await approveToggle();

      const gasEstimate = await contractMethod.estimateGas({ from: nowWalletAddress });

      const tx = {
        from: nowWalletAddress,
        to: SALE_NFT_CONTRACT_ADDRESS,
        gas: gasEstimate,
        data: contractMethod.encodeABI(),
      };
      // console.log(walletAccount);

      await walletAccount
        .signTransaction(tx)
        .then(async (signedTx) => {
          await web3.eth.sendSignedTransaction(signedTx.rawTransaction).on('receipt', console.log);
        })
        .then((res) => {
          console.log(res);
          alert('NFT 판매 등록이 완료되었습니다.');
        })
        .catch((err) => {
          console.log(err);
          alert('판매 등록 에러 발생!');
        });

      // 해당 tokenId에 해당하는 토큰 가격 확인
      // const price = await saleArtTokenContracts.methods.getArtTokenPrice(2).call();
      // console.log(price);
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(async () => {
  //   // if (account == null) {
  //   //   history.push("/");
  //   // }
  //   approveToggle();
  //   // getIsApprovedForAll();
  //   const balance = await ssafyNftContract.methods.balanceOf(account.walletAddress).call();

  //   console.log(balance);
  //   const artPrice = await saleArtTokenContracts.methods.artTokenPrices(2).call();
  //   console.log(artPrice);
  // }, []);

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

                <input
                  type="button"
                  id="submit"
                  className="btn-main"
                  value="판매 등록"
                  onClick={saleRegist}
                />
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
