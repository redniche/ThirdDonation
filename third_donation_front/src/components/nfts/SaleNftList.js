import { memo, useState, useEffect } from 'react';
import SaleNFtCard from './SaleNFtCard';
import { Axios } from './../../core/axios';
import SaleFilterBar from '../../components/nfts/SaleFilterBar';

/**
 * NFT리스트들을 표시하기 위한 컴포넌트
 *
 * @param {*} param0
 * @returns
 */
const SaleNftList = () => {
  const [height, setHeight] = useState(0);
  const [nfts, setNfts] = useState([]);

  // filter state
  const [searchValue, setSearchValue] = useState(null);
  const [artistWord, setArtistWord] = useState(null);
  const [nftWord, setNftWord] = useState(null);
  const [sellerWord, setSellerWord] = useState(null);
  const [fileType, setFileType] = useState(null);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [wishCount, setWishCount] = useState(null);
  // const [saveWishCount, setSaveWishCount] = useState(null);

  const onFileLoad = ({ target: file }) => {
    let currentHeight = height;
    if (currentHeight < file.offsetHeight) {
      setHeight(file.offsetHeight);
    }
  };

  const searchKind = (e) => {
    console.log(e);
    setSearchValue(e.value);
  };

  const searchWord = (word) => {
    console.log(word);
    // setWord(word);
    if (searchValue == 'artist') {
      setArtistWord(word);
      console.log('😁😁');
    } else if (searchValue == 'nftName') {
      setNftWord(word);
    } else if (searchValue == 'sellerId') {
      setSellerWord(word);
    }
  };

  const selectFileType = (e) => {
    console.log(e);
    setFileType(e.value);
  };

  const onChangeMinPrice = (price) => {
    console.log(price);
    setMinPrice(price);
  };
  const onChangeMaxPrice = (price) => {
    console.log(price);
    setMaxPrice(price);
  };
  const onChangeWishCount = (cnt) => {
    console.log(cnt);
    setWishCount(cnt);
  };

  const getSaleNftList = async (price) => {
    await Axios.get('/nfts/exchange/sales', {
      params: {
        file_type: fileType,
        artist: artistWord,
        name: nftWord,
        seller_id: sellerWord,
        price_between: price,
        wish_count_greater: wishCount,
      },
    })
      .then((data) => data)
      .then(async (res) => {
        const nftData = res.data.data;
        console.log(nftData);
        setNfts(nftData);
      })
      .catch((err) => {
        console.log(`err: ${err}`);
        // 만약 NFT생성은 완료 되었는데 서버전송에서 오류날 경우따로 DB저장 처리 가능한 함수 필요
      });
  };

  useEffect(() => {
    getSaleNftList();
  }, []);

  useEffect(() => {
    setArtistWord(null);
    setNftWord(null);
    setSellerWord(null);
    getSaleNftList(priceRange);
  }, [searchValue]);

  useEffect(() => {
    if (isNaN(parseInt(wishCount))) {
      console.log('😂');
      setWishCount(null);
    }

    getSaleNftList(priceRange);
  }, [artistWord, nftWord, sellerWord, fileType, wishCount]);

  useEffect(() => {
    if (minPrice.length != 0 && maxPrice.length != 0) {
      const priceString = minPrice + ',' + maxPrice;
      setPriceRange(priceString);
      getSaleNftList(priceString);
    } else {
      setPriceRange(null);
      getSaleNftList(null);
    }
  }, [minPrice, maxPrice]);

  return (
    <div className="row">
      {/* {console.log(fileType)}
      {console.log(searchValue)} */}
      {console.log(minPrice.length)}
      {console.log(maxPrice)}
      {/* {console.log(wishCount.length)} */}
      <SaleFilterBar
        searchKind={searchKind}
        searchWord={searchWord}
        fileType={selectFileType}
        onChangeMinPrice={onChangeMinPrice}
        onChangeMaxPrice={onChangeMaxPrice}
        onChangeWishCount={onChangeWishCount}
      />
      {nfts &&
        nfts.map((nft, index) => (
          <SaleNFtCard nft={nft} key={index} onFileLoad={onFileLoad} height={height} />
        ))}
    </div>
  );
};

export default memo(SaleNftList);
