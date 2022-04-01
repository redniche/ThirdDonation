import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import * as selectors from '../../store/selectors';
import BasicLayout from './../../components/layout/BasicLayout';
import { useParams } from '@reach/router';
import { Axios } from './../../core/axios';
import { navigate } from '@reach/router';
import { detectCurrentProvider } from '../../core/ethereum';
import { getSsafyNftContract2, getSaleNftContract } from '../../contracts';

import Spinner from 'react-bootstrap/Spinner';

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
  const [loading, setLoading] = useState(false);

  // 파라미터 id값 받아오기
  const nftId = useParams().nftId;
  // console.log(nftId);

  const navigateTo = (link) => {
    navigate(link);
  };

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
  const artNftContract = getSsafyNftContract2(currentProvider);
  const saleArtContract = getSaleNftContract(currentProvider);

  // 스마트 컨트랙트에서 토큰 ID에 해당하는 tokenURI 가져오는 함수
  const getContractData = async () => {
    try {
      // 토큰 ID에 해당하는 tokenURI 가져오기
      const tokenUri = await artNftContract.methods.getTokenURI(nftId).call();
      console.log(tokenUri);
      const { data: tokenUriJson } = await Axios.get(tokenUri, { params: [] });
      setTokenUri(tokenUriJson);

      const price = await saleArtContract.methods.artTokenPrices(nftId).call();
      console.log(price);
      // 판매 중인 NFT라면
      if (price != 0) setSale(true);
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

  useEffect(async () => {
    getNFT();
    getContractData();
    getSaleId();
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
            <img style={{ height: '400px' }} src={tokenUri && tokenUri.image} alt="" />
          </div>
          <div className="col-md-6">
            <div className="item_info">
              {/* 작품 이름 */}
              <h2>{tokenUri && tokenUri.title}</h2>
              {/* 작품 항목 */}
              <div className="item_info_counts">
                <div className="item_info_type">
                  <i className="fa fa-image"></i>Art
                </div>
                {/* <div className="item_info_type"><i className="fa fa-image"></i>{nft.category}</div> */}

                {/* 본 사람 */}
                <div className="item_info_views">
                  <i className="fa fa-eye"></i>250
                </div>
                {/* <div className="item_info_views"><i className="fa fa-eye"></i>{nft.views}</div> */}

                {/* 좋아요 수 */}
                <div className="item_info_like">
                  <i className="fa fa-heart"></i>18
                </div>
                {/* <div className="item_info_like"><i className="fa fa-heart"></i>{nft.likes}</div> */}
              </div>
              {/* 작품 설명 */}
              <p>{tokenUri && tokenUri.description}</p>
              {/* <p>{nft.description}</p> */}
              <div className="d-flex-row">
                <div className="mb-4">
                  {/* 작가 */}
                  <h6>Creator</h6>
                  <div className="item_author">
                    <div className="author_list_pp">
                      <span>
                        <img className="lazy" src="../img/author/author-2.jpg" alt="" />
                        {/* <img className="lazy" src={nft.author && api.baseUrl + nft.author.avatar.url} alt=""/> */}
                        <i className="fa fa-check"></i>
                      </span>
                    </div>
                    <div className="author_list_info">
                      {/* 제작자 아이디 */}
                      <span>{tokenUri && tokenUri.author.username}</span>
                      {/* <span>{nft.author && nft.author.username}</span> */}
                    </div>
                  </div>
                </div>

                <div className="mr40">
                  <h6>owner</h6>
                  <div className="item_author">
                    <div className="author_list_pp">
                      <span>
                        <img className="lazy" src="../img/author/author-3.jpg" alt="" />
                        {/* <img
                          className="lazy"
                          // src={nft.author && api.baseUrl + nft.author.avatar.url}
                          alt=""
                        /> */}
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
              <div className="de_tab">
                <div className="de_tab_content">
                  {/* button for checkout */}
                  <div className="d-flex flex-row mt-5">
                    {/* 판매버튼 */}
                    {!owner ? (
                      <button className="btn-main lead mb-5 mr15">구매하기</button>
                    ) : sale ? (
                      loading ? (
                        <div className="m-4 d-flex justify-content-center">
                          <Spinner animation="border" />
                          <span className="m-1">판매 취소 중입니다.</span>
                        </div>
                      ) : (
                        <button className="btn-main lead mb-5 mr15" onClick={cancelSale}>
                          판매 취소
                        </button>
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
    </BasicLayout>
  );
};
export default ItemDetail;
