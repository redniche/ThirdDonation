import React from 'react';
import { Link } from '@reach/router';

/**
 * Footer 컴포넌트
 * @returns
 */
const Footer = () => (
  <footer className="footer-light">
    <div className="container">
      {/* 열로 정리 + 가운데 정렬 */}
      <div className="row justify-content-center">
        {/* 3개 분할 / 1번- marketplace */}
        <div className="col-md-3 col-sm-6 col-xs-1">
          <div className="widget">
            <h5>NFT 시장</h5>
            <ul>
              <li>
                <Link to="">전체</Link>
              </li>
              <li>
                <Link to="">그림</Link>
              </li>
              <li>
                <Link to="">영상</Link>
              </li>
            </ul>
          </div>
        </div>
        {/* 3개 분할 / 2번- Resources */}
        <div className="col-md-3 col-sm-6 col-xs-1">
          <div className="widget">
            <h5>자원</h5>
            <ul>
              <li>
                <Link to="">지원센터</Link>
              </li>
              <li>
                <Link to="">파트너사</Link>
              </li>
              <li>
                <Link to="">제안</Link>
              </li>
              <li>
                <Link to="">디스코드</Link>
              </li>
              <li>
                <Link to="">문서</Link>
              </li>
              <li>
                <Link to="">소식</Link>
              </li>
            </ul>
          </div>
        </div>
        {/* 3개 분할 / 3번- Community */}
        <div className="col-md-3 col-sm-6 col-xs-1">
          <div className="widget">
            <h5>커뮤니티</h5>
            <ul>
              <li>
                <Link to="">커뮤니티</Link>
              </li>
              <li>
                <Link to="">문서</Link>
              </li>
              <li>
                <Link to="">회사 자산</Link>
              </li>
              <li>
                <Link to="">블로그</Link>
              </li>
              <li>
                <Link to="">포럼</Link>
              </li>
            </ul>
          </div>
        </div>
        {/* <div className="col-md-3 col-sm-6 col-xs-1">
          <div className="widget">
            <h5>Newsletter</h5>
            <p>Signup for our newsletter to get the latest news in your inbox.</p>
            <form
              action="#"
              className="row form-dark"
              id="form_subscribe"
              method="post"
              name="form_subscribe">
              <div className="col text-center">
                <input
                  className="form-control"
                  id="txt_subscribe"
                  name="txt_subscribe"
                  placeholder="enter your email"
                  type="text"
                />
                <Link to="" id="btn-subscribe">
                  <i className="arrow_right bg-color-secondary"></i>
                </Link>
                <div className="clearfix"></div>
              </div>
            </form>
            <div className="spacer-10"></div>
            <small>Your email is safe with us. We dont spam.</small>
          </div>
        </div> */}
      </div>
    </div>

    {/* 푸터 밑에 푸터 */}
    <div className="subfooter">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="de-flex">
              <div className="de-flex-col">
                <span onClick={() => window.open('', '_self')}>
                  <img alt="" className="f-logo d-1" src="./img/logo.png" />
                  <img alt="" className="f-logo d-3" src="./img/logo-2-light.png" />
                  <img alt="" className="f-logo d-4" src="./img/logo-3.png" />
                  <span className="copy">&copy; Copyright 2021 - Third Donation by SSAFY</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
);
export default Footer;
