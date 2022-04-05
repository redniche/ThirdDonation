import { memo, useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { carouselNew } from '../constants';
import { Axios } from './../../core/axios';

import NftsItem from './NftsItem';

// import NftsItem from './NftsItem';

/**
 * 판매할 NFT를 등록하는 페이지 컴포넌트
 * @returns
 */
const NewNfts = () => {
  const [nfts, setNfts] = useState(null);

  const getSaleNftList = async () => {
    await Axios.get('/nfts/exchange/sales')
      .then((data) => data)
      .then(async (res) => {
        const nftData = res.data.data;
        console.log(nftData);
        setNfts(nftData);
      })
      .then(() => {
        newNftsSort();
      })
      .catch((err) => {
        console.log(`err: ${err}`);
        // 만약 NFT생성은 완료 되었는데 서버전송에서 오류날 경우따로 DB저장 처리 가능한 함수 필요
      });
  };

  const newNftsSort = () => {
    nfts.splice(20);
  };

  useEffect(() => {
    getSaleNftList();
  }, []);

  return (
    <div className="nft">
      {console.log(nfts)}
      {nfts && (
        <Slider {...carouselNew}>
          {nfts.map((nft, index) => (
            <NftsItem key={index} nft={nft} />
          ))}
        </Slider>
      )}
    </div>
  );
};

export default memo(NewNfts);
