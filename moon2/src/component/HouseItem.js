import "./HouseItem.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import {itemDataContext} from "../App";
import DeleteButton from "./DeleteButton.js";
import LikeButton from "./LikeButton.js";


const HouseItem = ({itemId}) => {
    const navigate = useNavigate();
    const itemData = useContext(itemDataContext);
    let itemIndex = -1;
    itemIndex = itemData.findIndex((it) => String(it.itemId) === String(itemId));

    if (itemIndex !== -1) {
        let location, detailAdd, housePrice, area, type = undefined;

        location = itemData[itemIndex].location;
        detailAdd = itemData[itemIndex].detailAdd;
        housePrice = itemData[itemIndex].housePrice;
        area = itemData[itemIndex].area;
        type = itemData[itemIndex].type;

        const goToItem = () => {
            navigate(`/item/${itemId}`);
        }

        return (
            <div className = "HouseItem" onClick = {goToItem}>
                <div className = "HouseImage">"집 사진"</div>
                <div className = "HouseDetail">
                    <div className = "HouseName">{detailAdd}</div>
                    <div className = "HouseAddress">위치: {location}</div>
                </div>
                <div className = "PriceAndStar">
                    <div className = "Price">월세: {housePrice}만원</div>
                    <div className = "Type">건물 종류: {type}</div>
                    <div className = "Area">{area}평</div>
                </div>
                <div className = "button">
                    <LikeButton itemID = {itemId} />
                    <DeleteButton type = {type} itemID = {itemId} />
                </div>
            </div>
        );
    } else (
        console.log("error: item 정보 없음")
    )
};

export default HouseItem;