import Slider from 'react-slick';
import FollowBar from './FollowerBarChart';
import SalesBar from './SalesBarChart';
import Donut from './DonutChart';
import Line from './LineChart';

export default function SimpleSlider() {
  const settings = {
    dots: true,
    centerMode: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,

    slidesToScroll: 1,
  };
  return (
    <div>
      <h2>통계 차트</h2>
      <div className="spacer-20"></div>
      <Slider {...settings}>
        <div className="px-4">
          <SalesBar />
        </div>
        <div className="px-4">
          <FollowBar />
        </div>
        <div className="px-4">
          <Donut />
        </div>
        <div className="px-4">
          <Line />
        </div>
      </Slider>
    </div>
  );
}
