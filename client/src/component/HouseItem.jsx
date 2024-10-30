import { useNavigate } from "react-router-dom";
import DeleteButton from "./DeleteButton.jsx";
import LikeButton from "./LikeButton.jsx";
import { useState, useContext, useEffect } from "react";
import { AuthItemContext } from "../context/AuthItemContext";


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
    }, [findItem, findItemError,isFindItemLoading]);

    console.log(item)
    const goToItem = () => {
        navigate("/");
    }

    if (isFindItemLoading){
        return <div>Loding...</div>
    }
    if (findItemError || !item){
        return <div>Error: {findItemError?.message || 'Item not found'}</div>
    }

    return (
        <div className = "HouseItem" onClick = {goToItem}>
            <div className = "HouseImage">"집 사진"</div>
            <div className = "HouseDetail">
                <div className = "HouseAddress">위치: {item.location}</div>
                <div className = "HouseAddress">{item.houseAddress}</div>
                <div className = "HouseAddress">{item.zipCode}</div>
            </div>
            <div className = "PriceAndStar">
                    <div className = "Price">월세: {item.housePrice}만원</div>
                    <div className = "Type">건물 종류: {item.type}</div>
                    <div className = "Area">{item.area}평</div>
                    <div>판매자: {item.ownerName}</div>
                    <div className = "Memo">특이사항: {item.memo}</div>
            </div>
        </div>
    )
};

export default HouseItem;