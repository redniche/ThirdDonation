import SaleNftList from '../../components/nfts/SaleNftList';
import PanelLayout from '../../components/layout/PanelLayout';

/**
 * NFT 탐색 기능을 제공하는 페이지 컴포넌트
 * @returns
 */
const Explore = () => (
  <PanelLayout title="NFT마켓">
    <section className="container">
      <div className="row"></div>
      <SaleNftList />
    </section>
  </PanelLayout>
);
export default Explore;
