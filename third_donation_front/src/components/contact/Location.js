import { useRef, useEffect } from 'react';

const options = {
  //지도를 생성할 때 필요한 기본 옵션
  center: new window.kakao.maps.LatLng(35.09660249610088, 128.85380867574952), //지도의 중심좌표.
  level: 4, //지도의 레벨(확대, 축소 정도)
};

function Location() {
  const container = useRef(null); //지도를 담을 영역의 DOM 레퍼런스

  useEffect(() => {
    const map = new window.kakao.maps.Map(container.current, options); //지도 생성 및 객체 리턴
    //마커가 표시 될 위치
    let markerPosition = new window.kakao.maps.LatLng(35.09660249610088, 128.85380867574952);
    // 마커를 생성
    let marker = new window.kakao.maps.Marker({
      position: markerPosition,
    });
    // 마커를 지도 위에 표시
    marker.setMap(map);
    // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
    var zoomControl = new window.kakao.maps.ZoomControl();
    map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);
    // 마커를 클릭했을 때 마커 위에 표시할 인포윈도우를 생성합니다
    var iwContent = '<div style="padding:5px;">Third Donation</div>', // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
      iwRemoveable = true; // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다

    // 인포윈도우를 생성합니다
    var infowindow = new window.kakao.maps.InfoWindow({
      content: iwContent,
      removable: iwRemoveable,
    });

    // 마커에 클릭이벤트를 등록합니다
    window.kakao.maps.event.addListener(marker, 'click', function () {
      // 마커 위에 인포윈도우를 표시합니다
      infowindow.open(map, marker);
    });

    return () => {};
  }, []);

  return (
    <div className="row justify-content-center">
      <div
        id="map"
        className="map"
        style={{ width: '1030px', height: '400px' }}
        ref={container}></div>
    </div>
  );
}

export default Location;
