/* eslint-disable indent */
import React, { memo, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProfileLayout from '../../components/layout/ProfileLayout';
import NftList from '../../components/nfts/NftList';
import * as selectors from '../../store/selectors';
import { fetchAuthor } from '../../store/actions/thunks';
import api from '../../core/api';
import FollowerModal from '../../components/accounts/FollowerModal';
import { clearFilter, clearNfts } from '../../store/actions';
import { doCopy } from '../../common/utils';
import LineChart from '../../components/nfts/chart/LineChart';

/**
 * authorId를 받아 해당 유저의 프로필을 표시해주는 페이지 컴포넌트
 * @param {*} param0 authorId
 * @returns
 */
const Profile = ({ authorId }) => {
  const { data: account } = useSelector(selectors.accountState);
  const [saleMenu, setSaleMenu] = useState(true);
  const [productMenu, setProductMenu] = useState(false);
  const [ownMenu, setOwnMenu] = useState(false);
  const [chartMenu, setChartMenu] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const saleBtnClick = () => {
    setSaleMenu(!saleMenu);
    (author.authority == 'ARTIST' || author.authority == 'ADMIN') && setProductMenu(false);
    setOwnMenu(false);
    setChartMenu(false);
    document.getElementById('saleBtn').classList.add('active');
    if (account && account.id == author.id)
      document.getElementById('chartBtn').classList.remove('active');
    document.getElementById('ownBtn').classList.remove('active');
    (author.authority == 'ARTIST' || author.authority == 'ADMIN') &&
      document.getElementById('productBtn').classList.remove('active');
  };
  const productBtnClick = () => {
    setProductMenu(!productMenu);
    setOwnMenu(false);
    setSaleMenu(false);
    setChartMenu(false);
    document.getElementById('productBtn').classList.add('active');
    document.getElementById('saleBtn').classList.remove('active');
    document.getElementById('ownBtn').classList.remove('active');
    if (account && account.id == author.id)
      document.getElementById('chartBtn').classList.remove('active');
  };
  const ownBtnClick = () => {
    setOwnMenu(!ownMenu);
    setSaleMenu(false);
    (author.authority == 'ARTIST' || author.authority == 'ADMIN') && setProductMenu(false);
    setChartMenu(false);
    document.getElementById('ownBtn').classList.add('active');
    document.getElementById('saleBtn').classList.remove('active');
    if (account && account.id == author.id)
      document.getElementById('chartBtn').classList.remove('active');
    (author.authority == 'ARTIST' || author.authority == 'ADMIN') &&
      document.getElementById('productBtn').classList.remove('active');
  };
  const chartBtnClick = () => {
    setChartMenu(!chartMenu);
    setOwnMenu(false);
    setSaleMenu(false);
    (author.authority == 'ARTIST' || author.authority == 'ADMIN') && setProductMenu(false);
    if (account && account.id == author.id)
      document.getElementById('chartBtn').classList.add('active');
    document.getElementById('ownBtn').classList.remove('active');
    document.getElementById('saleBtn').classList.remove('active');
    (author.authority == 'ARTIST' || author.authority == 'ADMIN') &&
      document.getElementById('productBtn').classList.remove('active');
  };

  // 리덕스 부분
  const dispatch = useDispatch();
  const authorsState = useSelector(selectors.authorsState);

  const author = authorsState.data;
  // console.log(author);

  useEffect(() => {
    dispatch(clearFilter());
    dispatch(clearNfts());
    dispatch(fetchAuthor(authorId));
  }, [dispatch, authorId]);
  // 컴포넌트 레이아웃. 프로필당 배너는 구현 안함.
  return (
    <ProfileLayout>
      {author && (
        <>
          <section
            id="profile_banner"
            className="jumbotron breadcumb no-bg"
            style={
              author.banner
                ? { backgroundImage: `url(${author.banner})` }
                : { backgroundImage: `url(${api.baseUrl + '/uploads/테스트배너1.jpg'})` }
            }>
            <div className="mainbreadcumb"></div>
          </section>
          <section className="container no-bottom">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      <img
                        src={
                          author.imagePath
                            ? author.imagePath
                            : process.env.PUBLIC_URL + '/img/기본프로필이미지.png'
                        }
                        alt="프로필"
                        style={{ width: '150px', height: '150px' }}
                      />
                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {author.username}
                          <span className="profile_username">{'@' + author.username}</span>
                          <span id="wallet" className="profile_wallet">
                            {author.walletAddress}
                          </span>
                          <button
                            id="btn_copy"
                            title="Copy Text"
                            onClick={() => doCopy(author.walletAddress)}>
                            복사
                          </button>
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      <React.Fragment>
                        <div className="profile_follower" onClick={openModal}>
                          {author.followerCount} 팔로워
                        </div>
                        <FollowerModal
                          user={author}
                          open={modalOpen}
                          close={closeModal}
                          header="팔로워"></FollowerModal>
                      </React.Fragment>
                    </div>
                    <div className="de-flex-col">
                      <span className="btn-main">팔로우</span>
                    </div>
                  </div>
                </div>
              </div>
              {author.description && (
                <div className="col-md-12 profile_description">
                  <div>{author.description}</div>
                </div>
              )}
            </div>
          </section>
          <section className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="items_filter">
                  <ul className="de_nav text-left">
                    <li id="saleBtn" className="active">
                      <span onClick={saleBtnClick}>판매 중</span>
                    </li>
                    {(author.authority == 'ARTIST' || author.authority == 'ADMIN') && (
                      <li id="productBtn" className="">
                        <span onClick={productBtnClick}>만든 작품</span>
                      </li>
                    )}
                    <li id="ownBtn" className="">
                      <span onClick={ownBtnClick}>소유 중</span>
                    </li>
                    {account && account.id == author.id && (
                      <li id="chartBtn">
                        <span onClick={chartBtnClick}>일별 수익 차트</span>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
            {saleMenu && author.id && (
              <div id="zero1" className="onStep fadeIn">
                <NftList showLoadMore userId={author.id} sellFlag />
              </div>
            )}
            {productMenu &&
              author.id &&
              (author.authority == 'ARTIST' || author.authority == 'ADMIN') && (
                <div id="zero2" className="onStep fadeIn">
                  <NftList showLoadMore userId={author.id} artistFlag />
                </div>
              )}
            {ownMenu && (
              <div id="zero3" className="onStep fadeIn">
                <NftList showLoadMore userId={author.id} />
              </div>
            )}
            {chartMenu && (
              <div className="onStep fadeIn">
                <LineChart userId={author.id} />
              </div>
            )}
          </section>
        </>
      )}
    </ProfileLayout>
  );
};
export default memo(Profile);
