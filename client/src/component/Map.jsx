import React, { useEffect, useRef } from "react";


const Map = ({ properties = [] }) => {
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
          center: new kakao.maps.LatLng(37.566826, 126.9786567), // 초기 지도 중심 (서울)
          level: 3, // 확대 레벨
        };

        // 지도 생성
        const map = new kakao.maps.Map(mapContainer.current, mapOption);

        const properties = [
          {
            latitude: 37.5665,
            longitude: 126.9780,
            houseAddress: "서울특별시 중구 세종대로 110",
            housePrice: "10억",
          },
          {
            latitude: 37.5796,
            longitude: 126.9770,
            houseAddress: "경복궁",
            housePrice: "15억",
          },
        ];
        
        <Map properties={properties} />;
        
        
        // 마커를 표시하는 함수
        const addMarkers = (properties) => {
          properties.forEach((property) => {
            const markerPosition = new kakao.maps.LatLng(
              property.latitude,
              property.longitude
            );

            const marker = new kakao.maps.Marker({
              position: markerPosition,
              title: property.houseAddress || "매물 위치",
            });

            marker.setMap(map); // 마커를 지도에 추가

            // 마커 클릭 이벤트
            kakao.maps.event.addListener(marker, "click", () => {
              console.log(`Clicked on: ${property.houseAddress}`);
              alert(`매물 정보: ${property.houseAddress}\n가격: ${property.housePrice}`);
            });
          });
        };

        // 마커 추가
        if (properties.length > 0) {
          addMarkers(properties);
          // 지도 범위 조정
          const bounds = new kakao.maps.LatLngBounds();
          properties.forEach((property) => {
            bounds.extend(new kakao.maps.LatLng(property.latitude, property.longitude));
          });
          map.setBounds(bounds);
        }
      });
    };

    // 동적으로 Kakao Maps API 스크립트 추가
    const script = document.createElement("script");
    script.src =
      "https://dapi.kakao.com/v2/maps/sdk.js?appkey=774e3b62181c99d1ba97f5efdc1eab76&autoload=false";
    script.async = true;
    script.onload = loadKakaoMap;
    document.head.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script); // 스크립트 정리
      }
    };
  }, [properties]);

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
