import { memo, useEffect, useState } from 'react';
// import styled from 'styled-components';
import { navigate } from '@reach/router';
import ipfs_apis from '../../core/ipfs';
import { IpfsAxios, convertIpfsToHttps } from '../../core/ipfs';

/**
 * 컬렉션을 표시하기 위한 컴포넌트
 * @param {*} param0
 * @returns
 */
const CollectionItem = ({ nft }) => {
  const [tokenUri, setTokenUri] = useState(null);
  // console.log(nft);
  // console.log(tokenUri);

  const navigateTo = (link) => {
    navigate(link);
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
  }, [nft]);
  return (
    tokenUri && (
      <div
        className="itm"
        style={{ height: '500px' }}
        onClick={() => navigateTo(`/ItemDetail/${nft.nft.id}`)}>
        <div className="nft_coll">
          <div className="nft_wrap d-flex justify-content-center" style={{ height: '400px' }}>
            {/* 토큰 이미지 */}
            <div className="align-self-center">
              <img
                src={tokenUri && `${ipfs_apis.https_local}/${tokenUri.hash}`}
                className="lazy img-fluid"
                alt=""
              />
            </div>
          </div>
          <div className="nft_coll_pp mt-2">
            <span>
              <img className="lazy" alt="" />
            </span>
            <i className="fa fa-check"></i>
          </div>
          <div className="nft_coll_info">
            {/* 유저 아이디 */}
            <span>
              <h4>{nft.nft.owner.username}</h4>
            </span>
            {/* 토큰 이름 */}
            <span>{tokenUri && tokenUri.title}</span>
          </div>
        </div>
      </div>
    )
  );
};

export default memo(CollectionItem);
