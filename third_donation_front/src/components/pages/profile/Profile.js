import React, { memo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ColumnNewRedux from '../../components/nfts/ColumnNewRedux';
import Footer from '../../components/footer';
import { createGlobalStyle } from 'styled-components';
import * as selectors from '../../../store/selectors';
import { fetchAuthorList } from '../../../store/actions/thunks';
import api from '../../../core/api';

const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.white {
    background: #fff;
  }
  .mainside{
    .connect-wal{
      display: none;
    }
    .logout{
      display: flex;
      align-items: center;
    }
  }
  @media only screen and (max-width: 1199px) {
    .navbar{
      background: #403f83;
    }
    .navbar .menu-line, .navbar .menu-line1, .navbar .menu-line2{
      background: #111;
    }
    .item-dropdown .dropdown a{
      color: #111 !important;
    }
  }
`;

/**
 * authorId를 받아 해당 유저의 프로필을 표시해주는 페이지 컴포넌트
 * @param {*} param0 authorId
 * @returns
 */
const Profile = ({ authorId }) => {
  // 리덕스 부분
  const [openMenu, setOpenMenu] = React.useState(true);
  const [openMenu1, setOpenMenu1] = React.useState(false);
  const [openMenu2, setOpenMenu2] = React.useState(false);

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

  const dispatch = useDispatch();
  const authorsState = useSelector(selectors.authorsState);
  const author = authorsState.data ? authorsState.data[authorId - 1] : {};

  useEffect(() => {
    dispatch(fetchAuthorList(authorId));
  }, [dispatch, authorId]);

  // 컴포넌트 레이아웃
  return (
    <div>
      <GlobalStyles />
      {author.banner && (
        <section
          id="profile_banner"
          className="jumbotron breadcumb no-bg"
          style={{ backgroundImage: `url(${api.baseUrl + author.banner.url})` }}>
          <div className="mainbreadcumb"></div>
        </section>
      )}

      <section className="container no-bottom">
        <div className="row">
          <div className="col-md-12">
            <div className="d_profile de-flex">
              <div className="de-flex-col">
                <div className="profile_avatar">
                  {author.avatar && (
                    <img
                      src={api.baseUrl + author.avatar.url}
                      alt=""
                      style={{ backgroundImage: `url(${api.baseUrl + author.banner.url})` }}
                    />
                  )}
                  <i className="fa fa-check"></i>
                  <div className="profile_name">
                    <h4>
                      {author.username}
                      <span className="profile_username">{author.social}</span>
                      <span id="wallet" className="profile_wallet">
                        {author.wallet}
                      </span>
                      <button id="btn_copy" title="Copy Text">
                        복사
                      </button>
                    </h4>
                  </div>
                </div>
              </div>
              <div className="profile_follow de-flex">
                <div className="de-flex-col">
                  <div className="profile_follower">{author.followers} 팔로워</div>
                </div>
                <div className="de-flex-col">
                  <span className="btn-main">팔로우</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container no-top">
        <div className="row">
          <div className="col-lg-12">
            <div className="items_filter">
              <ul className="de_nav text-left">
                <li id="Mainbtn" className="active">
                  <span onClick={handleBtnClick}>판매 중</span>
                </li>
                <li id="Mainbtn1" className="">
                  <span onClick={handleBtnClick1}>만든 작품</span>
                </li>
                <li id="Mainbtn2" className="">
                  <span onClick={handleBtnClick2}>소유 중</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {openMenu && author.id && (
          <div id="zero1" className="onStep fadeIn">
            <ColumnNewRedux shuffle showLoadMore={false} authorId={author.id} />
          </div>
        )}
        {openMenu1 && author.id && (
          <div id="zero2" className="onStep fadeIn">
            <ColumnNewRedux shuffle showLoadMore={false} authorId={author.id} />
          </div>
        )}
        {openMenu2 && (
          <div id="zero3" className="onStep fadeIn">
            <ColumnNewRedux shuffle showLoadMore={false} />
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};
export default memo(Profile);
