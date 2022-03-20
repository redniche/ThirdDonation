import React, { memo } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { settings } from '../constants';
import CollectionItem from '../nfts/CollectionItem';

/**
 * Hot 컬렉션들을 표시하기 위한 컴포넌트
 * @returns
 */
const HotCollections = () => {
  const hotCollections = [
    {
      id: '1',
      token_standard: 'ERC-721',
      user_name: 'Tony',
      author: {
        avatar: {
          url: './img/author/author-1.jpg',
        },
      },
      banner: {
        url: './img/collections/coll-1.jpg',
      },
    },
    {
      id: '2',
      token_standard: 'ERC-721',
      user_name: 'Tony2',
      author: {
        avatar: {
          url: './img/author/author-2.jpg',
        },
      },
      banner: {
        url: './img/collections/coll-2.jpg',
      },
    },
    {
      id: '3',
      token_standard: 'ERC-721',
      user_name: 'Tony3',
      author: {
        avatar: {
          url: './img/author/author-3.jpg',
        },
      },
      banner: {
        url: './img/collections/coll-3.jpg',
      },
    },
    {
      id: '4',
      token_standard: 'ERC-721',
      user_name: 'Tony4',
      author: {
        avatar: {
          url: './img/author/author-4.jpg',
        },
      },
      banner: {
        url: './img/collections/coll-4.jpg',
      },
    },
    {
      id: '5',
      token_standard: 'ERC-721',
      user_name: 'Tony5',
      author: {
        avatar: {
          url: './img/author/author-5.jpg',
        },
      },
      banner: {
        url: './img/collections/coll-5.jpg',
      },
    },
    {
      id: '6',
      token_standard: 'ERC-721',
      user_name: 'Tony6',
      author: {
        avatar: {
          url: './img/author/author-6.jpg',
        },
      },
      banner: {
        url: './img/collections/coll-6.jpg',
      },
    },
  ];

  return (
    <div className="nft">
      <Slider {...settings}>
        {hotCollections &&
          hotCollections.map((item, index) => (
            <CollectionItem
              key={index}
              avatar={item.author.avatar.url}
              banner={item.banner.url}
              username={item.user_name}
              tokenStandard={item.token_standard}
              collectionId={item.id}
            />
          ))}
      </Slider>
    </div>
  );
};

export default memo(HotCollections);
