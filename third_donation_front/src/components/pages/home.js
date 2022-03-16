import React from 'react';
// 메인화면 가운데 이미지 부분 등록
import SliderMain from '../components/SliderMain';
// 피쳐박스 등록
import FeatureBox from '../components/FeatureBox';
import Catgor from '../components/Catgor';
// 푸터 등록 등록
import Footer from '../components/footer';
import NewNFTs from '../components/NewNFTs';
import HotCollections from '../components/HotCollections';

const home = () => (
  <div>
    <section
      className="jumbotron breadcumb no-bg h-vh"
      style={{ backgroundImage: `url(${'./img/bg-shape-1.jpg'})` }}>
      <SliderMain />
    </section>

    {/* 피쳐 박스 부분 */}
    <section className="container no-top no-bottom">
      <FeatureBox />
    </section>

    {/* 핫 컬렉션 부분 */}
    <section className="container no-bottom">
      <div className="row">
        <div className="col-lg-12">
          <div className="text-center">
            <h2>인기 컬렉션</h2>
            <div className="small-border"></div>
          </div>
        </div>
        <div className="col-lg-12">
          <HotCollections />
        </div>
      </div>
    </section>

    {/* 뉴 아이템 부분 */}
    <section className="container no-bottom">
      <div className="row">
        <div className="col-lg-12">
          <div className="text-center">
            <h2>신규 아이템</h2>
            <div className="small-border"></div>
          </div>
        </div>
        <div className="col-lg-12">
          <NewNFTs />
        </div>
      </div>
    </section>

    {/* 탑 셀러 부분 */}
    <section className="container no-bottom">
      <div className="row">
        <div className="col-lg-12">
          <div className="text-center">
            <h2>인기있는 판매자들</h2>
            <div className="small-border"></div>
          </div>
        </div>
        <div className="col-lg-12">{/* <AuthorListRedux /> */}</div>
      </div>
    </section>

    {/* 카테고리 부분 */}
    <section className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="text-center">
            <h2>카테고리</h2>
            <div className="small-border"></div>
          </div>
        </div>
      </div>
      {/* 카테고리 추가 */}
      <Catgor />
    </section>

    {/* 푸터부분 추가 */}
    <Footer />
  </div>
);
export default home;
