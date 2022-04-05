import { memo, useEffect, useState } from 'react';
import styled from 'styled-components';
import { navigate } from '@reach/router';
// import api from '../../core/api';
import ipfs_apis from '../../core/ipfs';
import { IpfsAxios, convertIpfsToHttps } from '../../core/ipfs';

const Outer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 8px;
`;

/**
 * 컬렉션을 표시하기 위한 컴포넌트
 * @param {*} param0
 * @returns
 */
const NftsItem = ({ nft }) => {
  const [tokenUri, setTokenUri] = useState(null);
  console.log(nft);

  const [height, setHeight] = useState(0);

  const onImgLoad = ({ target: img }) => {
    let currentHeight = height;
    if (currentHeight < img.offsetHeight) {
      setHeight(img.offsetHeight);
    }
  };

  const navigateTo = (link) => {
    navigate(link);
  };
  useEffect(async () => {
    try {
      const { data: tokenUriJson } = await IpfsAxios.get(convertIpfsToHttps(nft.nft.tokenUri), {
        params: [],
      });
      setTokenUri(tokenUriJson);
      console.log(tokenUriJson);
    } catch (err) {
      console.log(err);
    }
  }, [nft]);
  return (
    tokenUri && (
      <div className="itm" onClick={() => navigateTo(`/ItemDetail/${nft.nft.id}`)}>
        <div className="d-item">
          <div className="nft__item" style={{ height: '400px' }}>
            <div className="author_list_pp">
              <span onClick={() => window.open('/home1', '_self')}>
                <img
                  className="lazy"
                  // src={nft.author.avatar.url}
                  alt=""
                />
                <i className="fa fa-check"></i>
              </span>
            </div>
            <div className="nft__item_wrap" style={{ height: '400px' }}>
              <Outer>
                <span>
                  <img
                    src={tokenUri && `${ipfs_apis.https_local}/${tokenUri.hash}`}
                    className="lazy nft__item_preview"
                    onLoad={onImgLoad}
                    alt=""
                  />
                </span>
              </Outer>
            </div>
            <div className="nft__item_info">
              <span onClick={() => window.open('/#', '_self')}>
                <h4>{tokenUri.title}</h4>
              </span>
              <div className="nft__item_price">
                {nft.basePrice} SSF
                {/* <span>
                  {nft.bid}/{nft.max_bid}
                </span> */}
              </div>
              {/* <div className="nft__item_action">
                <span onClick={() => window.open(nft.bid_link, '_self')}>Place a bid</span>
              </div> */}
              <div className="nft__item_like">
                <i className="fa fa-heart"></i>
                {/* <span>{nft.likes}</span> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default memo(NftsItem);
