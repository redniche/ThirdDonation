import { memo, useEffect, useState } from 'react';
import styled from 'styled-components';
import Clock from './Clock';
import { navigate } from '@reach/router';
import axios_apis from '../../core/axios';
import ipfs_apis from '../../core/ipfs';
import { IpfsAxios } from '../../core/ipfs';
import { convertIpfsToHttps } from './../../core/ipfs';

const Outer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 8px;
`;

//react functional component
/**
 *  NFT 카드 정보들을 입력받아 NFT카드를 표시하는 컴포넌트
 * @param {*} datas {nft, claseName, clockTop, height, onFileLoad}
 * @returns NftCard
 */
const NftCard = ({
  nft,
  className = 'd-item col-lg-3 col-md-6 col-sm-6 col-xs-12 mb-4',
  // preview = false,
  clockTop = true,
  height,
  onFileLoad,
}) => {
  const [tokenUri, setTokenUri] = useState(null);
  console.log(nft);

  const navigateTo = (link) => {
    navigate(link);
  };

  const heartClickHandle = () => {};
  useEffect(async () => {
    try {
      const { data: tokenUriJson } = await IpfsAxios.get(convertIpfsToHttps(nft.tokenUri), {
        params: [],
      });
      setTokenUri(tokenUriJson);
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    tokenUri && (
      <div className={className}>
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
          {nft.deadline && clockTop && (
            <div className="de_countdown">
              <Clock deadline={nft.deadline} />
            </div>
          )}
          <div className="author_list_pp">
            <span onClick={() => navigateTo(`/profile/${nft.artist.id}`)}>
              <img
                className="lazy"
                src={
                  nft.artist.imagePath
                    ? `${axios_apis.file}/${nft.artist.imagePath}`
                    : '/img/기본프로필이미지.png'
                }
                alt=""
              />
              <i className="fa fa-check"></i>
            </span>
          </div>
          <div
            className="nft__item_wrap"
            onClick={() => navigateTo(`/ItemDetail/${nft.id}`)}
            style={{ height: `${height}px` }}>
            <Outer>
              <span>
                {nft.fileType == 'video' ? (
                  <video
                    onLoad={onFileLoad}
                    src={`${ipfs_apis.https_local}/${tokenUri.hash}`}
                    className="lazy nft__item_preview"
                    alt=""
                  />
                ) : (
                  <img
                    onLoad={onFileLoad}
                    src={`${ipfs_apis.https_local}/${tokenUri.hash}`}
                    className="lazy nft__item_preview"
                    alt=""
                  />
                )}
              </span>
            </Outer>
          </div>
          {nft.deadline && !clockTop && (
            <div className="de_countdown">
              <Clock deadline={nft.deadline} />
            </div>
          )}
          <div className="nft__item_info">
            <span>
              <h4>{nft.name}</h4>
            </span>
            {nft.price && (
              <>
                <div className="nft__item_price">
                  {nft.price} ETH
                  {nft.status === 'on_auction' && (
                    <span>
                      {nft.bid}/{nft.max_bid}
                    </span>
                  )}
                </div>
                <div className="nft__item_action">
                  <span onClick={() => navigateTo(`${nft.bid_link}/${nft.id}`)}>
                    {nft.status === 'on_auction' ? '경매 입찰' : '바로 구매'}
                  </span>
                </div>
              </>
            )}
            <div className="nft__item_like">
              <i className="fa fa-heart" onClick={heartClickHandle}></i>
              <span>{nft.wishCount}</span>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default memo(NftCard);
