import Header from '../components/menu/Header';
import Footer from '../components/menu/Footer';
import SliderMain from '../components/home/SliderMain';
import FeatureBox from '../components/home/FeatureBox';
import Catgor from '../components/home/Category';
import NewNfts from '../components/home/NewNfts';
import HotCollections from '../components/home/HotCollections';

const Home = () => (
  <div>
    <Header />
    <section
      className="jumbotron breadcumb no-bg h-vh"
      style={{ backgroundImage: `url(${'/img/bg-shape-1.jpg'})` }}>
      <SliderMain />
    </section>

    <section className="container no-top no-bottom">
      <FeatureBox />
    </section>

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

    <section className="container no-bottom">
      <div className="row">
        <div className="col-lg-12">
          <div className="text-center">
            <h2>신규 아이템</h2>
            <div className="small-border"></div>
          </div>
        </div>
        <div className="col-lg-12">
          <NewNfts />
        </div>
      </div>
    </section>

    <section className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="text-center">
            <h2>카테고리</h2>
            <div className="small-border"></div>
          </div>
        </div>
      </div>

      <Catgor />
    </section>

    <Footer />
  </div>
);
export default Home;
