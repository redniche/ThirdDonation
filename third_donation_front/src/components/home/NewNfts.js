import React, { memo, useState } from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Clock from '../nfts/Clock';
import { carouselNew } from '../constants';

const Outer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
`;

/**
 * 판매할 NFT를 등록하는 페이지 컴포넌트
 * @returns
 */
const NewNfts = () => {
  const nfts = [
    {
      title: 'Pinky Ocean',
      price: '0.08',
      bid: '1',
      max_bid: '20',
      deadline: 'January, 10, 2023',
      author: {
        avatar: {
          url: './img/author/author-1.jpg',
        },
      },
      preview_image: {
        url: './img/items/static-1.jpg',
      },
      bid_link: '/#',
      likes: '50',
    },
    {
      title: 'Pinky Ocean',
      price: '0.08',
      bid: '1',
      max_bid: '20',
      author: {
        avatar: {
          url: './img/author/author-2.jpg',
        },
      },
      preview_image: {
        url: './img/items/static-2.jpg',
      },
      bid_link: '/#',
      likes: '50',
    },
    {
      title: 'Pinky Ocean',
      price: '0.08',
      bid: '1',
      max_bid: '20',
      author: {
        avatar: {
          url: './img/author/author-3.jpg',
        },
      },
      preview_image: {
        url: './img/items/static-3.jpg',
      },
      bid_link: '/#',
      likes: '50',
    },
    {
      title: 'Pinky Ocean',
      price: '0.08',
      bid: '1',
      max_bid: '20',
      deadline: 'February, 1, 2023',
      author: {
        avatar: {
          url: './img/author/author-4.jpg',
        },
      },
      preview_image: {
        url: './img/items/static-4.jpg',
      },
      bid_link: '/#',
      likes: '50',
    },
    {
      title: 'Pinky Ocean',
      price: '0.08',
      bid: '1',
      max_bid: '20',
      deadline: 'February, 1, 2023',
      author: {
        avatar: {
          url: './img/author/author-5.jpg',
        },
      },
      preview_image: {
        url: './img/items/static-5.jpg',
      },
      bid_link: '/#',
      likes: '50',
    },
    {
      title: 'Pinky Ocean',
      price: '0.08',
      bid: '1',
      max_bid: '20',
      author: {
        avatar: {
          url: './img/author/author-6.jpg',
        },
      },
      preview_image: {
        url: './img/items/static-6.jpg',
      },
      bid_link: '/#',
      likes: '50',
    },
  ];

  const [height, setHeight] = useState(0);

  const onImgLoad = ({ target: img }) => {
    let currentHeight = height;
    if (currentHeight < img.offsetHeight) {
      setHeight(img.offsetHeight);
    }
  };

  // useEffect(() => {
  //   dispatch(fetchNftsBreakdown());
  // }, [dispatch]);

  return (
    <div className="nft">
      <Slider {...carouselNew}>
        {nfts &&
          nfts.map((nft, index) => (
            <div className="itm" index={index + 1} key={index}>
              <div className="d-item">
                <div className="nft__item">
                  {nft.deadline && (
                    <div className="de_countdown">
                      <Clock deadline={nft.deadline} />
                    </div>
                  )}
                  <div className="author_list_pp">
                    <span onClick={() => window.open('/home1', '_self')}>
                      <img className="lazy" src={nft.author.avatar.url} alt="" />
                      <i className="fa fa-check"></i>
                    </span>
                  </div>
                  <div className="nft__item_wrap" style={{ height: `${height}px` }}>
                    <Outer>
                      <span>
                        <img
                          src={nft.preview_image.url}
                          className="lazy nft__item_preview"
                          onLoad={onImgLoad}
                          alt=""
                        />
                      </span>
                    </Outer>
                  </div>
                  <div className="nft__item_info">
                    <span onClick={() => window.open('/#', '_self')}>
                      <h4>{nft.title}</h4>
                    </span>
                    <div className="nft__item_price">
                      {nft.price} ETH
                      <span>
                        {nft.bid}/{nft.max_bid}
                      </span>
                    </div>
                    <div className="nft__item_action">
                      <span onClick={() => window.open(nft.bid_link, '_self')}>Place a bid</span>
                    </div>
                    <div className="nft__item_like">
                      <i className="fa fa-heart"></i>
                      <span>{nft.likes}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </Slider>
    </div>
  );
};

export default memo(NewNfts);
