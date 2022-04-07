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

  const getSaleNftList = () => {
    return Axios.get('/nfts/exchange/sales');
  };

  useEffect(async () => {
    const nftData = await getSaleNftList();
    setNfts(nftData.data.data);
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
