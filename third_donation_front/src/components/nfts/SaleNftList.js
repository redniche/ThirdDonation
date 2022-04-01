import { memo, useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import * as selectors from '../../store/selectors';
// import * as actions from '../../store/actions/thunks';
// import { clearNfts, clearFilter, clearPage } from '../../store/actions';
import SaleNFtCard from './SaleNFtCard';
// import { shuffleArray } from '../../store/utils';
// import NftMusicCard from './NftMusicCard';
import { Axios } from './../../core/axios';

/**
 * NFT리스트들을 표시하기 위한 컴포넌트
 *
 * @param {*} param0
 * @returns
 */
const SaleNftList = () => {
  const [height, setHeight] = useState(0);
  const [nfts, setNfts] = useState([]);
  // const [tokenUri, setTokenUri] = useState(null);

  // const dispatch = useDispatch();
  // const nfts = useSelector(selectors.saleNftItems);
  // console.log(nfts);
  // const nfts = nftItems ? (shuffle ? shuffleArray(nftItems) : nftItems) : [];

  const onFileLoad = ({ target: file }) => {
    let currentHeight = height;
    if (currentHeight < file.offsetHeight) {
      setHeight(file.offsetHeight);
    }
  };

  const getSaleNftList = () => {
    Axios.get('/nfts/exchange/sales')
      .then((data) => data)
      .then(async (res) => {
        const nftData = res.data.data;
        console.log(nftData);
        setNfts(nftData);
        // console.log(nftData);
        // console.log(nftData.tokenUri);

        // try {
        //   const { data: tokenUriJson } = await Axios.get(nftData.tokenUri, { params: [] });
        //   setTokenUri(tokenUriJson);
        //   // console.log(tokenUri);
        // } catch (err) {
        //   console.log(err);
        // }
      })
      .catch((err) => {
        console.log(`err: ${err}`);
        // 만약 NFT생성은 완료 되었는데 서버전송에서 오류날 경우따로 DB저장 처리 가능한 함수 필요
      });
  };

  useEffect(() => {
    getSaleNftList();
  }, []);

  return (
    <div className="row">
      {nfts &&
        nfts.map((nft, index) => (
          <SaleNFtCard nft={nft} key={index} onFileLoad={onFileLoad} height={height} />
        ))}
      {/* {showLoadMore && (
        <div className="col-lg-12">
          <div className="spacer-single"></div>
          <span onClick={loadMore} className="btn-main lead m-auto">
            더 보기
          </span>
          {result == 1 && <div className="result_log">마지막 NFT 입니다.</div>}
          {result == -1 && <div className="result_log">오류가 발생 했습니다.</div>}
        </div>
      )} */}
    </div>
  );
};

export default memo(SaleNftList);
