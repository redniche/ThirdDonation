import { memo, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as selectors from '../../store/selectors';
import * as actions from '../../store/actions/thunks';
import { clearNfts, clearFilter, clearPage } from '../../store/actions';
import NftCard from './NftCard';
import { shuffleArray } from '../../store/utils';
import NftMusicCard from './NftMusicCard';

/**
 * NFT리스트들을 표시하기 위한 컴포넌트
 *
 * @param {*} param0
 * @returns
 */
const NftList = ({
  showLoadMore = true,
  shuffle = false,
  userId = null,
  sellFlag = false,
  artistFlag = false,
}) => {
  const [height, setHeight] = useState(0);
  const [result, setResult] = useState(0);

  const dispatch = useDispatch();
  const nftItems = useSelector(selectors.nftItems);
  const nfts = nftItems ? (shuffle ? shuffleArray(nftItems) : nftItems) : [];

  const onFileLoad = ({ target: file }) => {
    let currentHeight = height;
    if (currentHeight < file.offsetHeight) {
      setHeight(file.offsetHeight);
    }
  };

  //TODO sellFlag 전달 후 구현이 아직 안됨
  useEffect(() => {
    dispatch(clearPage());
    dispatch(clearNfts());
    dispatch(clearFilter());
    dispatch(actions.fetchNftsBreakdown(userId, artistFlag, sellFlag));
  }, [dispatch, userId]);

  //will run when component unmounted
  useEffect(() => {
    dispatch(clearNfts());
    dispatch(clearFilter());
    dispatch(clearPage());
  }, []);

  const loadMore = async () => {
    dispatch(actions.fetchNftsBreakdown(userId, artistFlag, sellFlag)).then((r) => {
      setResult(r);
    });
  };

  return (
    <div className="row">
      {nfts &&
        nfts.map((nft, index) =>
          nft.type === 'music' ? (
            <NftMusicCard
              nft={nft}
              audioUrl={nft.audio_url}
              key={index}
              onImgLoad={onFileLoad}
              height={height}
            />
          ) : sellFlag ? (
            <NftCard
              nft={nft.nft}
              key={index}
              onFileLoad={onFileLoad}
              height={height}
              price={nft.basePrice}
            />
          ) : (
            <NftCard nft={nft} key={index} onFileLoad={onFileLoad} height={height} />
          ),
        )}
      {showLoadMore && (
        <div className="col-lg-12">
          <div className="spacer-single"></div>
          <span onClick={loadMore} className="btn-main lead m-auto">
            더 보기
          </span>
          {result == 1 && <div className="result_log">마지막 NFT 입니다.</div>}
          {result == -1 && <div className="result_log">오류가 발생 했습니다.</div>}
        </div>
      )}
    </div>
  );
};

export default memo(NftList);
