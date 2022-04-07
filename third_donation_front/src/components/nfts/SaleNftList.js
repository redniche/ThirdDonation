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

  const [page, setPage] = useState(1);
  const [result, setResult] = useState(0);

  // filter state
  const [searchValue, setSearchValue] = useState(null);
  const [artistWord, setArtistWord] = useState(null);
  const [nftWord, setNftWord] = useState(null);
  const [fileType, setFileType] = useState(null);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [wishCount, setWishCount] = useState(null);

  const onFileLoad = ({ target: file }) => {
    let currentHeight = height;
    if (currentHeight < file.offsetHeight) {
      setHeight(file.offsetHeight);
    }
  };

  const searchKind = (e) => {
    setSearchValue(e.value);
  };

  const searchWord = (word) => {
    if (searchValue == 'artist') {
      setArtistWord(word);
    } else if (searchValue == 'nftName') {
      setNftWord(word);
    }
  };

  const selectFileType = (e) => {
    setFileType(e.value);
  };

  const onChangeMinPrice = (price) => {
    setMinPrice(price);
  };
  const onChangeMaxPrice = (price) => {
    setMaxPrice(price);
  };
  const onChangeWishCount = (cnt) => {
    setWishCount(cnt - 1);
  };

  const getSaleNftList = async (price) => {
    await Axios.get('/nfts/exchange/sales', {
      params: {
        file_type: fileType,
        artist: artistWord,
        name: nftWord,
        price_between: price,
        wish_count_greater: wishCount,
      },
    })
      .then((data) => data)
      .then(async (res) => {
        const nftData = res.data.data;
        setNfts(nftData);
      })
      .catch((err) => {
        console.log(`err: ${err}`);
        // 만약 NFT생성은 완료 되었는데 서버전송에서 오류날 경우따로 DB저장 처리 가능한 함수 필요
      });
  };

  const getSaleNftListPage = async (price) => {
    await Axios.get('/nfts/exchange/sales', {
      params: {
        file_type: fileType,
        artist: artistWord,
        name: nftWord,
        price_between: price,
        wish_count_greater: wishCount,
        page: page,
      },
    })
      .then((data) => data)
      .then((res) => {
        const nftData = res.data.data;
        setNfts([...nfts, ...nftData]);
        setPage(page + 1);
        if (nftData.length == 0) {
          setResult(1);
        }
      });
  };

  const loadMore = () => {
    getSaleNftListPage(priceRange);
  };

  useEffect(() => {
    getSaleNftList(null);
  }, []);

  useEffect(() => {
    setArtistWord(null);
    setNftWord(null);
    getSaleNftList(priceRange);
  }, [searchValue]);

  useEffect(() => {
    if (isNaN(parseInt(wishCount))) {
      setWishCount(null);
    }

    getSaleNftList(priceRange);
  }, [artistWord, nftWord, fileType, wishCount]);

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
    <div>
      <div className="row">
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
      <div onClick={loadMore} className="btn-main lead m-auto mt-3">
        더 보기
      </div>
      {result == 1 && <div className="result_log">마지막 NFT 입니다.</div>}
    </div>
  );
};

export default memo(SaleNftList);
