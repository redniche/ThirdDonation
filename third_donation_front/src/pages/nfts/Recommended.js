import RecommendedNftList from '../../components/nfts/RecommendedNftList';
import TopFilterBar from '../../components/nfts/TopFilterBar';
import PanelLayout from '../../components/layout/PanelLayout';

/**
 * NFT 탐색 기능을 제공하는 페이지 컴포넌트
 * @returns
 */
const Recommended = () => (
  <PanelLayout title="추천 NFT">
    <section className="container">
      <div className="row">
        <div className="col-lg-12">
          <TopFilterBar />
        </div>
      </div>
      <RecommendedNftList />
    </section>
  </PanelLayout>
);
export default Recommended;
