import NavBar from "../components/NavBar";
import HouseItem from "../component/HouseItem";
import { useState, useContext } from "react";
import {itemDataContext} from "../App";
import { AuthContext } from "../context/AuthContext";


const Home = () => {
    const [search, setSearch] = useState("");
    const [isSearch, setIsSearch] = useState("");
    const { item } = useContext(AuthContext);

    const getSearchResult = () => {
        return search === "" 
        ? item 
        : item.filter((it) => it.location.toLowerCase().includes(search.toLowerCase()));
    }

    const getResult = () => {
        return getSearchResult()
        ?getSearchResult().map((it) => (
            <HouseItem key = {it.itemId} itemId = {it.itemId} />
        ))
        :0
    }

    const onSearch = () => {
        console.log("검색성공!");
        setSearch(isSearch);
    };
    
    const onChangeSearch = (e) => {
        setIsSearch(e.target.value);
    };

    const onKeyDown = (e) => {
        if (e.keyCode === 13){
            console.log("enter");
            onSearch();
        }
    }
    
    return (
        <div className="Home">
            <div className = "header"><NavBar /></div>
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
                {getSearchResult()}
            </div>
        </div>
    );
};
export default Home;