import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import * as selectors from '../../store/selectors';
import BasicLayout from './../../components/layout/BasicLayout';
import { useParams } from '@reach/router';
import { Axios } from './../../core/axios';
import { navigate } from '@reach/router';
import { detectCurrentProvider } from '../../core/ethereum';
import {
  getSsafyNftContract,
  getSaleNftContract,
  getSsafyToeknContract,
  SALE_NFT_CONTRACT_ADDRESS,
} from '../../contracts';
import axios_apis from '../../core/axios';
import ipfs_apis from '../../core/ipfs';
import { IpfsAxios, convertIpfsToHttps } from '../../core/ipfs';

import { Modal } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import Select from 'react-select';

import ExchangeRecord from './../../components/exchange/ExchangeRecord';

/**
 * NFT의 상세 정보를 보여주는 페이지 컴포넌트
 * @returns
 */
const ItemDetail = function () {
  const { data: account } = useSelector(selectors.accountState);
  // console.log(account.id);

  const [tokenUri, setTokenUri] = useState(null);

  const [nft, setNft] = useState({});
  const [owner, setOwner] = useState(false);
  const [sale, setSale] = useState(false);
  const [saleId, setSaleId] = useState(null);
  const [tokenPrice, setTokenPrice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalShow, setModalShow] = React.useState(false);

  // 파라미터 id값 받아오기
  const nftId = useParams().nftId;
  // console.log(nftId);

  const navigateTo = (link) => {
    navigate(link);
  };

  const [charities] = useState([]);

  const selectInfo = useRef();
  const msgInfo = useRef();

  const getCharity = () => {
    Axios.get('/charities')
      .then((data) => data)
      .then(async (res) => {
        const charityList = res.data.data.content;
        console.log(charityList);
        for (let i = 0; i < charityList.length; i++) {
          const name = charityList[i].name;
          const walletAddress = charityList[i].walletAddress;
          console.log('😀😀');
          const charity = { value: walletAddress, label: name };
          charities.push(charity);
        }
      })
      .catch((err) => {
        console.log(`err: ${err}`);
        // 만약 NFT생성은 완료 되었는데 서버전송에서 오류날 경우따로 DB저장 처리 가능한 함수 필요
      });
  };

  function MyVerticallyCenteredModal(props) {
    return (
      <Modal {...props} aria-labelledby="contained-modal-title-vcenter" style={{ zIndex: '2000' }}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">자선단체 선택 & 메시지 입력</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="m-2 mb-4">
            <p className="m-0">기부할 자선단체를 선택해주세요.</p>
            <p className="mb-2">(판매된 금액 2%는 자선단체에게 기부됩니다.)</p>
            <Select options={charities} ref={selectInfo}></Select>
          </div>
          <div className="m-2">
            <p className="m-0 mb-1">예술가에게 따뜻한 한 마디를 입력해주세요.</p>
            <input
              type="text"
              ref={msgInfo}
              placeholder="100자 이내로 입력해주세요."
              style={{
                width: '100%',
                border: 'solid #bbb 1px',
                borderRadius: '5px',
                height: '37px',
                paddingLeft: '10px',
              }}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn-main lead mb-5 mr15" onClick={purchaseToken}>
            완료
          </button>
        </Modal.Footer>
      </Modal>
    );
  }

  const getSaleId = () => {
    if (!account) return;
    Axios.get(`/nfts/exchange/sales?sellerId=${account.id}`)
      .then((data) => data)
      .then(async (res) => {
        const sellData = res.data.data;
        for (let i = 0; i < sellData.length; i++) {
          const sellNftId = sellData[i].nft.id;
          if (sellNftId == nftId) {
            setSaleId(sellData[i].id);
            console.log(sellData[i].id);
            return;
          }
        }
      })
      .catch((err) => {
        console.log(`err: ${err}`);
        // 만약 NFT생성은 완료 되었는데 서버전송에서 오류날 경우따로 DB저장 처리 가능한 함수 필요
      });
  };

  // 토큰 ID에 해당하는 NFT 정보 받아오기
  const getNFT = () => {
    Axios.get(`/nfts/items/info/${nftId}`)
      .then((data) => data)
      .then(async (res) => {
        const nftData = res.data.data;
        setNft(nftData);
      })
      .catch((err) => {
        console.log(`err: ${err}`);
        // 만약 NFT생성은 완료 되었는데 서버전송에서 오류날 경우따로 DB저장 처리 가능한 함수 필요
      });
  };

  const currentProvider = detectCurrentProvider();
  if (!currentProvider) return;
  const artNftContract = getSsafyNftContract(currentProvider);
  const saleArtContract = getSaleNftContract(currentProvider);
  const ssafyTokenContract = getSsafyToeknContract(currentProvider);

  // 스마트 컨트랙트에서 토큰 ID에 해당하는 tokenURI 가져오는 함수
  const getContractData = async () => {
    try {
      // 토큰 ID에 해당하는 tokenURI 가져오기
      const tokenUri = await artNftContract.methods.getTokenURI(nftId).call();
      console.log(tokenUri);
      const { data: tokenUriJson } = await IpfsAxios.get(convertIpfsToHttps(tokenUri), {
        params: [],
      });
      setTokenUri(tokenUriJson);

      const price = await saleArtContract.methods.artTokenPrices(nftId).call();
      console.log(price);
      // 판매 중인 NFT라면
      if (price != 0) {
        setTokenPrice(price);
        setSale(true);
      }
    } catch (error) {
      console.log(error);
      alert('정보 가져오기 실패!');
    }
  };

  // 판매 취소하는 함수
  const cancelSale = async () => {
    try {
      setLoading(true);

      const accounts = await currentProvider.request({ method: 'eth_requestAccounts' });
      const currentWallet = accounts[0];
      const response = await saleArtContract.methods
        .cancelSaleArtToken(nftId)
        .send({ from: currentWallet })
        .then(() => {
          saveCancelSale();
        });

      console.log(response);

      setLoading(false);
      alert('판매 취소가 완료되었습니다.');
      navigateTo('/explore');
    } catch (error) {
      console.log(error);
      setLoading(false);
      alert('판매 취소 실패!');
    }
  };

  // 백엔드에 판매 취소 전송
  const saveCancelSale = () => {
    Axios.patch(`/nfts/exchange/sales/${saleId}/cancel`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(`err: ${err}`);
        // 만약 NFT생성은 완료 되었는데 서버전송에서 오류날 경우따로 DB저장 처리 가능한 함수 필요
      });
  };

  // NFT 구매
  const purchaseToken = async () => {
    try {
      if (!account) {
        alert('지갑을 연결해주세요.');
        return;
      }
      if (selectInfo.current.state.value == null) {
        alert('자선단체를 선택해주세요.');
        return;
      }
      const charityWalletAddress = selectInfo.current.state.value.value;
      const msgToArtist = msgInfo.current.value;
      console.log(selectInfo.current.state);
      if (msgToArtist.length == 0) {
        alert('메시지를 입력해주세요.');
        return;
      }
      if (msgToArtist.length > 100) {
        alert('메시지는 100자 이내로 입력해주세요.');
        return;
      }
      setModalShow(false);
      setLoading(true);
      const accounts = await currentProvider.request({ method: 'eth_requestAccounts' });
      const currentWallet = accounts[0];

      console.log(ssafyTokenContract.methods);

      // 구매 승인 (스마트 컨트랙트)
      const response = await ssafyTokenContract.methods
        .approve(SALE_NFT_CONTRACT_ADDRESS, tokenPrice)
        .send({ from: currentWallet });
      console.log(response);

      // NFT 구매 (스마트 컨트랙트)
      const response2 = await saleArtContract.methods
        .purchaseArtToken(nftId, currentWallet, charityWalletAddress)
        .send({ from: currentWallet })
        .then(() => {
          // NFT 구매 (백엔드)
          savePurchase(charityWalletAddress, msgToArtist);
        });
      console.log(response2);

      setLoading(false);
      alert('NFT 구매가 완료되었습니다.');
      navigateTo();
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const savePurchase = (address, msg) => {
    Axios.post(
      '/nfts/exchange/buy',
      {
        buyerId: account.id,
        charityWalletAddress: address,
        message: msg,
        saleId: saleId,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(async () => {
    getNFT();
    getContractData();
    getSaleId();
    getCharity();
  }, []);

  useEffect(async () => {
    if (!account) return;
    if (nft.owner && account.id == nft.owner.id) setOwner(true);
    else setOwner(false);
    console.log(owner);
  }, [nft]);

  if (nft.owner) console.log(nft.owner.id);
  return (
    <BasicLayout>
      {console.log(nft)}
      {console.log(tokenUri)}
      <section className="container mt-4">
        <div className="row mt-md-5 pt-md-4">
          <div className="col-md-6 text-center">
            {/* NFT 이미지 */}
            {nft.fileType == 'video' ? (
              <video
                src={tokenUri && `${ipfs_apis.https_local}/${tokenUri.hash}`}
                style={{ width: '100%', maxHeight: '500px' }}
                autoPlay
                loop
                className="mt-5"
                alt=""
              />
            ) : (
              <img
                className=""
                style={{ width: '100%', maxHeight: '550px' }}
                src={tokenUri && `${ipfs_apis.https_local}/${tokenUri.hash}`}
                alt=""
              />
            )}
          </div>
          <div className="col-md-6">
            <div className="item_info">
              {/* 작품 이름 */}
              <h2>{tokenUri && tokenUri.title}</h2>
              {/* 작품 항목 */}
              <div className="item_info_counts">
                <div className="item_info_type">
                  {nft.fileType == 'image' ? (
                    <i className="fa fa-image">
                      <span>Art</span>
                    </i>
                  ) : (
                    <i className="fa fa-camera">
                      <span>Video</span>
                    </i>
                  )}
                </div>
                {/* 좋아요 수 */}
                <div className="item_info_like">
                  <i className="fa fa-heart"></i>
                  {nft.wishCount}
                </div>
              </div>
              {/* 작품 설명 */}
              <p>{tokenUri && tokenUri.description}</p>
              {/* <p>{nft.description}</p> */}
              <div className="d-flex-row">
                <div className="mb-4">
                  {/* 작가 */}
                  <h6>예술가</h6>
                  <div className="item_author">
                    <div className="author_list_pp">
                      <span onClick={() => navigateTo(`/profile/${nft.artist.id}`)}>
                        <img
                          className="lazy"
                          src={
                            nft.artist && nft.artist.imagePath
                              ? `${axios_apis.file}/${nft.artist.imagePath}`
                              : '/img/기본프로필이미지.png'
                          }
                          alt=""
                        />
                        {/* <img className="lazy" src={nft.author && api.baseUrl + nft.author.avatar.url} alt=""/> */}
                        <i className="fa fa-check"></i>
                      </span>
                    </div>
                    <div className="author_list_info">
                      {/* 제작자 아이디 */}
                      <span>{nft.artist && nft.artist.username}</span>
                      {/* <span>{nft.author && nft.author.username}</span> */}
                    </div>
                  </div>
                </div>

                <div className="mr40">
                  <h6>소유자</h6>
                  <div className="item_author">
                    <div className="author_list_pp">
                      <span onClick={() => navigateTo(`/profile/${nft.owner.id}`)}>
                        <img
                          className="lazy"
                          src={
                            nft.owner && nft.owner.imagePath
                              ? `${axios_apis.file}/${nft.owner.imagePath}`
                              : '/img/기본프로필이미지.png'
                          }
                          alt=""
                        />
                        <i className="fa fa-check"></i>
                      </span>
                    </div>
                    <div className="author_list_info">
                      {/* 소유자 아이디  */}
                      <span>{nft.owner && nft.owner.username}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="spacer-40"></div>
              <ExchangeRecord nftId={nftId} />
              <div className="de_tab">
                <div className="de_tab_content">
                  {/* button for checkout */}
                  <div className="d-flex flex-row mt-5">
                    {/* 판매버튼 */}
                    {!owner ? (
                      loading ? (
                        <div>
                          <div className="mb-1">
                            <span>가격: </span>
                            {tokenPrice} SSF
                          </div>
                          <div className="m-4 d-flex justify-content-center">
                            <Spinner animation="border" />
                            <span className="m-1">구매 중입니다.</span>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className="mb-1">
                            <span>가격: </span>
                            {tokenPrice} SSF
                          </div>
                          <button
                            className="btn-main lead mb-5 mr15"
                            onClick={() => setModalShow(true)}>
                            구매하기
                          </button>
                        </div>
                      )
                    ) : sale ? (
                      loading ? (
                        <div className="m-4 d-flex justify-content-center">
                          <Spinner animation="border" />
                          <span className="m-1">판매 취소 중입니다.</span>
                        </div>
                      ) : (
                        <div>
                          <div className="mb-1">
                            <span>가격: </span>
                            {tokenPrice} SSF
                          </div>
                          <button className="btn-main lead mb-5 mr15" onClick={cancelSale}>
                            판매 취소
                          </button>
                        </div>
                      )
                    ) : (
                      <button
                        className="btn-main lead mb-5 mr15"
                        onClick={() => navigateTo(`/sell/${nft.id}`)}>
                        판매 하기
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <MyVerticallyCenteredModal show={modalShow} onHide={() => setModalShow(false)} />
    </BasicLayout>
  );
};
export default ItemDetail;
