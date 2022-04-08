import { memo, useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { settings } from '../constants';
import CollectionItem from './CollectionItem';
import { Axios } from './../../core/axios';

/**
 * Hot 컬렉션들을 표시하기 위한 컴포넌트
 * @returns
 */
const HotCollections = () => {
  const [hotCollections, setHotCollections] = useState(null);

  const getSaleNftList = () => {
    return Axios.get('/nfts/exchange/sales');
  };

  const hotCollectionsSort = (collections) => {
    collections.sort((a, b) => b.nft.wishCount - a.nft.wishCount);
    return collections;
  };

  useEffect(async () => {
    const collections = await getSaleNftList();
    const sortResult = hotCollectionsSort(collections.data.data);
    setHotCollections(sortResult);
  }, []);

  // useEff
  return (
    <div className="nft">
      {hotCollections && (
        <Slider {...settings}>
          {hotCollections.map((nft, index) => (
            <CollectionItem key={index} nft={nft} />
          ))}
        </Slider>
      )}
    </div>
  );
};

export default memo(HotCollections);
