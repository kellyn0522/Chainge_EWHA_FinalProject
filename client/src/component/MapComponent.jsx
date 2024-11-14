import React, { useRef, useEffect } from "react";

const MapComponent = () => {
  const mapContainer = useRef(null);

  useEffect(() => {
    // Kakao Maps 스크립트를 동적으로 로드
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=774e3b62181c99d1ba97f5efdc1eab76&autoload=false`;
    script.async = true;

    script.onload = () => {
      // Kakao Maps SDK 로드 후 지도 초기화
      window.kakao.maps.load(() => {
        if (mapContainer.current) {
          const mapOption = {
            center: new window.kakao.maps.LatLng(33.450701, 126.570667),
            level: 3,
          };
          new window.kakao.maps.Map(mapContainer.current, mapOption);
        }
      });
    };

    document.head.appendChild(script);

    return () => {
      // 클린업: 스크립트 제거
      document.head.removeChild(script);
    };
  }, []);

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

export default MapComponent;
