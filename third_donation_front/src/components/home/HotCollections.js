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
  // const [height, setHeight] = useState(0);

  const [hotCollections, setHotCollections] = useState(null);

  // const onFileLoad = ({ target: file }) => {
  //   let currentHeight = height;
  //   if (currentHeight < file.offsetHeight) {
  //     setHeight(file.offsetHeight);
  //   }
  // };

  const getSaleNftList = async () => {
    await Axios.get('/nfts/exchange/sales')
      .then((data) => data)
      .then(async (res) => {
        const nftData = res.data.data;
        // console.log(nftData);
        setHotCollections(nftData);
      })
      .then(() => {
        hotCollectionsSort();
      })
      .catch((err) => {
        console.log(`err: ${err}`);
        // 만약 NFT생성은 완료 되었는데 서버전송에서 오류날 경우따로 DB저장 처리 가능한 함수 필요
      });
  };

  const hotCollectionsSort = () => {
    hotCollections.sort((a, b) => b.id - a.id);
    hotCollections.splice(20);
  };

  useEffect(() => {
    getSaleNftList();
  }, []);

  return (
    <div className="nft">
      {/* <Slider {...settings}>
        {hotCollections &&
          hotCollections.map((nft, index) => nft && <CollectionItem key={index} nft={nft} />)}
        {console.log('😀😀😀😀')}
      </Slider> */}
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
