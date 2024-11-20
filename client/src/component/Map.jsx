import React, { useRef, useEffect } from "react";

const Map = ({ latitude, longitude, markerTitle = "매물 위치" }) => {
  const mapContainer = useRef(null); // 지도를 표시할 div에 대한 ref 생성

  useEffect(() => {
    const { kakao } = window;
    const mapOption = {
      center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심 좌표
      level: 3, 
    };

 
    const map = new kakao.maps.Map(mapContainer.current, mapOption);
    const markerPosition = new kakao.maps.LatLng(latitude, longitude);
    const marker = new kakao.maps.Marker({
      position: markerPosition,
      title: markerTitle, // 마커에 툴팁으로 표시될 이름
    });
    marker.setMap(map);

  }, [latitude, longitude, markerTitle]);

  return (
    <div
      ref={mapContainer}
      style={{
        width: "100%",
        height: "400px", // 지도의 높이와 너비 설정
      }}
    ></div>
  );
};

export default Map;
