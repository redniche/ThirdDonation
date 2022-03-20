import React from 'react';
import NftList from '../../components/nfts/NftList';
import TopFilterBar from '../../components/nfts/TopFilterBar';
import PanelLayout from '../../components/layout/PanelLayout';

/**
 * NFT 탐색 기능을 제공하는 페이지 컴포넌트
 * @returns
 */
const Explore = () => (
  <PanelLayout>
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

    <section className="container">
      <div className="row">
        <div className="col-lg-12">
          <TopFilterBar />
        </div>
      </div>
      <NftList />
    </section>
  </PanelLayout>
);
export default Explore;
