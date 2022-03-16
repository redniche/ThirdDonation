import React from 'react';
import Reveal from 'react-awesome-reveal';
import { keyframes } from '@emotion/react';

const fadeInUp = keyframes`
  0% {
    opacity: 0;
    -webkit-transform: translateY(40px);
    transform: translateY(40px);
  }
  100% {
    opacity: 1;
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
`;

const featurebox = () => (
  <div className="row">
    {/* 3부분 / 1번 - 지갑 등록 박스 */}
    <div className="col-lg-4 col-md-6 mb-3">
      <div className="feature-box f-boxed style-3">
        <Reveal className="onStep" keyframes={fadeInUp} delay={0} duration={600} triggerOnce>
          <i className="bg-color-2 i-boxed icon_wallet"></i>
        </Reveal>
        <div className="text">
          <Reveal className="onStep" keyframes={fadeInUp} delay={100} duration={600} triggerOnce>
            <h4 className="">지갑을 등록하세요</h4>
          </Reveal>
          <Reveal className="onStep" keyframes={fadeInUp} delay={200} duration={600} triggerOnce>
            <p className="">(대충 지갑등록 설명 내용)</p>
          </Reveal>
        </div>
        <i className="wm icon_wallet"></i>
      </div>
    </div>

    {/* 3부분 / 2번 - NFT 등록 박스 */}
    <div className="col-lg-4 col-md-6 mb-3">
      <div className="feature-box f-boxed style-3">
        <Reveal className="onStep" keyframes={fadeInUp} delay={0} duration={600} triggerOnce>
          <i className=" bg-color-2 i-boxed icon_cloud-upload_alt"></i>
        </Reveal>
        <div className="text">
          <Reveal className="onStep" keyframes={fadeInUp} delay={100} duration={600} triggerOnce>
            <h4 className="">NFT를 만들어보세요</h4>
          </Reveal>
          <Reveal className="onStep" keyframes={fadeInUp} delay={200} duration={600} triggerOnce>
            <p className="">(대충 NFT 생성 설명 내용)</p>
          </Reveal>
        </div>
        <i className="wm icon_cloud-upload_alt"></i>
      </div>
    </div>

    {/* 3부분 / 3번 - NFT 판매 박스 */}
    <div className="col-lg-4 col-md-6 mb-3">
      <div className="feature-box f-boxed style-3">
        <Reveal className="onStep" keyframes={fadeInUp} delay={0} duration={600} triggerOnce>
          <i className=" bg-color-2 i-boxed icon_tags_alt"></i>
        </Reveal>
        <div className="text">
          <Reveal className="onStep" keyframes={fadeInUp} delay={100} duration={600} triggerOnce>
            <h4 className="">NFT를 판매해보세요</h4>
          </Reveal>
          <Reveal className="onStep" keyframes={fadeInUp} delay={200} duration={600} triggerOnce>
            <p className="">(대충 NFT 판매 설명 내용)</p>
          </Reveal>
        </div>
        <i className="wm icon_tags_alt"></i>
      </div>
    </div>
  </div>
);
export default featurebox;
