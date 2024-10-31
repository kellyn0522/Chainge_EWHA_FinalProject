import { useNavigate } from "react-router-dom";
import DeleteButton from "./DeleteButton.jsx";
import LikeButton from "./LikeButton.jsx";
import { useState, useContext, useEffect } from "react";
import { AuthItemContext } from "../context/AuthItemContext";
import { Card } from "react-bootstrap";
import "./HouseItem.css";


const HouseItem = ({itemId}) => {
    const navigate = useNavigate();
    const { 
        findItem,
        findItemError,
        isFindItemLoading,
    } = useContext(AuthItemContext);
    const [item, setItem] = useState(null)

    useEffect(() => {
        const fetchItem = async () => {
            if (!findItemError && !isFindItemLoading){
                const result = await findItem(itemId);
                setItem(result);
            }
        };
        fetchItem();
    }, [findItem, findItemError]);

    console.log(item)
    const goToItem = () => {
        if(!isFindItemLoading && !findItemError && item){
            navigate(`/item/${item.itemID}`);
        }
    }

    if (isFindItemLoading){
        return <div>Loding...</div>
    }
    if (findItemError || !item){
        return <div>Error: {findItemError?.message || 'Item not found'}</div>
    }

    return (
        <Card style = {{ width : '200px' }} onClick = {goToItem}>
            <Card.Img variant = 'top' src = {item.imageFile} />
            <Card.Body>
                <Card.Text>위치: {item.location}</Card.Text>
                <Card.Text>{item.houseAddress}</Card.Text>

                <Card.Text>월세: {item.housePrice}만원</Card.Text>
                <Card.Text>건물 종류: {item.type}</Card.Text>
                <Card.Text>크기: {item.area}평</Card.Text>
            </Card.Body>
        </Card>
    )
};

export default HouseItem;