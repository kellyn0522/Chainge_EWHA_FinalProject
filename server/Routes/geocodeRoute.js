const express = require("express");
const router = express.Router();
const axios = require("axios");
const Item = require("../Models/itemModel");
const KAKAO_REST_API_KEY = "4464d9283549delfe61eb544dcd0fe6"; // 직접 키를 하드코딩

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY; // Google API 키를 환경 변수로 설정
/*
router.get("/geocodeAll", async (req, res) => {
  console.log("1. [geocodeAll] 라우트 호출됨");

  try {
    // 데이터베이스에서 모든 아이템 가져오기
    const items = await Item.find();
    console.log(`2. [geocodeAll] 데이터베이스에서 ${items.length}개의 매물 가져옴`);

    const failedAddresses = []; // 실패한 주소 저장

    const geocodedItems = await Promise.all(
      items.map(async (item, index) => {
        if (!item.location) {
          console.warn(`3-${index}. [geocodeAll] 유효하지 않은 주소, 스킵: ${item}`);
          failedAddresses.push({ location: item.location, reason: "주소 없음" });
          return null; // 주소가 없는 경우 스킵
        }

        try {
          // Google Geocoding API 호출
          const response = await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json`,
            {
              params: {
                address: item.location.trim(),
                key: GOOGLE_API_KEY,
              },
            }
          );

          if (response.data.status === "OK" && response.data.results.length > 0) {
            const { lat: latitude, lng: longitude } =
              response.data.results[0].geometry.location;

            console.log(`4-${index}. [geocodeAll] Geocoding 성공: ${item.location} -> ${latitude}, ${longitude}`);

            // DB 업데이트
            item.latitude = latitude;
            item.longitude = longitude;
            await item.save();

            return {
              id: item._id,
              location: item.location,
              latitude,
              longitude,
            };
          } else {
            // Geocoding 실패 시 로그 출력
            console.warn(
              `4-${index}. [geocodeAll] Geocoding 실패: ${item.location}, 상태: ${response.data.status}, 메시지: ${response.data.error_message || "응답 메시지 없음"}`
            );
            failedAddresses.push({
              location: item.location,
              status: response.data.status,
              message: response.data.error_message || "응답 메시지 없음",
            });
            return null;
          }
        } catch (error) {
          console.error(
            `5-${index}. [geocodeAll] Geocoding 요청 중 오류: ${item.location}`,
            error.message
          );
          failedAddresses.push({ location: item.location, error: error.message });
          return null;
        }
      })
    );

    // 유효한 결과만 반환
    const filteredItems = geocodedItems.filter((item) => item !== null);

    console.log("Geocoding 실패한 주소 목록:", failedAddresses);

    // 결과 반환
    res.json({ success: filteredItems, failed: failedAddresses });
  } catch (error) {
    console.error("Geocoding 처리 중 오류:", error.message);
    res.status(500).json({ error: "서버 오류" });
  }
});

module.exports = router;*/





