import Header from "../component/Header";
import HouseItem from "../component/HouseItem";
import { useState, useContext } from "react";
import {itemDataContext} from "../App";
import "./Home.css";

const Home = () => { // 홈페이지
    const itemData = useContext(itemDataContext); // 전체 매물 정보
    const [search, setSearch] = useState(""); // 검색어를 저장할 변수
    const [isSearch, setIsSearch] = useState(""); // 검색어 입력을 받을 변수

    const getSearchResult = () => { // 검색 함수, 매물의 주소 일부분과 검색어가 일치하는 것만 필터링
        return search === "" 
        ? itemData 
        : itemData.filter((it) => it.location.toLowerCase().includes(search.toLowerCase()));
    }

    const onSearch = () => { // 검색하기 버튼 클릭시, enter 키 입력시 실행
        console.log("검색성공!");
        setSearch(isSearch); // 입력받은 검색어로 검색
    };
    
    const onChangeSearch = (e) => { // 검색어 입력 감지
        setIsSearch(e.target.value);
    };

    const onKeyDown = (e) => { // enter 키 입력시
        if (e.keyCode === 13){
            console.log("enter");
            onSearch();
        }
    }
    
    return (
        <div className="Home">
            <div className = "header"><Header /></div>
            <div className="search_wrapper">
                <input 
                    className = "searchbar"
                    value = {isSearch}
                    onChange = {onChangeSearch}
                    placeholder="매물 검색" 
                    onKeyDown = {onKeyDown}
                />
                <button className = "button" onClick = {onSearch}>검색</button>
            </div>
            <div className= "list_wrapper">
                {getSearchResult().map((it) => (
                    <HouseItem key = {it.itemId} itemId = {it.itemId} />
                ))}
            </div>
        </div>
    );
};
export default Home;