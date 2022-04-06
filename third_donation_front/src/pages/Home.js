import Header from '../components/menu/Header';
import Footer from '../components/menu/Footer';
import SliderMain from '../components/home/SliderMain';
import FeatureBox from '../components/home/FeatureBox';
import Catgor from '../components/home/Category';
import NewNfts from '../components/home/NewNfts';
import HotCollections from '../components/home/HotCollections';
import { Axios } from '../core/axios';
import React, { useEffect, useState } from 'react';
import ManualModal from '../components/home/ManualModal';

const Home = () => {
  const [article, setArticle] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const HAS_VISITED_BEFORE = localStorage.getItem('hasVisitedBefore');

  const openModal = () => {
    setModalOpen(true);
    console.log('오픈 모달');
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  function getArticle() {
    Axios.get('/board/article/detail', {
      params: {
        articleId: 36,
      },
    })
      .then((data) => data)
      .then(async (res) => {
        setArticle(res.data.data);
        // console.log(res);
      })
      .catch((err) => {
        console.log('에러 발생' + err);
      });
  }

  useEffect(() => {
    getArticle();
    const handleShowModal = () => {
      if (HAS_VISITED_BEFORE && HAS_VISITED_BEFORE > new Date()) {
        return;
      }

      if (!HAS_VISITED_BEFORE) {
        openModal();
        let expires = new Date();
        expires = expires.setHours(expires.getHours() + 24);
        localStorage.setItem('hasVisitedBefore', expires);
      }
    };

    window.setTimeout(handleShowModal, 2000);
  }, [HAS_VISITED_BEFORE]);

  return (
    <div>
      <React.Fragment>
        <ManualModal
          article={article}
          open={modalOpen}
          close={closeModal}
          header="서드 도네이션 메뉴얼"></ManualModal>
      </React.Fragment>

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
};
export default Home;
