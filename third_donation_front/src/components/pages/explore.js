import React from 'react';

// 이거 추가하면 화면이 안나옴
// 확인 결과 redux 문제인 것으로 보임
import ColumnNewRedux from '../components/ColumnNewRedux';
import Footer from '../components/footer';
import { createGlobalStyle } from 'styled-components';
// 이거 추가하면 화면이 안나옴 >> 이유 찾아봐야함
// 확인 결과 redux 문제인 것으로 보임
import TopFilterBar from '../components/TopFilterBar';

const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.sticky.white {
    background: #403f83;
    border-bottom: solid 1px #403f83;
  }
  header#myHeader.navbar .search #quick_search{
    color: #fff;
    background: rgba(255, 255, 255, .1);
  }
  header#myHeader.navbar.white .btn, .navbar.white a, .navbar.sticky.white a{
    color: #fff;
  }
  header#myHeader .dropdown-toggle::after{
    color: rgba(255, 255, 255, .5);;
  }
  header#myHeader .logo .d-block{
    display: none !important;
  }
  header#myHeader .logo .d-none{
    display: block !important;
  }
  @media only screen and (max-width: 1199px) {
    .navbar{
      background: #403f83;
    }
    .navbar .menu-line, .navbar .menu-line1, .navbar .menu-line2{
      background: #fff;
    }
    .item-dropdown .dropdown a{
      color: #fff !important;
    }
  }
`;

const explore = () => (
  <div>
    <GlobalStyles />

    {/* 위 쪽에 섹션 나눠져있는 부분 */}
    <section
      className="jumbotron breadcumb no-bg"
      style={{ backgroundImage: `url(${'./img/background/subheader.jpg'})` }}>
      <div className="mainbreadcumb">
        <div className="container">
          <div className="row m-10-hor">
            <div className="col-12">
              <h1 className="text-center">찾아보기</h1>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* 아래쪽에 내용이 나와야하는 부분 */}
    {/* redux로 인해 추가하면 화면이 아예 나오지 않는 현상이 발생중 */}
    <section className="container">
      <div className="row">
        <div className="col-lg-12">
          {/* 탑 필터 바 추가 */}
          <TopFilterBar />
        </div>
      </div>
      {/* 컬럼 뉴 리덕스 추가 */}
      <ColumnNewRedux />
    </section>

    {/* 푸터 추가 구문 */}
    <Footer />
  </div>
);
export default explore;
