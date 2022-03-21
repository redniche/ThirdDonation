import NftList from '../../components/nfts/NftList';
import TopFilterBar from '../../components/nfts/TopFilterBar';
import PanelLayout from '../../components/layout/PanelLayout';

/**
 * NFT 탐색 기능을 제공하는 페이지 컴포넌트
 * @returns
 */
const Explore = () => (
  <PanelLayout title="찾아보기">
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
