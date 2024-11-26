import React, { useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Map = () => {
    const mapContainer = useRef(null); // 지도를 표시할 div 참조
    const navigate = useNavigate();

    useEffect(() => {
        const loadMap = async () => {
            try {
                // MongoDB에서 위경도 데이터를 가져옵니다.
                const response = await axios.get("http://localhost:5000/api/items"); // API 경로 수정
                const items = response.data; // items 배열 가져오기

                if (!window.kakao || !window.kakao.maps) {
                    console.error("Kakao Maps API가 로드되지 않았습니다.");
                    return;
                }

                // Kakao Maps API 로드 후 지도 생성
                window.kakao.maps.load(() => {
                    const map = new window.kakao.maps.Map(mapContainer.current, {
                        center: new window.kakao.maps.LatLng(37.2398001522416, 127.081198790803), // 기본 중심 좌표
                        level: 5, // 줌 레벨
                    });

                    // 가져온 데이터로 마커와 정보창 추가
                    items.forEach(({ itemID, latitude, longitude, location }) => {
                      console.log(items);
                        if (latitude && longitude) {
                            // 마커 생성
                            const marker = new window.kakao.maps.Marker({
                                position: new window.kakao.maps.LatLng(latitude, longitude),
                                map, // 마커를 추가할 지도
                            });

                            // 정보창 생성
                            const infoWindow = new window.kakao.maps.InfoWindow({
                                content: `<div style="padding:5px;">${location}</div>`, // 표시할 내용
                            });

                            // 마커 클릭 이벤트 추가
                            window.kakao.maps.event.addListener(marker, "click", () => {
                              infoWindow.open(map, marker); // 정보창 열기
                              navigate(`/item/${itemID}`); // React Router로 페이지 이동
                          });
                        } else {
                            console.warn(`위경도 데이터가 없습니다: ${location}`);
                        }
                    });
                });
            } catch (error) {
                console.error("지도 데이터를 불러오는 중 에러 발생:", error);
            }
        };

        // Kakao Maps 스크립트 추가
        const script = document.createElement("script");
        script.src =
            "https://dapi.kakao.com/v2/maps/sdk.js?appkey=774e3b62181c99d1ba97f5efdc1eab76&autoload=false"; // 본인의 Kakao JavaScript 키 사용
        script.async = true;
        script.onload = loadMap;
        document.head.appendChild(script);

        // 컴포넌트 언마운트 시 스크립트 제거
        return () => {
            document.head.removeChild(script);
        };
    }, []);

    return (
    <div ref={mapContainer} style={{ width: "100%", height: "500px" }} />)
    ; // 지도 표시 div
};

export default Map;
