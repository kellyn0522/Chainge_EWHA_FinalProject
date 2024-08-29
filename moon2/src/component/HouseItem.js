import "./HouseItem.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import {itemDataContext} from "../App";
import DeleteButton from "./DeleteButton.js";
import LikeButton from "./LikeButton.js";


const HouseItem = ({itemId}) => { // 매물 정보 간략히 보여주는 컴포넌트
    const navigate = useNavigate();
    const itemData = useContext(itemDataContext); // 매물 정보
    let itemIndex = -1;
    itemIndex = itemData.findIndex((it) => String(it.itemId) === String(itemId)); // 출력할 매물 ID 저장

    if (itemIndex !== -1) { // 출력할 매물이 있는 경우
        let location, detailAdd, housePrice, area, type = undefined;

        location = itemData[itemIndex].location; // 매물 정보 저장
        detailAdd = itemData[itemIndex].detailAdd;
        housePrice = itemData[itemIndex].housePrice;
        area = itemData[itemIndex].area;
        type = itemData[itemIndex].type;

        const goToItem = () => { // 클릭 시
            navigate(`/item/${itemId}`); // 해당 매물 상세 페이지로 이동
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
    } else ( // 출력할 매물이 없는 경우
        console.log("error: item 정보 없음")
    )
};

export default HouseItem;