import React, { useRef, useEffect } from "react";

const Map = ({ latitude = 33.450701, longitude = 126.570667, markerTitle = "매물 위치" }) => {
  const mapContainer = useRef(null); // 지도를 표시할 div에 대한 ref 생성

  useEffect(() => {
    const loadKakaoMap = () => {

      if (!window.kakao || !window.kakao.maps) {
        console.error("Kakao Maps API is not loaded");
        return;
      }

      window.kakao.maps.load(() => {
        const { kakao } = window;

        // 지도 옵션 설정
        const mapOption = {
          center: new kakao.maps.LatLng(latitude, longitude),
          level: 3, // 확대 레벨
        };

        // 지도 생성
        const map = new kakao.maps.Map(mapContainer.current, mapOption);

        // 마커 생성
        const markerPosition = new kakao.maps.LatLng(latitude, longitude);
        const marker = new kakao.maps.Marker({
          position: markerPosition,
          title: markerTitle,
        });

        marker.setMap(map); // 마커를 지도에 추가
      });
    };

    // 동적으로 Kakao Maps API 스크립트 추가
    const script = document.createElement("script");
    script.src = "https://dapi.kakao.com/v2/maps/sdk.js?appkey=774e3b62181c99d1ba97f5efdc1eab76&autoload=false";
    script.async = true;

    script.onload = loadKakaoMap;

    document.head.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script); // 스크립트 정리
      }
    }; 
  }, [latitude, longitude, markerTitle]);

  return (
    <div
      ref={mapContainer}
      style={{
        width: "100%",
        height: "400px",
      }}
    ></div>
  );
};

export default Map;
