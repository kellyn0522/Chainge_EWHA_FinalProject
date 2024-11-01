import NavBar from "../components/NavBar";
import HouseItem from "../component/HouseItem";
import { useState, useContext, useEffect } from "react";
import { AuthItemContext } from "../context/AuthItemContext";
import "../component/HouseItem.css";
import { Button, Form, Row, Col, Container } from "react-bootstrap";
import {useNavigate} from "react-router-dom";

const Home = () => {
    const [search, setSearch] = useState("");
    const [isSearch, setIsSearch] = useState("");
    const { getItem, getItemError } = useContext(AuthItemContext);
    const [items, setItems] = useState([]);
    const navigate = useNavigate();

    ByteLengthQueuingStrategy.href
    //,account_circle,bookmark,chat,chat_bubble,bed,ac_unit,kitchen,tv_gen,single_bed,dresser,blinds,king_bed,heat,dishwasher_gen

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
                <Col>
                    <div className = "header"><NavBar /></div>
                    <div className = 'secondHeader'>
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
                    <Button className = "button" style = {{backgroundColor: '#00462a', color: 'white', border: 'none'}} onClick = {onCreateItem}>매물 등록</Button>
                    </div>
                    <div className= "list_wrapper">
                        {getItemError && <p>Error: {getItemError}</p>}
                        {getSearchResult().map(it => (
                            <HouseItem itemId={it.itemID} />
                        ))}
                    </div>
                </Col>
            </Row>
        </Container>
    );
};
export default Home;