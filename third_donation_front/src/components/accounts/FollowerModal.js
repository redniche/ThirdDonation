/* eslint-disable no-unused-vars */
import React from 'react';
import { useState, useEffect } from 'react';
import { FlatList, SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import styled from 'styled-components';
import { Axios } from '../../core/axios';

const DATA = [
  {
    avatar: '/img/author/author-1.jpg',
    username: 'Monica Lucas',
    sales: 3.2,
  },
  {
    avatar: '/img/author/author-2.jpg',
    username: 'Mamie Barnett',
    sales: 2.8,
  },
  {
    avatar: '/img/author/author-3.jpg',
    username: 'Nicholas Daniels',
    sales: 2.5,
  },
  {
    avatar: '/img/author/author-4.jpg',
    username: 'Lori Hart',
    sales: 2.2,
  },
  {
    avatar: '/img/author/author-5.jpg',
    username: 'Jimmy Wright',
    sales: 1.9,
  },
  {
    avatar: '/img/author/author-6.jpg',
    username: 'Karla Sharp',
    sales: 1.6,
  },
  {
    avatar: '/img/author/author-7.jpg',
    username: 'Gayle Hicks',
    sales: 1.5,
  },
  {
    avatar: '/img/author/author-8.jpg',
    username: 'Claude Banks',
    sales: 1.3,
  },
  {
    avatar: '/img/author/author-9.jpg',
    username: 'Franklin Greer',
    sales: 0.9,
  },
  {
    avatar: '/img/author/author-10.jpg',
    username: 'Stacy Long',
    sales: 0.8,
  },
  {
    avatar: '/img/author/author-11.jpg',
    username: 'Ida Chapman',
    sales: 0.6,
  },
  {
    avatar: '/img/author/author-12.jpg',
    username: 'Fred Ryan',
    sales: 0.5,
  },
];

const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 45px;
`;

const Icon = styled.i`
  color: #ffffff;
  background: #8364e2;
  font-size: 10px;
  padding: 3px;
  position: absolute;
  left: 40px;
  bottom: 5px;
  border-radius: 45px;
  display: inline-block;
  box-sizing: border-box;
`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    height: 400,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 23,
  },
});

const Item = ({ item, textColor }) => {
  return (
    <React.Fragment>
      <span className="my-1" style={textColor}>
        <Image
          className="lazy mx-2"
          src={item.imagePath ? item.imagePath : '/img/기본프로필이미지.png'}
          alt=""></Image>
        <Icon className="fa fa-check"></Icon>
        <span>{item.username}</span>
      </span>
    </React.Fragment>
  );
};

const renderItem = ({ item }) => {
  const backgroundColor = '#6e3b6e';
  const color = 'black';
  return <Item item={item} backgroundColor={{ backgroundColor }} textColor={{ color }} />;
};

const FollowerModal = (props) => {
  const { user, open, close, header } = props;
  var followers = user;
  followers;

  const [page, setPage] = useState(0);
  const [result, setResult] = useState(0);

  const [list, setList] = useState([]);

  const getList = () => {
    Axios.get('/users/follow', {
      params: {
        userId: 16,
        page,
      },
    })
      .then(({ data }) => data)
      .then(async ({ data }) => {
        setList([...list, ...data]);
        setPage(page + 1);
        if (data.length == 0) {
          setResult(1);
        }
      })
      .catch((err) => {
        console.log('에러 발생' + err);
      });
  };

  const loadMore = () => {
    getList();
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <div className={open ? 'openModal modal' : 'modal'}>
      {open ? (
        <section>
          <header>
            {header}
            <button className="close" onClick={close}>
              &times;
            </button>
          </header>
          <main>
            <SafeAreaView style={styles.container}>
              <FlatList
                data={list}
                renderItem={renderItem}
                keyExtractor={(item) => item.username}
              />
            </SafeAreaView>
            <span onClick={loadMore} className="btn-main lead m-auto">
              더 보기
            </span>
            {result == 1 && <div className="result_log">마지막 NFT 입니다.</div>}
          </main>
          <footer>
            <button className="close" onClick={close}>
              닫기
            </button>
          </footer>
        </section>
      ) : null}
    </div>
  );
};

export default FollowerModal;
