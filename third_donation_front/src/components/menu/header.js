/* eslint-disable react/prop-types */

import React, { useEffect, useState } from 'react';
import Breakpoint, { BreakpointProvider, setDefaultBreakpoints } from 'react-socks';
// import { header } from 'react-bootstrap';
import { Link } from '@reach/router';
// 외부 마우스 클릭 감지
import useOnclickOutside from 'react-cool-onclickoutside';

// 기본 중단점을 설정
// xs, s, m, l, xl이 있음
// 이것을 명명해서 이름을 줄 수 있음
// ex) [{cat : 0}, {dog : 1000}]
setDefaultBreakpoints([{ xs: 0 }, { l: 1199 }, { xl: 1200 }]);

const NavLink = (props) => (
  <Link
    {...props}
    getProps={({ isCurrent }) => {
      // the object returned here is passed to the
      // anchor element's props
      return {
        className: isCurrent ? 'active' : 'non-active',
      };
    }}
  />
);

const Header = function ({ className }) {
  // const [openMenu, setOpenMenu] = React.useState(false);
  // const [openMenu1, setOpenMenu1] = React.useState(false);
  const [openMenu2, setOpenMenu2] = React.useState(false);
  // const [openMenu3, setOpenMenu3] = React.useState(false);
  // const handleBtnClick = () => {
  //   setOpenMenu(!openMenu);
  // };
  // 버튼 클릭하면 상태 체인지
  // const handleBtnClick1 = () => {
  //   setOpenMenu1(!openMenu1);
  // };
  const handleBtnClick2 = () => {
    setOpenMenu2(!openMenu2);
  };
  // const handleBtnClick3 = () => {
  //   setOpenMenu3(!openMenu3);
  // };
  // const closeMenu = () => {
  //   setOpenMenu(false);
  // };

  // 닫혀 있으면 열기
  // const closeMenu1 = () => {
  //   setOpenMenu1(false);
  // };
  const closeMenu2 = () => {
    setOpenMenu2(false);
  };
  // const closeMenu3 = () => {
  //   setOpenMenu3(false);
  // };

  // const ref = useOnclickOutside(() => {
  //   closeMenu();
  // });

  // 열려있으면 닫기
  // const ref1 = useOnclickOutside(() => {
  //   closeMenu1();
  // });
  const ref2 = useOnclickOutside(() => {
    closeMenu2();
  });
  // const ref3 = useOnclickOutside(() => {
  //   closeMenu3();
  // });

  const [showmenu, btn_icon] = useState(false);
  const [showpop, btn_icon_pop] = useState(false);
  const [shownot, btn_icon_not] = useState(false);
  const closePop = () => {
    btn_icon_pop(false);
  };
  const closeNot = () => {
    btn_icon_not(false);
  };
  const refpop = useOnclickOutside(() => {
    closePop();
  });
  const refpopnot = useOnclickOutside(() => {
    closeNot();
  });

  useEffect(() => {
    // myHeader 아이디 요소
    const header = document.getElementById('myHeader');
    // scroll-to-top 아이디 요소
    const totop = document.getElementById('scroll-to-top');
    // 내부 경계를 기준으로 현재 요소의 외부 경계의 거리
    const sticky = header.offsetTop;

    const scrollCallBack = window.addEventListener('scroll', () => {
      btn_icon(false);
      if (window.pageYOffset > sticky) {
        header.classList.add('sticky');
        totop.classList.add('show');
      } else {
        header.classList.remove('sticky');
        totop.classList.remove('show');
      }
    });
    return () => {
      window.removeEventListener('scroll', scrollCallBack);
    };
  }, []);
  return (
    <header className={`navbar white ${className}`} id="myHeader">
      <div className="container">
        <div className="row w-100-nav">
          <div className="logo px-0">
            <div className="navbar-title navbar-item">
              <NavLink to="/">
                <img src="/img/logo.png" className="img-fluid d-block" alt="#" />
                <img src="/img/logo-2.png" className="img-fluid d-3" alt="#" />
                <img src="/img/logo-3.png" className="img-fluid d-4" alt="#" />
                <img src="/img/logo-light.png" className="img-fluid d-none" alt="#" />
              </NavLink>
            </div>
          </div>

          {/* 검색창 */}
          <div className="search">
            <input
              id="quick_search"
              className="xs-hide"
              name="quick_search"
              placeholder="검색어를 입력하세요"
              type="text"
            />
          </div>

          {/* breakpoint l down */}
          <BreakpointProvider>
            <Breakpoint l down>
              {showmenu && (
                <div className="menu">
                  <div className="navbar-item">
                    <NavLink to="/explore" onClick={() => btn_icon(!showmenu)}>
                      찾아보기
                    </NavLink>
                  </div>
                  {/* <div className="navbar-item">
                    <div ref={ref1}>
                      <div
                        className="dropdown-custom dropdown-toggle btn"
                        onClick={handleBtnClick1}>
                        Explore
                      </div>
                      {openMenu1 && (
                        <div className="item-dropdown">
                          <div className="dropdown" onClick={closeMenu1}>
                            <NavLink to="/explore" onClick={() => btn_icon(!showmenu)}>
                              Explore
                            </NavLink>
                          </div>
                        </div>
                      )}
                    </div>
                  </div> */}
                  <div className="navbar-item">
                    <div ref={ref2}>
                      <div
                        className="dropdown-custom dropdown-toggle btn"
                        onClick={handleBtnClick2}>
                        페이지
                      </div>
                      {openMenu2 && (
                        <div className="item-dropdown">
                          <div className="dropdown" onClick={closeMenu2}>
                            <NavLink to="/Author/1" onClick={() => btn_icon(!showmenu)}>
                              예술가
                            </NavLink>
                            <NavLink to="/Profile/1" onClick={() => btn_icon(!showmenu)}>
                              프로필
                            </NavLink>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="navbar-item">
                    <NavLink to="/activity" onClick={() => btn_icon(!showmenu)}>
                      활동
                    </NavLink>
                  </div>
                  {/* <div className="navbar-item">
                    <div ref={ref3}>
                      <div
                        className="dropdown-custom dropdown-toggle btn"
                        onClick={handleBtnClick3}>
                        Element
                      </div>
                      {openMenu3 && (
                        <div className="item-dropdown">
                          <div className="dropdown" onClick={closeMenu3}>
                            <NavLink to="/elegantIcons" onClick={() => btn_icon(!showmenu)}>
                              Elegant Icon
                            </NavLink>
                            <NavLink to="/etlineIcons" onClick={() => btn_icon(!showmenu)}>
                              Etline Icon
                            </NavLink>
                            <NavLink to="/fontAwesomeIcons" onClick={() => btn_icon(!showmenu)}>
                              Font Awesome Icon
                            </NavLink>
                            <NavLink to="/accordion" onClick={() => btn_icon(!showmenu)}>
                              Accordion
                            </NavLink>
                            <NavLink to="/alerts" onClick={() => btn_icon(!showmenu)}>
                              Alerts
                            </NavLink>
                            <NavLink to="/price" onClick={() => btn_icon(!showmenu)}>
                              Pricing Table
                            </NavLink>
                            <NavLink to="/progressbar" onClick={() => btn_icon(!showmenu)}>
                              Progress bar
                            </NavLink>
                            <NavLink to="/tabs" onClick={() => btn_icon(!showmenu)}>
                              Tabs
                            </NavLink>
                          </div>
                        </div>
                      )}
                    </div>
                  </div> */}
                </div>
              )}
            </Breakpoint>

            {/* breakpoint xl */}
            <Breakpoint xl>
              <div className="menu">
                <div className="navbar-item">
                  <NavLink to="/explore">
                    찾아보기
                    <span className="lines"></span>
                  </NavLink>
                </div>
                <div className="navbar-item">
                    <NavLink to="/ItemDetail/1">
                        아이템 상세
                        <span className="lines"></span>
                    </NavLink>
                  </div>
                {/* <div className="navbar-item">
                  <div ref={ref1}>
                    <div
                      className="dropdown-custom dropdown-toggle btn"
                      onMouseEnter={handleBtnClick1}
                      onMouseLeave={closeMenu1}>
                      찾아보기
                      <span className="lines"></span>
                      {openMenu1 && (
                        <div className="item-dropdown">
                          <div className="dropdown" onClick={closeMenu1}>
                            <NavLink to="/ItemDetail/1">Items Details</NavLink>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div> */}
                <div className="navbar-item">
                  <div ref={ref2}>
                    <div
                      className="dropdown-custom dropdown-toggle btn"
                      onMouseEnter={handleBtnClick2}
                      onMouseLeave={closeMenu2}>
                      페이지
                      <span className="lines"></span>
                      {openMenu2 && (
                        <div className="item-dropdown">
                          <div className="dropdown" onClick={closeMenu2}>
                            <NavLink to="/Author/1">예술가</NavLink>
                            <NavLink to="/Profile/1">프로필</NavLink>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="navbar-item">
                  <NavLink to="/activity">
                    활동
                    <span className="lines"></span>
                  </NavLink>
                </div>
                {/* <div className="navbar-item">
                  <div ref={ref3}>
                    <div
                      className="dropdown-custom dropdown-toggle btn"
                      onMouseEnter={handleBtnClick3}
                      onMouseLeave={closeMenu3}>
                      Elements
                      <span className="lines"></span>
                      {openMenu3 && (
                        <div className="item-dropdown">
                          <div className="dropdown" onClick={closeMenu3}>
                            <NavLink to="/elegantIcons">Elegant Icon</NavLink>
                            <NavLink to="/etlineIcons">Etline Icon</NavLink>
                            <NavLink to="/fontAwesomeIcons">Font Awesome Icon</NavLink>
                            <NavLink to="/accordion">Accordion</NavLink>
                            <NavLink to="/alerts">Alerts</NavLink>
                            <NavLink to="/price">Pricing Table</NavLink>
                            <NavLink to="/progressbar">Progess Bar</NavLink>
                            <NavLink to="/tabs">Tabs</NavLink>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div> */}
              </div>
            </Breakpoint>
          </BreakpointProvider>

          <div className="mainside">
            {/* 지갑을 연결하라는 버튼 */}
            <div className="connect-wal">
              <NavLink to="/wallet">지갑 연결하기</NavLink>
            </div>
            <div className="logout">
              <NavLink to="/createOptions">Create</NavLink>
              <div
                id="de-click-menu-notification"
                className="de-menu-notification"
                onClick={() => btn_icon_not(!shownot)}
                ref={refpopnot}>
                <div className="d-count">8</div>
                <i className="fa fa-bell"></i>
                {shownot && (
                  <div className="popshow">
                    <div className="de-flex">
                      <h4>알림</h4>
                      <span className="viewaall">전체보기</span>
                    </div>
                    <ul>
                      <li>
                        <div className="mainnot">
                          <img className="lazy" src="../../img/author/author-2.jpg" alt="" />
                          <div className="d-desc">
                            <span className="d-name">
                              <b>Mamie Barnett</b> started following you
                            </span>
                            <span className="d-time">1 hour ago</span>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="mainnot">
                          <img className="lazy" src="../../img/author/author-3.jpg" alt="" />
                          <div className="d-desc">
                            <span className="d-name">
                              <b>Nicholas Daniels</b> liked your item
                            </span>
                            <span className="d-time">2 hours ago</span>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="mainnot">
                          <img className="lazy" src="../../img/author/author-4.jpg" alt="" />
                          <div className="d-desc">
                            <span className="d-name">
                              <b>Lori Hart</b> started following you
                            </span>
                            <span className="d-time">18 hours ago</span>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="mainnot">
                          <img className="lazy" src="../../img/author/author-5.jpg" alt="" />
                          <div className="d-desc">
                            <span className="d-name">
                              <b>Jimmy Wright</b> liked your item
                            </span>
                            <span className="d-time">1 day ago</span>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="mainnot">
                          <img className="lazy" src="../../img/author/author-6.jpg" alt="" />
                          <div className="d-desc">
                            <span className="d-name">
                              <b>Karla Sharp</b> started following you
                            </span>
                            <span className="d-time">3 days ago</span>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
              <div
                id="de-click-menu-profile"
                className="de-menu-profile"
                onClick={() => btn_icon_pop(!showpop)}
                ref={refpop}>
                <img src="../../img/author_single/author_thumbnail.jpg" alt="" />
                {showpop && (
                  <div className="popshow">
                    {/* 유저 네임 */}
                    <div className="d-name">
                      <h4>Monica Lucas</h4>
                      <span className="name" onClick={() => window.open('', '_self')}>
                        Set display name
                      </span>
                    </div>
                    {/* 유저 지갑 balance */}
                    <div className="d-balance">
                      <h4>잔액</h4>
                      12.858 ETH
                    </div>
                    {/* 유저 지갑 주소 */}
                    <div className="d-wallet">
                      <h4>내 지갑</h4>
                      <span id="wallet" className="d-wallet-address">
                        DdzFFzCqrhshMSxb9oW3mRo4MJrQkusV3fGFSTwaiu4wPBqMryA9DYVJCkW9n7twCffG5f5wX2sSkoDXGiZB1HPa7K7f865Kk4LqnrME
                      </span>
                      {/* 지갑 주소 카피 버튼 */}
                      <button id="btn_copy" title="Copy Text">
                        Copy
                      </button>
                    </div>
                    <div className="d-line"></div>
                    {/* 유저 프로필 밑에 나오는 페이지 이동 버튼 */}
                    <ul className="de-submenu-profile">
                      <li>
                        <span>
                          <i className="fa fa-user"></i> 나의 프로필
                        </span>
                      </li>
                      <li>
                        <span>
                          <i className="fa fa-pencil"></i> 프로필 수정하기
                        </span>
                      </li>
                      <li>
                        <span>
                          <i className="fa fa-sign-out"></i> 로그아웃
                        </span>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <button className="nav-icon" onClick={() => btn_icon(!showmenu)}>
          <div className="menu-line white"></div>
          <div className="menu-line1 white"></div>
          <div className="menu-line2 white"></div>
        </button>
      </div>
    </header>
  );
};
export default Header;
