import { memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import * as selectors from '../../store/selectors';
import styled from 'styled-components';
import { navigate } from '@reach/router';
import ipfs_apis from '../../core/ipfs';
import axios_apis from '../../core/axios';
import { IpfsAxios, convertIpfsToHttps } from '../../core/ipfs';
import { Axios } from '../../core/axios';

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
  height,
  onFileLoad,
}) => {
  const { data: account } = useSelector(selectors.accountState);
  const [tokenUri, setTokenUri] = useState(null);
  const [isWish, setWish] = useState(0);
  // console.log(nft);

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
    } catch (err) {
      console.log(err);
    }
  }, [nft]);

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
          <div className="author_list_pp">
            <span onClick={() => navigateTo(`/profile/${nft.nft.artist.id}`)}>
              <img
                className="lazy"
                src={
                  nft.nft.artist && nft.nft.artist.imagePath
                    ? `${axios_apis.file}/${nft.nft.artist.imagePath}`
                    : '/img/기본프로필이미지.png'
                }
                alt=""
              />
              <i className="fa fa-check"></i>
            </span>
          </div>
          <div
            className="nft__item_wrap"
            style={{ height: `${height}px` }}
            onClick={() => navigateTo(`/ItemDetail/${nft.nft.id}`)}>
            <Outer>
              <span>
                {nft.nft.fileType == 'video' ? (
                  <video
                    src={`${ipfs_apis.https_local}/${tokenUri.hash}`}
                    style={{ maxHeight: '260px' }}
                    onLoad={onFileLoad}
                    autoPlay
                    muted
                    loop
                    className="lazy nft__item_preview"
                    alt=""
                  />
                ) : (
                  <img
                    onLoad={onFileLoad}
                    src={tokenUri && `${ipfs_apis.https_local}/${tokenUri.hash}`}
                    className="lazy nft__item_preview"
                    alt=""
                  />
                )}
              </span>
            </Outer>
          </div>
          <div className="nft__item_info">
            <span>
              <h4>{tokenUri.title}</h4>
            </span>
            <div className="nft__item_price">{nft.basePrice} SSF</div>
            <div
              className="nft__item_action"
              onClick={() => navigateTo(`/ItemDetail/${nft.nft.id}`)}>
              <span>{account && account.id === nft.nft.owner.id ? '판매 취소' : '바로 구매'}</span>
            </div>
            <div className="nft__item_like" onClick={heartClickHandle}>
              <i className="fa fa-heart"></i>
              <span>{nft.nft.wishCount + isWish}</span>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default memo(NftCard);
