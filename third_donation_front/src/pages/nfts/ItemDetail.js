import { useState, useEffect } from 'react';
import BasicLayout from './../../components/layout/BasicLayout';
import { useParams } from '@reach/router';
import { Axios } from './../../core/axios';
import { navigate } from '@reach/router';

/**
 * NFT의 상세 정보를 보여주는 페이지 컴포넌트
 * @returns
 */
const ItemDetail = function () {
  const [tokenUri, setTokenUri] = useState(null);

  const [nft, setNft] = useState({});

  // 파라미터 id값 받아오기
  const nftId = useParams().nftId;
  // console.log(nftId);

  const navigateTo = (link) => {
    navigate(link);
  };

  const getNFT = () => {
    Axios.get(`/nfts/items/info/${nftId}`)
      .then((data) => data)
      .then(async (res) => {
        const nftData = res.data.data;

        setNft(nftData);
        // console.log(nftData);
        // console.log(nftData.tokenUri);

        try {
          const { data: tokenUriJson } = await Axios.get(nftData.tokenUri, { params: [] });
          setTokenUri(tokenUriJson);
          // console.log(tokenUri);
        } catch (err) {
          console.log(err);
        }
        // setNft(res.data.data, () => {
        //   console.log(nft);
        // });
      })
      .catch((err) => {
        console.log(`err: ${err}`);
        // 만약 NFT생성은 완료 되었는데 서버전송에서 오류날 경우따로 DB저장 처리 가능한 함수 필요
      });
  };

  useEffect(async () => {
    getNFT();
  }, []);

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
                    <button
                      className="btn-main lead mb-5 mr15"
                      onClick={() => navigateTo(`/sell/${nft.id}`)}>
                      판매 하기
                    </button>
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
