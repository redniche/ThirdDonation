import { memo, useEffect, useState } from 'react';
import styled from 'styled-components';
import { navigate } from '@reach/router';
import { useSelector } from 'react-redux';
import * as selectors from '../../store/selectors';
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

/**
 * 컬렉션을 표시하기 위한 컴포넌트
 * @param {*} param0
 * @returns
 */
const NftsItem = ({ nft }) => {
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
      // console.log(tokenUriJson);
    } catch (err) {
      console.log(err);
    }
  }, []);
  return (
    tokenUri && (
      <div className="itm">
        {console.log(nft)}
        <div className="d-item">
          <div className="nft__item" style={{ height: '400px' }}>
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
              style={{ height: '400px' }}
              onClick={() => navigateTo(`/ItemDetail/${nft.nft.id}`)}>
              <Outer>
                <span>
                  {nft.nft.fileType == 'video' ? (
                    <video
                      src={`${ipfs_apis.https_local}/${tokenUri.hash}`}
                      autoPlay
                      muted
                      loop
                      className="lazy nft__item_preview"
                      alt=""
                      style={{ maxHeight: '260px' }}
                    />
                  ) : (
                    <img
                      style={{ maxHeight: '260px' }}
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
              <div className="nft__item_like" onClick={heartClickHandle}>
                <i className="fa fa-heart"></i>
                <span>{nft.nft.wishCount + isWish}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default memo(NftsItem);
