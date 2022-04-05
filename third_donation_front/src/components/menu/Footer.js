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
                <Link to="/explore">찾아보기</Link>
              </li>
              <li>
                <Link to="/recommended">추천 NFT</Link>
              </li>
            </ul>
          </div>
        </div>
        {/* 3개 분할 / 2번- Resources */}
        <div className="col-md-3 col-sm-6 col-xs-1">
          <div className="widget">
            <h5>내 정보</h5>
            <ul>
              <li>
                <Link to="/profile/:authorId">프로필</Link>
              </li>
              <li>
                <Link to="/editProfile/:authorId">프로필 변경</Link>
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
                <Link to="/notice">공지사항</Link>
              </li>
              <li>
                <Link to="/donation">후원하기</Link>
              </li>
              <li>
                <Link to="/charityRegistration">자선단체 등록</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-md-3 col-sm-6 col-xs-1">
          <div className="widget">
            <h5>Third Donation</h5>
            <p>장애인 예술가들을 위한 소중한 후원을 NFT로 간직하세요</p>
            <form
              action="#"
              className="row form-dark"
              id="form_subscribe"
              method="post"
              name="form_subscribe">
              <div className="col text-center">
                <input className="form-control" placeholder="Go to register" type="text" />
                <Link to="/artistRegistration" id="btn-subscribe">
                  <i className="arrow_right bg-color-secondary"></i>
                </Link>
                <div className="clearfix"></div>
              </div>
            </form>
            <small>
              본 서비스에 작품을 등록하기 위해선 예술가 등록과 장애인 증명이 완료되어야 합니다.
            </small>
          </div>
        </div>
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
                  <img alt="" className="f-logo d-1" src="/img/logo.png" />
                  <img alt="" className="f-logo d-3" src="/img/logo-2-light.png" />
                  <img alt="" className="f-logo d-4" src="/img/logo-3.png" />
                  <span className="copy">&copy; Copyright 2022 - Third Donation by SSAFY</span>
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
