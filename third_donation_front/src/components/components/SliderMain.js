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
const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const slidermain = () => (
  <div className="container">
    <div className="row align-items-center">
      <div className="col-md-6">
        <div className="spacer-single"></div>
        <Reveal className="onStep" keyframes={fadeInUp} delay={0} duration={600} triggerOnce>
          <h6 className="">
            <span className="text-uppercase color">Third Donation</span>
          </h6>
        </Reveal>
        <div className="spacer-10"></div>
        <Reveal className="onStep" keyframes={fadeInUp} delay={300} duration={600} triggerOnce>
          <h1 className="">
            NFT 구매와 동시에 <br /> 기부를 해보세요.
          </h1>
        </Reveal>
        <Reveal className="onStep" keyframes={fadeInUp} delay={600} duration={600} triggerOnce>
          <p className=" lead">(대충 우리 프로젝트 설명한다는 내용의 글)</p>
        </Reveal>
        <div className="spacer-10"></div>
        <Reveal className="onStep" keyframes={fadeInUp} delay={800} duration={900} triggerOnce>
          {/* - _blank : 새 창에 열립니다. 이것이 기본값입니다.
            _parent : 부모 프레임에 열립니다.
            _self : 현재 페이지를 대체합니다.
            _top : 로드된 프레임셋을 대체합니다.
            name(임의의 이름) : 새 창이 열리고 창의 이름을 지정합니다. 동일한 이름에 다시 open() 을 하면 기존의 열린창의 내용이 바뀝니다. 다른 이름을 사용하면 또다른 새창이 열립니다.
          */}
          {/* 현재 페이지에서 explore 페이지 열기 */}
          <span onClick={() => window.open('/explore', '_self')} className="btn-main lead">
            찾아보기
          </span>
          <div className="mb-sm-30"></div>
        </Reveal>
      </div>
      <div className="col-md-6 xs-hide">
        <Reveal className="onStep" keyframes={fadeIn} delay={900} duration={1500} triggerOnce>
          <img src="./img/misc/nft.png" className="lazy img-fluid" alt="" />
        </Reveal>
      </div>
    </div>
  </div>
);
export default slidermain;
