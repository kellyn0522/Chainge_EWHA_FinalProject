import NavBar from "../components/NavBar";
import HouseItem from "../component/HouseItem";
import React, { useState, useContext, useEffect ,useRef} from "react";
import { AuthItemContext } from "../context/AuthItemContext";
import { AuthContext } from "../context/AuthContext";
import "../component/HouseItem.css";
import { Button, Form, Row, Col, Container } from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import MapComponent from "../component/MapComponent";

const Home = () => {
    const [search, setSearch] = useState("");
    const [isSearch, setIsSearch] = useState("");
    const { getItem, getItemError } = useContext(AuthItemContext);
    const [items, setItems] = useState([]);
    const navigate = useNavigate();
    const { 
        user
    } = useContext(AuthContext);
    const userID = user? (user._id? user._id : null) : null

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

    const onCreateItem = () => {
        navigate("/createItemPage");
    }
    //<HouseItem key = {it.itemId} itemId = {it.itemId} />
    return (
        <Container>
            <Row>
                <Col style = {{marginBottom: '35px'}}>
                    <div className = "header"><NavBar /></div>
                    <div className = 'noto-sans-kr secondHeader'>
                    <Form className = 'd-flex'>
                        <Form.Control
                            type = 'text' 
                            className = "searchbar"
                            value = {isSearch}
                            style = {{width : '400px', marginRight: '10px'}}
                            onChange = {onChangeSearch}
                            placeholder="매물 검색" 
                            onKeyDown = {onKeyDown}
                        />
                        <span className="material-symbols-outlined size-40" style = {{cursor: "pointer"}} onClick = {onSearch}>search</span>
                    </Form>
                    {user && (<>
                        <Button className="noto-sans-kr green" style = {{color: 'white', border: 'none'}} onClick = {onCreateItem}>매물 등록</Button>
                    </>)}
                    </div>
                    <MapComponent items = {getSearchResult()}/>
                    <div className= "list_wrapper">
                        {getItemError && <p>Error: {getItemError}</p>}
                        {getSearchResult().map(it => (
                            userID !== it.ownerId?(
                                <HouseItem itemId={it.itemID} />
                            ): null
                        ))}
                    </div>
                </Col>
            </Row>
        </Container>
    );
};
export default Home;