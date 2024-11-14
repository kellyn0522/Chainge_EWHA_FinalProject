import React, { useRef, useEffect,useState } from "react";

const MapComponent = () => {
  const mapContainer = useRef(null);
  const [keyword, setKeyword] = useState(""); // 검색어 상태
  const [places, setPlaces] = useState([]); // 검색 결과 장소 상태
  const markers = useRef([]); // 마커를 관리할 ref


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
          const map = new window.kakao.maps.Map(mapContainer.current, mapOption);
          const ps = new window.kakako.maps.Places(); // 장소 검색 객체 생성
          const infowindow = new window.kakao.maps.InfoWindow({ zIndex: 1 });
          
          const searchPlaces = () => {
            if (!keyword.trim()) {
              alert("키워드를 입력해주세요!");
              return;
            }
            ps.keywordSearch(keyword, (data, status) => {
              if (status === window.kakao.maps.services.Status.OK) {
                setPlaces(data); // 검색 결과를 상태에 저장
                displayPlaces(data, map, infowindow); // 검색 결과와 마커를 지도에 표시
              } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
                alert("검색 결과가 없습니다.");
              } else {
                alert("오류가 발생했습니다.");
              }
            });
          };
          
          const displayPlaces = (places, map, infowindow) => {
            removeMarkers(); // 기존 마커 제거
            const bounds = new window.kakao.maps.LatLngBounds();

            places.forEach((place, index) => {
              const position = new window.kakao.maps.LatLng(place.y, place.x);
              const marker = new window.kakao.maps.Marker({
                position,
                map,
              });

              // 마커 클릭 이벤트 추가
              window.kakao.maps.event.addListener(marker, "click", () => {
                infowindow.setContent(`<div style="padding:5px;">${place.place_name}</div>`);
                infowindow.open(map, marker);
              });

              markers.current.push(marker); // 생성한 마커를 배열에 추가
              bounds.extend(position); // 경계에 위치 추가
            });

            map.setBounds(bounds); // 모든 위치를 포함하도록 지도 범위 설정
          };
          
          const removeMarkers = () => {
            markers.current.forEach((marker) => marker.setMap(null));
            markers.current = [];
          }
          document.getElementById("search-btn").onclick = searchPlaces;
        }
      });
    };

    document.head.appendChild(script);

    return () => {
      // 클린업: 스크립트 제거
      document.head.removeChild(script);
    };
  }, [keyword]);

  

  
  return (
    <div>
      {/* 검색 UI */}
      <div style={{ marginBottom: "10px" }}>
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="매물 위치 검색"
          style={{ width: "300px", marginRight: "10px" }}
        />
        <button id="search-btn">검색</button>
      </div>

      {/* 지도 표시 영역 */}
      <div
        ref={mapContainer}
        style={{
          width: "100%",
          height: "400px",
          marginBottom: "10px",
        }}
      ></div>

      {/* 검색 결과 목록 */}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {places.map((place, index) => (
          <li key={index} style={{ marginBottom: "5px" }}>
            <span>{place.place_name}</span> - {place.address_name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MapComponent;
