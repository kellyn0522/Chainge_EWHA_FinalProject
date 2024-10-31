import NavBar from "../components/NavBar";
import HouseItem from "../component/HouseItem";
import { useState, useContext, useEffect } from "react";
import { AuthItemContext } from "../context/AuthItemContext";


const Home = () => {
    const [search, setSearch] = useState("");
    const [isSearch, setIsSearch] = useState("");
    const { getItem, getItemError } = useContext(AuthItemContext);
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchItems = async () => {
            const allItems = await getItem();
            if (Array.isArray(allItems)){
                setItems(allItems);
            } else {
                console.error('Failed to fetch items.');
            }
        };
        fetchItems();
    }, [getItem]);

    const getSearchResult = () => {
        if(!Array.isArray(items)) return [];
        return search === "" 
        ? items 
        : items.filter((it) => it.location.toLowerCase().includes(search.toLowerCase()));
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
    //<HouseItem key = {it.itemId} itemId = {it.itemId} />
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
                {getItemError && <p>Error: {getItemError}</p>}
                {getSearchResult().map(it => (
                    <HouseItem itemId={it.itemID} />
                ))}
            </div>
        </div>
    );
};
export default Home;