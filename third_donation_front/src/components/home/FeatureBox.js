import Reveal from 'react-awesome-reveal';
import { keyframes } from '@emotion/react';
import { Link } from '@reach/router';

const fadeInUp = keyframes`
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
            <h4>지갑을 등록하세요</h4>
          </Reveal>
          <Reveal className="onStep" keyframes={fadeInUp} delay={200} duration={600} triggerOnce>
            <p>
              metamask 지갑을 설치, 생성한 후 우측 상단의 지갑 연결 버튼을 클릭하여 Third Donation에
              연결하세요!
            </p>
          </Reveal>
        </div>
        <i className="wm icon_wallet"></i>
      </div>
    </div>

    {/* 3부분 / 2번 - NFT 등록 박스 */}
    <div className="col-lg-4 col-md-6 mb-3">
      {/* 어떻게 유저상태가 예술가일때만 가능한가 */}
      <Link to="">
        <div className="feature-box f-boxed style-3">
          <i className=" bg-color-2 i-boxed icon_cloud-upload_alt"></i>
          <div className="text">
            <h4>NFT를 만들어보세요</h4>
            <p>
              장애인 예술가 승인이 완료되면, 자신이 직접 만든 NFT를 생성하고 이를 다른 고객들에게
              판매할 수 있습니다!
            </p>
          </div>
          <i className="wm icon_cloud-upload_alt"></i>
        </div>
      </Link>
    </div>

    {/* 3부분 / 3번 - NFT 판매 박스 */}
    <div className="col-lg-4 col-md-6 mb-3">
      <Link to="">
        <div className="feature-box f-boxed style-3">
          <i className=" bg-color-2 i-boxed icon_tags_alt"></i>
          <div className="text">
            <h4>예술가님들께 응원의 메시지를 전하세요</h4>
            <p>
              장애인 예술가님들의 디지털 작품 NFT를 구매할 때, 예술가님들을 위한 응원의 메시지를
              함께 남겨 힘을 전해주세요!
            </p>
          </div>
          <i className="wm icon_tags_alt"></i>
        </div>
      </Link>
    </div>
  </div>
);
export default featurebox;
