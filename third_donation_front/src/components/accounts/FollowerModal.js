// import React from 'react';
import { useState, useEffect } from 'react';
// import { FlatList, SafeAreaView, StatusBar, StyleSheet } from 'react-native';
// import { axios, canceler } from 'axios';
// import styled from 'styled-components';
// import { navigate } from '@reach/router';
import { useSelector } from 'react-redux';
import * as selectors from '../../store/selectors';
import { Axios } from '../../core/axios';
import Pagination from '..//paging/Pagination';

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginTop: StatusBar.currentHeight || 0,
//     height: 400,
//   },
//   item: {
//     padding: 20,
//     marginVertical: 8,
//     marginHorizontal: 16,
//   },
//   title: {
//     fontSize: 23,
//   },
// });

// const Item = ({ item, textColor }) => {
// const Item = ({ item }) => {
//   // const navigateTo = (link) => {
//   //   navigate(link);
//   // };
//   return (
//     <React.Fragment>
//       <span className="my-1">
//         {/* <span className="my-1" onClick={() => navigateTo(item.authorLink)} style={textColor}> */}
//         {/* <Image className="lazy mx-2" src={item.avatar} alt=""></Image>
//         <Icon className="fa fa-check"></Icon> */}
//         <span>{item.username}</span>
//       </span>
//     </React.Fragment>
//   );
// };

// const renderItem = ({ item }) => {
//   const backgroundColor = '#6e3b6e';
//   const color = 'black';
//   return <Item item={item} backgroundColor={{ backgroundColor }} textColor={{ color }} />;
// };

const FollowerModal = (props) => {
  // const { user, open, close } = props;
  const { user, open, close, header } = props;
  var followers = user;
  followers;

  // 글 리스트
  const [list, setList] = useState([]);
  // 총 페이지
  const [totalPage, setTotalPage] = useState([]);
  // 현재 페이지 번호
  const [curPage, setCurPage] = useState(0);

  const authorsState = useSelector(selectors.authorsState);
  const author = authorsState.data;

  const getList = (pageNumber) => {
    Axios.get('/users/follow', {
      params: {
        userId: author.id,
        page: pageNumber,
      },
    })
      .then(({ data }) => data)
      .then(async ({ data }) => {
        setList(data);
        setCurPage(pageNumber);
        setTotalPage(data.totalPages);
        console.log(data);
      })
      .catch((err) => {
        console.log('에러 발생' + err);
      });
  };

  useEffect(() => {
    getList(curPage);
  }, []);

  // try {
  //   data = await axios.get(`${api.baseUrl}${api.authors}/follower`, {
  //     cancelToken: canceler.token,
  //     params: {},
  //   });
  // } catch (err) {}

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
            {/* <SafeAreaView style={styles.container}>
              <FlatList
                data={list}
                renderItem={renderItem}
                keyExtractor={(item) => item.username}
              />
            </SafeAreaView> */}
            <table className="table de-table table-rank table-hover">
              {/* <thead>
                <tr className="text-center">
                  <th scope="col">팔로워 id</th>
                  <th scope="col">팔로워 userName</th>
                </tr>
                <tr></tr>
              </thead> */}
              <tbody>
                {list &&
                  list.map((item) => (
                    <tr key={item.username}>
                      <td className="text-center">{item.id}</td>
                      <td className="text-center">{item.username}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <Pagination totalPage={totalPage} curPage={curPage} fetch={getList} />
          </main>
          {/* <footer>
            <button className="close" onClick={close}>
              닫기
            </button>
          </footer> */}
        </section>
      ) : null}
    </div>
  );
};

export default FollowerModal;
