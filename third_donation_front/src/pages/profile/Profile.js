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

/**
 * authorId를 받아 해당 유저의 프로필을 표시해주는 페이지 컴포넌트
 * @param {*} param0 authorId
 * @returns
 */
const Profile = ({ authorId }) => {
  const [openMenu, setOpenMenu] = useState(true);
  const [openMenu1, setOpenMenu1] = useState(false);
  const [openMenu2, setOpenMenu2] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const handleBtnClick = () => {
    setOpenMenu(!openMenu);
    setOpenMenu1(false);
    setOpenMenu2(false);
    document.getElementById('Mainbtn').classList.add('active');
    document.getElementById('Mainbtn1').classList.remove('active');
    document.getElementById('Mainbtn2').classList.remove('active');
  };
  const handleBtnClick1 = () => {
    setOpenMenu1(!openMenu1);
    setOpenMenu2(false);
    setOpenMenu(false);
    document.getElementById('Mainbtn1').classList.add('active');
    document.getElementById('Mainbtn').classList.remove('active');
    document.getElementById('Mainbtn2').classList.remove('active');
  };
  const handleBtnClick2 = () => {
    setOpenMenu2(!openMenu2);
    setOpenMenu(false);
    setOpenMenu1(false);
    document.getElementById('Mainbtn2').classList.add('active');
    document.getElementById('Mainbtn').classList.remove('active');
    document.getElementById('Mainbtn1').classList.remove('active');
  };

  const doCopy = (text) => {
    if (!document.queryCommandSupported('copy')) {
      return alert('복사하기가 지원되지 않는 브라우저입니다.');
    }

    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.top = 0;
    textarea.style.left = 0;
    textarea.style.position = 'fixed';

    document.body.appendChild(textarea);
    // focus() -> 사파리 브라우저 서포팅
    textarea.focus();
    // select() -> 사용자가 입력한 내용을 영역을 설정할 때 필요
    textarea.select();

    document.execCommand('copy');

    document.body.removeChild(textarea);
    alert('지갑 주소가 클립보드에 복사되었습니다.');
  };

  // 리덕스 부분
  const dispatch = useDispatch();
  const authorsState = useSelector(selectors.authorsState);

  const author = authorsState.data;
  console.log(author);

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
                        alt=""
                        style={{
                          backgroundImage: `url(${api.baseUrl + '/uploads/테스트배너1.jpg'})`,
                        }}
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
                    <li id="Mainbtn" className="active">
                      <span onClick={handleBtnClick}>판매 중</span>
                    </li>
                    {(author.authority == 'ARTIST' || author.authority == 'ADMIN') && (
                      <li id="Mainbtn1" className="">
                        <span onClick={handleBtnClick1}>만든 작품</span>
                      </li>
                    )}
                    <li id="Mainbtn2" className="">
                      <span onClick={handleBtnClick2}>소유 중</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {openMenu && author.id && (
              <div id="zero1" className="onStep fadeIn">
                <NftList showLoadMore userId={author.id} sellFlag />
              </div>
            )}
            {openMenu1 &&
              author.id &&
              (author.authority == 'ARTIST' || author.authority == 'ADMIN') && (
                <div id="zero2" className="onStep fadeIn">
                  <NftList showLoadMore userId={author.id} artistFlag />
                </div>
              )}
            {openMenu2 && (
              <div id="zero3" className="onStep fadeIn">
                <NftList showLoadMore userId={author.id} />
              </div>
            )}
          </section>
        </>
      )}
    </ProfileLayout>
  );
};
export default memo(Profile);
