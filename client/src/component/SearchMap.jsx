import React, { useState, useEffect } from "react";
import Map from "./Map"; // 지도 컴포넌트
import axios from "axios";
import "../searchMap.css";


const SearchMap = () => {
  const [keyword, setKeyword] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);

  // 검색 기능
  const handleSearch = async () => {
    try {
      const response = await axios.get(`/api/search?keyword=${keyword}`); // API 호출
      setSearchResults(response.data); // 검색 결과 저장
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      {/* 검색창 */}
      <div style={{ flex: 1, padding: "10px" }}>
        <div>
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="검색어를 입력하세요"
            style={{
              padding: "5px",
              width: "80%",
              marginBottom: "10px",
            }}
          />
          <button onClick={handleSearch} style={{ padding: "5px" }}>
            검색
          </button>
        </div>
        {/* 검색 결과 목록 */}
        <div>
          <ul style={{ listStyle: "none", padding: "0" }}>
            {searchResults.map((property, index) => (
              <li
                key={index}
                style={{
                  cursor: "pointer",
                  margin: "10px 0",
                  padding: "10px",
                  border: "1px solid #ddd",
                  borderRadius: "5px",
                }}
                onClick={() => setSelectedProperty(property)}
              >
                <strong>{property.houseAddress}</strong>
                <p>가격: {property.housePrice}</p>
                <p>설명: {property.memo}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 지도 */}
      <div style={{ flex: 2, position: "relative" }}>
        <Map
          properties={searchResults}
          onMarkerClick={(property) => setSelectedProperty(property)}
        />
        {selectedProperty && (
          <div
            style={{
              position: "absolute",
              bottom: "10px",
              right: "10px",
              background: "white",
              padding: "10px",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              zIndex: 10,
            }}
          >
            <h4>매물 정보</h4>
            <p>주소: {selectedProperty.houseAddress}</p>
            <p>가격: {selectedProperty.housePrice}</p>
            <p>설명: {selectedProperty.memo}</p>
            <button onClick={() => setSelectedProperty(null)}>닫기</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchMap;
