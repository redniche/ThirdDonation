import { memo, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Axios } from './../../core/axios';
import { navigate } from '@reach/router';
import api from '../../core/api';

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
const CollectionItem = ({
  nft,
  className = 'd-item col-lg-3 col-md-6 col-sm-6 col-xs-12 mb-4',
  height,
  onFileLoad,
}) => {
  const [tokenUri, setTokenUri] = useState(null);
  console.log(nft);

  const navigateTo = (link) => {
    navigate(link);
  };
  useEffect(async () => {
    try {
      const { data: tokenUriJson } = await Axios.get(nft.nft.tokenUri, { params: [] });
      setTokenUri(tokenUriJson);
      console.log(tokenUriJson);
    } catch (err) {
      console.log(err);
    }
  }, [nft]);
  return (
    tokenUri && (
      <div className={className} onClick={() => navigateTo(`/ItemDetail/${nft.nft.id}`)}>
        <div className="nft__item m-0">
          {nft.item_type === 'single_items' ? (
            <div className="icontype">
              <i className="fa fa-bookmark"></i>
            </div>
          ) : (
            <div className="icontype">
              <i className="fa fa-shopping-basket"></i>
            </div>
          )}
          <div className="author_list_pp">
            <span onClick={() => navigateTo(`/profile/${tokenUri.author.id}`)}>
              <img
                className="lazy"
                src={
                  tokenUri.author.imagePath
                    ? tokenUri.author.imagePath
                    : api.baseUrl + '/uploads/기본프로필이미지.png'
                }
                alt=""
              />
              <i className="fa fa-check"></i>
            </span>
          </div>
          <div className="nft__item_wrap" style={{ height: `${height}px` }}>
            <Outer>
              <span>
                <img
                  onLoad={onFileLoad}
                  src={tokenUri.image}
                  className="lazy nft__item_preview"
                  alt=""
                />
              </span>
            </Outer>
          </div>
          <div className="nft__item_info">
            <span>
              <h4>{tokenUri.title}</h4>
            </span>
            <div className="nft__item_price">{nft.basePrice} ETH</div>
            <div className="nft__item_action">
              <span onClick={() => navigateTo(`${nft.bid_link}/${nft.id}`)}>
                {nft.status === 'on_auction' ? '경매 입찰' : '바로 구매'}
              </span>
            </div>
            <div className="nft__item_like">
              <i className="fa fa-heart"></i>
              <span>{nft.likes}</span>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default memo(CollectionItem);