// Kakao API Geocoding 엔드포인트
router.get('/geocodeAll', async (req, res) => {
    console.log("1. [geocodeAll] 라우트 호출됨");
    console.log("[geocodeAll] KAKAO_API_KEY:", process.env.KAKAO_REST_API_KEY);
    try {
        let items = []; // 변수를 선언하고 초기화
        try {
            items = await Item.find();
            console.log(`2. [geocodeAll] 데이터베이스에서 ${items.length}개의 매물 가져옴`);
        
        } catch (dbError) {
            console.error("데이터베이스에서 매물 가져오는 중 오류:", dbError.message);
            return res.status(500).json({ error: '데이터베이스 오류' });
        }

        // 매물의 도로명 주소로 위경도 변환
        const geocodedItems = await Promise.all(
            items.map(async (item) => {
                if (!item.location) {
                    console.log(`3-${index}. [geocodeAll] 매물 처리 중: ${item.location}`);
                    return null;
                } // 도로명 주소가 없는 경우 스킵

                try {
                    // Kakao Geocoder API 호출
                    const response = await axios.get(
                        `https://dapi.kakao.com/v2/local/search/address.json`,
                        {
                            params: { query: item.location },
                            headers: { Authorization: `KakaoAK ${KAKAO_REST_API_KEY}` },
                        }
                    );
                    console.log(`4-${index}. [geocodeAll] Kakao API 호출 성공: ${item.location}`);
                    console.log("Kakao API 응답:", response.data);
                    if (response.data.documents.length === 0) {
                        console.warn(`5-${index}. [geocodeAll] 응답 데이터가 없습니다: ${item.location}`);
                        return null; // 응답이 없을 경우 null 반환
                    }

                    // API 호출 결과에서 좌표 추출
                    if (response.data.documents.length > 0) {
                        const { x: longitude, y: latitude } = response.data.documents[0];
                        console.log(`5-${index}. [geocodeAll] 좌표 추출 성공: ${latitude}, ${longitude}`);
                        // 위경도 저장
                        item.latitude = latitude;
                        item.longitude = longitude;
                        // DB 업데이트
                        await item.save();
                        console.log(`6-${index}. [geocodeAll] DB 업데이트 완료: ${item._id}`);


                        return {
                            id: item._id,
                            location: item.location,
                            latitude,
                            longitude,
                        };
                    } else {
                        console.error(`주소 변환 실패: ${item.location}`);
                        return null;
                    }

                    //res.json(geocodedItems.filter(Boolean));
                } catch (error) {
                    console.error(
                        `. [geocodeAll] Geocoding 실패: ${item.location}`,
                        `상태: ${error.response?.status || "알 수 없음"}, 메시지: ${
                            error.response?.data?.message || error.message
                        }`
                    );  return null;
                }
            })
        );

        // 유효한 데이터만 반환
        const filteredItems = geocodedItems.filter((item) => item !== null);

        res.json(filteredItems);
    } catch (error) {
        console.error('Geocoding 처리 중 오류:', error.message);
        res.status(500).json({ error: '서버 오류' });
    }
});

module.exports = router; 
/*
const express = require("express");
const router = express.Router();
const axios = require("axios");
const Item = require("../Models/itemModel");
const GOOGLE_API_KEY = process.env.AIzaSyBKDVCOwVe-a87M4E8JAbQ7l7Djlh0SC9E; // Google API 키를 환경 변수로 설정

// Google Maps Geocoding API를 사용한 라우트
router.get("/geocodeAll", async (req, res) => {
  console.log("1. [geocodeAll] 라우트 호출됨");
  console.log("[geocodeAll] GOOGLE_API_KEY:", GOOGLE_API_KEY);

  try {
    let items = [];
    try {
      items = await Item.find(); // 데이터베이스에서 매물 가져오기
      console.log(`2. [geocodeAll] 데이터베이스에서 ${items.length}개의 매물 가져옴`);
    } catch (dbError) {
      console.error("데이터베이스에서 매물 가져오는 중 오류:", dbError.message);
      return res.status(500).json({ error: "데이터베이스 오류" });
    }

    // 매물의 주소로 위경도 변환
    const geocodedItems = await Promise.all(
      items.map(async (item, index) => {
        if (!item.location) {
          console.log(`3-${index}. [geocodeAll] 매물 처리 중: ${item.location}`);
          return null; // 주소가 없는 경우 스킵
        }

        try {
          // Google Geocoding API 호출
          const response = await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json`,
            {
              params: {
                address: item.location,
                key: GOOGLE_API_KEY,
              },
            }
          );

          console.log(`4-${index}. [geocodeAll] Google API 호출 성공: ${item.location}`);
          console.log("Google API 응답:", response.data);

          // API 호출 결과에서 좌표 추출
          if (
            response.data.status === "OK" &&
            response.data.results.length > 0
          ) {
            const { lat: latitude, lng: longitude } =
              response.data.results[0].geometry.location;
            console.log(
              `5-${index}. [geocodeAll] 좌표 추출 성공: ${latitude}, ${longitude}`
            );

            // 위경도 저장
            item.latitude = latitude;
            item.longitude = longitude;

            // DB 업데이트
            await item.save();
            console.log(`6-${index}. [geocodeAll] DB 업데이트 완료: ${item._id}`);

            return {
              id: item._id,
              location: item.location,
              latitude,
              longitude,
            };
          } else {
            console.error(`주소 변환 실패: ${item.location}`);
            return null;
          }
        } catch (error) {
          console.error(`Geocoding 실패: ${item.location}`, error.message);
          return null;
        }
      })
    );

    // 유효한 데이터만 반환
    const filteredItems = geocodedItems.filter((item) => item !== null);
    res.json(filteredItems);
  } catch (error) {
    console.error("Geocoding 처리 중 오류:", error.message);
    res.status(500).json({ error: "서버 오류" });
  }
});

module.exports = router;
*/