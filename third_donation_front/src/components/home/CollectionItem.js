import { memo, useEffect, useState } from 'react';
// import styled from 'styled-components';
import { navigate } from '@reach/router';
import { useSelector } from 'react-redux';
import * as selectors from '../../store/selectors';
import ipfs_apis from '../../core/ipfs';
import axios_apis from '../../core/axios';
import { IpfsAxios, convertIpfsToHttps } from '../../core/ipfs';
import { Axios } from '../../core/axios';

/**
 * 컬렉션을 표시하기 위한 컴포넌트
 * @param {*} param0
 * @returns
 */
const CollectionItem = ({ nft }) => {
  const { data: account } = useSelector(selectors.accountState);
  const [tokenUri, setTokenUri] = useState(null);
  const [isWish, setWish] = useState(0);
  // console.log(nft);
  // console.log(tokenUri);

  const navigateTo = (link) => {
    navigate(link);
  };

  const heartClickHandle = () => {
    console.log(account);
    console.log(account.id != nft.nft.artist.id);
    if (account && account.id != nft.nft.artist.id) {
      Axios.post('/nfts/wish', {
        tokenId: nft.nft.id,
      })
        .then(() => {
          setWish(isWish + 1);
        })
        .catch(() => {
          Axios.delete(`/nfts/wish/${nft.nft.id}`).then(() => {
            setWish(isWish - 1);
          });
        });
    }
  };

  useEffect(async () => {
    try {
      const { data: tokenUriJson } = await IpfsAxios.get(convertIpfsToHttps(nft.nft.tokenUri), {
        params: [],
      });
      setTokenUri(tokenUriJson);
      // console.log(tokenUriJson);
    } catch (err) {
      console.log(err);
    }
  }, []);
  return (
    tokenUri && (
      <div className="itm">
        {console.log(nft)}
        <div className="nft_coll">
          <div
            className="nft_wrap d-flex justify-content-center"
            style={{ height: '400px' }}
            onClick={() => navigateTo(`/ItemDetail/${nft.nft.id}`)}>
            {/* 토큰 이미지 */}
            <div className="align-self-center">
              {nft.nft.fileType == 'video' ? (
                <video
                  src={`${ipfs_apis.https_local}/${tokenUri.hash}`}
                  autoPlay
                  muted
                  loop
                  className="lazy img-fluid"
                  alt=""
                />
              ) : (
                <img
                  src={tokenUri && `${ipfs_apis.https_local}/${tokenUri.hash}`}
                  className="lazy img-fluid"
                  alt=""
                />
              )}
            </div>
          </div>
          <div
            className="nft_coll_pp mt-2"
            // style={{ marginLeft: '60px' }}
            onClick={() => navigateTo(`/profile/${nft.nft.artist.id}`)}>
            <span>
              <img
                className="lazy"
                src={
                  nft.nft.artist && nft.nft.artist.imagePath
                    ? `${axios_apis.file}/${nft.nft.artist.imagePath}`
                    : '/img/기본프로필이미지.png'
                }
                alt=""
              />
            </span>
            <i className="fa fa-check"></i>
          </div>
          <div className="nft_coll_info">
            {/* 유저 아이디 */}
            <span>
              <h4>{nft.nft.artist.username}</h4>
            </span>
            {/* 토큰 이름 */}
            <span>{tokenUri && tokenUri.title}</span>
            <div className="nft__item_price">{nft.basePrice} SSF</div>
            <div
              className="nft__item_like"
              style={{ margin: '2px 10px 0px 0px' }}
              onClick={heartClickHandle}>
              <i className="fa fa-heart"></i>
              <span>{nft.nft.wishCount + isWish}</span>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default memo(CollectionItem);
